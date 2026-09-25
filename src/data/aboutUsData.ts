// ============================================================
// aboutUsData.ts — Dữ liệu trang Giới thiệu (About Us)
// ============================================================

import { processSection, processSteps } from "./dashBoardData";

export interface Crumb {
  label: string;
  to: string;
}

export const aboutBreadcrumb: Crumb[] = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
];

// ---------- INTRO (giữ nguyên, không đổi) ----------
export const aboutIntro = {
  eyebrow: "GIỚI THIỆU",
  brand: "VIETHUNGSOLAR",
  paragraphs: [
    "VIETHUNGSOLAR là thương hiệu thuộc CÔNG TY TNHH XÂY DỰNG VÀ THƯƠNG MẠI HÙNG VIỆT HƯNG, chuyên tư vấn, thiết kế và thi công hệ thống điện năng lượng mặt trời cho hộ gia đình, doanh nghiệp, nhà xưởng và trang trại.",
    "Chúng tôi mang đến các giải pháp năng lượng sạch, giúp khách hàng tiết kiệm chi phí điện, tối ưu hiệu quả đầu tư và hướng tới phát triển bền vững.",
  ],
};

export interface AboutStat {
  value: string;
  label: string;
}
export const aboutStats: AboutStat[] = [
  { value: "50+", label: "Dự án đã triển khai" },
  { value: "100%", label: "Thiết bị chính hãng" },
  { value: "Đồng hành", label: "Dài hạn cùng khách hàng" },
];

// ---------- TUYÊN NGÔN THƯƠNG HIỆU ----------
export const aboutManifesto = {
  eyebrow: "GIÁ TRỊ CHÚNG TÔI THEO ĐUỔI",
  /** Tiêu đề tách hai vế để tô màu vàng cho vế sau. */
  headline: "BIẾN ÁNH NẮNG",
  headlineAccent: "THÀNH LỢI NHUẬN",
  description:
    "Mỗi mái nhà, mỗi công trình đều có thể trở thành một nguồn năng lượng tạo ra giá trị lâu dài.",
  missionLine:
    "Sứ mệnh: Biến nguồn năng lượng mặt trời thành giá trị kinh tế thực tế cho từng công trình.",
  visionLine:
    "Tầm nhìn: Đồng hành cùng khách hàng xây dựng giải pháp năng lượng hiệu quả và bền vững.",
};

// ---------- VÌ SAO CHỌN — bố cục bento bất đối xứng ----------
export const aboutWhySection = {
  eyebrow: "LÝ DO LỰA CHỌN",
  headline: "Vì sao chọn VIETHUNGSOLAR?",
  description: "Chúng tôi không chỉ cung cấp thiết bị, mà còn mang đến giải pháp tối ưu, đồng hành lâu dài cùng khách hàng.",
};
export interface WhyChooseItem {
  icon: "search" | "handshake" | "shield" | "engineering" | "support" | "check";
  title: string;
  description: string;
  /** Nếu có, thẻ chỉ hiển thị ảnh này, bỏ hết icon và chữ. */
  banner?: { src: string; alt: string };
}
export const aboutWhyItems: WhyChooseItem[] = [
  { icon: "shield", title: "Thiết bị chính hãng", description: "Sản phẩm từ các thương hiệu uy tín hàng đầu, có đầy đủ chứng chỉ CO, CQ, đảm bảo nguồn gốc minh bạch và hiệu suất ổn định lâu dài." },
  { icon: "search", title: "Khảo sát thực tế", description: "Khảo sát tận nơi, đánh giá chính xác nhu cầu và hiện trạng." },
  { icon: "handshake", title: "Tư vấn phù hợp", description: "Tối ưu hiệu quả đầu tư theo từng nhu cầu thực tế." },
  { icon: "engineering", title: "Thi công đúng kỹ thuật", description: "Đội ngũ giàu kinh nghiệm, an toàn và hiệu quả." },
  { icon: "support", title: "Hỗ trợ sau bán hàng", description: "Bảo hành, bảo trì tận tâm, đồng hành dài hạn." },
  // Thẻ cuối là dải ảnh đối tác, không dùng icon/chữ; title chỉ để làm key.
  {
    icon: "check",
    title: "Đối tác chiến lược DATSOLAR",
    description: "",
    banner: {
      src: "/background/about/datsolar-partner.webp",
      alt: "VIETHUNGSOLAR là đối tác chiến lược của DATSOLAR — kết nối nguồn hàng chính hãng, nâng cao giá trị từng công trình",
    },
  },
];

// ---------- NĂNG LỰC — dải số liệu chạy số khi cuộn tới ----------
export interface AboutCapability {
  /** Giá trị số dùng cho hiệu ứng đếm. */
  value: number;
  /** Ký tự đứng trước / sau con số, VD "+", "%". */
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
}
export const aboutCapabilitySection = {
  eyebrow: "NĂNG LỰC",
  headline: "Những con số nói thay lời giới thiệu",
  description:
    "Tất cả thiết bị VIETHUNGSOLAR phân phối đều có hồ sơ kỹ thuật, datasheet và chính sách bảo hành rõ ràng từ hãng.",
};
export const aboutCapabilities: AboutCapability[] = [
  { value: 50, suffix: "+", label: "Dự án đã triển khai", note: "Hộ gia đình, nhà xưởng, trang trại trên khắp cả nước" },
  { value: 8, suffix: "", label: "Thương hiệu phân phối", note: "LONGi, JA Solar, TCL, GoodWe, Sungrow, SolaX, INVT, Lithium Valley" },
  { value: 100, suffix: "%", label: "Thiết bị chính hãng", note: "Đầy đủ CO, CQ và datasheet kỹ thuật kèm theo" },
  { value: 30, suffix: " năm", label: "Bảo hành công suất", note: "Tấm pin N-Type bảo hành hiệu suất tuyến tính tới 30 năm" },
];

// ---------- QUY TRÌNH TRIỂN KHAI ----------
// Nội dung lấy thẳng từ trang chủ (dashBoardData) để hai trang luôn nói
// cùng một quy trình; sửa ở trang chủ là trang Giới thiệu đổi theo.
export interface AboutProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export const aboutProcessSection = {
  eyebrow: processSection.eyebrow,
  headline: processSection.headline,
  description: processSection.description,
};

/** Thời lượng từng bước — phần riêng của trang Giới thiệu, trang chủ không hiển thị. */
const ABOUT_STEP_DURATIONS = ["1 ngày", "1 – 2 ngày", "2 – 3 ngày", "3 – 7 ngày", "Dài hạn"];

export const aboutProcessSteps: AboutProcessStep[] = processSteps.map((s, i) => ({
  step: String(i + 1).padStart(2, "0"),
  title: s.title,
  description: s.description,
  duration: ABOUT_STEP_DURATIONS[i] ?? "",
}));

// ---------- HỆ SINH THÁI THIẾT BỊ ----------
export const aboutEcosystemSection = {
  eyebrow: "HỆ SINH THÁI THIẾT BỊ",
  headline: "Đầy đủ thiết bị cho một hệ thống hoàn chỉnh",
  description:
    "Từ tấm pin, inverter đến pin lưu trữ và các bộ quản lý — tất cả đều có hồ sơ kỹ thuật đầy đủ trên trang Sản phẩm.",
  ctaLabel: "Xem toàn bộ sản phẩm",
  ctaTo: "/san-pham",
};

// ---------- CÂU HỎI THƯỜNG GẶP ----------
