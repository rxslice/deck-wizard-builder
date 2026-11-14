// Browser check: sign-in is stubbed, a benign workbook is uploaded, and the
// downloaded file must be a valid PPTX containing chart slides.
// Usage: npm run build && node dev/check-upload-download.cjs
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os");
const XLSX = require("xlsx");
const JSZip = require("jszip");

const root = path.join(__dirname, "..", "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const exp = Math.floor(Date.now() / 1000) + 3600;
const user = { id: "00000000-0000-0000-0000-000000000001", aud: "authenticated", role: "authenticated", email: "demo@example.com", app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() };
const jwt = `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: user.id, exp, role: "authenticated", aud: "authenticated" })}.sig`;
const session = { access_token: jwt, refresh_token: "r", token_type: "bearer", expires_in: 3600, expires_at: exp, user };

const server = http.createServer((req, res) => {
  let f = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(root, "index.html");
  res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0, async () => {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["Quarter", "Revenue", "Cost"], ["Q1", 100, 60], ["Q2", 120, 70], ["Q3", 150, 80]]), "Revenue");
  const xlsxPath = path.join(os.tmpdir(), "deck-check-model.xlsx");
  XLSX.writeFile(wb, xlsxPath);

  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  await context.addInitScript(s => localStorage.setItem("sb-fqjttbagjcybxlnjvkod-auth-token", s), JSON.stringify(session));
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  await page.route(/supabase\.co/, r => {
    const u = r.request().url();
    if (u.includes("/auth/v1/user")) return r.fulfill({ contentType: "application/json", body: JSON.stringify(user) });
    return r.fulfill({ contentType: "application/json", body: "[]" });
  });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ body: "" }));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.locator('input[type="file"]').first().setInputFiles(xlsxPath);
  await page.getByRole("button", { name: /generate presentation/i }).click();
  const dl = page.waitForEvent("download", { timeout: 30000 });
  await page.getByRole("button", { name: /download powerpoint/i }).click({ timeout: 30000 });
  const file = await (await dl).path();
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const slides = Object.keys(zip.files).filter(n => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length;
  const charts = Object.keys(zip.files).filter(n => /^ppt\/charts\/chart\d+\.xml$/.test(n)).length;
  await browser.close(); server.close();
  const result = { slides, charts, errors };
  console.log(JSON.stringify(result));
  if (slides < 3 || charts < 1 || errors.length) process.exit(1);
});
