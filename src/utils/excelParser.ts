
import * as XLSX from 'xlsx';
import { SecurityError, validateFile, sanitizeSheetData, logSecurityEvent } from './securityUtils';

export interface ParsedExcelData {
  sheets: { [key: string]: any[][] };
  namedRanges: { [key: string]: any };
  metadata: {
    fileName: string;
    fileSize: number;
    sheetCount: number;
    totalRows: number;
    parseTime: number;
  };
  validation: {
    isValid: boolean;
    foundSheets: string[];
    foundNamedRanges: string[];
    missingElements: string[];
    warnings: string[];
  };
}

export const parseExcelFile = async (file: File): Promise<ParsedExcelData> => {
  const startTime = Date.now();
  
  try {
    // Security validation
    validateFile(file);
    logSecurityEvent('FILE_UPLOAD', { fileName: file.name, fileSize: file.size });

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Parse with SheetJS (version 0.19.3+ for security)
    const workbook = XLSX.read(arrayBuffer, { 
      type: 'array',
      // Security options
      codepage: 65001, // UTF-8
      cellFormula: false, // Don't parse formulas for security
      cellHTML: false, // Don't parse HTML
      dense: false,
      // Strip VBA/macros
      bookVBA: false
    });

    const sheets: { [key: string]: any[][] } = {};
    const namedRanges: { [key: string]: any } = {};
    let totalRows = 0;

    // Process each sheet
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON with security sanitization
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1,
        defval: null,
        blankrows: false
      });
      
      // Sanitize the data
      sheets[sheetName] = sanitizeSheetData(sheetData);
      totalRows += sheetData.length;
      
      // Security check for row count
      if (totalRows > 50000) {
        throw new SecurityError('File contains too many rows (max: 50,000)', 'TOO_MANY_ROWS');
      }
    }

    // Extract named ranges (if any)
    if (workbook.Workbook && workbook.Workbook.Names) {
      for (const namedRange of workbook.Workbook.Names) {
        if (namedRange.Name && namedRange.Ref) {
          namedRanges[namedRange.Name] = sanitizeSheetData({
            reference: namedRange.Ref,
            value: null // We don't evaluate the reference for security
          });
        }
      }
    }

    // Validation logic
    const foundSheets = Object.keys(sheets);
    const foundNamedRanges = Object.keys(namedRanges);
    const warnings: string[] = [];
    
    // Check for common financial model patterns
    const hasFinancialData = foundSheets.some(sheet => 
      /dcf|valuation|model|analysis|comps/i.test(sheet)
    );
    
    if (!hasFinancialData) {
      warnings.push('No obvious financial model sheets detected. Ensure your model follows standard naming conventions.');
    }
    
    if (foundSheets.length > 20) {
      warnings.push('Large number of sheets detected. Consider consolidating for better performance.');
    }

    const parseTime = Date.now() - startTime;
    logSecurityEvent('FILE_PARSED', { 
      fileName: file.name, 
      sheetCount: foundSheets.length, 
      parseTime 
    });

    return {
      sheets,
      namedRanges,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        sheetCount: foundSheets.length,
        totalRows,
        parseTime
      },
      validation: {
        isValid: true,
        foundSheets,
        foundNamedRanges,
        missingElements: [],
        warnings
      }
    };

  } catch (error) {
    logSecurityEvent('PARSE_ERROR', { 
      fileName: file.name, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    if (error instanceof SecurityError) {
      throw error;
    }
    
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const extractFinancialMetrics = (data: ParsedExcelData): any => {
  // Extract common financial metrics from parsed data
  const metrics: any = {};
  
  for (const [sheetName, sheetData] of Object.entries(data.sheets)) {
    // Look for valuation summary data
    if (/valuation|summary|dcf/i.test(sheetName)) {
      // Simple heuristic to find key metrics
      for (let i = 0; i < sheetData.length && i < 100; i++) {
        const row = sheetData[i];
        if (row && row.length >= 2) {
          const label = String(row[0]).toLowerCase();
          const value = row[1];
          
          if (typeof value === 'number') {
            if (label.includes('enterprise') && label.includes('value')) {
              metrics.enterpriseValue = value;
            } else if (label.includes('equity') && label.includes('value')) {
              metrics.equityValue = value;
            } else if (label.includes('irr')) {
              metrics.irr = value;
            } else if (label.includes('multiple') || label.includes('moic')) {
              metrics.multiple = value;
            }
          }
        }
      }
    }
  }
  
  return metrics;
};
