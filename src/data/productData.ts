// ============================================================
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

export const productBrandInfo: Record<string, ProductBrandInfo> = {
  "JA Solar": {
    description:
      "JA Solar là thương hiệu tấm pin uy tín toàn cầu, nổi bật với công nghệ N-Type TOPCon n-Bycium+ cho hiệu suất chuyển đổi cao.",
  },
  "LONGi": {
    description:
      "LONGi là nhà sản xuất tấm pin năng lượng mặt trời hàng đầu thế giới, đi đầu công nghệ HPBC và Hi-MO cho hiệu suất, độ bền vượt trội.",
  },
  "TCL Solar": {
    description:
      "TCL Solar mang công nghệ N-Type TOPCon 210R và cấu trúc hai mặt kính, tối ưu hiệu suất cho cả công trình dân dụng và dự án C&I.",
  },
  "GoodWe": {
    description:
      "GoodWe cung cấp hệ sinh thái inverter Hybrid và pin lưu trữ đồng bộ, từ dân dụng ES Uniq đến các hệ C&I công suất lớn.",
  },
  "SolaX": {
    description:
      "SolaX Power chuyên về inverter hybrid và hệ lưu trữ năng lượng, từ dòng X1 dân dụng đến X3-AELIO cho thương mại – công nghiệp.",
  },
  "Sungrow": {
    description:
      "Sungrow là thương hiệu inverter hàng đầu thế giới về sản lượng xuất xưởng, dải sản phẩm trải dài từ hòa lưới đến hybrid lưu trữ.",
  },
  "INVT": {
    description:
      "INVT cung cấp inverter hòa lưới và hybrid 1 pha – 3 pha với dải công suất rộng, phù hợp từ hộ gia đình đến nhà máy quy mô lớn.",
  },
  "Lithium Valley": {
    description:
      "Lithium Valley cung cấp pin lưu trữ LFP dạng module, linh hoạt mở rộng dung lượng theo nhu cầu của từng hệ thống.",
  },
};

// ---------- PRODUCTS ----------
export const products: Product[] = [
  // ── tam-pin · Tấm pin ──────────────────────────
  {
    id:         1,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/ja-solar-jam66d45-630-lb.webp",
    brand:      "JA Solar",
    brandColor: "#003087",
    name:       "JA Solar DeepBlue 4.0 Pro 630W",
    model:      "JAM66D45-630/LB",
    specs:      [
      { label: "Công suất", value: "630W" },
      { label: "Công nghệ", value: "N-Type TOPCon" },
    ],
  },
  {
    id:         2,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/longi-longi.webp",
    brand:      "LONGi",
    brandColor: "#d93c1c",
    name:       "LONGi Hi-MO 7 620W",
    model:      "LR8-66HGD-620M",
    specs:      [
      { label: "Công suất", value: "620W" },
      { label: "Công nghệ cell", value: "N-type HPDC" },
    ],
  },
  {
    id:         3,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/tcl-solar-hsm-nd66-gr620.webp",
    brand:      "TCL Solar",
    brandColor: "#cc0000",
    name:       "TCL Solar N-Type TBC 655W",
    model:      "HSM-BD66-GR655",
    specs:      [
      { label: "Công suất", value: "655W" },
      { label: "Công nghệ", value: "N-Type TBC / Back Contact" },
    ],
  },
  {
    id:         4,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/tcl-solar-hsm-nd66-gr620.webp",
    brand:      "TCL Solar",
    brandColor: "#cc0000",
    name:       "TCL Solar N-Type TOPCon 615W",
    model:      "HSM-ND66-GR615",
    specs:      [
      { label: "Công suất", value: "615W" },
      { label: "Công nghệ", value: "N-Type TOPCon" },
    ],
  },
  {
    id:         5,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/tcl-solar-hsm-nd66-gr620.webp",
    brand:      "TCL Solar",
    brandColor: "#cc0000",
    name:       "TCL Solar N-Type TOPCon 620W",
    model:      "HSM-ND66-GR620",
    specs:      [
      { label: "Công suất", value: "620W" },
      { label: "Công nghệ", value: "N-Type TOPCon" },
    ],
  },
  {
    id:         6,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/tcl-solar-hsm-nd66-gr620.webp",
    brand:      "TCL Solar",
    brandColor: "#cc0000",
    name:       "TCL Solar N-Type TOPCon 625W",
    model:      "HSM-ND66-GR625",
    specs:      [
      { label: "Công suất", value: "625W" },
      { label: "Công nghệ", value: "N-Type TOPCon" },
    ],
  },
  {
    id:         7,
    category:   "tam-pin",
    group:      "Tấm pin",
    image:      "/products/tam-pin/tcl-solar-hsm-nd66-gr620.webp",
    brand:      "TCL Solar",
    brandColor: "#cc0000",
    name:       "TCL Solar N-Type TOPCon 645W",
    model:      "HSM-GFE-NM645",
    specs:      [
      { label: "Công suất", value: "645W" },
      { label: "Công nghệ", value: "N-Type TOPCon + Shingling" },
    ],
  },
  // ── inverter · Hybrid áp thấp ──────────────────────────
  {
    id:         8,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/goodwe-goodwe.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe ES Uniq 10kW",
    model:      "GW10K-ES-C10",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         9,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/goodwe-goodwe.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe ES Uniq 5kW",
    model:      "GW5000-ES-C10",
    specs:      [
      { label: "Công suất AC", value: "5 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         10,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/goodwe-goodwe.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe ES Uniq 6kW",
    model:      "GW6000-ES-C10",
    specs:      [
      { label: "Công suất AC", value: "6 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         11,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/goodwe-goodwe.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe ES Uniq 8kW",
    model:      "GW8000-ES-C10",
    specs:      [
      { label: "Công suất AC", value: "8 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         12,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/goodwe-gw10kn-et.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW10KN-ET 10kW 3 Pha",
    model:      "GW10KN-ET",
    specs:      [
      { label: "Công suất inverter", value: "10 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "15 kWp" },
    ],
  },
  {
    id:         13,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/solax-solax.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X1-HYB 5kW",
    model:      "X1-HYB-5.0-LV-EU",
    specs:      [
      { label: "Công suất AC", value: "5 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         14,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/solax-solax.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X1-HYB 6kW",
    model:      "X1-HYB-6.0-LV-EU",
    specs:      [
      { label: "Công suất AC", value: "6 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         15,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/solax-solax.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X1-HYB 6kW",
    model:      "X1-HYB-6.0-LV",
    specs:      [
      { label: "Công suất AC", value: "6 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         16,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/solax-x1-reno-8-0-lv.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X1-RENO 8kW",
    model:      "X1-RENO-8.0-LV",
    specs:      [
      { label: "Công suất AC", value: "8 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha – LV" },
    ],
  },
  {
    id:         17,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/sungrow-inverter-hybrid-sungrow.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter Hybrid Sungrow MG10RL 10kW",
    model:      "MG10RL",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha" },
    ],
  },
  {
    id:         18,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/sungrow-inverter-hybrid-sungrow.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter Hybrid Sungrow MG5RL 5kW",
    model:      "MG5RL",
    specs:      [
      { label: "Công suất AC", value: "5 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha" },
    ],
  },
  {
    id:         19,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/sungrow-inverter-hybrid-sungrow.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter Hybrid Sungrow MG6RL 6kW",
    model:      "MG6RL",
    specs:      [
      { label: "Công suất AC", value: "6 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha" },
    ],
  },
  {
    id:         20,
    category:   "inverter",
    group:      "Hybrid áp thấp",
    image:      "/products/inverter/sungrow-inverter-hybrid-sungrow.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter Hybrid Sungrow MG8RL 8kW",
    model:      "MG8RL",
    specs:      [
      { label: "Công suất AC", value: "8 kW" },
      { label: "Loại inverter", value: "Hybrid 1 pha" },
    ],
  },
  // ── inverter · Hybrid áp cao ──────────────────────────
  {
    id:         21,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/goodwe-gw20k-et.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW20K-ET 20kW 3 Pha",
    model:      "GW20K-ET",
    specs:      [
      { label: "Công suất inverter", value: "20 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "30 kWp" },
    ],
  },
  {
    id:         22,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/goodwe-gw30k-et.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW30K-ET 30kW 3 Pha",
    model:      "GW30K-ET",
    specs:      [
      { label: "Công suất inverter", value: "30 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "45 kWp" },
    ],
  },
  {
    id:         23,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/goodwe-gw50k-et-10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW50K-ET-10 50kW 3 Pha",
    model:      "GW50K-ET-10",
    specs:      [
      { label: "Công suất inverter", value: "50 kW – 3 pha" },
      { label: "Công suất PV theo datasheet", value: "75 kWp" },
    ],
  },
  {
    id:         24,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/goodwe-gw80k-et-g10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW80K-ET-G10 80kW 3 Pha",
    model:      "GW80K-ET-G10",
    specs:      [
      { label: "Công suất inverter", value: "80 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "160 kWp" },
    ],
  },
  {
    id:         25,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/goodwe-gw10kn-et.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Inverter Hybrid GoodWe GW99.99K-ET-G10 99.99kW 3 Pha",
    model:      "GW99.99K-ET-G10",
    specs:      [
      { label: "Công suất inverter", value: "99,99 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "200 kWp" },
    ],
  },
  {
    id:         26,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/invt-xd30ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter Hybrid INVT XD30KTR 30kW",
    model:      "XD30KTR",
    specs:      [
      { label: "Công suất Hybrid", value: "30 kW" },
      { label: "Công suất PV tối đa", value: "45 kWp" },
    ],
  },
  {
    id:         27,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/invt-xd40ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter Hybrid INVT XD40KTR 40kW",
    model:      "XD40KTR",
    specs:      [
      { label: "Công suất Hybrid", value: "40 kW" },
      { label: "Công suất PV tối đa", value: "60 kWp" },
    ],
  },
  {
    id:         28,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/invt-xd50ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter Hybrid INVT XD50KTR 50kW",
    model:      "XD50KTR",
    specs:      [
      { label: "Công suất Hybrid", value: "50 kW" },
      { label: "Công suất PV tối đa", value: "75 kWp" },
    ],
  },
  {
    id:         29,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/invt-xd60ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter Hybrid INVT XD60KTR 60kW",
    model:      "XD60KTR",
    specs:      [
      { label: "Công suất Hybrid", value: "60 kW" },
      { label: "Công suất PV tối đa", value: "90 kWp" },
    ],
  },
  {
    id:         30,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/solax-x3-aelio-49-9k.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X3-AELIO-49.9K 49.9kW 3 Pha",
    model:      "X3-AELIO-49.9K",
    specs:      [
      { label: "Công suất inverter", value: "49,9 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "100 kWp" },
    ],
  },
  {
    id:         31,
    category:   "inverter",
    group:      "Hybrid áp cao",
    image:      "/products/inverter/solax-x3-aelio-60k.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Inverter Hybrid SolaX X3-AELIO-60K 60kW 3 Pha",
    model:      "X3-AELIO-60K",
    specs:      [
      { label: "Công suất inverter", value: "60 kW – 3 pha" },
      { label: "Công suất PV tối đa", value: "120 kWp" },
    ],
  },
  // ── inverter · Hòa lưới ──────────────────────────
  {
    id:         32,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg10ktl.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG10KTL 10kW",
    model:      "XG10KTL",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  {
    id:         33,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg10ktr-s.png",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG10KTR-S 10kW",
    model:      "XG10KTR-S",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         34,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg110ktr-afci.webp",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG110KTR-AFCI 110kW",
    model:      "XG110KTR-AFCI",
    specs:      [
      { label: "Công suất AC", value: "110 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         35,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg15ktr1-s.png",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG15KTR1-S 15kW",
    model:      "XG15KTR1-S",
    specs:      [
      { label: "Công suất AC", value: "15 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         36,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg20ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG20KTR 20kW",
    model:      "XG20KTR",
    specs:      [
      { label: "Công suất AC", value: "20 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         37,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg25ktr.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG25KTR 25kW",
    model:      "XG25KTR",
    specs:      [
      { label: "Công suất AC", value: "25 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         38,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg30ktr.png",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG30KTR 30kW",
    model:      "XG30KTR",
    specs:      [
      { label: "Công suất AC", value: "30 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         39,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg3ktl-s.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG3KTL-S 3kW",
    model:      "XG3KTL-S",
    specs:      [
      { label: "Công suất AC", value: "3 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  {
    id:         40,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg40ktr-afci.png",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG40KTR-AFCI 40kW",
    model:      "XG40KTR-AFCI",
    specs:      [
      { label: "Công suất AC", value: "40 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         41,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg5ktl-s.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG5KTL-S 5kW",
    model:      "XG5KTL-S",
    specs:      [
      { label: "Công suất AC", value: "5 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  {
    id:         42,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg60ktr-afci.png",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG60KTR-AFCI 60kW",
    model:      "XG60KTR-AFCI",
    specs:      [
      { label: "Công suất AC", value: "60 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         43,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/invt-xg80ktr-pro-afci.jpg",
    brand:      "INVT",
    brandColor: "#005bac",
    name:       "Inverter hòa lưới INVT XG80KTR-PRO-AFCI 80kW",
    model:      "XG80KTR-PRO-AFCI",
    specs:      [
      { label: "Công suất AC", value: "80 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         44,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg10rs.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG10RS 10kW",
    model:      "SG10RS",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  {
    id:         45,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg10rt.webp",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG10RT 10kW",
    model:      "SG10RT",
    specs:      [
      { label: "Công suất AC", value: "10 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         46,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg15rt.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG15RT 15kW",
    model:      "SG15RT",
    specs:      [
      { label: "Công suất AC", value: "15 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         47,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg20rt.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG20RT 20kW",
    model:      "SG20RT",
    specs:      [
      { label: "Công suất AC", value: "20 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         48,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg33cx-p2.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG33CX-P2 33kW",
    model:      "SG33CX-P2",
    specs:      [
      { label: "Công suất AC", value: "33 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         49,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg40cx-p2.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG40CX-P2 40kW",
    model:      "SG40CX-P2",
    specs:      [
      { label: "Công suất AC", value: "40 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         50,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg5-0rs.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG5.0RS 5kW",
    model:      "SG5.0RS",
    specs:      [
      { label: "Công suất AC", value: "5 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  {
    id:         51,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg50cx-p2.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG50CX-P2 50kW",
    model:      "SG50CX-P2",
    specs:      [
      { label: "Công suất AC", value: "50 kW" },
      { label: "Loại inverter", value: "Hòa lưới 3 pha" },
    ],
  },
  {
    id:         52,
    category:   "inverter",
    group:      "Hòa lưới",
    image:      "/products/inverter/sungrow-sg8-0rs.png",
    brand:      "Sungrow",
    brandColor: "#f6b918",
    name:       "Inverter hòa lưới Sungrow SG8.0RS 8kW",
    model:      "SG8.0RS",
    specs:      [
      { label: "Công suất AC", value: "8 kW" },
      { label: "Loại inverter", value: "Hòa lưới 1 pha" },
    ],
  },
  // ── inverter · Bộ chuyển mạch ──────────────────────────
  {
    id:         53,
    category:   "inverter",
    group:      "Bộ chuyển mạch",
    image:      "/products/inverter/goodwe-gw125k-sts-g10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Bộ chuyển mạch tĩnh GoodWe GW125K-STS-G10",
    model:      "GW125K-STS-G10",
    specs:      [
      { label: "Công suất danh định", value: "125 kW" },
      { label: "Công suất biểu kiến tối đa", value: "137,5 kVA" },
    ],
  },
  {
    id:         54,
    category:   "inverter",
    group:      "Bộ chuyển mạch",
    image:      "/products/inverter/goodwe-sts200-80-10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Bộ chuyển mạch tĩnh GoodWe STS200-80-10",
    model:      "STS200-80-10",
    specs:      [
      { label: "Công suất danh định", value: "50 kVA" },
      { label: "Tải tối đa khi có lưới", value: "138 kVA / 200 A" },
    ],
  },
  // ── pin-luu-tru · Pin áp thấp (LV) ──────────────────────────
  {
    id:         55,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/goodwe-gw16-1-bat-lv-g10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Pin lưu trữ GoodWe Lynx A G4 16.1kWh",
    model:      "GW16.1-BAT-LV-G10",
    specs:      [
      { label: "Dung lượng định mức", value: "16,1 kWh" },
      { label: "Công nghệ pin", value: "LFP – LiFePO₄" },
    ],
  },
  {
    id:         56,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/lithium-valley-lv-bat-w10-24ac.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ Lithium Valley 10.24kWh",
    model:      "LV-BAT-W10.24Ac",
    specs:      [
      { label: "Dung lượng lưu trữ", value: "10,24 kWh" },
      { label: "Công nghệ pin", value: "LiFePO₄ – LFP" },
    ],
  },
  {
    id:         57,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/lithium-valley-lithium.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ Lithium Valley 5.12kWh",
    model:      "LV-BAT-W5.12Ac",
    specs:      [
      { label: "Dung lượng lưu trữ", value: "5,12 kWh" },
      { label: "Công nghệ pin", value: "LiFePO₄ – LFP" },
    ],
  },
  {
    id:         58,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/lithium-valley-lv-bat-w15-5a.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ Lithium Valley W15-5A 14.336kWh",
    model:      "LV-BAT-W15-5A",
    specs:      [
      { label: "Dung lượng lưu trữ", value: "14,336 kWh" },
      { label: "Công nghệ pin", value: "LiFePO₄ – LFP" },
    ],
  },
  {
    id:         59,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/lithium-valley-w16-5a.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ Lithium Valley W16-5A",
    model:      "W16-5A",
    specs:      [
      { label: "Dung lượng lưu trữ", value: "16,076 kWh" },
      { label: "Công nghệ pin", value: "LiFePO₄ – LFP" },
    ],
  },
  {
    id:         60,
    category:   "pin-luu-tru",
    group:      "Pin áp thấp (LV)",
    image:      "/products/pin-luu-tru/solax-t-bat-sys-lv-d150.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Pin lưu trữ áp thấp SolaX T-BAT-SYS-LV D150",
    model:      "T-BAT-SYS-LV D150",
    specs:      [
      { label: "Dung lượng", value: "15 kWh" },
      { label: "Công nghệ pin", value: "LFP – LiFePO₄" },
    ],
  },
  // ── pin-luu-tru · Pin áp cao (HV) ──────────────────────────
  {
    id:         61,
    category:   "pin-luu-tru",
    group:      "Pin áp cao (HV)",
    image:      "/products/pin-luu-tru/goodwe-gw5-1-pack-i-g10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Pin lưu trữ cao áp GoodWe GW5.1-PACK-I-G10",
    model:      "GW5.1-PACK-I-G10",
    specs:      [
      { label: "Dung lượng mỗi pack", value: "5,12 kWh" },
      { label: "Điện áp danh định", value: "51,2 V" },
    ],
  },
  {
    id:         62,
    category:   "pin-luu-tru",
    group:      "Pin áp cao (HV)",
    image:      "/products/pin-luu-tru/lithium-valley-flex16-unit.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ cao áp Lithium Valley FLEX16-UNIT",
    model:      "FLEX16-UNIT",
    specs:      [
      { label: "Dung lượng module", value: "16,076 kWh" },
      { label: "Điện áp danh định", value: "51,2 V" },
    ],
  },
  {
    id:         63,
    category:   "pin-luu-tru",
    group:      "Pin áp cao (HV)",
    image:      "/products/pin-luu-tru/lithium-valley-lv-bst-h5-12aa.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Pin lưu trữ điện áp cao Lithium Valley LV-BST-H5.12Aa",
    model:      "LV-BST-H5.12Aa",
    specs:      [
      { label: "Dung lượng mỗi module", value: "5,12 kWh" },
      { label: "Điện áp danh định", value: "51,2 V" },
    ],
  },
  {
    id:         64,
    category:   "pin-luu-tru",
    group:      "Pin áp cao (HV)",
    image:      "/products/pin-luu-tru/solax-tb-hr140.png",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Module pin lưu trữ SolaX TB-HR140 14.3kWh",
    model:      "TB-HR140",
    specs:      [
      { label: "Năng lượng mỗi module", value: "14,3 kWh" },
      { label: "Dung lượng cell", value: "280 Ah" },
    ],
  },
  // ── pin-luu-tru · Phụ kiện hệ pin ──────────────────────────
  {
    id:         65,
    category:   "pin-luu-tru",
    group:      "Phụ kiện hệ pin",
    image:      "/products/pin-luu-tru/goodwe-gw110-750-pcu-i-g10.png",
    brand:      "GoodWe",
    brandColor: "#e8001c",
    name:       "Bộ quản lý pin lưu trữ GoodWe GW110/750-PCU-I-G10",
    model:      "GW110/750-PCU-I-G10",
    specs:      [
      { label: "Loại thiết bị", value: "PCU – Power Control Unit" },
      { label: "Dòng sạc tối đa", value: "100 A" },
    ],
  },
  {
    id:         66,
    category:   "pin-luu-tru",
    group:      "Phụ kiện hệ pin",
    image:      "/products/pin-luu-tru/lithium-valley-flex16-hbox.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Bộ quản lý pin cao áp Lithium Valley FLEX16-HBOX",
    model:      "FLEX16-HBOX",
    specs:      [
      { label: "Loại thiết bị", value: "High Voltage Box / BMS Controller" },
      { label: "Điện áp định mức", value: "DC 1000 V" },
    ],
  },
  {
    id:         67,
    category:   "pin-luu-tru",
    group:      "Phụ kiện hệ pin",
    image:      "/products/pin-luu-tru/lithium-valley-lv-bst-h5-12aa-hvbox.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Bộ quản lý pin lưu trữ BMS Lithium Valley LV-BST-H5.12Aa-HVBOX",
    model:      "LV-BST-H5.12Aa-HVBOX",
    specs:      [
      { label: "Loại thiết bị", value: "BMS / High Voltage Box" },
      { label: "Module hỗ trợ mỗi tháp", value: "3 – 6 module" },
    ],
  },
  {
    id:         68,
    category:   "pin-luu-tru",
    group:      "Phụ kiện hệ pin",
    image:      "/products/pin-luu-tru/lithium-valley-flex16-rack.png",
    brand:      "Lithium Valley",
    brandColor: "#2a9d8f",
    name:       "Khung đỡ hệ pin lưu trữ Lithium Valley FLEX16-RACK",
    model:      "FLEX16-RACK",
    specs:      [
      { label: "Loại thiết bị", value: "Khung / bệ đỡ hệ pin" },
      { label: "Hệ tương thích", value: "Lithium Valley FLEX16" },
    ],
  },
  {
    id:         69,
    category:   "pin-luu-tru",
    group:      "Phụ kiện hệ pin",
    image:      "/products/pin-luu-tru/solax-tbms-r15.jpg",
    brand:      "SolaX",
    brandColor: "#00a0e9",
    name:       "Bộ quản lý pin SolaX TBMS-R15",
    model:      "TBMS-R15",
    specs:      [
      { label: "Model", value: "TBMS-R15" },
      { label: "Dải điện áp BMS", value: "250 – 1.000 VDC*" },
    ],
  },
];

// ---------- CTA BANNER ----------
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
