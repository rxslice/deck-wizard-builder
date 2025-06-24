import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
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
  type: 'title' | 'summary' | 'table' | 'chart' | 'combo' | 'pie' | 'html';
  preview: string;
}

export interface GenerationCallbacks {
  onProgress?: (percent: number, message: string) => void;
  onComplete?: (blob: Blob, slides: PresentationSlide[]) => void;
  onError?: (error: string) => void;
}

const DEFAULT_THEME: ThemeSettings = {
  companyName: 'ValuationDeck',
  primaryColor: '1F2937',
  secondaryColor: 'F59E0B',
  accentColor: '3B82F6',
  fontFamily: 'Calibri',
};

const MAX_ROWS = 50;
const MAX_SERIES = 4;
const PERF_THRESHOLD_MS = 5000;

export class PowerPointGenerator {
  private pptx: PptxGenJS | null = null;
  private theme: ThemeSettings = DEFAULT_THEME;
  private slides: PresentationSlide[] = [];

  constructor(theme: ThemeSettings = DEFAULT_THEME) {
    this.theme = { ...DEFAULT_THEME, ...theme };
  }

  private setupMasterSlide() {
    if (!this.pptx) return;
    
    this.pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: 'FFFFFF' },
      objects: [
        {
          rect: {
            x: 0, y: 0, w: '100%', h: 0.75,
            fill: { color: this.theme.primaryColor }
          }
        },
        {
          rect: {
            x: 0, y: 6.75, w: '100%', h: 0.75,
            fill: { color: 'F5F5F5' }
          }
        },
        {
          text: {
            text: `${this.theme.companyName} | Confidential & Proprietary`,
            options: {
              x: 0.5, y: 7.0, w: 8, h: 0.3,
              fontSize: 10,
              color: this.theme.primaryColor,
              fontFace: this.theme.fontFamily,
            }
          }
        },
        {
          text: {
            text: '{{slideNumber}}',
            options: {
              x: 8.5, y: 7.0, w: 1, h: 0.3,
              fontSize: 10,
              color: this.theme.primaryColor,
              fontFace: this.theme.fontFamily,
              align: 'right',
            }
          }
        }
      ]
    });
  }

  private addTitleSlide(data: ParsedExcelData) {
    if (!this.pptx) return;
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(`Financial Analysis\n${data.metadata.fileName}`, {
      x: 1, y: 2, w: 8, h: 2,
      fontSize: 36, bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      align: 'center',
      fit: 'shrink'
    });
    
    slide.addText(
      `Generated on ${new Date().toLocaleDateString()}\n` +
      `${data.metadata.sheetCount} sheets • ${data.metadata.totalRows} rows`,
      {
        x: 1, y: 4.5, w: 8, h: 1,
        fontSize: 16,
        color: this.theme.secondaryColor,
        fontFace: this.theme.fontFamily,
        align: 'center',
        fit: 'shrink'
      }
    );
    
    if (this.theme.logoUrl) {
      slide.addImage({
        path: this.theme.logoUrl,
        x: 4, y: 1, w: 2, h: 0.8
      });
    }
    
    this.slides.push({ 
      id: 1, 
      title: 'Title', 
      type: 'title', 
      preview: 'Cover slide' 
    });
  }

  private addSummarySlide(data: ParsedExcelData) {
    if (!this.pptx) return;
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText('Executive Summary', {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 28, bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      fit: 'shrink'
    });
    
    const metrics = [
      ['Sheets', data.metadata.sheetCount.toString()],
      ['Rows', data.metadata.totalRows.toString()],
      ['Parse Time (ms)', data.metadata.parseTime.toString()],
      ['Valid', data.validation.isValid ? '✔️' : '⛔']
    ];
    
    metrics.forEach(([label, value], idx) => {
      const x = 0.5 + (idx % 2) * 4.5;
      const y = 2.5 + Math.floor(idx / 2) * 1.5;
      
      slide.addShape(this.pptx!.ShapeType.rect, {
        x, y, w: 4, h: 1.2,
        fill: { color: 'F8F9FA' },
        line: { color: this.theme.accentColor, width: 2 }
      });
      
      slide.addText(label, {
        x: x + 0.2, y: y + 0.1, w: 3.6, h: 0.4,
        fontSize: 12,
        color: this.theme.primaryColor,
        fontFace: this.theme.fontFamily,
        fit: 'shrink'
      });
      
      slide.addText(value, {
        x: x + 0.2, y: y + 0.5, w: 3.6, h: 0.6,
        fontSize: 20, bold: true,
        color: this.theme.accentColor,
        fontFace: this.theme.fontFamily,
        fit: 'shrink'
      });
    });
    
    this.slides.push({ 
      id: 2, 
      title: 'Executive Summary', 
      type: 'summary', 
      preview: 'Summary metrics' 
    });
  }

  private isTable(rows: any[][]): boolean {
    return rows.length >= 2 && rows[0].every(cell => typeof cell === 'string' || cell === null);
  }

  private isChart(rows: any[][]): boolean {
    return rows.length >= 3 && rows.slice(1).some(r => r.some(c => typeof c === 'number' && !isNaN(c)));
  }

  private addTableSlide(name: string, rows: any[][], slideId: number) {
    if (!this.pptx) return;
    
    const tableData = rows.slice(0, MAX_ROWS + 1).map(r =>
      r.map(c => ({
        text: c?.toString() ?? '',
        options: { 
          fontSize: 10, 
          fontFace: this.theme.fontFamily, 
          fit: 'shrink' 
        }
      }))
    );
    
    if (tableData[0]) {
      tableData[0].forEach(cell => {
        (cell.options as any) = {
          ...cell.options,
          bold: true,
          color: 'FFFFFF',
          fill: { color: this.theme.secondaryColor }
        };
      });
    }
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(name, { 
      x: 0.5, y: 1, w: 9, h: 0.6, 
      fontSize: 24, bold: true, 
      color: this.theme.primaryColor, 
      fontFace: this.theme.fontFamily, 
      fit: 'shrink' 
    });
    
    slide.addTable(tableData, {
      x: 0.5, y: 1.8, w: 9, h: 4.5,
      border: { color: this.theme.accentColor, pt: 1 }
    });
    
    this.slides.push({ 
      id: slideId, 
      title: name, 
      type: 'table', 
      preview: `${rows.length} rows` 
    });
  }

  private prepareSeries(rows: any[][]) {
    const headers = rows[0];
    const dataRows = rows.slice(1, MAX_ROWS + 1);
    const seriesArr: any[] = [];
    
    for (let c = 1; c < Math.min(headers.length, MAX_SERIES + 1); c++) {
      const vals = dataRows.map(r => parseFloat(r[c]) || 0);
      if (vals.some(v => v !== 0)) {
        seriesArr.push({ 
          name: headers[c]?.toString() ?? `Series ${c}`, 
          labels: dataRows.map(r => r[0]?.toString() ?? ''), 
          values: vals 
        });
      }
    }
    
    return seriesArr;
  }

  private addChartSlide(name: string, rows: any[][], slideId: number) {
    if (!this.pptx) return;
    
    const dataSeries = this.prepareSeries(rows);
    if (!dataSeries.length) return;
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(name, { 
      x: 0.5, y: 1, w: 9, h: 0.6, 
      fontSize: 24, bold: true, 
      color: this.theme.primaryColor, 
      fontFace: this.theme.fontFamily, 
      fit: 'shrink' 
    });
    
    slide.addChart(this.pptx.ChartType.bar, dataSeries, {
      x: 1, y: 2, w: 8, h: 4,
      title: `${name} Bar Chart`,
      chartColors: [this.theme.primaryColor, this.theme.secondaryColor, this.theme.accentColor],
      legendPos: 'b',
      altText: `${name} bar chart`,
      plotArea: { border: { color: this.theme.primaryColor, pt: 1 } }
    });
    
    this.slides.push({ 
      id: slideId, 
      title: name, 
      type: 'chart', 
      preview: `${dataSeries.length} series` 
    });
  }

  private addComboSlide(name: string, rows: any[][], slideId: number) {
    if (!this.pptx) return;
    
    const dataSeries = this.prepareSeries(rows);
    if (dataSeries.length < 2) return;
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(name, { 
      x: 0.5, y: 1, w: 9, h: 0.6, 
      fontSize: 24, bold: true, 
      color: this.theme.primaryColor, 
      fontFace: this.theme.fontFamily, 
      fit: 'shrink' 
    });
    
    slide.addChart(this.pptx.ChartType.area, [dataSeries[0]], {
      x: 1, y: 2, w: 8, h: 4,
      title: `${name} Area Chart`,
      chartColors: [this.theme.accentColor],
      legendPos: 'b',
      altText: `${name} area chart`,
    });
    
    this.slides.push({ 
      id: slideId, 
      title: name, 
      type: 'combo', 
      preview: 'Area chart' 
    });
  }

  private addPieSlide(name: string, rows: any[][], slideId: number) {
    if (!this.pptx) return;
    
    const labels = rows.slice(1, MAX_ROWS + 1).map(r => r[0]?.toString() ?? '');
    const vals = rows.slice(1, MAX_ROWS + 1).map(r => parseFloat(r[1]) || 0);
    
    if (!labels.length || !vals.length) return;
    
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    
    slide.addText(name, { 
      x: 0.5, y: 1, w: 9, h: 0.6, 
      fontSize: 24, bold: true, 
      color: this.theme.primaryColor, 
      fontFace: this.theme.fontFamily, 
      fit: 'shrink' 
    });
    
    slide.addChart(this.pptx.ChartType.doughnut, [{ name: name, labels, values: vals }], {
      x: 2.5, y: 2, w: 5, h: 5,
      title: `${name} Distribution`,
      holeSize: 50,
      chartColors: [this.theme.primaryColor, this.theme.accentColor],
      showDataTable: true,
      showLabel: true,
      altText: `${name} distribution`
    });
    
    this.slides.push({ 
      id: slideId, 
      title: name, 
      type: 'pie', 
      preview: 'Category distribution' 
    });
  }

  public async generatePresentation(
    data: ParsedExcelData,
    theme: ThemeSettings = DEFAULT_THEME,
    callbacks: GenerationCallbacks = {}
  ): Promise<Blob> {
    this.theme = { ...DEFAULT_THEME, ...theme };
    this.slides = [];
    callbacks.onProgress?.(5, 'Initializing presentation');

    this.pptx = new PptxGenJS();
    this.pptx.title = data.metadata.fileName;
    this.pptx.subject = 'Valuation Deck';
    this.pptx.author = this.theme.companyName;
    this.pptx.company = this.theme.companyName;
    this.setupMasterSlide();

    callbacks.onProgress?.(20, 'Adding title slide');
    this.addTitleSlide(data);

    callbacks.onProgress?.(30, 'Adding summary slide');
    this.addSummarySlide(data);

    callbacks.onProgress?.(40, 'Adding content');
    let sid = 3;
    for (const [name, rows] of Object.entries(data.sheets)) {
      if (!rows || rows.length < 2) continue;
      const slice = rows.slice(0, MAX_ROWS + 1);
      if (this.isTable(slice)) this.addTableSlide(name, slice, sid++);
      else if (this.isChart(slice)) {
        this.addChartSlide(name, slice, sid++);
        this.addComboSlide(name, slice, sid++);
        this.addPieSlide(name, slice, sid++);
      }
    }

    callbacks.onProgress?.(60, 'Exporting presentation');

    let blob: Blob;
    const startTime = Date.now();
    try {
      const result = await this.pptx.write({ outputType: 'blob' as const, compression: true });
      blob = result as Blob;
    } catch (err) {
      callbacks.onProgress?.(70, 'Retrying without compression for performance');
      const result = await this.pptx.write({ outputType: 'blob' as const, compression: false });
      blob = result as Blob;
    }

    const duration = Date.now() - startTime;
    if (duration > PERF_THRESHOLD_MS) {
      callbacks.onProgress?.(70, `Large deck detected (${duration}ms): using no-compression fallback`);
    }

    callbacks.onProgress?.(80, 'Validating presentation');
    const zip = await JSZip.loadAsync(blob);
    const requiredFiles = ['[Content_Types].xml', 'ppt/presentation.xml'];
    for (const filePath of requiredFiles) {
      if (!zip.file(filePath)) {
        callbacks.onError?.(`Corrupt PPTX: missing ${filePath}`);
        throw new Error(`Validation failed: ${filePath} missing`);
      }
    }

    callbacks.onProgress?.(90, 'Finalizing presentation');
    callbacks.onComplete?.(blob, this.slides);

    this.pptx = null;
    return blob;
  }
}

export const generatePowerPointPresentation = async (
  data: ParsedExcelData,
  theme: ThemeSettings = DEFAULT_THEME,
  callbacks: GenerationCallbacks = {}
): Promise<Blob> => {
  const generator = new PowerPointGenerator(theme);
  return generator.generatePresentation(data, theme, callbacks);
};

export { DEFAULT_THEME };
