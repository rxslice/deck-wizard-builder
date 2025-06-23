import PptxGenJS from 'pptxgenjs';
import { ParsedExcelData } from './excelParser';

export interface ThemeSettings {
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
  fontFamily: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  type: 'summary' | 'table' | 'chart' | 'title';
  preview: string;
}

export interface GenerationCallbacks {
  onProgress?: (progress: number, message: string) => void;
  onComplete?: (blob: Blob, slides: PresentationSlide[]) => void;
  onError?: (error: string) => void;
}

const DEFAULT_THEME: ThemeSettings = {
  companyName: 'ValuationDeck',
  primaryColor: '1f2937', // slate-800
  secondaryColor: 'f59e0b', // amber-500
  accentColor: '3b82f6', // blue-500
  fontFamily: 'Calibri'
};

export class PowerPointGenerator {
  private pptx: PptxGenJS;
  private theme: ThemeSettings;
  private slides: PresentationSlide[] = [];

  constructor(theme: ThemeSettings = DEFAULT_THEME) {
    this.pptx = new PptxGenJS();
    this.theme = theme;
    this.setupMasterSlides();
  }

  private setupMasterSlides(): void {
    try {
      // Define master slide layout
      this.pptx.defineSlideMaster({
        title: 'MASTER_SLIDE',
        background: { color: 'FFFFFF' },
        objects: [
          // Header area
          {
            rect: {
              x: 0, y: 0, w: '100%', h: 0.75,
              fill: { color: this.theme.primaryColor }
            }
          },
          // Footer area
          {
            rect: {
              x: 0, y: 6.75, w: '100%', h: 0.75,
              fill: { color: 'F5F5F5' }
            }
          },
          // Footer text
          {
            text: {
              text: `${this.theme.companyName} | Confidential & Proprietary`,
              options: {
                x: 0.5, y: 7.0, w: 8, h: 0.3,
                fontSize: 10,
                color: this.theme.primaryColor,
                fontFace: this.theme.fontFamily
              }
            }
          },
          // Slide number placeholder
          {
            text: {
              text: '{{slideNumber}}',
              options: {
                x: 8.5, y: 7.0, w: 1, h: 0.3,
                fontSize: 10,
                color: this.theme.primaryColor,
                fontFace: this.theme.fontFamily,
                align: 'right'
              }
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error setting up master slides:', error);
    }
  }

  private addTitleSlide(data: ParsedExcelData): void {
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    // Main title
    slide.addText(`Financial Analysis\n${data.metadata.fileName}`, {
      x: 1, y: 2, w: 8, h: 2,
      fontSize: 36,
      bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      align: 'center'
    });

    // Subtitle with metadata
    const subtitle = `Generated on ${new Date().toLocaleDateString()}\n` +
                    `${data.metadata.sheetCount} sheets • ${data.metadata.totalRows} rows`;
    
    slide.addText(subtitle, {
      x: 1, y: 4.5, w: 8, h: 1,
      fontSize: 16,
      color: this.theme.secondaryColor,
      fontFace: this.theme.fontFamily,
      align: 'center'
    });

    // Add logo if provided
    if (this.theme.logoUrl) {
      slide.addImage({
        path: this.theme.logoUrl,
        x: 4, y: 1, w: 2, h: 0.8
      });
    }

    this.slides.push({
      id: 1,
      title: 'Title Slide',
      type: 'title',
      preview: 'Executive summary and presentation overview'
    });
  }

  private addSummarySlide(data: ParsedExcelData): void {
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText('Executive Summary', {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 28,
      bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily
    });

    // Key metrics boxes
    const metrics = [
      { label: 'Sheets Analyzed', value: data.metadata.sheetCount.toString() },
      { label: 'Total Data Points', value: data.metadata.totalRows.toString() },
      { label: 'Processing Time', value: `${data.metadata.parseTime}ms` },
      { label: 'Validation Status', value: data.validation.isValid ? '✓ Passed' : '✗ Failed' }
    ];

    metrics.forEach((metric, index) => {
      const x = 0.5 + (index % 2) * 4.5;
      const y = 2.5 + Math.floor(index / 2) * 1.5;
      
      // Metric box
      slide.addShape(this.pptx.ShapeType.rect, {
        x, y, w: 4, h: 1.2,
        fill: { color: 'F8F9FA' },
        line: { color: this.theme.accentColor, width: 2 }
      });
      
      // Metric label
      slide.addText(metric.label, {
        x: x + 0.2, y: y + 0.1, w: 3.6, h: 0.4,
        fontSize: 12,
        color: this.theme.primaryColor,
        fontFace: this.theme.fontFamily
      });
      
      // Metric value
      slide.addText(metric.value, {
        x: x + 0.2, y: y + 0.5, w: 3.6, h: 0.6,
        fontSize: 20,
        bold: true,
        color: this.theme.accentColor,
        fontFace: this.theme.fontFamily
      });
    });

    this.slides.push({
      id: 2,
      title: 'Executive Summary',
      type: 'summary',
      preview: 'Key metrics and validation results'
    });
  }

  private addDataSlides(data: ParsedExcelData): void {
    let slideId = 3;

    Object.entries(data.sheets).forEach(([sheetName, sheetData]) => {
      // Skip empty sheets or sheets with too little data
      if (!sheetData || sheetData.length < 2) return;
      
      // Limit large datasets for performance
      const processedData = sheetData.slice(0, 50); // First 50 rows max
      
      if (this.isTableData(processedData)) {
        this.addTableSlide(sheetName, processedData, slideId++);
      } else if (this.isChartData(processedData)) {
        this.addChartSlide(sheetName, processedData, slideId++);
      }
    });
  }

  private isTableData(data: any[][]): boolean {
    // Simple heuristic: if first row looks like headers and we have mixed data types
    if (data.length < 2) return false;
    const firstRow = data[0];
    return firstRow.every((cell: any) => typeof cell === 'string' || cell === null);
  }

  private isChartData(data: any[][]): boolean {
    // Simple heuristic: numeric data suitable for charting
    if (data.length < 3) return false;
    return data.slice(1).some((row: any[]) => 
      row.some((cell: any) => typeof cell === 'number' && !isNaN(cell))
    );
  }

  private addTableSlide(sheetName: string, data: any[][], slideId: number): void {
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(sheetName, {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 24,
      bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily
    });

    // Prepare table data
    const tableData = data.map((row: any[]) => 
      row.map((cell: any) => ({
        text: cell?.toString() || '',
        options: {
          fontSize: 10,
          fontFace: this.theme.fontFamily,
          color: this.theme.primaryColor
        }
      }))
    );

    // Style header row
    if (tableData.length > 0) {
      tableData[0].forEach((cell: any) => {
        cell.options.bold = true;
        cell.options.fill = { color: this.theme.secondaryColor };
        cell.options.color = 'FFFFFF';
      });
    }

    // Fixed: Remove unsupported columnWidth property
    slide.addTable(tableData, {
      x: 0.5, y: 1.8, w: 9, h: 4.5,
      border: { type: 'solid', color: this.theme.accentColor, pt: 1 }
    });

    this.slides.push({
      id: slideId,
      title: sheetName,
      type: 'table',
      preview: `Data table with ${data.length} rows`
    });
  }

  private addChartSlide(sheetName: string, data: any[][], slideId: number): void {
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(sheetName, {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 24,
      bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily
    });

    // Prepare chart data
    const chartData = this.prepareChartData(data);
    
    if (chartData.length > 0) {
      slide.addChart(this.pptx.ChartType.bar, chartData, {
        x: 1, y: 2, w: 8, h: 4,
        title: `${sheetName} Analysis`,
        titleFontSize: 16,
        titleColor: this.theme.primaryColor,
        showLegend: true,
        legendPos: 'b', // Fixed: Use 'b' instead of 'bottom'
        barDir: 'col',
        chartColors: [this.theme.accentColor, this.theme.secondaryColor, this.theme.primaryColor]
      });
    }

    this.slides.push({
      id: slideId,
      title: sheetName,
      type: 'chart',
      preview: `Chart visualization with ${chartData.length} data series`
    });
  }

  private prepareChartData(data: any[][]): any[] {
    if (data.length < 2) return [];
    
    const headers = data[0];
    const chartData: any[] = [];
    
    // Create data series for first few numeric columns
    for (let col = 1; col < Math.min(headers.length, 4); col++) {
      const series = {
        name: headers[col]?.toString() || `Series ${col}`,
        labels: data.slice(1, 11).map((row: any[]) => row[0]?.toString() || ''), // First 10 rows
        values: data.slice(1, 11).map((row: any[]) => {
          const val = parseFloat(row[col]);
          return isNaN(val) ? 0 : val;
        })
      };
      
      if (series.values.some(v => v !== 0)) {
        chartData.push(series);
      }
    }
    
    return chartData;
  }

  public async generatePresentation(
    data: ParsedExcelData, 
    theme: ThemeSettings = DEFAULT_THEME,
    callbacks: GenerationCallbacks = {}
  ): Promise<Blob> {
    try {
      this.theme = { ...DEFAULT_THEME, ...theme };
      this.slides = [];
      
      callbacks.onProgress?.(10, 'Initializing presentation...');
      
      // Setup new presentation
      this.pptx = new PptxGenJS();
      this.setupMasterSlides();
      
      callbacks.onProgress?.(25, 'Adding title slide...');
      this.addTitleSlide(data);
      
      callbacks.onProgress?.(40, 'Adding summary slide...');
      this.addSummarySlide(data);
      
      callbacks.onProgress?.(60, 'Processing data slides...');
      this.addDataSlides(data);
      
      callbacks.onProgress?.(85, 'Generating PowerPoint file...');
      
      // Fixed: Use proper WriteProps object format
      const blob = await new Promise<Blob>((resolve, reject) => {
        this.pptx.write({ outputType: 'blob' })
          .then((blob) => resolve(blob as Blob))
          .catch(reject);
      });
      
      callbacks.onProgress?.(100, 'Presentation complete!');
      callbacks.onComplete?.(blob, this.slides);
      
      return blob;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('PowerPoint generation failed:', error);
      callbacks.onError?.(errorMessage);
      throw new Error(`PowerPoint generation failed: ${errorMessage}`);
    }
  }
}

// Export convenience function for backward compatibility
export const generatePowerPointPresentation = async (
  data: ParsedExcelData,
  theme: ThemeSettings = DEFAULT_THEME,
  callbacks: GenerationCallbacks = {}
): Promise<Blob> => {
  const generator = new PowerPointGenerator(theme);
  return generator.generatePresentation(data, theme, callbacks);
};

// Export default theme for external use
export { DEFAULT_THEME };
