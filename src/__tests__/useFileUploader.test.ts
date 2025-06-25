
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useFileUploader } from '../hooks/useFileUploader';
import { useToast } from '../hooks/use-toast';

// Mock the toast hook
vi.mock('../hooks/use-toast');
const mockUseToast = vi.mocked(useToast);

describe('useFileUploader', () => {
  test('initializes with correct default state', () => {
    mockUseToast.mockReturnValue({ toast: vi.fn() });
    
    const { result } = renderHook(() => useFileUploader());
    
    expect(result.current.isDragging).toBe(false);
    expect(result.current.selectedFile).toBe(null);
  });

  test('validates file type correctly', () => {
    const mockToast = vi.fn();
    mockUseToast.mockReturnValue({ toast: mockToast });
    
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useFileUploader({ onFileSelect }));
    
    const invalidFile = new File(['content'], 'test.txt', { type: 'text/plain' });
    
    act(() => {
      const event = new Event('change') as any;
      event.target = { files: [invalidFile] };
      result.current.handleFileInputChange(event);
    });
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Invalid File Type",
      description: "Please select a valid Excel file (.xlsx or .xls)",
      variant: "destructive"
    });
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  test('validates file size correctly', () => {
    const mockToast = vi.fn();
    mockUseToast.mockReturnValue({ toast: mockToast });
    
    const onFileSelect = vi.fn();
    const maxFileSize = 1024; // 1KB for testing
    const { result } = renderHook(() => useFileUploader({ onFileSelect, maxFileSize }));
    
    // Create a file larger than the limit
    const largeFile = new File(['a'.repeat(2048)], 'large.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    act(() => {
      const event = new Event('change') as any;
      event.target = { files: [largeFile] };
      result.current.handleFileInputChange(event);
    });
    
    expect(mockToast).toHaveBeenCalled();
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  test('handles valid file correctly', () => {
    const mockToast = vi.fn();
    mockUseToast.mockReturnValue({ toast: mockToast });
    
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useFileUploader({ onFileSelect }));
    
    const validFile = new File(['content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    act(() => {
      const event = new Event('change') as any;
      event.target = { files: [validFile] };
      result.current.handleFileInputChange(event);
    });
    
    expect(mockToast).not.toHaveBeenCalled();
    expect(onFileSelect).toHaveBeenCalledWith(validFile);
    expect(result.current.selectedFile).toBe(validFile);
  });
});
