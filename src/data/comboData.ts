// ============================================================
// comboData.ts — Combo trọn gói hiển thị trên trang Sản phẩm
// ------------------------------------------------------------
// Nội dung lấy từ hồ sơ combo trong
//   documents/product-new-docu/combo-section/COMBO ĐẦU TRANG/
// gồm phần chữ (nội dung cho từng combo) và 4 ảnh poster thiết kế sẵn.
//
// Ảnh poster đã được nén và đặt trong public/combo/. Nếu bỏ trống `poster`
// thì poster sẽ được dựng bằng CSS từ chính dữ liệu bên dưới (ComboPoster).
// ============================================================

/** Một thiết bị trong combo. `productId` trỏ tới sản phẩm trong productData.ts. */
export interface ComboDevice {
  /** Vai trò trong hệ, VD "Biến tần Hybrid", "Pin lưu trữ". */
  role: string;
  /** Tên/mã model hiển thị. */
  label: string;
  productId?: number;
  quantity?: string;
  /** Dòng chú thích thêm, VD "Tổng dung lượng lưu trữ: 16–48 kWh". */
  note?: string;
}

/** Một lợi ích của combo — tiêu đề ngắn kèm câu giải thích. */
export interface ComboHighlight {
  title: string;
  description?: string;
}

export interface ComboItem {
  id: string;
  /** Dòng tiêu đề lớn trên poster, VD "COMBO HỘ GIA ĐÌNH". */
  title: string;
  /** Câu mô tả ngắn ngay dưới tiêu đề. */
  subtitle: string;
  /** Thương hiệu chủ đạo của combo — in lớn trên poster. */
  brand: string;
  brandColor: string;
  /** Số năm bảo hành đồng bộ, VD "10". */
  warrantyYears: string;
  /** Dòng chú thích bảo hành, VD "Biến tần & pin lưu trữ GoodWe". */
  warrantyNote: string;
  /** Chú thích nhỏ cho dòng bảo hành khi hồ sơ có dấu (*). */
  warrantyFootnote?: string;
  /** Các con số chính của combo: công suất · dung lượng · PV. */
  specs: string[];
  /** Đoạn dẫn nhập (chỉ một số combo có trong hồ sơ). */
  intro?: string;
  /** Dòng chân poster, VD "Tối ưu cho hộ gia đình có hóa đơn điện từ 2 triệu/tháng". */
  target: string;
  /** Cụm chữ được tô vàng trong `target`. */
  targetAccent?: string;
  badge?: string;
  highlights: ComboHighlight[];
  devices: ComboDevice[];
  /** Ảnh poster thiết kế sẵn. Bỏ trống -> poster được dựng từ dữ liệu. */
  poster?: string;
}

export const comboSectionHeader = {
  eyebrow: "Combo nổi bật",
  headline: "Combo trọn gói theo từng nhu cầu",
  description:
    "Các gói thiết bị đã được ghép sẵn theo chuẩn đồng bộ của hãng — tối ưu hiệu suất, bảo hành thống nhất và lắp đặt nhanh.",
};

export const combos: ComboItem[] = [
  // ─── COMBO 1 ───────────────────────────────────────────────
  {
    id: "goodwe-ho-gia-dinh",
    title: "COMBO HỘ GIA ĐÌNH",
    subtitle: "Giải pháp đồng bộ được nhiều khách hàng lựa chọn",
    brand: "GOODWE",
    brandColor: "#e8001c",
    warrantyYears: "10",
    warrantyNote: "Biến tần & pin lưu trữ GoodWe",
    specs: ["5–10 kW", "16–48 kWh", "PV 10–15 kWp"],
    target: "Tối ưu cho hộ gia đình có hóa đơn điện từ 2 triệu/tháng",
    targetAccent: "từ 2 triệu/tháng",
    badge: "Phổ biến nhất",
    poster: "/combo/combo-ho-gia-dinh.webp",
    highlights: [
      {
        title: "Tiết kiệm khoảng 3–5 triệu/tháng",
        description:
          "Tùy theo hóa đơn điện, thời gian sử dụng điện và cấu hình thực tế.",
      },
      {
        title: "Tận dụng điện mặt trời cả ngày lẫn tối",
        description:
          "Điện tạo ra ban ngày có thể lưu trữ để sử dụng vào buổi tối, tăng hiệu quả tự dùng.",
      },
      {
        title: "Có điện dự phòng khi mất lưới",
        description:
          "Phù hợp cho gia đình cần duy trì các tải quan trọng như đèn, quạt, tủ lạnh, wifi, camera…",
      },
      {
        title: "Thiết bị đồng bộ, dễ quản lý",
        description:
          "Biến tần và pin lưu trữ cùng hệ GoodWe, vận hành ổn định và thuận tiện giám sát.",
      },
    ],
    devices: [
      {
        role: "Biến tần Hybrid",
        label: "GoodWe 5–10 kW",
        productId: 10,
        quantity: "01 bộ",
        note: "Cấu hình poster: GW6000-ES-C10",
      },
      {
        role: "Pin lưu trữ",
        label: "GoodWe 16 kWh / bộ",
        productId: 55,
        quantity: "01–03 bộ",
        note: "Tổng dung lượng lưu trữ: 16–48 kWh",
      },
      {
        role: "Tấm pin năng lượng mặt trời",
        label: "TCL Solar N-Type TOPCon 620W",
        productId: 5,
        quantity: "16–24 tấm",
        note: "Tổng công suất PV: khoảng 10–15 kWp",
      },
    ],
  },

  // ─── COMBO 2 ───────────────────────────────────────────────
  {
    id: "goodwe-doanh-nghiep",
    title: "COMBO DOANH NGHIỆP",
    subtitle: "Giải pháp lưu trữ thông minh cho doanh nghiệp",
    brand: "GOODWE",
    brandColor: "#e8001c",
    warrantyYears: "7",
    warrantyNote: "Hệ thống lưu trữ GoodWe",
    specs: ["50 kW", "51–56 kWh lưu trữ", "PV 50–75 kWp"],
    target: "Ưu đãi dành cho doanh nghiệp có nhu cầu sử dụng điện cao",
    targetAccent: "Ưu đãi dành cho doanh nghiệp",
    poster: "/combo/combo-doanh-nghiep.webp",
    highlights: [
      {
        title: "Giảm chi phí điện vận hành",
        description:
          "Tận dụng điện mặt trời ban ngày và lưu trữ điện dư để sử dụng khi cần.",
      },
      {
        title: "Tối ưu điện giờ cao điểm",
        description:
          "Pin lưu trữ hỗ trợ giảm lượng điện mua từ lưới khi phụ tải tăng cao.",
      },
      {
        title: "Duy trì tải quan trọng khi mất điện",
        description:
          "Kết hợp STS để chuyển sang nguồn dự phòng cho các tải được lựa chọn.",
      },
      {
        title: "Hệ thống GoodWe đồng bộ",
        description:
          "Biến tần, pin lưu trữ, bộ quản lý và STS cùng hệ sinh thái, thuận tiện vận hành và giám sát.",
      },
      {
        title: "Có thể mở rộng theo nhu cầu",
        description:
          "Hỗ trợ mở rộng thêm inverter và dung lượng lưu trữ khi quy mô phụ tải của doanh nghiệp tăng lên.",
      },
    ],
    devices: [
      {
        role: "Biến tần Hybrid 3 pha",
        label: "GoodWe GW50K-ET-10",
        productId: 23,
        quantity: "01 bộ",
      },
      {
        role: "Pin lưu trữ",
        label: "GoodWe GW5.1-PACK-I-G10",
        productId: 62,
        quantity: "10–11 pack",
        note: "Tổng dung lượng: khoảng 51–56 kWh",
      },
      {
        role: "Bộ quản lý pin / PCU",
        label: "GoodWe GW110/750-PCU-I-G10",
        productId: 66,
        quantity: "01 bộ",
      },
      {
        role: "Bộ chuyển mạch STS",
        label: "GoodWe STS200-80-10",
        productId: 54,
        quantity: "01 bộ",
      },
      {
        role: "Tấm pin năng lượng mặt trời",
        label: "Theo cấu hình",
        note: "Tổng công suất PV: khoảng 50–75 kWp",
      },
      {
        role: "Khả năng mở rộng",
        label: "Có thể mở rộng theo quy mô hệ thống",
        note: "Hỗ trợ ghép song song inverter và mở rộng cụm pin lưu trữ theo cấu hình tương thích của GoodWe.",
      },
    ],
  },

  // ─── COMBO 3 ───────────────────────────────────────────────
  {
    id: "solax-nha-may",
    title: "COMBO NHÀ MÁY",
    subtitle: "Giải pháp tối ưu cho nhà máy hoạt động giờ tối",
    brand: "SOLAX",
    brandColor: "#00a0e9",
    warrantyYears: "10",
    warrantyNote: "Biến tần & bộ lưu trữ SolaX",
    warrantyFootnote: "Thời hạn bảo hành theo chính sách của hãng tại thời điểm bán.",
    specs: ["60–600 kW", "Lưu trữ 100–400 kWh/hệ", "PV đến 120 kWp/inverter"],
    intro:
      "Giải pháp Hybrid công suất lớn dành cho nhà máy có nhu cầu sử dụng điện cao, đặc biệt các đơn vị vận hành ngoài giờ nắng hoặc có ca sản xuất buổi tối.",
    target: "Ưu đãi dành cho nhà máy có mức tiêu thụ điện lớn vào giờ tối",
    targetAccent: "Ưu đãi dành cho nhà máy",
    poster: "/combo/combo-nha-may.webp",
    highlights: [
      {
        title: "Tích điện ban ngày – sử dụng vào ca tối",
        description:
          "Lưu trữ nguồn điện mặt trời dư để sử dụng khi sản lượng PV giảm hoặc không còn nắng.",
      },
      {
        title: "Giảm điện mua từ lưới khi phụ tải cao",
        description:
          "Chủ động sử dụng năng lượng lưu trữ vào những thời điểm cần thiết, hỗ trợ peak shaving và tối ưu chi phí vận hành.",
      },
      {
        title: "Hỗ trợ tải quan trọng khi mất lưới",
        description:
          "Hệ Hybrid hỗ trợ vận hành dự phòng, duy trì nguồn điện cho các tải được lựa chọn khi xảy ra sự cố mất điện.",
      },
      {
        title: "Mở rộng linh hoạt theo quy mô nhà máy",
        description:
          "X3-AELIO-60K có thể mở rộng song song tối đa 10 inverter, tương ứng tổng công suất AC từ 60–600 kW.",
      },
      {
        title: "Hệ sinh thái SolaX đồng bộ",
        description:
          "Biến tần, pin lưu trữ và BMS cùng hệ sinh thái, thuận tiện giám sát, quản lý và mở rộng hệ thống.",
      },
    ],
    devices: [
      {
        role: "Biến tần Hybrid 3 pha",
        label: "SolaX X3-AELIO-60K",
        productId: 31,
        quantity: "01–10 bộ",
        note: "60 kW/bộ · Tổng công suất 60–600 kW",
      },
      {
        role: "Pin lưu trữ",
        label: "SolaX TB-HR140",
        productId: 65,
        quantity: "07–28 module / inverter",
        note: "14,3 kWh/module · Khoảng 100–400 kWh/inverter",
      },
      {
        role: "Bộ quản lý pin – BMS",
        label: "SolaX TBMS-R15",
        productId: 70,
        quantity: "01–02 bộ / inverter",
      },
      {
        role: "Tấm pin năng lượng mặt trời",
        label: "Module hiệu suất cao",
        quantity: "Theo cấu hình",
        note: "PV khuyến nghị tối đa 120 kWp / inverter",
      },
    ],
  },

  // ─── COMBO 4 ───────────────────────────────────────────────
  {
    id: "invt-hoa-luoi",
    title: "COMBO HÒA LƯỚI",
    subtitle: "Giải pháp tối ưu cho doanh nghiệp – nhà máy hoạt động nhiều vào ban ngày",
    brand: "INVT",
    brandColor: "#005bac",
    warrantyYears: "5",
    warrantyNote: "Biến tần hòa lưới INVT",
    specs: ["40–110 kW", "PV 64–150 kWp", "Không lưu trữ"],
    intro:
      "Giải pháp hòa lưới dành cho doanh nghiệp – nhà máy có nhu cầu sử dụng điện lớn vào ban ngày.",
    target: "Tối ưu hóa đơn điện ban ngày cho doanh nghiệp – nhà máy",
    targetAccent: "Tối ưu hóa đơn điện ban ngày",
    poster: "/combo/combo-hoa-luoi.webp",
    highlights: [
      {
        title: "Giảm trực tiếp chi phí điện ban ngày",
        description:
          "Điện mặt trời được ưu tiên sử dụng ngay cho phụ tải đang vận hành, giúp giảm lượng điện mua từ lưới.",
      },
      {
        title: "Phù hợp phụ tải sản xuất ban ngày",
        description:
          "Tối ưu cho văn phòng, nhà xưởng và nhà máy hoạt động nhiều trong thời gian có nắng.",
      },
      {
        title: "Không cần pin lưu trữ – tối ưu đầu tư",
        description:
          "Cấu hình đơn giản, tập trung vào hiệu quả khai thác điện mặt trời và giảm chi phí đầu tư ban đầu.",
      },
      {
        title: "Linh hoạt theo quy mô doanh nghiệp",
        description:
          "Dải biến tần 40–110 kW, phù hợp hệ PV từ khoảng 64–150 kWp tùy model và điều kiện thiết kế.",
      },
      {
        title: "Hiệu suất cao – giám sát thuận tiện",
        description:
          "Dòng inverter hòa lưới INVT hỗ trợ nhiều MPPT và giám sát vận hành từ xa, phù hợp các hệ thương mại và công nghiệp. XG40KTR đạt hiệu suất tối đa 98,6%.",
      },
    ],
    devices: [
      {
        role: "Biến tần hòa lưới 3 pha",
        label: "INVT XG Series 40–110 kW",
        productId: 40,
        quantity: "01 bộ hoặc theo quy mô hệ thống",
        note: "Cấu hình poster: XG40KTR-AFCI",
      },
      {
        role: "Tấm pin năng lượng mặt trời",
        label: "Module hiệu suất cao",
        quantity: "Theo cấu hình",
        note: "Tổng công suất PV: khoảng 64–150 kWp / inverter",
      },
      {
        role: "Hệ thống giám sát",
        label: "INVT Monitoring",
        quantity: "01 hệ thống",
        note: "Theo dõi sản lượng và trạng thái vận hành từ xa",
      },
    ],
  },
];
