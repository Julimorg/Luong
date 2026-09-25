// ============================================================
// gen-sitemap.mjs — Sinh sitemap.xml từ kết quả build
// ------------------------------------------------------------
// Chạy sau `vite-react-ssg build`. Thay vì đọc lại file dữ liệu, script duyệt
// thẳng thư mục dist tìm mọi index.html đã được dựng — nên sitemap luôn khớp
// đúng những trang thực sự tồn tại, thêm dự án hay sản phẩm mới cũng tự có.
//
//   node scripts/gen-sitemap.mjs [--base=https://viethungsolar.vn]
// ============================================================

import { readdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");

const baseArg = process.argv.find((a) => a.startsWith("--base="));
const BASE = (baseArg ? baseArg.slice(7) : "https://viethungsolar.vn").replace(/\/$/, "");

/** Mức ưu tiên gợi ý cho Google; trang càng quan trọng càng cao. */
function priorityOf(route) {
  if (route === "/") return "1.0";
  if (route.split("/").filter(Boolean).length === 1) return "0.8";
  return "0.6"; // trang chi tiết
}

function changefreqOf(route) {
  if (route === "/") return "weekly";
  return "monthly";
}

/**
 * Duyệt đệ quy dist, trả về danh sách route ứng với mỗi file .html.
 * vite-react-ssg ghi ra dạng phẳng (`du-an.html`, `du-an/1.html`) chứ không
 * phải `du-an/index.html`, nên bỏ đuôi .html là ra đúng đường dẫn — khớp với
 * cleanUrls: true trong vercel.json.
 */
async function collectRoutes(dir = DIST, prefix = "") {
  const routes = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return routes;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // assets là file build, không phải trang
      if (entry.name === "assets") continue;
      routes.push(...(await collectRoutes(path.join(dir, entry.name), `${prefix}/${entry.name}`)));
    } else if (entry.name.endsWith(".html")) {
      routes.push(
        entry.name === "index.html"
          ? prefix === "" ? "/" : prefix
          : `${prefix}/${entry.name.replace(/\.html$/, "")}`,
      );
    }
  }
  return routes;
}

const routes = (await collectRoutes()).sort((a, b) => {
  // Trang chủ lên đầu, còn lại xếp theo độ sâu rồi theo bảng chữ cái.
  if (a === "/") return -1;
  if (b === "/") return 1;
  const da = a.split("/").length, db = b.split("/").length;
  return da === db ? a.localeCompare(b) : da - db;
});

if (routes.length === 0) {
  console.error("[sitemap] Không tìm thấy trang nào trong dist/ — đã chạy build chưa?");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r === "/" ? "/" : r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreqOf(r)}</changefreq>
    <priority>${priorityOf(r)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");

const { size } = await stat(path.join(DIST, "sitemap.xml"));
console.log(`[sitemap] Đã ghi dist/sitemap.xml — ${routes.length} trang, ${(size / 1024).toFixed(1)} KB`);
