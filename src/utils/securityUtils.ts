
/**
 * Security utilities for safe Excel processing
 * Implements secure parsing and sanitization for financial data
 */

export interface SecurityConfig {
  maxFileSize: number; // bytes
  maxRows: number;
  maxSheets: number;
  allowedFileTypes: string[];
  stripMacros: boolean;
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxRows: 50000,
  maxSheets: 50,
  allowedFileTypes: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ],
  stripMacros: true
};

export class SecurityError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

export const validateFile = (file: File, config: SecurityConfig = DEFAULT_SECURITY_CONFIG): void => {
  // File type validation
  if (!config.allowedFileTypes.includes(file.type)) {
    throw new SecurityError(
      `Invalid file type. Allowed types: ${config.allowedFileTypes.join(', ')}`,
      'INVALID_FILE_TYPE'
    );
  }

  // File size validation
  if (file.size > config.maxFileSize) {
    throw new SecurityError(
      `File too large. Maximum size: ${(config.maxFileSize / 1024 / 1024).toFixed(0)}MB`,
      'FILE_TOO_LARGE'
    );
  }

  // Additional security checks
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    throw new SecurityError(
      'Invalid file name detected',
      'INVALID_FILE_NAME'
    );
  }
};

export const sanitizeSheetData = (data: any): any => {
  if (!data) return data;
  
  // Remove potentially dangerous properties
  const sanitized = JSON.parse(JSON.stringify(data));
  
  // Remove prototype pollution vectors
  delete sanitized.__proto__;
  delete sanitized.constructor;
  delete sanitized.prototype;
  
  return sanitized;
};

export const logSecurityEvent = (event: string, details: any): void => {
  console.log(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ...details
  });
};

export const createSecureFileName = (originalName: string): string => {
  // Remove path separators and dangerous characters
  const safeName = originalName
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\.\./g, '_');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const extension = safeName.split('.').pop();
  const baseName = safeName.replace(/\.[^/.]+$/, '');
  
  return `${baseName}_sanitized_${timestamp}.${extension}`;
};
