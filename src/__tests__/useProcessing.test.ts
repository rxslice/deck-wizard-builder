// DECK-3: every failed or cancelled run must leave isProcessing=false so the
// user can retry, without marking the session as completed.
import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../utils/excelParser', () => ({
  parseExcelFile: vi.fn(),
  extractFinancialMetrics: vi.fn(),
}));
vi.mock('../utils/powerpointGenerator', () => ({
  generatePowerPointPresentation: vi.fn(),
  DEFAULT_THEME: {},
}));

import { useProcessing } from '../hooks/useProcessing';
import { parseExcelFile, extractFinancialMetrics } from '../utils/excelParser';
import { generatePowerPointPresentation } from '../utils/powerpointGenerator';

const file = new File(['x'], 'model.xlsx');
const parsed = { metadata: { sheetCount: 1 }, validation: {}, sheets: {} } as any;

beforeEach(() => {
  vi.mocked(parseExcelFile).mockResolvedValue(parsed);
  vi.mocked(extractFinancialMetrics).mockReturnValue({} as any);
  vi.mocked(generatePowerPointPresentation).mockResolvedValue(new Blob(['ok']));
});

async function run() {
  const hook = renderHook(() => useProcessing());
  let result: any;
  await act(async () => { result = await hook.result.current.processFile(file); });
  return { hook, result };
}

describe('useProcessing terminal states', () => {
  test('parse failure clears the busy state', async () => {
    vi.mocked(parseExcelFile).mockRejectedValue(new Error('bad workbook'));
    const { hook, result } = await run();
    expect(result.success).toBe(false);
    expect(hook.result.current.isProcessing).toBe(false);
    expect(hook.result.current.currentSession?.completed).toBe(false);
  });

  test('extraction failure clears the busy state', async () => {
    vi.mocked(extractFinancialMetrics).mockImplementation(() => { throw new Error('no metrics'); });
    const { hook, result } = await run();
    expect(result.errorCode).toBe('EXTRACTION_FAILED');
    expect(hook.result.current.isProcessing).toBe(false);
  });

  test('generation failure clears the busy state', async () => {
    vi.mocked(generatePowerPointPresentation).mockRejectedValue(new Error('pptx failed'));
    const { hook, result } = await run();
    expect(result.errorCode).toBe('GENERATION_FAILED');
    expect(hook.result.current.isProcessing).toBe(false);
    expect(hook.result.current.currentSession?.completed).toBe(false);
  });

  test('cancellation clears the busy state and is not a success', async () => {
    let release: () => void = () => {};
    vi.mocked(parseExcelFile).mockImplementation(() => new Promise(r => { release = () => r(parsed); }));
    const hook = renderHook(() => useProcessing());
    let pending: Promise<any>;
    act(() => { pending = hook.result.current.processFile(file); });
    await act(async () => { await new Promise(r => setTimeout(r, 350)); });
    expect(hook.result.current.isProcessing).toBe(true);
    let result: any;
    await act(async () => {
      hook.result.current.cancelProcessing();
      release();
      result = await pending;
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('CANCELLED');
    expect(hook.result.current.isProcessing).toBe(false);
    expect(hook.result.current.currentSession?.completed).toBe(false);
  });

  test('success still completes the session', async () => {
    const { hook, result } = await run();
    expect(result.success).toBe(true);
    expect(hook.result.current.isProcessing).toBe(false);
    expect(hook.result.current.currentSession?.completed).toBe(true);
  });
});
