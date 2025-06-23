
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.type === 'application/vnd.ms-excel') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      alert('Presentation generated successfully! (This is a demo)');
    }, 3000);
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
          
          <div className="text-sm text-slate-500">
            Supported formats: .xlsx, .xls (Max size: 50MB)
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
            <div className="flex items-center justify-between">
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
                {isProcessing ? 'Generating...' : 'Generate Presentation'}
              </Button>
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
              <p className="text-sm text-amber-700">
                For best results, use our standardized Excel template with pre-configured named ranges. 
                This ensures accurate data extraction and professional formatting.
              </p>
              <Button 
                variant="link" 
                className="text-amber-700 hover:text-amber-800 p-0 h-auto mt-2"
              >
                Download Template →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
