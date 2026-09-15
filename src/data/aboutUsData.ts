// ============================================================
// aboutUsData.ts — Dữ liệu trang Giới thiệu (About Us)
// ============================================================

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
  { value: "500+", label: "Dự án đã triển khai" },
  { value: "100%", label: "Thiết bị chính hãng" },
  { value: "Đồng hành", label: "Dài hạn cùng khách hàng" },
];

// ---------- TUYÊN NGÔN THƯƠNG HIỆU ----------
export const aboutManifesto = {
  eyebrow: "CHÚNG TÔI TIN RẰNG",
  quote: "Năng lượng sạch không chỉ là một lựa chọn — mà là trách nhiệm với tương lai.",
  missionLine: "Sứ mệnh: mang giải pháp năng lượng mặt trời chất lượng đến gần hơn với mọi công trình.",
  visionLine: "Tầm nhìn: trở thành người đồng hành tin cậy trên hành trình chuyển đổi năng lượng bền vững tại Việt Nam.",
};

// ---------- TAB SHOWCASE: DỰ ÁN / SẢN PHẨM ----------
export interface ShowcaseTab {
  id: string;
  index: string;
  tabLabel: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  image: string;
  cta: { label: string; to: string };
}
export const aboutShowcaseSection = {
  eyebrow: "KHÁM PHÁ",
  headline: "Dự án & Giải pháp",
  description: "Từ công trình thực tế đến hệ sinh thái thiết bị — mọi thứ chúng tôi làm đều hướng tới hiệu quả bền vững.",
};
export const aboutShowcaseTabs: ShowcaseTab[] = [
  {
    id: "projects",
    index: "01",
    tabLabel: "Dự án thực tế",
    eyebrow: "DỰ ÁN",
    headline: "Hàng trăm công trình trên khắp cả nước",
    paragraphs: [
      "VIETHUNGSOLAR đã triển khai hàng trăm dự án điện mặt trời trên toàn quốc, bao gồm hệ thống cho hộ gia đình, doanh nghiệp, nhà xưởng, trang trại và các dự án áp mái quy mô lớn.",
      "Mỗi dự án đều được nghiên cứu, thiết kế và thi công tối ưu, đảm bảo hiệu quả vận hành bền vững và tiết kiệm chi phí lâu dài.",
    ],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85",
    cta: { label: "Xem trang dự án", to: "/du-an" },
  },
  {
    id: "products",
    index: "02",
    tabLabel: "Thiết bị & Giải pháp",
    eyebrow: "SẢN PHẨM",
    headline: "Hệ sinh thái thiết bị toàn diện",
    paragraphs: [
      "Chúng tôi cung cấp đầy đủ tấm pin năng lượng mặt trời, inverter, pin lưu trữ, tủ điện và các thiết bị phụ trợ, đáp ứng đa dạng nhu cầu của hộ gia đình, doanh nghiệp và nhà xưởng.",
      "Tất cả sản phẩm đến từ các thương hiệu uy tín, đảm bảo chất lượng, hiệu suất cao và vận hành bền bỉ trong điều kiện thực tế tại Việt Nam.",
    ],
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1200&q=85",
    cta: { label: "Xem trang sản phẩm", to: "/san-pham" },
  },
];

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
}
export const aboutWhyItems: WhyChooseItem[] = [
  { icon: "shield", title: "Thiết bị chính hãng", description: "Sản phẩm từ các thương hiệu uy tín hàng đầu, có đầy đủ chứng chỉ CO, CQ, đảm bảo nguồn gốc minh bạch và hiệu suất ổn định lâu dài." },
  { icon: "search", title: "Khảo sát thực tế", description: "Khảo sát tận nơi, đánh giá chính xác nhu cầu và hiện trạng." },
  { icon: "handshake", title: "Tư vấn phù hợp", description: "Tối ưu hiệu quả đầu tư theo từng nhu cầu thực tế." },
  { icon: "engineering", title: "Thi công đúng kỹ thuật", description: "Đội ngũ giàu kinh nghiệm, an toàn và hiệu quả." },
  { icon: "support", title: "Hỗ trợ sau bán hàng", description: "Bảo hành, bảo trì tận tâm, đồng hành dài hạn." },
  { icon: "check", title: "Chính sách minh bạch", description: "Báo giá rõ ràng, hợp đồng chi tiết, không phát sinh chi phí ẩn trong suốt quá trình hợp tác cùng khách hàng." },
];

// ---------- DẢI NIỀM TIN: CAM KẾT + CHỨNG NHẬN + ĐỐI TÁC ----------
export const aboutTrustBand = {
  eyebrow: "CAM KẾT",
  headline: "Cam kết chất lượng",
  description: "Chúng tôi luôn đặt chất lượng và uy tín lên hàng đầu trong từng công trình.",
  checklist: [
    "Thiết bị chính hãng, có đầy đủ chứng nhận CO, CQ",
    "Thi công đúng kỹ thuật, đảm bảo an toàn và hiệu quả",
    "Quy trình minh bạch, báo giá rõ ràng",
    "Hỗ trợ sau bán hàng tận tâm, đồng hành dài hạn",
  ],
  // TODO: thay bằng file ảnh chứng nhận thật của DAT khi có, đặt trong public/certificates/
  certificateImage: "https://images.unsplash.com/photo-1638636241638-aef5120c5153?w=900&q=80",
  certificateAlt: "Chứng nhận đại lý phân phối DAT",
  partnersHeading: "Đối tác thương hiệu uy tín",
};

export const aboutBrandLogos: { name: string; color: string }[] = [
  { name: "Canadian Solar", color: "#e63c2f" },
  { name: "LONGi", color: "#d93c1c" },
  { name: "JA Solar", color: "#003087" },
  { name: "TCL Solar", color: "#cc0000" },
  { name: "Astronergy", color: "#0b6623" },
  { name: "Jinko Solar", color: "#1a6fb5" },
  { name: "Sungrow", color: "#f6b918" },
  { name: "GoodWe", color: "#e8001c" },
];

// ---------- CTA CUỐI TRANG ----------
export const aboutFinalCta = {
  headline: "Sẵn sàng chuyển đổi sang năng lượng sạch?",
  description: "Liên hệ với đội ngũ VIETHUNGSOLAR để được khảo sát và tư vấn giải pháp phù hợp nhất cho công trình của bạn.",
  ctaLabel: "Nhận tư vấn miễn phí",
  ctaTo: "/lien-he",
};