/**
 * Nén ảnh sản phẩm trong public/products: cắt viền thừa, thu nhỏ và xuất .webp.
 *
 *   node scripts/optimize-images.mjs
 *
 * Chạy sau scripts/generate.py. Ảnh .png/.jpg gốc được thay bằng .webp cùng tên,
 * nên chạy tiếp scripts/emit.py để đường dẫn trong file TS trỏ đúng đuôi mới.
 * Dùng Chromium có sẵn của Playwright (không cần cài thêm thư viện xử lý ảnh).
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { pathToFileURL } from "node:url";

// Playwright có thể được cài ở project hoặc ở global -> thử cả hai.
async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const globalRoot = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
    return await import(pathToFileURL(join(globalRoot, "playwright", "index.js")).href);
  }
}
const pw = await loadPlaywright();
const chromium = pw.chromium ?? pw.default?.chromium;

const ROOT = "public/products";
const MAX_EDGE = 900;   // cạnh dài nhất sau khi thu nhỏ (px)
const QUALITY = 0.86;   // chất lượng webp
const SRC_EXT = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (SRC_EXT.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = walk(ROOT).sort();
if (files.length === 0) {
  console.log("Không có ảnh nào cần nén.");
  process.exit(0);
}

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("about:blank");

let before = 0;
let after = 0;

for (const file of files) {
  const raw = readFileSync(file);
  before += raw.length;
  const mime = extname(file).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
  const dataUrl = `data:${mime};base64,${raw.toString("base64")}`;

  const result = await page.evaluate(
    async ({ dataUrl, maxEdge, quality }) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();

      // Vẽ lên nền trắng để ảnh PNG trong suốt không thành nền đen khi sang webp.
      const full = document.createElement("canvas");
      full.width = img.naturalWidth;
      full.height = img.naturalHeight;
      const fctx = full.getContext("2d", { willReadFrequently: true });
      fctx.fillStyle = "#ffffff";
      fctx.fillRect(0, 0, full.width, full.height);
      fctx.drawImage(img, 0, 0);

      // Cắt bỏ viền trắng thừa quanh sản phẩm.
      const { data } = fctx.getImageData(0, 0, full.width, full.height);
      let top = full.height, left = full.width, right = -1, bottom = -1;
      for (let y = 0; y < full.height; y++) {
        for (let x = 0; x < full.width; x++) {
          const i = (y * full.width + x) * 4;
          if (data[i] > 247 && data[i + 1] > 247 && data[i + 2] > 247) continue;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          if (x < left) left = x;
          if (x > right) right = x;
        }
      }
      if (right < 0) {                      // ảnh trắng hoàn toàn -> giữ nguyên
        top = 0; left = 0; right = full.width - 1; bottom = full.height - 1;
      }
      const pad = Math.round(Math.max(right - left, bottom - top) * 0.02);
      left = Math.max(0, left - pad);
      top = Math.max(0, top - pad);
      right = Math.min(full.width - 1, right + pad);
      bottom = Math.min(full.height - 1, bottom + pad);

      const cw = right - left + 1;
      const ch = bottom - top + 1;
      const scale = Math.min(1, maxEdge / Math.max(cw, ch));
      const out = document.createElement("canvas");
      out.width = Math.max(1, Math.round(cw * scale));
      out.height = Math.max(1, Math.round(ch * scale));
      const octx = out.getContext("2d");
      octx.imageSmoothingQuality = "high";
      octx.fillStyle = "#ffffff";
      octx.fillRect(0, 0, out.width, out.height);
      octx.drawImage(full, left, top, cw, ch, 0, 0, out.width, out.height);

      return {
        webp: out.toDataURL("image/webp", quality).split(",")[1],
        w: out.width,
        h: out.height,
        from: `${img.naturalWidth}x${img.naturalHeight}`,
      };
    },
    { dataUrl, maxEdge: MAX_EDGE, quality: QUALITY },
  );

  const dest = join(dirname(file), file.split("/").pop().replace(/\.[^.]+$/, ".webp"));
  const buf = Buffer.from(result.webp, "base64");
  writeFileSync(dest, buf);
  if (dest !== file) unlinkSync(file);
  after += buf.length;
  console.log(
    `${dest.replace(ROOT + "/", "")}  ${result.from} -> ${result.w}x${result.h}  ` +
      `${(raw.length / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`,
  );
}

await browser.close();

// Cập nhật lại đường dẫn ảnh trong dữ liệu đã sinh để emit.py ghi đúng đuôi .webp.
const BUILD = "scripts/.build/generated.json";
try {
  const data = JSON.parse(readFileSync(BUILD, "utf8"));
  const toWebp = (src) => (src ? src.replace(/\.(png|jpe?g)$/i, ".webp") : src);
  for (const p of data.products) p.image = toWebp(p.image);
  for (const d of data.details) d.images = (d.images ?? []).map(toWebp);
  writeFileSync(BUILD, JSON.stringify(data, null, 1));
  console.log(`\nĐã cập nhật đường dẫn ảnh trong ${BUILD}`);
} catch (err) {
  console.warn(`Bỏ qua ${BUILD}: ${err.message}`);
}

console.log(
  `${files.length} ảnh: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`,
);
