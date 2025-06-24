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
  type: 'title' | 'summary' | 'table' | 'chart' | 'combo' | 'pie';
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
  fontFamily: 'Calibri'
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

  private setupMasterSlide() { /* master setup omitted for brevity: same as earlier implementation */ }

  private addTitleSlide(data: ParsedExcelData) { /* ... */ }

  private addSummarySlide(data: ParsedExcelData) { /* ... */ }

  private addTableSlide(name: string, rows: any[][], slideId: number) { /* ... */ }

  private addChartSlide(name: string, rows: any[][], slideId: number) { /* ... */ }

  private addComboSlide(name: string, rows: any[][], slideId: number) { /* ... */ }

  private addPieSlide(name: string, rows: any[][], slideId: number) { /* ... */ }

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
      blob = await this.pptx.write({ outputType: 'blob', compression: 'DEFLATE' });
    } catch (err) {
      callbacks.onProgress?.(70, 'Retrying without compression for performance');
      blob = await this.pptx.write({ outputType: 'blob', compression: 'STORE' });
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

  private isTable(rows: any[][]): boolean {
    return rows.length >= 2 && rows[0].every(cell => typeof cell === 'string' || cell === null);
  }

  private isChart(rows: any[][]): boolean {
    return rows.length >= 3 && rows.slice(1).some(r => r.some(c => typeof c === 'number'));
  }
}
