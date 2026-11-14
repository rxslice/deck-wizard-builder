# Deck Wizard

Turn a financial model in Excel into a PowerPoint deck in the browser. Upload a `.xlsx` or `.xls` workbook and Deck Wizard builds a title slide, an executive summary, and a slide set for each sheet. Numeric sheets become bar, combo and pie charts; text-only sheets become tables. Then you download the `.pptx`.

Parsing and slide generation run entirely in the browser tab. Signing in (Supabase) is only used to list your saved projects.

## How sheets are presented

| Sheet shape | Slides produced |
|---|---|
| Header row, 2+ data rows, at least one numeric column after the first | Bar, combo and pie charts (column one supplies the labels) |
| Header row with text data | Table (first 50 rows) |
| Fewer than 2 rows | Skipped |

## Limits

- Files up to 20 MB, at most 50 sheets, and at most 1,000,000 cells per sheet. The cell limit is checked from the sheet's declared range before the sheet is expanded.
- Formulas, HTML and VBA macros are not evaluated.
- Workbooks are parsed with SheetJS 0.20.3, installed from the SheetJS CDN, because the npm `xlsx` package stops at the vulnerable 0.18.5.

## Run locally

Requires Node.js 20 or later.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm test                          # unit tests (Vitest + jsdom)
npm run build
node dev/check-upload-download.cjs  # browser check: upload a workbook, download a valid PPTX; needs Playwright
```

## Database

`supabase/migrations/` holds the `user_projects` table and its row-level security policies (each user sees only their own projects). Compare them with the deployed project before applying.
