
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useFileUploader } from '../hooks/useFileUploader';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() })
}));

describe('useFileUploader Hook', () => {
  test('validates file type correctly', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useFileUploader({ onFileSelect }));

    // Valid Excel file
    const validFile = new File(['test'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    act(() => {
      const event = {
        target: { files: [validFile] }
      } as any;
      result.current.handleFileInputChange(event);
    });

    expect(onFileSelect).toHaveBeenCalledWith(validFile);
    expect(result.current.selectedFile).toBe(validFile);
  });

  test('rejects invalid file types', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useFileUploader({ onFileSelect }));

    // Invalid file type
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });

    act(() => {
      const event = {
        target: { files: [invalidFile] }
      } as any;
      result.current.handleFileInputChange(event);
    });

    expect(onFileSelect).not.toHaveBeenCalled();
    expect(result.current.selectedFile).toBe(null);
  });

  test('rejects files that are too large', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => 
      useFileUploader({ onFileSelect, maxFileSize: 1024 }) // 1KB limit
    );

    // Large file (larger than 1KB)
    const largeFile = new File(['x'.repeat(2048)], 'large.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    act(() => {
      const event = {
        target: { files: [largeFile] }
      } as any;
      result.current.handleFileInputChange(event);
    });

    expect(onFileSelect).not.toHaveBeenCalled();
    expect(result.current.selectedFile).toBe(null);
  });

  test('handles drag and drop events correctly', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useFileUploader({ onFileSelect }));

    const validFile = new File(['test'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Test drag over
    act(() => {
      const event = { preventDefault: vi.fn() } as any;
      result.current.handleDragOver(event);
    });
    expect(result.current.isDragging).toBe(true);

    // Test drop
    act(() => {
      const event = {
        preventDefault: vi.fn(),
        dataTransfer: { files: [validFile] }
      } as any;
      result.current.handleDrop(event);
    });

    expect(result.current.isDragging).toBe(false);
    expect(onFileSelect).toHaveBeenCalledWith(validFile);
  });
});
