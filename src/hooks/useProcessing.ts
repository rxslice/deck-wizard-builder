
import { useReducer, useCallback, useRef } from 'react';
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
  errorCode?: string;
  presentationBlob?: Blob;
}

export interface ProcessingSession {
  fileName: string;
  completed: boolean;
  hasValidation: boolean;
  hasGeneration: boolean;
}

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  currentSession: ProcessingSession | null;
  steps: ProcessingStep[];
}

type ProcessingAction =
  | { type: 'START_PROCESSING'; fileName: string }
  | { type: 'UPDATE_PROGRESS'; progress: number }
  | { type: 'UPDATE_STEP'; stepId: string; status: ProcessingStep['status']; message?: string }
  | { type: 'SET_SESSION_FLAG'; flag: 'hasValidation' | 'hasGeneration'; value: boolean }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'RESET' };

const initialSteps: ProcessingStep[] = [
  { id: 'upload', name: 'File Upload', status: 'pending' },
  { id: 'validation', name: 'Security Validation', status: 'pending' },
  { id: 'extraction', name: 'Data Extraction', status: 'pending' },
  { id: 'generation', name: 'Slide Generation', status: 'pending' },
  { id: 'complete', name: 'Presentation Ready', status: 'pending' }
];

const initialState: ProcessingState = {
  isProcessing: false,
  progress: 0,
  currentSession: null,
  steps: initialSteps,
};

function processingReducer(state: ProcessingState, action: ProcessingAction): ProcessingState {
  switch (action.type) {
    case 'START_PROCESSING':
      return {
        ...state,
        isProcessing: true,
        progress: 0,
        currentSession: {
          fileName: action.fileName,
          completed: false,
          hasValidation: false,
          hasGeneration: false,
        },
        steps: initialSteps.map(step => ({ ...step, status: 'pending', message: undefined })),
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      };

    case 'UPDATE_STEP':
      return {
        ...state,
        steps: state.steps.map(step =>
          step.id === action.stepId 
            ? { ...step, status: action.status, message: action.message }
            : step
        ),
      };

    case 'SET_SESSION_FLAG':
      return {
        ...state,
        currentSession: state.currentSession 
          ? { ...state.currentSession, [action.flag]: action.value }
          : null,
      };

    case 'COMPLETE_SESSION':
      return {
        ...state,
        isProcessing: false,
        currentSession: state.currentSession 
          ? { ...state.currentSession, completed: true }
          : null,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export const useProcessing = () => {
  const [state, dispatch] = useReducer(processingReducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Dynamic progress calculation based on steps
  const calculateProgress = useCallback((stepId: string, stepProgress = 0) => {
    const stepIndex = state.steps.findIndex(s => s.id === stepId);
    const baseProgress = (stepIndex / state.steps.length) * 100;
    const stepWeight = 100 / state.steps.length;
    return baseProgress + (stepProgress * stepWeight);
  }, [state.steps]);

  const updateStep = useCallback((stepId: string, status: ProcessingStep['status'], message?: string) => {
    dispatch({ type: 'UPDATE_STEP', stepId, status, message });
    
    // Update progress based on step completion
    if (status === 'completed') {
      const progress = calculateProgress(stepId, 1);
      dispatch({ type: 'UPDATE_PROGRESS', progress });
    }
  }, [calculateProgress]);

  const resetProcessing = useCallback(() => {
    // Cancel any ongoing processing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    dispatch({ type: 'RESET' });
  }, []);

  const processFile = useCallback(async (
    file: File, 
    customTheme?: Partial<ThemeSettings>
  ): Promise<ProcessingResult> => {
    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    dispatch({ type: 'START_PROCESSING', fileName: file.name });

    try {
      // Check if cancelled
      if (signal.aborted) throw new Error('Processing cancelled');

      // Step 1: File Upload & Security Validation
      updateStep('upload', 'processing');
      dispatch({ type: 'UPDATE_PROGRESS', progress: calculateProgress('upload', 0.5) });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      if (signal.aborted) throw new Error('Processing cancelled');
      
      updateStep('upload', 'completed', 'File uploaded successfully');

      // Step 2: Security Validation & Parsing
      updateStep('validation', 'processing');
      
      let parsedData: ParsedExcelData;
      try {
        parsedData = await parseExcelFile(file);
        if (signal.aborted) throw new Error('Processing cancelled');
        
        updateStep('validation', 'completed', `Validated ${parsedData.metadata.sheetCount} sheets, macros stripped`);
        dispatch({ type: 'SET_SESSION_FLAG', flag: 'hasValidation', value: true });
      } catch (error) {
        const errorMessage = error instanceof SecurityError 
          ? `Security validation failed: ${error.message}`
          : 'File validation failed';
        updateStep('validation', 'error', errorMessage);
        
        return {
          success: false,
          error: errorMessage,
          errorCode: error instanceof SecurityError ? 'SECURITY_ERROR' : 'VALIDATION_FAILED'
        };
      }

      // Step 3: Data Extraction
      updateStep('extraction', 'processing');
      
      try {
        const metrics = extractFinancialMetrics(parsedData);
        if (signal.aborted) throw new Error('Processing cancelled');
        
        updateStep('extraction', 'completed', 'Financial metrics and data extracted');
      } catch (error) {
        updateStep('extraction', 'error', 'Data extraction failed');
        return {
          success: false,
          error: 'Failed to extract financial data from the model',
          errorCode: 'EXTRACTION_FAILED'
        };
      }

      // Step 4: PowerPoint Generation
      updateStep('generation', 'processing');
      
      try {
        const theme = { ...DEFAULT_THEME, ...customTheme };
        let generatedSlides: PresentationSlide[] = [];
        
        const presentationBlob = await generatePowerPointPresentation(
          parsedData, 
          theme,
          {
            onProgress: (genProgress, message) => {
              if (signal.aborted) return;
              
              const overallProgress = calculateProgress('generation', genProgress);
              dispatch({ type: 'UPDATE_PROGRESS', progress: overallProgress });
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
        
        if (signal.aborted) throw new Error('Processing cancelled');
        
        updateStep('generation', 'completed', `Generated ${generatedSlides.length} slides`);
        dispatch({ type: 'SET_SESSION_FLAG', flag: 'hasGeneration', value: true });
        
        // Step 5: Complete
        updateStep('complete', 'processing');
        await new Promise(resolve => setTimeout(resolve, 200));
        if (signal.aborted) throw new Error('Processing cancelled');
        
        updateStep('complete', 'completed', 'Ready for download');
        dispatch({ type: 'COMPLETE_SESSION' });
        
        return {
          success: true,
          slides: generatedSlides,
          validation: parsedData.validation,
          presentationBlob
        };

      } catch (error) {
        if (signal.aborted) {
          return {
            success: false,
            error: 'Processing was cancelled',
            errorCode: 'CANCELLED'
          };
        }
        
        updateStep('generation', 'error', 'PowerPoint generation failed');
        return {
          success: false,
          error: 'Failed to generate presentation',
          errorCode: 'GENERATION_FAILED'
        };
      }

    } catch (error) {
      if (signal.aborted) {
        return {
          success: false,
          error: 'Processing was cancelled',
          errorCode: 'CANCELLED'
        };
      }
      
      let errorMessage = 'Unknown error occurred';
      let errorCode = 'UNKNOWN_ERROR';
      
      if (error instanceof SecurityError) {
        errorMessage = `Security Error: ${error.message}`;
        errorCode = 'SECURITY_ERROR';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
        errorCode
      };
    } finally {
      abortControllerRef.current = null;
    }
  }, [updateStep, calculateProgress]);

  return {
    ...state,
    processFile,
    resetProcessing,
    updateStep,
    
    // Enhanced API
    canCancel: state.isProcessing,
    cancelProcessing: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    },
  };
};
