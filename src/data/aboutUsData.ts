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

export const aboutCta = {
  quote: "Sẵn sàng đồng hành cùng bạn trên hành trình năng lượng xanh.",
  tags: ["Tư vấn tận tâm", "Giải pháp tối ưu", "Hiệu quả bền vững"],
  cta: { label: "Nhận tư vấn miễn phí", to: "/lien-he" },
  backgroundImage:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
};