
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, AlertCircle, XCircle, Eye, Download } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProcessing } from "@/hooks/useProcessing";
import { useFileUploader } from "@/hooks/useFileUploader";
import { ErrorBoundary } from "./ErrorBoundary";
import LazySlidePreview from "./LazySlidePreview";
import ProcessingStepIcon from "./ProcessingStepIcon";
import { PresentationSlide } from "@/utils/powerpointGenerator";

export default function FileUpload() {
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [generatedSlides, setGeneratedSlides] = useState<PresentationSlide[]>([]);
  const [presentationBlob, setPresentationBlob] = useState<Blob | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { 
    isProcessing, 
    progress, 
    steps, 
    processFile, 
    resetProcessing,
    currentSession
  } = useProcessing();

  const {
    isDragging,
    selectedFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    resetFile
  } = useFileUploader({
    onFileSelect: (file) => {
      setProcessingError(null);
      setGeneratedSlides([]);
      setPresentationBlob(null);
      resetProcessing();
    }
  });

  const handleGenerate = useCallback(async () => {
    if (!selectedFile) return;
    
    setProcessingError(null);
    setGeneratedSlides([]);
    setPresentationBlob(null);
    
    try {
      const result = await processFile(selectedFile);
      
      if (!result.success) {
        setProcessingError(result.error || 'Processing failed');
        toast({
          title: "Processing Failed",
          description: result.error || "An error occurred while processing your file.",
          variant: "destructive"
        });
      } else {
        if (result.slides) {
          setGeneratedSlides(result.slides);
        }
        if (result.presentationBlob) {
          setPresentationBlob(result.presentationBlob);
        }
        toast({
          title: "Success!",
          description: "Your presentation has been generated successfully.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setProcessingError(errorMessage);
      toast({
        title: "Processing Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [selectedFile, processFile, toast]);

  const handleDownload = useCallback(() => {
    if (presentationBlob) {
      const url = URL.createObjectURL(presentationBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile?.name?.replace(/\.[^/.]+$/, '') || 'presentation'}.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [presentationBlob, selectedFile]);

  const handleSlidePreview = useCallback((slide: PresentationSlide) => {
    toast({
      title: `Slide ${slide.id}: ${slide.title}`,
      description: slide.preview,
    });
  }, [toast]);

  const handleRetry = useCallback(() => {
    setProcessingError(null);
    resetFile();
    resetProcessing();
  }, [resetFile, resetProcessing]);

  // Only show completion states if we have a current session and processing has occurred
  const hasValidation = currentSession?.hasValidation || false;
  const hasGeneration = currentSession?.hasGeneration || false;
  const isCompleted = currentSession?.completed || false;

  return (
    <ErrorBoundary onRetry={handleRetry}>
      <div className="space-y-6">
        <Card 
          className={`border-2 border-dashed transition-all duration-300 cursor-pointer ${
            isDragging 
              ? 'border-financial-gold bg-financial-gold/5' 
              : 'border-slate-300 hover:border-financial-gold/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload Excel file - supports .xlsx and .xls files up to 100MB"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
        >
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-financial-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-financial-blue" />
            </div>
            
            <h3 className="text-xl font-semibold text-financial-navy mb-2">
              Upload Your Financial Model
            </h3>
            <p className="text-slate-600 mb-4">
              Drag and drop your Excel file here or click to browse
            </p>
            
            <div className="text-sm text-slate-500 space-y-1">
              <div><strong>Supported formats:</strong> .xlsx, .xls (Up to 100MB for large financial models)</div>
              <div className="text-xs">✓ Client-side processing only - your data never leaves your device</div>
              <div className="text-xs">✓ Macros are automatically stripped for security</div>
              <div className="text-xs">✓ Use standardized templates with named ranges for best results</div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInputChange}
              className="hidden"
              aria-label="Select Excel file for financial model processing"
            />
          </CardContent>
        </Card>

        {processingError && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-800 mb-2">Processing Error</h4>
                  <p className="text-sm text-red-700 mb-3">{processingError}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-700 border-red-300 hover:bg-red-100"
                      onClick={() => setProcessingError(null)}
                      aria-label="Dismiss error message"
                    >
                      Dismiss
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-700 border-red-300 hover:bg-red-100"
                      onClick={handleRetry}
                      aria-label="Retry file processing"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedFile && (
          <Card className="border-financial-gold/30 bg-financial-gold/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-financial-blue rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-financial-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-financial-navy">{selectedFile.name}</p>
                    <p className="text-sm text-slate-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={isProcessing}
                  className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy font-semibold"
                  aria-label={isProcessing ? 'Processing file...' : 'Generate presentation from financial model'}
                >
                  {isProcessing ? 'Processing...' : 'Generate Presentation'}
                </Button>
              </div>

              {isProcessing && (
                <div 
                  className="space-y-4" 
                  role="status" 
                  aria-live="polite"
                  aria-label={`Processing progress: ${progress}% complete`}
                >
                  <Progress value={progress} className="w-full" aria-label="Processing progress" />
                  <div className="space-y-2">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-center space-x-3 text-sm">
                        <ProcessingStepIcon status={step.status} />
                        <span className={`${step.status === 'completed' ? 'text-green-700' : step.status === 'error' ? 'text-red-700' : 'text-slate-600'}`}>
                          {step.name}
                        </span>
                        {step.message && (
                          <span className="text-xs text-slate-500">- {step.message}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasGeneration && generatedSlides.length > 0 && (
                <div className="mt-6 pt-6 border-t border-financial-gold/20">
                  <h4 className="font-medium text-financial-navy mb-3">Generated Slides Preview</h4>
                  <LazySlidePreview 
                    slides={generatedSlides} 
                    onSlideClick={handleSlidePreview}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {hasValidation && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <ProcessingStepIcon status="completed" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-800 mb-2">Template Validation Passed</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>✓ File structure validated successfully</p>
                    <p>✓ Financial data successfully parsed</p>
                    <p>✓ Macros stripped for security compliance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isCompleted && (
          <Card className="border-financial-blue bg-financial-blue/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-financial-navy">Presentation Generated Successfully</h4>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    aria-label="Preview generated presentation slides"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy"
                    aria-label="Download PowerPoint presentation file"
                    onClick={handleDownload}
                    disabled={!presentationBlob}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download PPTX
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-slate-600 mb-4">
                Your professional presentation is ready with {generatedSlides.length} slides. 
                The file includes formatted slides with your financial data, charts, and comprehensive analysis - all generated securely in your browser.
              </div>

              {generatedSlides.length > 0 && (
                <div>
                  <h5 className="font-medium text-financial-navy mb-2">Slide Overview</h5>
                  <LazySlidePreview 
                    slides={generatedSlides} 
                    onSlideClick={handleSlidePreview}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">
                  Security & Best Practices
                </h4>
                <div className="text-sm text-amber-700 mb-3 space-y-1">
                  <p>• All processing happens locally in your browser - no data uploaded to servers</p>
                  <p>• VBA macros are automatically removed from Excel files for security</p>
                  <p>• Generated presentations are clean and safe to share with stakeholders</p>
                  <p>• For optimal results, use our standardized template with proper named ranges</p>
                  <p>• Supports complex financial models up to 100MB in file size</p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-amber-700 border-amber-300 hover:bg-amber-100"
                    aria-label="Download standardized Excel template for financial modeling"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download Template
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    className="text-amber-700 hover:text-amber-800 p-0 h-auto"
                    aria-label="View comprehensive security guide"
                  >
                    View Security Guide →
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
