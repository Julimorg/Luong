// ============================================================
// productDetailData.ts — Nội dung chi tiết từng sản phẩm
// ============================================================

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDocument {
  label: string;
  fileUrl: string; // link tải hoặc xem PDF
}

export interface ProductDetail {
  productId: number;          // khớp với Product.id trong productData.ts
  images: string[];           // gallery ảnh (index 0 = ảnh chính)
  description: string;        // mô tả tổng quan
  highlights: string[];       // điểm nổi bật (bullet)
  fullSpecs: ProductSpec[];   // bảng thông số kỹ thuật đầy đủ
  documents: ProductDocument[]; // tài liệu / datasheet
  warranty: string;           // thông tin bảo hành
  origin: string;             // xuất xứ
}

export const productDetails: ProductDetail[] = [
  // ── Tấm pin: Canadian Solar HiKu 615W ────────────────────
  {
    productId: 1,
    images: [
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80",
      "https://images.unsplash.com/photo-1615463165434-f824748945ec?w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    ],
    description:
      "Tấm pin Canadian Solar HiKu 615W sử dụng công nghệ N-Type TOPCon thế hệ mới, mang lại hiệu suất chuyển đổi vượt trội lên đến 22.5%. Thiết kế khung nhôm anodized bền bỉ, chịu tải tuyết 5400 Pa và tải gió 2400 Pa, phù hợp với mọi điều kiện khí hậu tại Việt Nam.",
    highlights: [
      "Công nghệ N-Type TOPCon — hiệu suất cao, suy giảm thấp",
      "Hệ số nhiệt độ âm tốt: -0.30%/°C",
      "Khả năng chịu bóng mờ (shade tolerance) vượt trội",
      "Chứng nhận IEC 61215, IEC 61730, UL 61730",
      "Bảo hành công suất tuyến tính 30 năm",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "615 Wp" },
      { label: "Hiệu suất mô-đun",            value: "22.5%" },
      { label: "Điện áp hở mạch (Voc)",       value: "49.5 V" },
      { label: "Dòng ngắn mạch (Isc)",        value: "15.66 A" },
      { label: "Điện áp MPP (Vmpp)",          value: "41.6 V" },
      { label: "Dòng MPP (Impp)",             value: "14.78 A" },
      { label: "Công nghệ cell",              value: "N-Type TOPCon" },
      { label: "Số cell",                     value: "132 (half-cut)" },
      { label: "Kích thước",                  value: "2278 × 1134 × 35 mm" },
      { label: "Khối lượng",                  value: "32.5 kg" },
      { label: "Hệ số nhiệt độ (Pmax)",       value: "-0.30%/°C" },
      { label: "Chịu tải tuyết / gió",        value: "5400 / 2400 Pa" },
      { label: "Cấp bảo vệ",                  value: "IP68" },
      { label: "Bảo hành sản phẩm",           value: "15 năm" },
      { label: "Bảo hành công suất",          value: "30 năm tuyến tính" },
    ],
    documents: [
      { label: "Datasheet Canadian Solar HiKu 615W", fileUrl: "#" },
      { label: "Hướng dẫn lắp đặt",                  fileUrl: "#" },
      { label: "Chứng nhận IEC / UL",                fileUrl: "#" },
    ],
    warranty: "Bảo hành sản phẩm 15 năm. Bảo hành công suất tuyến tính 30 năm — đảm bảo tối thiểu 87.4% công suất sau năm thứ 30.",
    origin:   "Canada (sản xuất tại Việt Nam & Thái Lan)",
  },

  // ── Tấm pin: TCL Solar TOPCon 620W ───────────────────────
  {
    productId: 2,
    images: [
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    ],
    description:
      "TCL Solar TOPCon 620W là dòng sản phẩm cao cấp từ thương hiệu TCL, ứng dụng công nghệ N-Type TOPCon tiên tiến. Phù hợp cho hệ thống mái nhà dân dụng và thương mại quy mô vừa.",
    highlights: [
      "Công nghệ N-Type TOPCon thế hệ mới",
      "Suy giảm công suất năm đầu chỉ 1%",
      "Khung nhôm chịu lực cao, chống ăn mòn",
      "Phù hợp khí hậu nhiệt đới",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "620 Wp" },
      { label: "Hiệu suất mô-đun",            value: "22.1%" },
      { label: "Điện áp hở mạch (Voc)",       value: "50.2 V" },
      { label: "Dòng ngắn mạch (Isc)",        value: "15.80 A" },
      { label: "Công nghệ cell",              value: "N-Type TOPCon" },
      { label: "Số cell",                     value: "132 (half-cut)" },
      { label: "Kích thước",                  value: "2278 × 1134 × 35 mm" },
      { label: "Khối lượng",                  value: "32.8 kg" },
      { label: "Cấp bảo vệ",                  value: "IP68" },
      { label: "Bảo hành sản phẩm",           value: "12 năm" },
      { label: "Bảo hành công suất",          value: "25 năm tuyến tính" },
    ],
    documents: [
      { label: "Datasheet TCL Solar TOPCon 620W", fileUrl: "#" },
      { label: "Chứng nhận chất lượng",           fileUrl: "#" },
    ],
    warranty: "Bảo hành sản phẩm 12 năm. Bảo hành công suất 25 năm.",
    origin:   "Trung Quốc",
  },

  // ── Tấm pin: LONGi Hi-MO X6 620W ─────────────────────────
  {
    productId: 3,
    images: [
      "https://images.unsplash.com/photo-1615463165434-f824748945ec?w=800&q=80",
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80",
    ],
    description:
      "LONGi Hi-MO X6 620W ứng dụng công nghệ HPBC (Hybrid Passivated Back Contact) độc quyền, mang lại hiệu suất hàng đầu trong phân khúc tấm pin mái nhà. Thiết kế all-black thẩm mỹ cao.",
    highlights: [
      "Công nghệ HPBC độc quyền của LONGi",
      "Hiệu suất lên đến 23.1% — top đầu thị trường",
      "Thiết kế all-black thẩm mỹ cho nhà ở",
      "Suy giảm công suất cực thấp < 0.4%/năm",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "620 Wp" },
      { label: "Hiệu suất mô-đun",            value: "23.1%" },
      { label: "Điện áp hở mạch (Voc)",       value: "51.4 V" },
      { label: "Dòng ngắn mạch (Isc)",        value: "15.32 A" },
      { label: "Công nghệ cell",              value: "HPBC" },
      { label: "Kích thước",                  value: "2256 × 1133 × 35 mm" },
      { label: "Khối lượng",                  value: "31.8 kg" },
      { label: "Cấp bảo vệ",                  value: "IP68" },
      { label: "Bảo hành sản phẩm",           value: "15 năm" },
      { label: "Bảo hành công suất",          value: "30 năm" },
    ],
    documents: [
      { label: "Datasheet LONGi Hi-MO X6",    fileUrl: "#" },
      { label: "Hướng dẫn lắp đặt LONGi",    fileUrl: "#" },
    ],
    warranty: "Bảo hành sản phẩm 15 năm. Bảo hành công suất 30 năm.",
    origin:   "Trung Quốc",
  },

  // ── Tấm pin: JA Solar 620W ────────────────────────────────
  {
    productId: 4,
    images: [
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80",
    ],
    description:
      "JA Solar DeepBlue 4.0 Pro 620W là tấm pin N-Type hiệu suất cao, phù hợp cho dự án thương mại và công nghiệp. Thiết kế tối ưu khả năng chịu đựng điều kiện khắc nghiệt.",
    highlights: [
      "N-Type cell — ít bị PID (Potential Induced Degradation)",
      "Tương thích với hầu hết inverter trên thị trường",
      "Chứng nhận IEC, MCS, UL",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "620 Wp" },
      { label: "Hiệu suất mô-đun",            value: "22.4%" },
      { label: "Công nghệ cell",              value: "N-Type" },
      { label: "Kích thước",                  value: "2278 × 1134 × 35 mm" },
      { label: "Bảo hành sản phẩm",           value: "12 năm" },
      { label: "Bảo hành công suất",          value: "25 năm" },
    ],
    documents: [
      { label: "Datasheet JA Solar DeepBlue 4.0", fileUrl: "#" },
    ],
    warranty: "Bảo hành sản phẩm 12 năm. Bảo hành công suất 25 năm.",
    origin:   "Trung Quốc",
  },

  // ── Tấm pin: Astronergy 620W ──────────────────────────────
  {
    productId: 5,
    images: [
      "https://images.unsplash.com/photo-1615463165434-f824748945ec?w=800&q=80",
    ],
    description:
      "Astronergy ASTRO N7 620W sử dụng công nghệ TOPCon tiên tiến, thuộc danh sách Bloomberg Tier 1. Thương hiệu uy tín với hơn 20 năm kinh nghiệm sản xuất tấm pin.",
    highlights: [
      "Bloomberg Tier 1 — uy tín tài chính hàng đầu",
      "Công nghệ TOPCon — hiệu suất & độ bền vượt trội",
      "Suy giảm công suất thấp < 0.4%/năm",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "620 Wp" },
      { label: "Hiệu suất mô-đun",            value: "22.6%" },
      { label: "Công nghệ cell",              value: "TOPCon" },
      { label: "Bảo hành sản phẩm",           value: "12 năm" },
      { label: "Bảo hành công suất",          value: "25 năm" },
    ],
    documents: [
      { label: "Datasheet Astronergy ASTRO N7", fileUrl: "#" },
    ],
    warranty: "Bảo hành 12 năm sản phẩm, 25 năm công suất.",
    origin:   "Trung Quốc",
  },

  // ── Tấm pin: Jinko Tiger Neo 620W ────────────────────────
  {
    productId: 6,
    images: [
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80",
    ],
    description:
      "Jinko Solar Tiger Neo 620W là dòng sản phẩm đỉnh cao từ nhà sản xuất tấm pin lớn nhất thế giới. Công nghệ N-Type TOPCon đảm bảo hiệu suất cao và độ bền lâu dài.",
    highlights: [
      "Nhà sản xuất tấm pin số 1 thế giới về sản lượng",
      "N-Type TOPCon — hiệu suất cao nhất phân khúc",
      "Chứng nhận IEC 61215, IEC 61730",
    ],
    fullSpecs: [
      { label: "Công suất định mức (Pmax)",   value: "620 Wp" },
      { label: "Hiệu suất mô-đun",            value: "22.8%" },
      { label: "Công nghệ cell",              value: "N-Type TOPCon" },
      { label: "Bảo hành sản phẩm",           value: "15 năm" },
      { label: "Bảo hành công suất",          value: "30 năm" },
    ],
    documents: [
      { label: "Datasheet Jinko Tiger Neo 620W", fileUrl: "#" },
    ],
    warranty: "Bảo hành sản phẩm 15 năm. Bảo hành công suất 30 năm.",
    origin:   "Trung Quốc",
  },

  // ── Inverter: Sungrow SG50CX ──────────────────────────────
  {
    productId: 7,
    images: [
      "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=800&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    ],
    description:
      "Sungrow SG50CX là inverter hòa lưới 3 pha công suất 50kW, tích hợp nhiều MPPT để tối ưu sản lượng điện trong mọi điều kiện bóng mờ. Phù hợp cho hệ thống thương mại và công nghiệp.",
    highlights: [
      "Hiệu suất chuyển đổi lên đến 98.6%",
      "12 MPPT đầu vào — tối ưu mọi cấu hình mái",
      "Tích hợp bộ giám sát IV curve tự động",
      "Thiết kế không cần quạt tản nhiệt — yên tĩnh, bền lâu",
      "Chứng nhận IEC 62109, CE, VDE, AS/NZS",
    ],
    fullSpecs: [
      { label: "Công suất AC định mức",        value: "50 kW" },
      { label: "Công suất DC tối đa",          value: "62.5 kW" },
      { label: "Số MPPT",                      value: "12" },
      { label: "Điện áp DC tối đa",            value: "1100 V" },
      { label: "Hiệu suất tối đa",             value: "98.6%" },
      { label: "Hiệu suất Euro",               value: "98.1%" },
      { label: "Điện áp AC đầu ra",            value: "3W+N+PE, 220/380 V" },
      { label: "Dải tần số",                   value: "47 – 52 Hz" },
      { label: "Cấp bảo vệ",                   value: "IP66" },
      { label: "Kích thước",                   value: "661 × 584 × 263 mm" },
      { label: "Khối lượng",                   value: "62 kg" },
      { label: "Dải nhiệt độ hoạt động",       value: "-25 đến +60°C" },
      { label: "Bảo hành",                     value: "10 năm (có thể gia hạn)" },
    ],
    documents: [
      { label: "Datasheet Sungrow SG50CX",      fileUrl: "#" },
      { label: "Hướng dẫn lắp đặt & vận hành", fileUrl: "#" },
      { label: "Chứng nhận CE / VDE",           fileUrl: "#" },
    ],
    warranty: "Bảo hành tiêu chuẩn 10 năm. Có thể gia hạn lên 20 năm theo gói dịch vụ Sungrow Care.",
    origin:   "Trung Quốc (Sungrow Power Supply Co., Ltd.)",
  },

  // ── Inverter: SMA Sunny Tripower Core1 ───────────────────
  {
    productId: 8,
    images: [
      "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=800&q=80",
    ],
    description:
      "SMA Sunny Tripower Core1 là inverter 3 pha cao cấp từ thương hiệu Đức, nổi tiếng về độ bền và độ tin cậy. Phù hợp cho các dự án thương mại yêu cầu chất lượng cao.",
    highlights: [
      "Thương hiệu Đức — tiêu chuẩn chất lượng châu Âu",
      "Hiệu suất lên đến 98.8%",
      "Tích hợp Web Connect giám sát từ xa",
      "Tương thích với nhiều loại pin lưu trữ",
    ],
    fullSpecs: [
      { label: "Công suất AC định mức",  value: "50 kW" },
      { label: "Số MPPT",                value: "6" },
      { label: "Hiệu suất tối đa",       value: "98.8%" },
      { label: "Cấp bảo vệ",             value: "IP65" },
      { label: "Bảo hành",               value: "10 năm" },
    ],
    documents: [
      { label: "Datasheet SMA Sunny Tripower Core1", fileUrl: "#" },
    ],
    warranty: "Bảo hành 10 năm tiêu chuẩn.",
    origin:   "Đức (SMA Solar Technology AG)",
  },

  // ── Inverter: GoodWe ET Plus+ 10kW ───────────────────────
  {
    productId: 9,
    images: [
      "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=800&q=80",
    ],
    description:
      "GoodWe ET Plus+ 10kW là inverter hybrid cho phép kết nối pin lưu trữ trực tiếp, tối ưu tự dùng và dự phòng điện. Lý tưởng cho hộ gia đình và doanh nghiệp nhỏ.",
    highlights: [
      "Hybrid inverter — vừa hòa lưới vừa lưu trữ",
      "Chức năng backup — dự phòng khi mất điện lưới",
      "Tích hợp màn hình hiển thị trực tiếp",
      "Kết nối app SEMS Portal giám sát từ xa",
    ],
    fullSpecs: [
      { label: "Công suất AC định mức",  value: "10 kW" },
      { label: "Loại",                   value: "Hybrid (On/Off-grid)" },
      { label: "Số MPPT",                value: "2" },
      { label: "Hiệu suất tối đa",       value: "97.6%" },
      { label: "Cổng pin",               value: "High Voltage (100 – 550V)" },
      { label: "Cấp bảo vệ",             value: "IP65" },
      { label: "Bảo hành",               value: "10 năm" },
    ],
    documents: [
      { label: "Datasheet GoodWe ET Plus+", fileUrl: "#" },
    ],
    warranty: "Bảo hành 10 năm.",
    origin:   "Trung Quốc (GoodWe Technologies Co., Ltd.)",
  },

  // ── Inverter: Sungrow MG10RL ──────────────────────────────
  {
    productId: 10,
    images: [
      "https://images.unsplash.com/photo-1605732562742-3023a888e56e?w=800&q=80",
    ],
    description:
      "Sungrow MG10RL 10kW là inverter hybrid dân dụng tích hợp quản lý năng lượng thông minh, phù hợp cho hộ gia đình muốn tối ưu hóa tự dùng và giảm hóa đơn điện.",
    highlights: [
      "Tích hợp bộ quản lý năng lượng thông minh (EMS)",
      "Hỗ trợ pin Sungrow SBR — lắp đặt dễ dàng",
      "Giám sát qua app iSolarCloud",
    ],
    fullSpecs: [
      { label: "Công suất AC định mức",  value: "10 kW" },
      { label: "Loại",                   value: "Hybrid" },
      { label: "Hiệu suất tối đa",       value: "98.4%" },
      { label: "Cấp bảo vệ",             value: "IP65" },
      { label: "Bảo hành",               value: "10 năm" },
    ],
    documents: [
      { label: "Datasheet Sungrow MG10RL", fileUrl: "#" },
    ],
    warranty: "Bảo hành 10 năm tiêu chuẩn.",
    origin:   "Trung Quốc",
  },

  // ── Pin lưu trữ: Pylontech Force H2 ──────────────────────
  {
    productId: 11,
    images: [
      "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    description:
      "Pylontech Force H2 là hệ thống pin lưu trữ LFP (Lithium Iron Phosphate) modular, có thể mở rộng linh hoạt từ 7.1 đến 24.86 kWh. An toàn, vòng đời dài, phù hợp cho cả hộ gia đình lẫn thương mại.",
    highlights: [
      "Pin LFP — an toàn nhất trong các loại pin Lithium",
      "Modular — dễ mở rộng dung lượng theo nhu cầu",
      "Vòng đời >6000 chu kỳ ở 90% DOD",
      "BMS tích hợp bảo vệ đa lớp",
      "Tương thích với hầu hết inverter hybrid trên thị trường",
    ],
    fullSpecs: [
      { label: "Dung lượng khả dụng",    value: "7.1 – 24.86 kWh" },
      { label: "Hóa học pin",            value: "LFP (Lithium Iron Phosphate)" },
      { label: "Điện áp định mức",       value: "48 V" },
      { label: "Dòng sạc/xả tối đa",    value: "150 A" },
      { label: "Độ sâu phóng điện",      value: "90% DOD" },
      { label: "Vòng đời",               value: "> 6000 chu kỳ" },
      { label: "Hiệu suất vòng tròn",    value: "≥ 95%" },
      { label: "Cấp bảo vệ",             value: "IP55" },
      { label: "Dải nhiệt độ hoạt động", value: "-10 đến +50°C" },
      { label: "Kết nối",                value: "CAN / RS485" },
      { label: "Bảo hành",               value: "10 năm" },
    ],
    documents: [
      { label: "Datasheet Pylontech Force H2",   fileUrl: "#" },
      { label: "Hướng dẫn lắp đặt & vận hành",  fileUrl: "#" },
      { label: "Chứng nhận CE / UN38.3",         fileUrl: "#" },
    ],
    warranty: "Bảo hành 10 năm, đảm bảo 80% dung lượng sau 10 năm sử dụng.",
    origin:   "Trung Quốc (Pylontech Co., Ltd.)",
  },

  // ── Pin lưu trữ: Lithium Valley LV-Stack ─────────────────
  {
    productId: 12,
    images: [
      "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&q=80",
    ],
    description:
      "Lithium Valley LV-Stack là hệ thống pin lưu trữ high-voltage modular, dung lượng 10 – 30 kWh, phù hợp cho dự án thương mại và khu công nghiệp.",
    highlights: [
      "High-voltage design — tương thích inverter HV",
      "Modular — lắp đặt và mở rộng dễ dàng",
      "BMS tích hợp bảo vệ nhiệt, quá áp, quá dòng",
    ],
    fullSpecs: [
      { label: "Dung lượng khả dụng",    value: "10 – 30 kWh" },
      { label: "Hóa học pin",            value: "LFP" },
      { label: "Điện áp định mức",       value: "200 – 800 V (HV)" },
      { label: "Cấp bảo vệ",             value: "IP55" },
      { label: "Bảo hành",               value: "10 năm" },
    ],
    documents: [
      { label: "Datasheet Lithium Valley LV-Stack", fileUrl: "#" },
    ],
    warranty: "Bảo hành 10 năm.",
    origin:   "Trung Quốc",
  },
];