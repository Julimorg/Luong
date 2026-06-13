// ============================================================
// productData.ts — Cấu hình nội dung trang Sản phẩm
// ============================================================

// ---------- BREADCRUMB ----------
export const productsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Sản phẩm",  to: "/san-pham" },
];

// ---------- PAGE HEADER ----------
export const productsPageHeader = {
  headline:    "Sản Phẩm Nổi Bật",
  description: "Thiết bị điện năng lượng mặt trời chính hãng đến từ các thương hiệu hàng đầu thế giới",
};

// ---------- PRODUCT ----------
export interface Product {
  id:          number;
  category:    ProductCategory;
  image:       string;
  brand:       string;
  brandColor?: string;
  name:        string;
  specs:       { label: string; value: string }[];
}

export type ProductCategory = "tam-pin" | "inverter" | "pin-luu-tru";

// ---------- CATEGORY SECTIONS ----------
export interface ProductSection {
  id:       ProductCategory;
  title:    string;
  viewAll?: string;
}

export const productSections: ProductSection[] = [
  { id: "tam-pin",     title: "Tấm Pin Năng Lượng Mặt Trời",  viewAll: "/san-pham/tam-pin" },
  { id: "inverter",    title: "Inverter Hòa Lưới & Lưu Trữ",  viewAll: "/san-pham/inverter" },
  { id: "pin-luu-tru", title: "Pin Lưu Trữ Năng Lượng",        viewAll: "/san-pham/pin-luu-tru" },
];

// ---------- PRODUCTS ----------
export const products: Product[] = [
  // ── Tấm pin — ảnh panel đen nền trắng/xám ────────────────
  {
    id: 1,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=400&q=80",
    brand: "Canadian Solar",
    brandColor: "#e63c2f",
    name: "Canadian Solar HiKu 615W",
    specs: [
      { label: "Công suất",  value: "615W" },
      { label: "Công nghệ",  value: "N-Type TOPCon" },
    ],
  },
  {
    id: 2,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=400&q=80",
    brand: "TCL Solar",
    brandColor: "#cc0000",
    name: "TCL Solar TOPCon 620W",
    specs: [
      { label: "Công suất",  value: "620W" },
      { label: "Công nghệ",  value: "N-Type TOPCon" },
    ],
  },
  {
    id: 3,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1615463165434-f824748945ec?w=400&q=80",
    brand: "LONGi",
    brandColor: "#d93c1c",
    name: "LONGi Hi-MO X6 620W",
    specs: [
      { label: "Công suất",  value: "620W" },
      { label: "Công nghệ",  value: "HPBC" },
    ],
  },
  {
    id: 4,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=400&q=80",
    brand: "JA Solar",
    brandColor: "#003087",
    name: "JA Solar DeepBlue 4.0 Pro 620W",
    specs: [
      { label: "Công suất",  value: "620W" },
      { label: "Công nghệ",  value: "N-Type" },
    ],
  },
  {
    id: 5,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1615463165434-f824748945ec?w=400&q=80",
    brand: "Astronergy",
    brandColor: "#0b6623",
    name: "Astronergy ASTRO N7 620W",
    specs: [
      { label: "Công suất",  value: "620W" },
      { label: "Công nghệ",  value: "TOPCon" },
    ],
  },
  {
    id: 6,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=400&q=80",
    brand: "Jinko Solar",
    brandColor: "#1a6fb5",
    name: "Jinko Solar Tiger Neo 620W",
    specs: [
      { label: "Công suất",  value: "620W" },
      { label: "Công nghệ",  value: "N-Type TOPCon" },
    ],
  },

  // ── Inverter — ảnh thiết bị trắng nền trắng ──────────────
  {
    id: 7,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=400&q=80",
    brand: "Sungrow",
    brandColor: "#f6b918",
    name: "Sungrow SG50CX",
    specs: [
      { label: "Loại",       value: "Hòa lưới (On-grid)" },
      { label: "Công suất",  value: "50kW" },
    ],
  },
  {
    id: 8,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=400&q=80",
    brand: "SMA",
    brandColor: "#003e6b",
    name: "SMA Sunny Tripower Core1",
    specs: [
      { label: "Loại",       value: "Hòa lưới (On-grid)" },
      { label: "Công suất",  value: "50kW" },
    ],
  },
  {
    id: 9,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=400&q=80",
    brand: "GoodWe",
    brandColor: "#e8001c",
    name: "GoodWe ET Plus+ 10kW",
    specs: [
      { label: "Loại",       value: "Hybrid (Lưu trữ)" },
      { label: "Công suất",  value: "10kW" },
    ],
  },
  {
    id: 10,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=400&q=80",
    brand: "Sungrow",
    brandColor: "#f6b918",
    name: "Sungrow MG10RL 10kW",
    specs: [
      { label: "Loại",       value: "Hybrid (Lưu trữ)" },
      { label: "Công suất",  value: "10kW" },
    ],
  },

  // ── Pin lưu trữ — ảnh tháp pin trắng ─────────────────────
  {
    id: 11,
    category: "pin-luu-tru",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=400&q=80",
    brand: "Pylontech",
    brandColor: "#2a9d8f",
    name: "Pylontech Force H2",
    specs: [
      { label: "Loại",       value: "Pin Lithium" },
      { label: "Dung lượng", value: "7.1 – 24.86 kWh" },
    ],
  },
  {
    id: 12,
    category: "pin-luu-tru",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=400&q=80",
    brand: "Lithium Valley",
    brandColor: "#3a7d44",
    name: "Lithium Valley LV-Stack",
    specs: [
      { label: "Loại",       value: "Pin Lithium" },
      { label: "Dung lượng", value: "10 – 30 kWh" },
    ],
  },
];

// ---------- CTA BANNER ----------
export const productCtaBanner = {
  headline:    "Cần tư vấn giải pháp điện mặt trời phù hợp?",
  description: "Đội ngũ kỹ thuật của DAT Solar luôn sẵn sàng hỗ trợ và tư vấn cho bạn miễn phí!",
  cta:         { label: "Liên hệ ngay", href: "/lien-he" },
  badges: [
    { icon: "🎁", title: "Tư vấn miễn phí",   desc: "Khảo sát & tư vấn giải pháp tối ưu" },
    { icon: "🛡️", title: "Thiết bị chính hãng", desc: "Sản phẩm chất lượng đầy đủ CO, CQ" },
    { icon: "👤", title: "Hỗ trợ trọn đời",    desc: "Bảo hành chính hãng" },
  ],
};