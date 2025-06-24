
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, XCircle, Eye, Download } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProcessing } from "@/hooks/useProcessing";
import SlidePreview from "./SlidePreview";
import { PresentationSlide } from "@/utils/powerpointGenerator";

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const validateExcelFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return false;
    }

    // Increased size limit for larger financial models
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast({
        title: "File Too Large",
        description: "File size must be less than 100MB. For larger files, consider splitting your model.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateExcelFile(file)) {
      setSelectedFile(file);
      setProcessingError(null);
      setGeneratedSlides([]);
      setPresentationBlob(null);
      resetProcessing();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
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
  };

  const handleDownload = () => {
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
  };

  const handleSlidePreview = (slide: PresentationSlide) => {
    toast({
      title: `Slide ${slide.id}: ${slide.title}`,
      description: slide.preview,
    });
  };

  const getStepIcon = (status: 'pending' | 'processing' | 'completed' | 'error') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <div className="w-4 h-4 border-2 border-financial-gold border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />;
    }
  };

  // Only show completion states if we have a current session and processing has occurred
  const hasValidation = currentSession?.hasValidation || false;
  const hasGeneration = currentSession?.hasGeneration || false;
  const isCompleted = currentSession?.completed || false;

  return (
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
        aria-label="Upload Excel file"
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
            <div>Supported formats: .xlsx, .xls (Max size: 100MB)</div>
            <div className="text-xs">✓ Client-side processing only - your data never leaves your device</div>
            <div className="text-xs">✓ Macros are automatically stripped for security</div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Select Excel file"
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
                <p className="text-sm text-red-700">{processingError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 text-red-700 border-red-300 hover:bg-red-100"
                  onClick={() => setProcessingError(null)}
                >
                  Dismiss
                </Button>
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
                aria-label={isProcessing ? 'Processing file' : 'Generate presentation'}
              >
                {isProcessing ? 'Processing...' : 'Generate Presentation'}
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <Progress value={progress} className="w-full" />
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3 text-sm">
                      {getStepIcon(step.status)}
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
                <SlidePreview 
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
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800 mb-2">Template Validation Passed</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>✓ File structure validated</p>
                  <p>✓ Data successfully parsed</p>
                  <p>✓ Macros stripped for security</p>
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
                <Button variant="outline" size="sm" aria-label="Preview presentation">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy"
                  aria-label="Download PowerPoint presentation"
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
              The file includes formatted slides with your financial data, charts, and analysis - all generated securely in your browser.
            </div>

            {generatedSlides.length > 0 && (
              <div>
                <h5 className="font-medium text-financial-navy mb-2">Slide Overview</h5>
                <SlidePreview 
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
                <p>• All processing happens in your browser - no data is uploaded to our servers</p>
                <p>• Macros are automatically stripped from Excel files for security</p>
                <p>• Generated presentations are clean and safe to share</p>
                <p>• For best results, use our standardized template with named ranges</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-amber-700 border-amber-300 hover:bg-amber-100"
                  aria-label="Download Excel template"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Template
                </Button>
                <Button 
                  variant="link" 
                  size="sm"
                  className="text-amber-700 hover:text-amber-800 p-0 h-auto"
                >
                  View Security Guide →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </div>
  );
}
