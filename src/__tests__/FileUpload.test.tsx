
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import FileUpload from '../components/FileUpload';
import { useProcessing } from '../hooks/useProcessing';
import { useFileUploader } from '../hooks/useFileUploader';

// Mock the hooks
vi.mock('../hooks/useProcessing');
vi.mock('../hooks/useFileUploader');
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() })
}));

const mockUseProcessing = useProcessing as vi.MockedFunction<typeof useProcessing>;
const mockUseFileUploader = useFileUploader as vi.MockedFunction<typeof useFileUploader>;

describe('FileUpload Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    });

    mockUseProcessing.mockReturnValue({
      isProcessing: false,
      progress: 0,
      steps: [],
      processFile: vi.fn(),
      resetProcessing: vi.fn(),
      updateStep: vi.fn(),
      currentSession: null
    });

    mockUseFileUploader.mockReturnValue({
      isDragging: false,
      selectedFile: null,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleFileInputChange: vi.fn(),
      resetFile: vi.fn()
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  test('renders upload area with correct accessibility labels', () => {
    renderWithProviders(<FileUpload />);
    
    const uploadArea = screen.getByRole('button', { name: /upload excel file/i });
    expect(uploadArea).toBeInTheDocument();
    
    const fileInput = screen.getByLabelText(/select excel file/i);
    expect(fileInput).toBeInTheDocument();
  });

  test('shows generate button when file is selected', () => {
    const mockFile = new File(['test'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    mockUseFileUploader.mockReturnValue({
      isDragging: false,
      selectedFile: mockFile,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleFileInputChange: vi.fn(),
      resetFile: vi.fn()
    });

    renderWithProviders(<FileUpload />);
    
    const generateButton = screen.getByRole('button', { name: /generate presentation/i });
    expect(generateButton).toBeInTheDocument();
    expect(generateButton).not.toBeDisabled();
  });

  test('disables generate button when processing', () => {
    const mockFile = new File(['test'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    mockUseFileUploader.mockReturnValue({
      isDragging: false,
      selectedFile: mockFile,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleFileInputChange: vi.fn(),
      resetFile: vi.fn()
    });

    mockUseProcessing.mockReturnValue({
      isProcessing: true,
      progress: 50,
      steps: [],
      processFile: vi.fn(),
      resetProcessing: vi.fn(),
      updateStep: vi.fn(),
      currentSession: null
    });

    renderWithProviders(<FileUpload />);
    
    const generateButton = screen.getByRole('button', { name: /processing file/i });
    expect(generateButton).toBeDisabled();
  });

  test('shows progress bar during processing', () => {
    const mockFile = new File(['test'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    mockUseFileUploader.mockReturnValue({
      isDragging: false,
      selectedFile: mockFile,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleFileInputChange: vi.fn(),
      resetFile: vi.fn()
    });

    mockUseProcessing.mockReturnValue({
      isProcessing: true,
      progress: 75,
      steps: [
        { id: 'upload', name: 'File Upload', status: 'completed' },
        { id: 'validation', name: 'Security Validation', status: 'processing' }
      ],
      processFile: vi.fn(),
      resetProcessing: vi.fn(),
      updateStep: vi.fn(),
      currentSession: null
    });

    renderWithProviders(<FileUpload />);
    
    const progressContainer = screen.getByRole('status', { name: /processing progress/i });
    expect(progressContainer).toBeInTheDocument();
  });
});
