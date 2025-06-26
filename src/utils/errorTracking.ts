interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  userId?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  buildVersion?: string;
}

class ErrorTracker {
  private errors: ErrorInfo[] = [];
  private maxErrors = 100;

  logError(error: Error, errorInfo?: any, userId?: string) {
    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      userId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      buildVersion: import.meta.env.VITE_BUILD_VERSION || 'development',
    };

    this.errors.push(errorData);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error tracked:', errorData);
    }

    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      this.sendToMonitoring(errorData);
    }
  }

  private async sendToMonitoring(errorData: ErrorInfo) {
    try {
      // Store in localStorage as fallback
      const existingErrors = JSON.parse(localStorage.getItem('error_log') || '[]');
      existingErrors.push(errorData);
      localStorage.setItem('error_log', JSON.stringify(existingErrors.slice(-50)));
      
      // TODO: Replace with actual monitoring service (Sentry, LogRocket, etc.)
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // });
    } catch (e) {
      console.error('Failed to send error to monitoring:', e);
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('error_log');
  }
}

export const errorTracker = new ErrorTracker();

// Global error handler
window.addEventListener('error', (event) => {
  errorTracker.logError(new Error(event.message), null);
});

window.addEventListener('unhandledrejection', (event) => {
  errorTracker.logError(new Error(event.reason), null);
});
