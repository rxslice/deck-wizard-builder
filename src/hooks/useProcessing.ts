import { useState, useCallback } from 'react';
import { parseExcelFile, extractFinancialMetrics, type ParsedExcelData } from '@/utils/excelParser';
import { generatePowerPointPresentation } from '@/utils/powerpointGenerator';
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
  slides?: any[];
  validation?: any;
  error?: string;
}

export const useProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setSteps(steps => steps.map(step => ({ ...step, status: 'pending', message: undefined })));
  }, []);

  const processFile = useCallback(async (file: File): Promise<ProcessingResult> => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Step 1: File Upload & Security Validation
      updateStep('upload', 'processing');
      setProgress(10);
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));
      updateStep('upload', 'completed', 'File uploaded successfully');

      // Step 2: Security Validation & Parsing
      updateStep('validation', 'processing');
      setProgress(25);
      
      let parsedData: ParsedExcelData;
      try {
        parsedData = await parseExcelFile(file);
        updateStep('validation', 'completed', `Validated ${parsedData.metadata.sheetCount} sheets, macros stripped`);
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

      // Step 4: PowerPoint Generation
      updateStep('generation', 'processing');
      setProgress(75);
      
      try {
        const presentationBlob = await generatePowerPointPresentation(parsedData);
        updateStep('generation', 'completed', 'Professional presentation generated');
        setProgress(90);
        
        // Step 5: Complete
        updateStep('complete', 'processing');
        await new Promise(resolve => setTimeout(resolve, 200));
        updateStep('complete', 'completed', 'Ready for download');
        setProgress(100);

        setIsProcessing(false);
        
        return {
          success: true,
          slides: [
            { id: 1, title: 'Executive Summary', type: 'summary', preview: 'Key valuation metrics' },
            { id: 2, title: 'Valuation Summary', type: 'table', preview: 'DCF, Comps, Precedent Transactions' },
            { id: 3, title: 'Financial Analysis', type: 'chart', preview: 'Revenue and margin analysis' }
          ],
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
