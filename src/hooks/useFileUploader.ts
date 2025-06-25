
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderConfig {
  maxFileSize?: number;
  allowedTypes?: string[];
  onFileSelect?: (file: File) => void;
  debounceMs?: number;
}

interface FileValidationError {
  type: 'size' | 'type' | 'generic';
  message: string;
}

export const useFileUploader = (config: FileUploaderConfig = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lastError, setLastError] = useState<FileValidationError | null>(null);
  const [lastToastTime, setLastToastTime] = useState(0);
  const { toast } = useToast();

  const {
    maxFileSize = 100 * 1024 * 1024, // 100MB
    allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ],
    onFileSelect,
    debounceMs = 1000
  } = config;

  // Debounced toast to prevent spam
  const showToast = useCallback((error: FileValidationError) => {
    const now = Date.now();
    if (now - lastToastTime < debounceMs) {
      return; // Skip if too soon
    }
    
    setLastToastTime(now);
    toast({
      title: error.type === 'size' ? "File Too Large" : 
             error.type === 'type' ? "Invalid File Type" : "File Error",
      description: error.message,
      variant: "destructive"
    });
  }, [toast, lastToastTime, debounceMs]);

  const validateFile = useCallback((file: File): FileValidationError | null => {
    if (!allowedTypes.includes(file.type)) {
      return {
        type: 'type',
        message: "Please select a valid Excel file (.xlsx or .xls)"
      };
    }

    if (file.size > maxFileSize) {
      return {
        type: 'size',
        message: `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(0)}MB. For larger financial models, consider splitting your data across multiple sheets.`
      };
    }

    return null;
  }, [allowedTypes, maxFileSize]);

  const handleFileSelect = useCallback((file: File) => {
    const error = validateFile(file);
    
    if (error) {
      setLastError(error);
      showToast(error);
      return false;
    }

    setLastError(null);
    setSelectedFile(file);
    onFileSelect?.(file);
    return true;
  }, [validateFile, onFileSelect, showToast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle edge case where user selects same file again
    const input = e.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const success = handleFileSelect(file);
      
      // Clear input value to allow re-selection of same file
      if (!success) {
        input.value = '';
      }
    }
  }, [handleFileSelect]);

  const resetFile = useCallback(() => {
    setSelectedFile(null);
    setIsDragging(false);
    setLastError(null);
  }, []);

  // Accessibility props for drag/drop zone
  const getRootProps = useCallback(() => ({
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    'aria-invalid': !!lastError,
    'aria-describedby': lastError ? 'file-error' : undefined,
  }), [handleDragOver, handleDragLeave, handleDrop, lastError]);

  const getInputProps = useCallback(() => ({
    onChange: handleFileInputChange,
    accept: allowedTypes.join(','),
    'aria-describedby': lastError ? 'file-error' : undefined,
  }), [handleFileInputChange, allowedTypes, lastError]);

  // Computed state for better UX
  const fileInfo = useMemo(() => {
    if (!selectedFile) return null;
    
    return {
      name: selectedFile.name,
      size: selectedFile.size,
      sizeFormatted: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
      type: selectedFile.type,
    };
  }, [selectedFile]);

  return {
    // State
    isDragging,
    selectedFile,
    lastError,
    fileInfo,
    
    // Handlers
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    resetFile,
    
    // Enhanced API
    getRootProps,
    getInputProps,
    isValid: !lastError && !!selectedFile,
    
    // Validation
    validateFile: (file: File) => validateFile(file) === null,
  };
};
