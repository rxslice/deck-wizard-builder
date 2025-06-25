
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderConfig {
  maxFileSize?: number;
  allowedTypes?: string[];
  onFileSelect?: (file: File) => void;
}

export const useFileUploader = (config: FileUploaderConfig = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const {
    maxFileSize = 100 * 1024 * 1024, // 100MB
    allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ],
    onFileSelect
  } = config;

  const validateFile = useCallback((file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxFileSize) {
      toast({
        title: "File Too Large",
        description: `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(0)}MB. For larger financial models, consider splitting your data across multiple sheets.`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  }, [allowedTypes, maxFileSize, toast]);

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  }, [validateFile, onFileSelect]);

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
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  const resetFile = useCallback(() => {
    setSelectedFile(null);
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    selectedFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    resetFile
  };
};
