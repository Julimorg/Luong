// ============================================================
// productsData.ts — Cấu hình nội dung trang Sản phẩm
// ============================================================

// ---------- BREADCRUMB ----------
export const productsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Sản phẩm", to: "/san-pham" },
];

// ---------- PAGE HEADER ----------
export const productsPageHeader = {
  headline: "Sản phẩm",
  description:
    "Cung cấp thiết bị năng lượng mặt trời chính hãng, chất lượng cao từ các thương hiệu hàng đầu thế giới.",
};

// ---------- FILTER TABS ----------
export type ProductCategory =
  | "all"
  | "tam-pin"
  | "inverter"
  | "pin-luu-tru"
  | "phu-kien";

export const productTabs: { label: string; value: ProductCategory }[] = [
  { label: "Tất cả",             value: "all" },
  { label: "Tấm pin mặt trời",   value: "tam-pin" },
  { label: "Inverter / Biến tần",value: "inverter" },
  { label: "Pin lưu trữ",        value: "pin-luu-tru" },
  { label: "Phụ kiện & thiết bị",value: "phu-kien" },
];

// ---------- PRODUCTS ----------
export interface Product {
  id: number;
  category: ProductCategory;
  image: string;
  brand: string;
  name: string;
  specs: { label: string; value: string }[];
  tag?: string; // "Bán chạy" | "Mới" | "Khuyến mãi"
}

export const products: Product[] = [
  // ── Tấm pin ──────────────────────────────────────────
  {
    id: 1,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    brand: "JA Solar",
    name: "Tấm pin JA Solar JAM72S30 550W",
    tag: "Bán chạy",
    specs: [
      { label: "Công suất",   value: "550 Wp" },
      { label: "Hiệu suất",   value: "21.3%" },
      { label: "Bảo hành",    value: "25 năm" },
    ],
  },
  {
    id: 2,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
    brand: "LONGi",
    name: "Tấm pin LONGi Hi-MO 6 570W",
    tag: "Mới",
    specs: [
      { label: "Công suất",   value: "570 Wp" },
      { label: "Hiệu suất",   value: "22.0%" },
      { label: "Bảo hành",    value: "25 năm" },
    ],
  },
  {
    id: 3,
    category: "tam-pin",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    brand: "Canadian Solar",
    name: "Tấm pin Canadian Solar CS6W-545MS",
    specs: [
      { label: "Công suất",   value: "545 Wp" },
      { label: "Hiệu suất",   value: "20.9%" },
      { label: "Bảo hành",    value: "25 năm" },
    ],
  },

  // ── Inverter ─────────────────────────────────────────
  {
    id: 4,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    brand: "Sungrow",
    name: "Inverter Sungrow SG110CX 110kW",
    tag: "Bán chạy",
    specs: [
      { label: "Công suất",   value: "110 kW" },
      { label: "Hiệu suất",   value: "98.7%" },
      { label: "Bảo hành",    value: "10 năm" },
    ],
  },
  {
    id: 5,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    brand: "Huawei",
    name: "Inverter Huawei SUN2000-60KTL 60kW",
    tag: "Mới",
    specs: [
      { label: "Công suất",   value: "60 kW" },
      { label: "Hiệu suất",   value: "98.6%" },
      { label: "Bảo hành",    value: "10 năm" },
    ],
  },
  {
    id: 6,
    category: "inverter",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
    brand: "SMA",
    name: "Inverter SMA Sunny Tripower 15kW",
    specs: [
      { label: "Công suất",   value: "15 kW" },
      { label: "Hiệu suất",   value: "98.4%" },
      { label: "Bảo hành",    value: "5 năm" },
    ],
  },

  // ── Pin lưu trữ ──────────────────────────────────────
  {
    id: 7,
    category: "pin-luu-tru",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    brand: "BYD",
    name: "Pin lưu trữ BYD Battery-Box Premium HVS 10.2kWh",
    tag: "Bán chạy",
    specs: [
      { label: "Dung lượng",  value: "10.2 kWh" },
      { label: "Điện áp",     value: "200 – 800 V" },
      { label: "Bảo hành",    value: "10 năm" },
    ],
  },
  {
    id: 8,
    category: "pin-luu-tru",
    image: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=600&q=80",
    brand: "Pylontech",
    name: "Pin lưu trữ Pylontech US5000 4.8kWh",
    specs: [
      { label: "Dung lượng",  value: "4.8 kWh" },
      { label: "Điện áp",     value: "48 V" },
      { label: "Bảo hành",    value: "10 năm" },
    ],
  },

  // ── Phụ kiện ─────────────────────────────────────────
  {
    id: 9,
    category: "phu-kien",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
    brand: "K2 Systems",
    name: "Khung giá đỡ mái nghiêng K2 Systems",
    specs: [
      { label: "Chất liệu",   value: "Nhôm anodized" },
      { label: "Tải trọng",   value: "5.4 kN/m²" },
      { label: "Bảo hành",    value: "10 năm" },
    ],
  },
  {
    id: 10,
    category: "phu-kien",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    brand: "Schneider",
    name: "Tủ điện AC Schneider Easy9 3 pha",
    specs: [
      { label: "Số cực",      value: "3 pha" },
      { label: "Dòng định mức","value": "125 A" },
      { label: "Bảo vệ",     value: "IP65" },
    ],
  },
];