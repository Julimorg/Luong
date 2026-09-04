// ============================================================
// aboutUsData.ts — Dữ liệu trang Giới thiệu (About Us)
// ============================================================

export interface Crumb {
  label: string;
  to: string;
}

export interface AboutField {
  id: string;
  icon: "home" | "business" | "factory" | "agriculture" | "battery";
  title: string;
}

export interface AboutCommitment {
  commit: string;
  value: string; 
}

export const aboutBreadcrumb: Crumb[] = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
];

export const aboutIntro = {
  eyebrow: "GIỚI THIỆU",
  brand: "VIETHUNGSOLAR",
  paragraphs: [
    "VIETHUNGSOLAR là thương hiệu thuộc CÔNG TY TNHH XÂY DỰNG VÀ THƯƠNG MẠI HÙNG VIỆT HƯNG, chuyên tư vấn, thiết kế và thi công hệ thống điện năng lượng mặt trời cho hộ gia đình, doanh nghiệp, nhà xưởng và trang trại.",
    "Chúng tôi mang đến các giải pháp năng lượng sạch, giúp khách hàng tiết kiệm chi phí điện, tối ưu hiệu quả đầu tư và hướng tới phát triển bền vững.",
  ],
  image:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=85",
  imageAlt: "Hệ thống điện mặt trời VIETHUNGSOLAR",
};

export const aboutFieldsSection = {
  headline: "LĨNH VỰC HOẠT ĐỘNG",
};

export const aboutFields: AboutField[] = [
  { id: "ho-gia-dinh", icon: "home", title: "Điện mặt trời hộ gia đình" },
  { id: "doanh-nghiep", icon: "business", title: "Điện mặt trời doanh nghiệp" },
  { id: "nha-xuong", icon: "factory", title: "Điện mặt trời nhà xưởng" },
  { id: "trang-trai", icon: "agriculture", title: "Điện mặt trời trang trại" },
  { id: "luu-tru", icon: "battery", title: "Giải pháp lưu trữ năng lượng" },
];

export const aboutWhySection = {
  headline: "VÌ SAO CHỌN VIETHUNGSOLAR?",
  colCommit: "CHÚNG TÔI CAM KẾT",
  colValue: "GIÁ TRỊ KHÁCH HÀNG NHẬN ĐƯỢC",
};

export const aboutCommitments: AboutCommitment[] = [
  {
    commit: "Khảo sát thực tế trước khi thiết kế",
    value: "Giải pháp phù hợp với nhu cầu sử dụng và ngân sách.",
  },
  {
    commit: "Thiết kế tối ưu theo từng công trình",
    value: "Tăng hiệu quả đầu tư và khả năng vận hành lâu dài.",
  },
  {
    commit: "Thi công đúng quy trình kỹ thuật",
    value: "Đảm bảo an toàn, tính thẩm mỹ và độ bền hệ thống.",
  },
  {
    commit: "Sử dụng thiết bị chính hãng",
    value: "Hiệu suất ổn định và nguồn gốc minh bạch.",
  },
  {
    commit: "Chính sách bảo hành rõ ràng",
    value: "An tâm trong quá trình sử dụng.",
  },
  {
    commit: "Hỗ trợ kỹ thuật sau bàn giao",
    value: "Đồng hành cùng khách hàng trong suốt vòng đời hệ thống.",
  },
];

// ---------- CTA / ĐỐI TÁC PHÂN PHỐI ----------
// TODO: xác nhận đúng danh sách hãng VIETHUNGSOLAR thực sự là đại lý phân phối
// chính thức trước khi đưa lên site — đây là tuyên bố có tính pháp lý/thương mại.
// ---------- CAM KẾT CHẤT LƯỢNG / CHỨNG NHẬN ĐẠI LÝ ----------
// ---------- CAM KẾT CHẤT LƯỢNG / CHỨNG NHẬN ----------
export const aboutCta = {
  headline: "CAM KẾT CHẤT LƯỢNG",
  description:
    "Không chỉ cung cấp hệ thống điện mặt trời, mà còn cam kết mang đến sự an tâm trong suốt vòng đời dự án.",
  // TODO: thay bằng file ảnh chứng nhận thật của DAT khi có, đặt trong public/certificates/
  // Hiện đang dùng ảnh minh hoạ tạm (Unsplash) để demo bố cục.
  certificateImage: "https://images.unsplash.com/photo-1638636241638-aef5120c5153?w=900&q=80",
  certificateAlt: "Chứng nhận đại lý phân phối DAT",
  partnerName: "DAT",
};

// ---------- DANH SÁCH LOGO HÃNG — dùng cho marquee tự cuộn ----------
// TODO: thay bằng ảnh logo thật nếu có, hiện đang dùng "logo chữ" theo màu thương hiệu.
export const aboutBrandLogos: { name: string; color: string }[] = [
  { name: "Canadian Solar", color: "#e63c2f" },
  { name: "LONGi", color: "#d93c1c" },
  { name: "JA Solar", color: "#003087" },
  { name: "TCL Solar", color: "#cc0000" },
  { name: "Astronergy", color: "#0b6623" },
  { name: "Jinko Solar", color: "#1a6fb5" },
  { name: "Sungrow", color: "#f6b918" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
  { name: "GoodWe", color: "#e8001c" },
];