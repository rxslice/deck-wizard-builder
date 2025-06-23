
import { useState, useCallback } from 'react';

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
  duration?: number;
}

export interface ProcessingResult {
  success: boolean;
  slides?: any[];
  validation?: any;
  error?: string;
}

export const useProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'upload', name: 'File Upload', status: 'pending' },
    { id: 'validation', name: 'Template Validation', status: 'pending' },
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
    setSteps(steps => steps.map(step => ({ ...step, status: 'pending', message: undefined })));
  }, []);

  const processFile = useCallback(async (file: File): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Step 1: File Upload
      updateStep('upload', 'processing');
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep('upload', 'completed', 'File uploaded successfully');

      // Step 2: Validation
      updateStep('validation', 'processing');
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockValidation = {
        isValid: true,
        foundSheets: ['DCF_Model', 'Comps_Analysis', 'Charts_Data'],
        foundNamedRanges: ['val_EnterpriseValue', 'val_EquityValue', 'tbl_ValuationSummary'],
        missingElements: [],
        warnings: ['Consider adding more peer companies to strengthen comps analysis']
      };
      
      updateStep('validation', 'completed', `Found ${mockValidation.foundSheets.length} sheets, ${mockValidation.foundNamedRanges.length} named ranges`);

      // Step 3: Data Extraction
      updateStep('extraction', 'processing');
      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep('extraction', 'completed', 'Key metrics and charts data extracted');

      // Step 4: Slide Generation
      updateStep('generation', 'processing');
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockSlides = [
        { id: 1, title: 'Executive Summary', type: 'summary', preview: 'EV: $125M, Equity Value: $98M' },
        { id: 2, title: 'Valuation Summary', type: 'table', preview: 'DCF, Comps, Precedent Transactions' },
        { id: 3, title: 'Revenue Growth', type: 'chart', preview: 'Historical and projected revenue' },
        { id: 4, title: 'Margin Analysis', type: 'chart', preview: 'EBITDA margin trending' }
      ];
      
      updateStep('generation', 'completed', `Generated ${mockSlides.length} slides`);

      // Step 5: Complete
      updateStep('complete', 'processing');
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStep('complete', 'completed', 'Presentation ready for download');

      setIsProcessing(false);
      
      return {
        success: true,
        slides: mockSlides,
        validation: mockValidation
      };

    } catch (error) {
      setIsProcessing(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }, [updateStep]);

  return {
    isProcessing,
    progress,
    steps,
    processFile,
    resetProcessing,
    updateStep
  };
};
