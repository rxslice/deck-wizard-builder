
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, beforeEach, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FileUpload from '../components/FileUpload';
import { useProcessing } from '../hooks/useProcessing';
import { useToast } from '../hooks/use-toast';

// Mock dependencies
vi.mock('../hooks/useProcessing');
vi.mock('../hooks/use-toast');

const mockUseProcessing = vi.mocked(useProcessing);
const mockUseToast = vi.mocked(useToast);

describe('FileUpload Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    mockUseToast.mockReturnValue({
      toast: vi.fn(),
      dismiss: vi.fn(),
      toasts: [],
    });

    mockUseProcessing.mockReturnValue({
      isProcessing: false,
      progress: 0,
      steps: [
        { id: 'upload', name: 'File Upload', status: 'pending' },
        { id: 'validation', name: 'Security Validation', status: 'pending' },
        { id: 'extraction', name: 'Data Extraction', status: 'pending' },
        { id: 'generation', name: 'Slide Generation', status: 'pending' },
        { id: 'complete', name: 'Presentation Ready', status: 'pending' }
      ],
      processFile: vi.fn(),
      resetProcessing: vi.fn(),
      updateStep: vi.fn(),
      currentSession: null
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  test('renders upload area with correct labels', () => {
    renderWithProviders(<FileUpload />);
    
    expect(screen.getByText('Upload Your Financial Model')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop your Excel file here or click to browse')).toBeInTheDocument();
    expect(screen.getByText(/Supported formats:/)).toBeInTheDocument();
  });

  test('handles file drop correctly', async () => {
    renderWithProviders(<FileUpload />);
    
    const dropZone = screen.getByRole('button', { name: /upload excel file/i });
    
    const file = new File(['test content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const dataTransfer = {
      files: [file],
      items: [
        {
          kind: 'file',
          type: file.type,
          getAsFile: () => file,
        },
      ],
      types: ['Files'],
    };

    fireEvent.dragOver(dropZone, { dataTransfer });
    fireEvent.drop(dropZone, { dataTransfer });

    expect(screen.getByText('test.xlsx')).toBeInTheDocument();
    expect(screen.getByText('Generate Presentation')).toBeInTheDocument();
  });

  test('validates file type and shows error for invalid files', async () => {
    const mockToast = vi.fn();
    mockUseToast.mockReturnValue({ 
      toast: mockToast,
      dismiss: vi.fn(),
      toasts: [],
    });

    renderWithProviders(<FileUpload />);
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/Select Excel file/);
    
    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Invalid File Type",
        description: "Please select a valid Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
    });
  });

  test('shows processing steps when file is being processed', () => {
    mockUseProcessing.mockReturnValue({
      isProcessing: true,
      progress: 50,
      steps: [
        { id: 'upload', name: 'File Upload', status: 'completed' },
        { id: 'validation', name: 'Security Validation', status: 'processing' },
        { id: 'extraction', name: 'Data Extraction', status: 'pending' },
        { id: 'generation', name: 'Slide Generation', status: 'pending' },
        { id: 'complete', name: 'Presentation Ready', status: 'pending' }
      ],
      processFile: vi.fn(),
      resetProcessing: vi.fn(),
      updateStep: vi.fn(),
      currentSession: null
    });

    renderWithProviders(<FileUpload />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Security Validation')).toBeInTheDocument();
  });
});
