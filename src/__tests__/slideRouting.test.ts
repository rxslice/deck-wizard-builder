// DECK-4: a header row plus numeric body must become chart slides, and a
// text-only table must stay a table. Checks the slide types actually produced.
import { describe, expect, test } from 'vitest';
import { generatePowerPointPresentation, DEFAULT_THEME, type PresentationSlide } from '../utils/powerpointGenerator';
import type { ParsedExcelData } from '../utils/excelParser';

function workbook(sheets: Record<string, any[][]>): ParsedExcelData {
  return {
    sheets,
    namedRanges: {},
    metadata: { fileName: 'model.xlsx', fileSize: 100, sheetCount: Object.keys(sheets).length, totalRows: 0, parseTime: 1 },
    validation: { isValid: true, foundSheets: Object.keys(sheets), foundNamedRanges: [], missingElements: [], warnings: [] },
  };
}

async function slideTypes(sheets: Record<string, any[][]>) {
  let slides: PresentationSlide[] = [];
  await generatePowerPointPresentation(workbook(sheets), DEFAULT_THEME, { onComplete: (_b, s) => { slides = s; } });
  return slides.filter(s => s.title !== 'Executive Summary' && s.type !== 'title').map(s => `${s.title}:${s.type}`);
}

describe('slide routing', () => {
  test('numeric table becomes chart slides', async () => {
    const types = await slideTypes({
      Revenue: [['Quarter', 'Revenue', 'Cost'], ['Q1', 100, 60], ['Q2', 120, 70], ['Q3', 150, 80]],
    });
    expect(types).toContain('Revenue:chart');
    expect(types).not.toContain('Revenue:table');
  }, 20000);

  test('text-only table stays a table', async () => {
    const types = await slideTypes({
      Owners: [['Area', 'Owner'], ['Sales', 'Ana'], ['Ops', 'Ben']],
    });
    expect(types).toEqual(['Owners:table']);
  }, 20000);
});
