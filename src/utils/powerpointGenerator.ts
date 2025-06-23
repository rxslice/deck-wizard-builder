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
  primaryColor: '1F2937',
  secondaryColor: 'F59E0B',
  accentColor: '3B82F6',
  fontFamily: 'Calibri'
};

const MAX_ROWS = 50;
const MAX_COLUMN_SERIES = 4;

export class PowerPointGenerator {
  private pptx: PptxGenJS | null = null;
  private theme: ThemeSettings = DEFAULT_THEME;
  private slides: PresentationSlide[] = [];

  constructor(theme: ThemeSettings = DEFAULT_THEME) {
    this.theme = { ...DEFAULT_THEME, ...theme };
  }

  private setupMasterSlides(): void {
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
              fontFace: this.theme.fontFamily
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
              align: 'right'
            }
          }
        }
      ]
    });
  }

  private addTitleSlide(data: ParsedExcelData): void {
    if (!this.pptx) return;
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(`Financial Analysis\n${data.metadata.fileName}`, {
      x: 1, y: 2, w: 8, h: 2,
      fontSize: 36,
      bold: true,
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
      title: 'Title Slide',
      type: 'title',
      preview: 'Executive summary and presentation overview'
    });
  }

  private addSummarySlide(data: ParsedExcelData): void {
    if (!this.pptx) return;
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText('Executive Summary', {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 28,
      bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      fit: 'shrink'
    });
    const metrics = [
      { label: 'Sheets Analyzed', value: `${data.metadata.sheetCount}` },
      { label: 'Total Data Rows', value: `${data.metadata.totalRows}` },
      { label: 'Parse Duration', value: `${data.metadata.parseTime} ms` },
      { label: 'Validation', value: data.validation.isValid ? '✓ Passed' : '✗ Failed' }
    ];
    metrics.forEach((metric, idx) => {
      const x = 0.5 + (idx % 2) * 4.5;
      const y = 2.5 + Math.floor(idx / 2) * 1.5;
      slide.addShape(this.pptx.ShapeType.rect, {
        x, y, w: 4, h: 1.2,
        fill: { color: 'F8F9FA' },
        line: { color: this.theme.accentColor, width: 2 }
      });
      slide.addText(metric.label, {
        x: x + 0.2, y: y + 0.1, w: 3.6, h: 0.4,
        fontSize: 12, color: this.theme.primaryColor,
        fontFace: this.theme.fontFamily,
        fit: 'shrink'
      });
      slide.addText(metric.value, {
        x: x + 0.2, y: y + 0.5, w: 3.6, h: 0.6,
        fontSize: 20,
        bold: true,
        color: this.theme.accentColor,
        fontFace: this.theme.fontFamily,
        fit: 'shrink'
      });
    });
    this.slides.push({
      id: 2,
      title: 'Executive Summary',
      type: 'summary',
      preview: 'Key metrics and validation results'
    });
  }

  private isTableData(rows: any[][]): boolean {
    return rows.length >= 2 && rows[0].every(c => typeof c === 'string' || c === null);
  }

  private isChartData(rows: any[][]): boolean {
    return rows.length >= 3 && rows
      .slice(1)
      .some(r => r.some(cell => typeof cell === 'number' && !isNaN(cell)));
  }

  private addTableSlide(sheetName: string, rows: any[][], slideId: number): void {
    if (!this.pptx) return;
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(sheetName, {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 24, bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      fit: 'shrink'
    });

    const table = rows.slice(0, MAX_ROWS).map(r =>
      r.map(c => ({
        text: c?.toString() ?? '',
        options: {
          fontSize: 10,
          fontFace: this.theme.fontFamily,
          color: this.theme.primaryColor,
          fit: 'shrink'
        }
      }))
    );
    if (table[0]) {
      table[0].forEach(cell => {
        cell.options.bold = true;
        cell.options.fill = { color: this.theme.secondaryColor };
        cell.options.color = 'FFFFFF';
      });
    }
    slide.addTable(table, {
      x: 0.5, y: 1.8, w: 9, h: 4.5,
      border: { type: 'solid', color: this.theme.accentColor, pt: 1 }
    });
    this.slides.push({
      id: slideId,
      title: sheetName,
      type: 'table',
      preview: `Table with ${rows.length} rows`
    });
  }

  private prepareChartData(rows: any[][]): any[] {
    const headers = rows[0];
    const dataRows = rows.slice(1, MAX_ROWS + 1);
    return [...Array(Math.min(headers.length-1, MAX_COLUMN_SERIES))].reduce((acc, _, col) => {
      const values = dataRows.map(r => parseFloat(r[col+1]) || 0);
      if (values.some(v => v !== 0)) {
        acc.push({ name: headers[col+1]?.toString() || `Series ${col+1}`, labels: dataRows.map(r => r[0]?.toString() || ''), values });
      }
      return acc;
    }, [] as any[]);
  }

  private addChartSlide(sheetName: string, rows: any[][], slideId: number): void {
    if (!this.pptx) return;
    const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    slide.addText(sheetName, {
      x: 0.5, y: 1, w: 9, h: 0.6,
      fontSize: 24, bold: true,
      color: this.theme.primaryColor,
      fontFace: this.theme.fontFamily,
      fit: 'shrink'
    });
    const chartData = this.prepareChartData(rows);
    if (chartData.length) {
      slide.addChart(this.pptx.ChartType.bar, chartData, {
        x: 1, y: 2, w: 8, h: 4,
        title: `${sheetName} Analysis`,
        titleFontSize: 16,
        titleColor: this.theme.primaryColor,
        legendPos: 'b',
        chartColors: [this.theme.accentColor, this.theme.secondaryColor, this.theme.primaryColor],
        altText: `Bar chart of ${sheetName}`,
        plotArea: { border: { color: this.theme.primaryColor, pt: 1 } }
      });
    }
    this.slides.push({
      id: slideId,
      title: sheetName,
      type: 'chart',
      preview: `Chart with ${chartData.length} series`
    });
  }

  private addDataSlides(data: ParsedExcelData): void {
    let sid = 3;
    for (const [name, rows] of Object.entries(data.sheets)) {
      if (!rows || rows.length < 2) continue;
      const trimmed = rows.slice(0, MAX_ROWS + 1);
      if (this.isTableData(trimmed)) this.addTableSlide(name, trimmed, sid++);
      else if (this.isChartData(trimmed)) this.addChartSlide(name, trimmed, sid++);
    }
  }

  public async generatePresentation(
    data: ParsedExcelData,
    theme: ThemeSettings = DEFAULT_THEME,
    callbacks: GenerationCallbacks = {}
  ): Promise<Blob> {
    try {
      this.theme = { ...DEFAULT_THEME, ...theme };
      this.slides = [];
      callbacks.onProgress?.(5, 'Initializing…');

      this.pptx = new PptxGenJS();
      this.pptx.title = data.metadata.fileName;
      this.pptx.author = this.theme.companyName;
      this.pptx.company = this.theme.companyName;
      this.pptx.subject = 'Valuation Deck';
      this.pptx.revision = '1';
      this.setupMasterSlides();

      callbacks.onProgress?.(20, 'Adding title slide…');
      this.addTitleSlide(data);
      callbacks.onProgress?.(35, 'Adding summary slide…');
      this.addSummarySlide(data);
      callbacks.onProgress?.(50, 'Adding content slides…');
      this.addDataSlides(data);
      callbacks.onProgress?.(80, 'Exporting presentation…');

      if (!this.pptx) throw new Error('PptxGenJS not initialized');
      const blob: Blob = await this.pptx.write({ outputType: 'blob' });
      callbacks.onProgress?.(95, 'Finalizing…');

      callbacks.onComplete?.(blob, this.slides);

      this.pptx = null;
      return blob;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      callbacks.onError?.(message);
      this.pptx = null;
      throw new Error(`PowerPoint generation failed: ${message}`);
    }
  }
}
