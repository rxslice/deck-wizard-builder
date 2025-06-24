
import { useState, useCallback } from 'react';
import { parseExcelFile, extractFinancialMetrics, type ParsedExcelData } from '@/utils/excelParser';
import { generatePowerPointPresentation, DEFAULT_THEME, type ThemeSettings, type PresentationSlide } from '@/utils/powerpointGenerator';
import { SecurityError } from '@/utils/securityUtils';

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
  duration?: number;
}

export interface ProcessingResult {
  success: boolean;
  slides?: PresentationSlide[];
  validation?: any;
  error?: string;
  presentationBlob?: Blob;
}

export interface ProcessingSession {
  fileName: string;
  completed: boolean;
  hasValidation: boolean;
  hasGeneration: boolean;
}

export const useProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSession, setCurrentSession] = useState<ProcessingSession | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'upload', name: 'File Upload', status: 'pending' },
    { id: 'validation', name: 'Security Validation', status: 'pending' },
    { id: 'extraction', name: 'Data Extraction', status: 'pending' },
    { id: 'generation', name: 'Slide Generation', status: 'pending' },
    { id: 'complete', name: 'Presentation Ready', status: 'pending' }
  ]);

  const updateStep = useCallback((stepId: string, status: ProcessingStep['status'], message?: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, status, message } : step
      )
    );
  }, []);

  const resetProcessing = useCallback(() => {
    setIsProcessing(false);
    setProgress(0);
    setCurrentSession(null);
    setSteps(steps => steps.map(step => ({ ...step, status: 'pending', message: undefined })));
  }, []);

  const initializeSession = useCallback((fileName: string) => {
    setCurrentSession({
      fileName,
      completed: false,
      hasValidation: false,
      hasGeneration: false
    });
  }, []);

  const processFile = useCallback(async (
    file: File, 
    customTheme?: Partial<ThemeSettings>
  ): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setProgress(0);
    initializeSession(file.name);

    try {
      // Step 1: File Upload & Security Validation
      updateStep('upload', 'processing');
      setProgress(10);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      updateStep('upload', 'completed', 'File uploaded successfully');

      // Step 2: Security Validation & Parsing
      updateStep('validation', 'processing');
      setProgress(25);
      
      let parsedData: ParsedExcelData;
      try {
        parsedData = await parseExcelFile(file);
        updateStep('validation', 'completed', `Validated ${parsedData.metadata.sheetCount} sheets, macros stripped`);
        setCurrentSession(prev => prev ? { ...prev, hasValidation: true } : null);
      } catch (error) {
        updateStep('validation', 'error', error instanceof Error ? error.message : 'Validation failed');
        throw error;
      }
      
      setProgress(45);

      // Step 3: Data Extraction
      updateStep('extraction', 'processing');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const metrics = extractFinancialMetrics(parsedData);
        updateStep('extraction', 'completed', 'Financial metrics and data extracted');
        setProgress(65);
      } catch (error) {
        updateStep('extraction', 'error', 'Data extraction failed');
        throw new Error('Failed to extract financial data from the model');
      }

      // Step 4: PowerPoint Generation with real implementation
      updateStep('generation', 'processing');
      setProgress(75);
      
      try {
        const theme = { ...DEFAULT_THEME, ...customTheme };
        let generatedSlides: PresentationSlide[] = [];
        
        const presentationBlob = await generatePowerPointPresentation(
          parsedData, 
          theme,
          {
            onProgress: (genProgress, message) => {
              // Map generation progress to overall progress (75-95%)
              const overallProgress = 75 + (genProgress * 0.2);
              setProgress(overallProgress);
              updateStep('generation', 'processing', message);
            },
            onComplete: (blob, slides) => {
              generatedSlides = slides || [];
            },
            onError: (error) => {
              updateStep('generation', 'error', error);
            }
          }
        );
        
        updateStep('generation', 'completed', `Generated ${generatedSlides.length} slides`);
        setCurrentSession(prev => prev ? { ...prev, hasGeneration: true } : null);
        setProgress(95);
        
        // Step 5: Complete
        updateStep('complete', 'processing');
        await new Promise(resolve => setTimeout(resolve, 200));
        updateStep('complete', 'completed', 'Ready for download');
        setProgress(100);

        setIsProcessing(false);
        setCurrentSession(prev => prev ? { ...prev, completed: true } : null);
        
        return {
          success: true,
          slides: generatedSlides,
          validation: parsedData.validation,
          presentationBlob
        };

      } catch (error) {
        updateStep('generation', 'error', 'PowerPoint generation failed');
        throw new Error('Failed to generate presentation');
      }

    } catch (error) {
      setIsProcessing(false);
      
      let errorMessage = 'Unknown error occurred';
      
      if (error instanceof SecurityError) {
        errorMessage = `Security Error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [updateStep, initializeSession]);

  return {
    isProcessing,
    progress,
    steps,
    processFile,
    resetProcessing,
    updateStep,
    currentSession
  };
};
