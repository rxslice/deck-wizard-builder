// DECK-2: parser comes from a patched SheetJS release, and resource limits
// are enforced before a sheet is expanded into memory.
import { describe, expect, test } from 'vitest';
import * as XLSX from 'xlsx';
import { parseExcelFile, MAX_CELLS_PER_SHEET } from '../utils/excelParser';

const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function toFile(wb: XLSX.WorkBook, name = 'model.xlsx') {
  const bytes = XLSX.write(wb, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
  const file = new File([bytes], name, { type: XLSX_TYPE });
  // jsdom's File may lack arrayBuffer(); give it one backed by the same bytes.
  if (!(file as any).arrayBuffer) (file as any).arrayBuffer = async () => bytes;
  return file;
}

describe('excel parser', () => {
  test('uses a SheetJS release outside the advisory ranges (>= 0.20.2)', () => {
    const [major, minor, patch] = XLSX.version.split('.').map(Number);
    expect(major > 0 || minor > 20 || (minor === 20 && patch >= 2)).toBe(true);
  });

  test('parses a benign workbook', async () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['Quarter', 'Revenue'], ['Q1', 100], ['Q2', 120]]), 'Revenue');
    const out = await parseExcelFile(toFile(wb));
    expect(out.sheets.Revenue[1]).toEqual(['Q1', 100]);
    expect(out.metadata.sheetCount).toBe(1);
  });

  test('rejects a sheet whose declared range exceeds the cell limit', async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['a', 1]]);
    ws['!ref'] = 'A1:Z100000'; // 2.6M cells declared from a tiny file
    XLSX.utils.book_append_sheet(wb, ws, 'Huge');
    expect(26 * 100000).toBeGreaterThan(MAX_CELLS_PER_SHEET);
    await expect(parseExcelFile(toFile(wb))).rejects.toThrow(/too large/);
  });
});
