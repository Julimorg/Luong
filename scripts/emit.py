"""Write src/data/productData.ts and src/data/productDetailData.ts from generated.json."""
import json
import os

SD = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.build')
data = json.load(open(os.path.join(SD, 'generated.json'), encoding='utf-8'))
products, details = data['products'], data['details']

def q(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'


def specs_block(items, indent):
    pad = ' ' * indent
    if not items:
        return '[]'
    rows = [f'{pad}  {{ label: {q(s["label"])}, value: {q(s["value"])} }},' for s in items]
    return '[\n' + '\n'.join(rows) + f'\n{pad}]'


def strings_block(items, indent):
    pad = ' ' * indent
    if not items:
        return '[]'
    rows = [f'{pad}  {q(s)},' for s in items]
    return '[\n' + '\n'.join(rows) + f'\n{pad}]'


# ─────────────────────────── productData.ts ───────────────────────────
head = '''// ============================================================
// productData.ts — Cấu hình nội dung trang Sản phẩm
// Dữ liệu sản phẩm được sinh từ bộ hồ sơ kỹ thuật trong /documents.
// ============================================================

// ---------- BREADCRUMB ----------
export const productsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Sản phẩm",  to: "/san-pham" },
];

// ---------- PAGE HEADER ----------
export const productsPageHeader = {
  badge:       "Thiết bị chính hãng",
  headline:    "Sản phẩm nổi bật",
  description: "Thiết bị điện năng lượng mặt trời chính hãng đến từ các thương hiệu hàng đầu thế giới",
};

// ---------- PRODUCT ----------
export type ProductCategory = "tam-pin" | "inverter" | "pin-luu-tru";

export interface Product {
  id:          number;
  category:    ProductCategory;
  /** Nhóm thiết bị trong danh mục — dùng cho bộ lọc phụ trên trang Sản phẩm. */
  group:       string;
  image:       string;
  brand:       string;
  brandColor?: string;
  name:        string;
  /** Mã model chính hãng, hiển thị ngay dưới tên sản phẩm. */
  model:       string;
  specs:       { label: string; value: string }[];
}

// ---------- CATEGORY SECTIONS ----------
export interface ProductSection {
  id:        ProductCategory;
  title:     string;
  viewAll?:  string;
  subtitle?: string;
  tagline?:  string;
}

// ---------- BRAND INFO ----------
// Key phải khớp CHÍNH XÁC (phân biệt hoa/thường) với field `brand` bên dưới.
export interface ProductBrandInfo {
  description: string;
  linkTo?: string;
}

export const productSections: ProductSection[] = [
  {
    id: "tam-pin",
    title: "Tấm Pin Năng Lượng Mặt Trời",
    viewAll: "/san-pham/tam-pin",
    subtitle: "Tấm pin N-Type TOPCon / TBC hai mặt kính từ các thương hiệu hàng đầu thế giới",
    tagline: "Hiệu suất cao – Độ bền vượt trội – Bảo hành công suất đến 30 năm",
  },
  {
    id: "inverter",
    title: "Inverter Hòa Lưới & Lưu Trữ",
    viewAll: "/san-pham/inverter",
    subtitle: "Inverter hòa lưới, Hybrid áp thấp và Hybrid áp cao cho mọi quy mô hệ thống",
    tagline: "Từ 3kW dân dụng đến 110kW cho nhà máy – khu công nghiệp",
  },
  {
    id: "pin-luu-tru",
    title: "Pin Lưu Trữ Năng Lượng",
    viewAll: "/san-pham/pin-luu-tru",
    subtitle: "Pin LFP áp thấp – áp cao cùng các bộ quản lý BMS, PCU đồng bộ",
    tagline: "An toàn – Tuổi thọ dài – Mở rộng dung lượng linh hoạt",
  },
];

'''

brand_info_src = json.load(open(os.path.join(SD, 'brandinfo.json'), encoding='utf-8'))
lines = ['export const productBrandInfo: Record<string, ProductBrandInfo> = {']
for brand, info in brand_info_src.items():
    lines.append(f'  {q(brand)}: {{')
    lines.append(f'    description:')
    lines.append(f'      {q(info["description"])},')
    lines.append('  },')
lines.append('};\n')
brand_block = '\n'.join(lines)

prod_lines = ['// ---------- PRODUCTS ----------', 'export const products: Product[] = [']
current = None
for p in products:
    key = (p['category'], p['group'])
    if key != current:
        current = key
        prod_lines.append(f'  // ── {p["category"]} · {p["group"]} ──────────────────────────')
    prod_lines.append('  {')
    prod_lines.append(f'    id:         {p["id"]},')
    prod_lines.append(f'    category:   {q(p["category"])},')
    prod_lines.append(f'    group:      {q(p["group"])},')
    prod_lines.append(f'    image:      {q(p["image"])},')
    prod_lines.append(f'    brand:      {q(p["brand"])},')
    prod_lines.append(f'    brandColor: {q(p["brandColor"])},')
    prod_lines.append(f'    name:       {q(p["name"])},')
    prod_lines.append(f'    model:      {q(p["model"])},')
    prod_lines.append(f'    specs:      {specs_block(p["specs"], 4)},')
    prod_lines.append('  },')
prod_lines.append('];\n')

cta = '''// ---------- CTA BANNER ----------
export const productCtaBanner = {
  headline:    "Cần tư vấn giải pháp điện mặt trời phù hợp?",
  description: "Đội ngũ kỹ thuật VIETHUNGSOLAR luôn sẵn sàng khảo sát và tư vấn miễn phí cho bạn!",
  cta:         { label: "Liên hệ ngay", href: "/lien-he" },
  badges: [
    { icon: "🎁", title: "Tư vấn miễn phí",     desc: "Khảo sát & tư vấn giải pháp tối ưu" },
    { icon: "🛡️", title: "Thiết bị chính hãng", desc: "Sản phẩm chất lượng đầy đủ CO, CQ" },
    { icon: "👤", title: "Hỗ trợ trọn đời",     desc: "Bảo hành chính hãng" },
  ],
};
'''

with open('src/data/productData.ts', 'w', encoding='utf-8') as f:
    f.write(head + brand_block + '\n' + '\n'.join(prod_lines) + '\n' + cta)

# ──────────────────────── productDetailData.ts ────────────────────────
dhead = '''// ============================================================
// productDetailData.ts — Nội dung chi tiết từng sản phẩm
// Sinh từ bộ hồ sơ kỹ thuật (.docx) trong /documents.
// ============================================================

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDocument {
  label: string;
  fileUrl: string; // link tải hoặc xem PDF
}

export interface ProductHighlight {
  title: string;
  description?: string;
}

export interface ProductDetail {
  productId:   number;            // khớp với Product.id trong productData.ts
  images:      string[];          // gallery ảnh (index 0 = ảnh chính)
  description: string;            // mô tả tổng quan
  quickSpecs:  ProductSpec[];     // 6 thông số nổi bật hiển thị dạng ô
  highlights:  ProductHighlight[];// điểm nổi bật (tiêu đề + diễn giải)
  fullSpecs:   ProductSpec[];     // bảng thông số kỹ thuật đầy đủ
  documents:   ProductDocument[]; // tài liệu / datasheet chính hãng
  warranty:    string;            // thông tin bảo hành
  origin:      string;            // xuất xứ
  tags?:       string[];
  applications?: string[];
}

export const productDetails: ProductDetail[] = [
'''

dlines = []
by_id = {p['id']: p for p in products}
for d in details:
    p = by_id[d['productId']]
    dlines.append(f'  // ── {p["brand"]} · {p["name"]} ──')
    dlines.append('  {')
    dlines.append(f'    productId: {d["productId"]},')
    dlines.append('    images: ' + strings_block(d['images'], 4) + ',')
    dlines.append('    description:')
    dlines.append(f'      {q(d["description"])},')
    dlines.append('    quickSpecs: ' + specs_block(d['quickSpecs'], 4) + ',')
    if d['highlights']:
        dlines.append('    highlights: [')
        for h in d['highlights']:
            dlines.append('      {')
            dlines.append(f'        title: {q(h["title"])},')
            if h.get('description'):
                dlines.append(f'        description:')
                dlines.append(f'          {q(h["description"])},')
            dlines.append('      },')
        dlines.append('    ],')
    else:
        dlines.append('    highlights: [],')
    dlines.append('    fullSpecs: ' + specs_block(d['fullSpecs'], 4) + ',')
    if d['documents']:
        dlines.append('    documents: [')
        for doc in d['documents']:
            dlines.append(f'      {{ label: {q(doc["label"])}, fileUrl: {q(doc["fileUrl"])} }},')
        dlines.append('    ],')
    else:
        dlines.append('    documents: [],')
    dlines.append(f'    warranty: {q(d["warranty"])},')
    dlines.append(f'    origin:   {q(d["origin"])},')
    if d.get('tags'):
        dlines.append('    tags: ' + strings_block(d['tags'], 4) + ',')
    if d.get('applications'):
        dlines.append('    applications: ' + strings_block(d['applications'], 4) + ',')
    dlines.append('  },')

with open('src/data/productDetailData.ts', 'w', encoding='utf-8') as f:
    f.write(dhead + '\n'.join(dlines) + '\n];\n')

print('wrote src/data/productData.ts and src/data/productDetailData.ts')


# ── Kiểm tra combo còn trỏ đúng sản phẩm không ──────────────────────
# ID sản phẩm được đánh lại mỗi lần sinh dữ liệu, nên comboData.ts có thể trỏ
# nhầm sau khi thêm/bớt hồ sơ. In cảnh báo để sửa tay thay vì để lỗi âm thầm.
def check_combo_links():
    import re
    try:
        combo = open('src/data/comboData.ts', encoding='utf-8').read()
    except FileNotFoundError:
        return
    by_id = {p['id']: p for p in products}
    bad = []
    # label và productId có thể nằm trên cùng dòng hoặc cách nhau vài dòng.
    pattern = r'label:\s*"([^"]*)",\s*\n?\s*productId:\s*(\d+)'
    for label, pid in re.findall(pattern, combo):
        p = by_id.get(int(pid))
        if not p:
            bad.append((label, pid, 'KHÔNG TỒN TẠI'))
            continue
        # Nhãn trong combo có thể là dải công suất ("GoodWe 5–10 kW") nên chỉ
        # cần khớp một phần với model hoặc tên sản phẩm là đủ.
        low = label.lower()
        words = {w for w in re.split(r'[^0-9a-zA-Z.\-/]+', low) if len(w) > 2}
        target = (p['model'] + ' ' + p['name'] + ' ' + p['brand']).lower()
        if not (words & set(re.split(r'[^0-9a-zA-Z.\-/]+', target))):
            bad.append((label, pid, p['name']))
    if bad:
        print('\nCẢNH BÁO — comboData.ts trỏ sai sản phẩm, cần sửa productId:')
        for label, pid, actual in bad:
            print(f'  "{label}" -> productId {pid} hiện là "{actual}"')
    else:
        print('comboData.ts: tất cả productId đều khớp.')


check_combo_links()
