// ============================================================
// dashboardData.ts — Cấu hình toàn bộ nội dung trang chủ
// ============================================================

// ---------- NAVIGATION ----------
export const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
  { label: "Sản phẩm", to: "/san-pham" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Liên hệ", to: "/lien-he" },
];

export const headerPhone = "1800 1234";

// ---------- HERO ----------
export const heroData = {
  eyebrow: "Giải pháp năng lượng mặt trời toàn diện",
  headline: "Lắp đặt hệ thống\nnăng lượng mặt trời",
  subheadline:
    "Giải pháp năng lượng thông minh – Tiết kiệm chi phí – Bền vững dài lâu cho doanh nghiệp và hộ gia đình.",
  ctaPrimary: { label: "Nhận báo giá ngay", href: "#contact" },
  ctaSecondary: { label: "Khám phá giải pháp", href: "#solutions" },
  backgroundImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
};

// ---------- HERO BADGES ----------
export const heroBadges = [
  {
    id: 1,
    icon: "savings",
    title: "Tiết kiệm chi phí",
    description: "Giảm đến 70% tiền điện",
  },
  {
    id: 2,
    icon: "bolt",
    title: "Hiệu suất vượt trội",
    description: "Công nghệ hiện đại, tối ưu",
  },
  {
    id: 3,
    icon: "shield",
    title: "An toàn & bền bỉ",
    description: "Đáp ứng tiêu chuẩn quốc tế",
  },
  {
    id: 4,
    icon: "support",
    title: "Bảo hành dài hạn",
    description: "Hỗ trợ kỹ thuật 24/7",
  },
];

// ---------- SOLUTIONS SECTION ----------
export const solutionsSection = {
  eyebrow: "Tại sao chọn chúng tôi",
  headline: "Giải pháp tối ưu – Hiệu quả dài lâu",
  description:
    "Chúng tôi cam kết cung cấp những hệ thống điện mặt trời chất lượng cao, tối ưu hiệu suất và chi phí phù hợp thị trường.",
  cta: { label: "Tìm hiểu thêm", href: "#about" },
};

export const solutionCards = [
  {
    id: 1,
    icon: "search",
    title: "Tư vấn chuyên sâu",
    description:
      "Khảo sát và tư vấn giải pháp phù hợp nhất cho nhu cầu thực tế của bạn. Tiếp cận §8.",
  },
  {
    id: 2,
    icon: "design_services",
    title: "Thiết kế tối ưu",
    description:
      "Đội ngũ kỹ sư thiết kế hệ thống hiệu quả và phù hợp với từng dự án đầu tư.",
  },
  {
    id: 3,
    icon: "engineering",
    title: "Thi công chuyên nghiệp",
    description:
      "Đội ngũ kỹ thuật có nhiều năm kinh nghiệm, thi công chuẩn quy trình chuyên nghiệp.",
  },
  {
    id: 4,
    icon: "headset_mic",
    title: "Hỗ trợ tận tâm",
    description:
      "Bảo trì định kỳ và hỗ trợ kỹ thuật 24/7. Cam kết đồng hành cùng khách hàng.",
  },
];

// ---------- STATS ----------
export const statsData = [
  { id: 1, icon: "solar_power", value: "500+", label: "Dự án đã triển khai" },
  { id: 2, icon: "bolt", value: "50MW+", label: "Tổng công suất lắp đặt" },
  { id: 3, icon: "handshake", value: "300+", label: "Khách hàng doanh nghiệp" },
  { id: 4, icon: "star", value: "98%", label: "Khách hàng hài lòng" },
];

// ---------- PROJECTS ----------
export const projectsSection = {
  eyebrow: "Dự án tiêu biểu",
  headline: "Những dự án chúng tôi đã thực hiện",
  cta: { label: "Xem tất cả dự án", href: "#projects" },
};

export const projectCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    title: "Nhà máy May Việt Tân – Vũng Tàu",
    capacity: "12 MWp",
    status: "Hoàn thành",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    capacity: "8 MWp",
    status: "Hoàn thành",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    capacity: "300 kWp",
    status: "Hoàn thành",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
    title: "Nhà máy Cà Phê Chính xác – Đắk Nông",
    capacity: "5 MWp",
    status: "Hoàn thành",
  },
];

// ---------- PROCESS STEPS ----------
export const processSection = {
  headline: "5 bước đơn giản",
};

export const processSteps = [
  {
    id: 1,
    icon: "description",
    title: "Tiếp nhận yêu cầu",
    description: "Lắng nghe nhu cầu và mong muốn của bạn về hệ thống điện mặt trời.",
  },
  {
    id: 2,
    icon: "calculate",
    title: "Khảo sát & tư vấn",
    description: "Khảo sát thực tế, đánh giá và tư vấn giải pháp phù hợp nhất.",
  },
  {
    id: 3,
    icon: "architecture",
    title: "Thiết kế hệ thống",
    description: "Thiết kế chi tiết hệ thống tối ưu theo tiêu chuẩn kỹ thuật.",
  },
  {
    id: 4,
    icon: "construction",
    title: "Thi công lắp đặt",
    description: "Thi công chuyên nghiệp, đảm bảo tiến độ và chất lượng công trình.",
  },
  {
    id: 5,
    icon: "settings",
    title: "Vận hành & bảo trì",
    description: "Bàn giao, hướng dẫn vận hành và bảo trì định kỳ hệ thống.",
  },
];

// ---------- CTA BANNER ----------
export const ctaBanner = {
  headline: "Sẵn sàng sử dụng năng lượng sạch?",
  description:
    "Hãy ngày sử dụng nguồn năng lượng của tương lai mà không mất chi phí nào thêm.",
  cta: { label: "Nhận tư vấn miễn phí", href: "#contact" },
};

// ---------- FOOTER ----------
export const footerData = {
  brand: {
    name: "SOLARTECH",
    tagline: "Giải pháp năng lượng mặt trời toàn diện cho doanh nghiệp và hộ gia đình.",
  },
  columns: [
    {
      title: "Về chúng tôi",
      links: [
        { label: "Giới thiệu", href: "#about" },
        { label: "Dịch vụ", href: "#services" },
        { label: "Sản phẩm – Báo giá", href: "#products" },
        { label: "Chứng nhận", href: "#certs" },
      ],
    },
    {
      title: "Giải pháp",
      links: [
        { label: "Điện mặt trời doanh nghiệp", href: "#" },
        { label: "Điện mặt trời hộ gia đình", href: "#" },
        { label: "Hệ thống lưu trữ (ESS)", href: "#" },
        { label: "O&M – Bảo trì", href: "#" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { label: "Chính sách bảo hành", href: "#" },
        { label: "Câu hỏi thường gặp", href: "#" },
        { label: "Tải tài liệu", href: "#" },
      ],
    },
  ],
  contact: {
    title: "Liên hệ",
    address: "50 LG Đường ABC, P. An Phú, Q. Thủ Đức, TP. HCM",
    phone: "1800 1234",
    email: "info@solartech.vn",
  },
  socials: ["facebook", "youtube", "linkedin"],
  copyright: "© 2024 Solartech. All rights reserved.",
};