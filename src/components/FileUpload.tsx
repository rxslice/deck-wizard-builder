
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, XCircle, Eye, Download } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  message?: string;
}

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any>(null);
  const [generatedSlides, setGeneratedSlides] = useState<any[]>([]);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    { id: 'upload', name: 'File Upload', status: 'pending' },
    { id: 'validation', name: 'Template Validation', status: 'pending' },
    { id: 'extraction', name: 'Data Extraction', status: 'pending' },
    { id: 'generation', name: 'Slide Generation', status: 'pending' },
    { id: 'complete', name: 'Presentation Ready', status: 'pending' }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      toast({
        title: "File Too Large",
        description: "File size must be less than 50MB",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateExcelFile(file)) {
      setSelectedFile(file);
      setValidationResults(null);
      setGeneratedSlides([]);
      // Reset processing steps
      setProcessingSteps(steps => steps.map(step => ({ ...step, status: 'pending' })));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const updateProcessingStep = (stepId: string, status: ProcessingStep['status'], message?: string) => {
    setProcessingSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, status, message } : step
      )
    );
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    // Step 1: File Upload
    updateProcessingStep('upload', 'processing');
    setProcessingProgress(20);
    await new Promise(resolve => setTimeout(resolve, 800));
    updateProcessingStep('upload', 'completed', 'File uploaded successfully');

    // Step 2: Validation
    updateProcessingStep('validation', 'processing');
    setProcessingProgress(40);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate validation results
    const mockValidation = {
      isValid: true,
      foundSheets: ['DCF_Model', 'Comps_Analysis', 'Charts_Data'],
      foundNamedRanges: ['val_EnterpriseValue', 'val_EquityValue', 'tbl_ValuationSummary'],
      missingElements: [],
      warnings: ['Consider adding more peer companies to strengthen comps analysis']
    };
    setValidationResults(mockValidation);
    updateProcessingStep('validation', 'completed', `Found ${mockValidation.foundSheets.length} sheets, ${mockValidation.foundNamedRanges.length} named ranges`);

    // Step 3: Data Extraction
    updateProcessingStep('extraction', 'processing');
    setProcessingProgress(60);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProcessingStep('extraction', 'completed', 'Key metrics and charts data extracted');

    // Step 4: Slide Generation
    updateProcessingStep('generation', 'processing');
    setProcessingProgress(80);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock generated slides
    const mockSlides = [
      { id: 1, title: 'Executive Summary', type: 'summary', preview: 'EV: $125M, Equity Value: $98M' },
      { id: 2, title: 'Valuation Summary', type: 'table', preview: 'DCF, Comps, Precedent Transactions' },
      { id: 3, title: 'Revenue Growth', type: 'chart', preview: 'Historical and projected revenue' },
      { id: 4, title: 'Margin Analysis', type: 'chart', preview: 'EBITDA margin trending' }
    ];
    setGeneratedSlides(mockSlides);
    updateProcessingStep('generation', 'completed', `Generated ${mockSlides.length} slides`);

    // Step 5: Complete
    updateProcessingStep('complete', 'processing');
    setProcessingProgress(100);
    await new Promise(resolve => setTimeout(resolve, 500));
    updateProcessingStep('complete', 'completed', 'Presentation ready for download');

    setIsProcessing(false);
    
    toast({
      title: "Success!",
      description: "Your presentation has been generated successfully.",
    });
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    await simulateProcessing();
  };

  const getStepIcon = (status: ProcessingStep['status']) => {
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
            <div>Supported formats: .xlsx, .xls (Max size: 50MB)</div>
            <div className="text-xs">✓ Supports our standardized template with named ranges</div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </CardContent>
      </Card>

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
              >
                {isProcessing ? 'Processing...' : 'Generate Presentation'}
              </Button>
            </div>

            {isProcessing && (
              <div className="space-y-4">
                <Progress value={processingProgress} className="w-full" />
                <div className="space-y-2">
                  {processingSteps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3 text-sm">
                      {getStepIcon(step.status)}
                      <span className={`${step.status === 'completed' ? 'text-green-700' : 'text-slate-600'}`}>
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
          </CardContent>
        </Card>
      )}

      {validationResults && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800 mb-2">Template Validation Passed</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>✓ Found {validationResults.foundSheets.length} required sheets</p>
                  <p>✓ Found {validationResults.foundNamedRanges.length} named ranges</p>
                  {validationResults.warnings.length > 0 && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded">
                      <p className="text-amber-800 text-xs">
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        {validationResults.warnings[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedSlides.length > 0 && (
        <Card className="border-financial-blue bg-financial-blue/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-financial-navy">Generated Presentation Preview</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button className="bg-financial-gold hover:bg-financial-gold-light text-financial-navy">
                  <Download className="w-4 h-4 mr-1" />
                  Download PPTX
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {generatedSlides.map((slide) => (
                <div key={slide.id} className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="text-sm font-medium text-financial-navy mb-1">
                    Slide {slide.id}: {slide.title}
                  </div>
                  <div className="text-xs text-slate-600">{slide.preview}</div>
                  <div className="mt-2 h-20 bg-gradient-to-br from-financial-gold/20 to-financial-blue/20 rounded border-2 border-dashed border-slate-200"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">
                Using the Standardized Template
              </h4>
              <p className="text-sm text-amber-700 mb-3">
                For best results, use our standardized Excel template with pre-configured named ranges. 
                This ensures accurate data extraction and professional formatting.
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-amber-700 border-amber-300 hover:bg-amber-100"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Template
                </Button>
                <Button 
                  variant="link" 
                  size="sm"
                  className="text-amber-700 hover:text-amber-800 p-0 h-auto"
                >
                  View Template Guide →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
