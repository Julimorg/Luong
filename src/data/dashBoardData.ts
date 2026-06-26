// ============================================================
// dashboardData.ts — Cấu hình toàn bộ nội dung trang chủ
// ============================================================

// ---------- NAVIGATION ----------
export const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
  { label: "Sản phẩm", to: "/san-pham" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Giải Pháp", to: "/giai-phap" },
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

// ---------- FEATURED BRANDS (Nhãn hàng nổi bật) ----------
export const featuredBrandsSection = {
  eyebrow: "Đối tác & Thương hiệu",
  headline: "Các nhãn hàng nổi bật của chúng tôi",
  description:
    "VIETHUNGSOLAR hợp tác và phân phối thiết bị từ các thương hiệu năng lượng mặt trời hàng đầu thế giới.",
};

export interface FeaturedBrand {
  id: number;
  name: string;
  logo: string; // đặt logo vào /public/brands/... — nếu thiếu sẽ hiện tên hãng
}

// ⚠️ VÌ SAO LOGO QUA URL HAY KHÔNG HIỆN:
//  • net::ERR_BLOCKED_BY_CLIENT  → trình chặn quảng cáo/extension chặn request
//    (clearbit, logo.dev... nằm trong blocklist tracker). Khách có adblock cũng sẽ KHÔNG thấy.
//  • logo.clearbit.com đã NGỪNG hoạt động từ 01/12/2025 → luôn lỗi.
//
// ✅ CÁCH CHẮC ĂN: tải logo về thư mục public/brands/ rồi trỏ "/brands/<ten>.png".
//    Ảnh cùng domain với web nên KHÔNG bao giờ bị adblock/hotlink/CORS chặn.
//
// (Muốn xem tạm bằng URL ít bị adblock chặn nhất — chỉ ra icon nhỏ — đổi sang Google favicon:
//    const logoUrl = (d: string) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;
//    rồi dùng  logo: logoUrl("jasolar.com")  )
export const featuredBrands: FeaturedBrand[] = [
  // ── Tấm pin (Solar panels) ──
  { id: 1,  name: "JA Solar",        logo: "/logo/hello.png" },
  { id: 2,  name: "JinkoSolar",      logo: "/logo/hello.png" },
  { id: 3,  name: "Trina Solar",     logo: "/logo/hello.png" },
  { id: 4,  name: "Canadian Solar",  logo: "/logo/hello.png" },
  { id: 5,  name: "LONGi Solar",     logo: "/logo/hello.png" },
  { id: 6,  name: "Hanwha Q CELLS",  logo: "/logo/hello.png" },
  { id: 7,  name: "REC Group",       logo: "/logo/hello.png" },
  { id: 8,  name: "SunPower",        logo: "/logo/hello.png" },
  { id: 9,  name: "First Solar",     logo: "/logo/hello.png" },
  { id: 10, name: "Risen Energy",    logo: "/logo/hello.png" },

  // ── Inverter (Biến tần) ──
  { id: 11, name: "Huawei FusionSolar", logo: "/logo/hello.png" },
  { id: 12, name: "Sungrow",         logo: "/logo/hello.png" },
  { id: 13, name: "SMA",             logo: "/logo/hello.png" },
  { id: 14, name: "Fronius",         logo: "/logo/hello.png" },
  { id: 15, name: "GoodWe",          logo: "/logo/hello.png" },
  { id: 16, name: "Growatt",         logo: "/logo/hello.png" },
  { id: 17, name: "Solis",           logo: "/logo/hello.png" },
  { id: 18, name: "Schneider Electric", logo: "/logo/hello.png" },

  // ── Lưu trữ (Battery / ESS) ──
  { id: 19, name: "BYD",             logo: "/logo/hello.png" },
  { id: 20, name: "LG Energy Solution", logo: "/logo/hello.png" },
  { id: 21, name: "Victron Energy",  logo: "/logo/hello.png" },
  { id: 22, name: "Tesla",           logo: "/logo/hello.png" },
];

// ---------- PROCESS STEPS (không còn dùng ở trang chủ) ----------
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