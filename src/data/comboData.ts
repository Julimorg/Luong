// ============================================================
// comboData.ts — Combo trọn gói hiển thị trên trang Sản phẩm
// ------------------------------------------------------------
// Mỗi combo được dựng thành một "poster" ngay trong ứng dụng từ
// dữ liệu bên dưới, nên chỉ cần sửa file này là đổi được nội dung.
// Khi có file ảnh poster thiết kế sẵn, thêm đường dẫn vào `poster`
// (đặt ảnh trong public/combo/…) — poster ảnh sẽ được ưu tiên.
// ============================================================

export type ComboSegment = "residential" | "business" | "agriculture";

/** Một thiết bị trong combo. `productId` trỏ tới sản phẩm trong productData.ts. */
export interface ComboDevice {
  role: string; // Biến tần / Pin lưu trữ / Tấm pin…
  label: string; // mã model hoặc tên hiển thị
  productId?: number;
  quantity?: string;
}

export interface ComboItem {
  id: string;
  segment: ComboSegment;
  /** Dòng tiêu đề lớn trên poster, VD: "COMBO HỘ GIA ĐÌNH". */
  title: string;
  /** Câu mô tả ngắn ngay dưới tiêu đề. */
  subtitle: string;
  /** Thương hiệu chủ đạo của combo — in lớn trên poster. */
  brand: string;
  brandColor: string;
  /** Số năm bảo hành đồng bộ, VD "10". */
  warrantyYears: string;
  /** Dòng chú thích bảo hành, VD "BIẾN TẦN & PIN LƯU TRỮ GOODWE". */
  warrantyNote: string;
  capacity: string;
  /** Dòng chân poster, VD "TỐI ƯU CHO HỘ GIA ĐÌNH CÓ HÓA ĐƠN ĐIỆN TỪ 2 TRIỆU/THÁNG". */
  target: string;
  /** Cụm chữ được tô vàng trong `target`. */
  targetAccent?: string;
  badge?: string;
  highlights: string[];
  devices: ComboDevice[];
  /** Ảnh poster thiết kế sẵn (tuỳ chọn). Bỏ trống -> poster được dựng từ dữ liệu. */
  poster?: string;
}

export const comboSectionHeader = {
  eyebrow: "Combo nổi bật",
  headline: "Combo trọn gói theo từng nhu cầu",
  description:
    "Các gói thiết bị đã được ghép sẵn theo chuẩn đồng bộ của hãng — tối ưu hiệu suất, bảo hành thống nhất và lắp đặt nhanh.",
};

export const combos: ComboItem[] = [
  {
    id: "goodwe-ho-gia-dinh",
    segment: "residential",
    title: "COMBO HỘ GIA ĐÌNH",
    subtitle: "Giải pháp đồng bộ được nhiều khách hàng lựa chọn",
    brand: "GOODWE",
    brandColor: "#e8001c",
    warrantyYears: "10",
    warrantyNote: "Biến tần & pin lưu trữ GoodWe",
    capacity: "6 kW – 16,1 kWh",
    target: "Tối ưu cho hộ gia đình có hóa đơn điện từ 2 triệu/tháng",
    targetAccent: "từ 2 triệu/tháng",
    badge: "Phổ biến nhất",
    highlights: [
      "Biến tần và pin lưu trữ cùng hãng — cấu hình, giám sát trên một app duy nhất",
      "Backup tải quan trọng khi mất lưới, chuyển mạch dưới 4ms",
      "Pin LFP 16,1kWh mở rộng song song tới 30 bộ khi cần thêm dung lượng",
    ],
    devices: [
      { role: "Biến tần", label: "GW6000-ES-C10", productId: 10, quantity: "01 bộ" },
      { role: "Pin lưu trữ", label: "GW16.1-BAT-LV-G10", productId: 55, quantity: "01 bộ" },
      { role: "Tấm pin", label: "TCL Solar N-Type TOPCon 620W", productId: 5, quantity: "12 tấm" },
    ],
  },
  {
    id: "goodwe-ho-gia-dinh-lon",
    segment: "residential",
    title: "COMBO GIA ĐÌNH LỚN",
    subtitle: "Dành cho biệt thự, nhà phố nhiều thiết bị công suất cao",
    brand: "GOODWE",
    brandColor: "#e8001c",
    warrantyYears: "10",
    warrantyNote: "Biến tần & pin lưu trữ GoodWe",
    capacity: "10 kW – 32,2 kWh",
    target: "Tối ưu cho hộ gia đình có hóa đơn điện từ 4 triệu/tháng",
    targetAccent: "từ 4 triệu/tháng",
    highlights: [
      "Biến tần Hybrid 10kW, dư địa mở rộng dàn pin mặt trời lên tới 20kWp",
      "Hai bộ pin 16,1kWh ghép song song cho 32,2kWh dự phòng",
      "Phù hợp nhà có điều hòa trung tâm, bếp từ, xe điện",
    ],
    devices: [
      { role: "Biến tần", label: "GW10K-ES-C10", productId: 8, quantity: "01 bộ" },
      { role: "Pin lưu trữ", label: "GW16.1-BAT-LV-G10", productId: 55, quantity: "02 bộ" },
      { role: "Tấm pin", label: "TCL Solar N-Type TOPCon 625W", productId: 6, quantity: "20 tấm" },
    ],
  },
  {
    id: "solax-ho-gia-dinh",
    segment: "residential",
    title: "COMBO SOLAX LƯU TRỮ",
    subtitle: "Hệ hybrid 1 pha gọn nhẹ, lắp đặt nhanh",
    brand: "SOLAX",
    brandColor: "#00a0e9",
    warrantyYears: "5",
    warrantyNote: "Biến tần & pin lưu trữ SolaX",
    capacity: "6 kW – 15 kWh",
    target: "Tối ưu cho hộ gia đình có hóa đơn điện từ 1,5 triệu/tháng",
    targetAccent: "từ 1,5 triệu/tháng",
    highlights: [
      "Pin T-BAT-SYS-LV D150 chuẩn IP65, làm mát tự nhiên, không quạt",
      "Mở rộng tới 16 pin song song khi nhu cầu tăng",
      "Giám sát và nâng cấp firmware từ xa",
    ],
    devices: [
      { role: "Biến tần", label: "X1-HYB-6.0-LV-EU", productId: 14, quantity: "01 bộ" },
      { role: "Pin lưu trữ", label: "T-BAT-SYS-LV D150", productId: 60, quantity: "01 bộ" },
      { role: "Tấm pin", label: "TCL Solar N-Type TOPCon 615W", productId: 4, quantity: "12 tấm" },
    ],
  },
  {
    id: "invt-nha-xuong",
    segment: "business",
    title: "COMBO NHÀ XƯỞNG",
    subtitle: "Hệ hòa lưới công suất lớn cho sản xuất – kinh doanh",
    brand: "INVT",
    brandColor: "#005bac",
    warrantyYears: "5",
    warrantyNote: "Biến tần hòa lưới INVT",
    capacity: "40 kW",
    target: "Tối ưu cho nhà xưởng, kho vận dùng điện chủ yếu ban ngày",
    targetAccent: "dùng điện chủ yếu ban ngày",
    highlights: [
      "Biến tần 3 pha 40kW tích hợp AFCI phát hiện hồ quang DC",
      "Hiệu suất tối đa tới 98,7%, chuẩn bảo vệ IP66 lắp ngoài trời",
      "Hoàn vốn nhanh nhờ tải tiêu thụ trùng giờ nắng",
    ],
    devices: [
      { role: "Biến tần", label: "XG40KTR-AFCI", productId: 40, quantity: "01 bộ" },
      { role: "Tấm pin", label: "TCL Solar N-Type TBC 655W", productId: 3, quantity: "72 tấm" },
    ],
  },
  {
    id: "goodwe-doanh-nghiep-luu-tru",
    segment: "business",
    title: "COMBO C&I LƯU TRỮ",
    subtitle: "Hybrid 3 pha kèm pin cao áp cho doanh nghiệp",
    brand: "GOODWE",
    brandColor: "#e8001c",
    warrantyYears: "5",
    warrantyNote: "Biến tần & pin cao áp GoodWe",
    capacity: "50 kW – 20,4 kWh",
    target: "Tối ưu cho doanh nghiệp cần peak shaving và backup tải quan trọng",
    targetAccent: "peak shaving và backup",
    highlights: [
      "Biến tần Hybrid C&I 50kW, hỗ trợ ghép song song mở rộng",
      "Pin cao áp GW5.1-PACK xếp tầng theo nhu cầu dung lượng",
      "Giảm chi phí điện giờ cao điểm, duy trì tải quan trọng khi mất lưới",
    ],
    devices: [
      { role: "Biến tần", label: "GW50K-ET-10", productId: 23, quantity: "01 bộ" },
      { role: "Pin lưu trữ", label: "GW5.1-PACK-I-G10", productId: 62, quantity: "04 bộ" },
      { role: "Tấm pin", label: "JA Solar DeepBlue 4.0 Pro 630W", productId: 1, quantity: "90 tấm" },
    ],
  },
  {
    id: "sungrow-trang-trai",
    segment: "agriculture",
    title: "COMBO TRANG TRẠI",
    subtitle: "Chủ động nguồn điện cho tưới tiêu, nhà kính, chăn nuôi",
    brand: "SUNGROW",
    brandColor: "#fbae17",
    warrantyYears: "5",
    warrantyNote: "Biến tần hòa lưới Sungrow",
    capacity: "20 kW",
    target: "Tối ưu cho trang trại, nhà kính chạy bơm và quạt ban ngày",
    targetAccent: "chạy bơm và quạt ban ngày",
    highlights: [
      "Biến tần 3 pha SG20RT bền bỉ trong điều kiện ngoài trời khắc nghiệt",
      "Giảm mạnh chi phí điện bơm tưới và vận hành máy móc",
      "Có thể nâng cấp thêm lưu trữ khi mở rộng quy mô",
    ],
    devices: [
      { role: "Biến tần", label: "SG20RT", productId: 47, quantity: "01 bộ" },
      { role: "Tấm pin", label: "TCL Solar N-Type TOPCon 620W", productId: 5, quantity: "36 tấm" },
    ],
  },
];
