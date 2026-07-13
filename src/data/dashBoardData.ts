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
  eyebrow: "TỐI ƯU HIỆU QUẢ ĐẦU TƯ ĐIỆN MẶT TRỜI",
  headline: "Biến ánh nắng thành lợi nhuận",
  subheadline:
    "Thiết kế, thi công và đồng hành cùng doanh nghiệp, nhà xưởng và hộ gia đình trong hành trình tối ưu chi phí điện.",
  ctaPrimary: { label: "Trang Liên Hệ", href: "#contact" },
  ctaSecondary: { label: "Trang Dự Án", href: "#solutions" },
  backgroundImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
};

// ---------- PROCESS STEPS (Quy trình triển khai) ----------
export const processSection = {
  eyebrow: "QUY TRÌNH TRIỂN KHAI",
  headline: "Triển khai minh bạch từ khảo sát đến bàn giao",
  description:
    "Khảo sát tận nơi, thiết kế tối ưu và thi công đúng tiêu chuẩn nhằm mang lại hiệu quả đầu tư lâu dài.",
};

export const processSteps = [
  {
    id: 1,
    title: "Tiếp nhận yêu cầu",
    description: "Lắng nghe nhu cầu và tư vấn giải pháp phù hợp.",
  },
  {
    id: 2,
    title: "Khảo sát thực tế",
    description: "Khảo sát thực tế, đánh giá hiện trạng và đề xuất phương án tối ưu.",
  },
  {
    id: 3,
    title: "Thiết kế & Báo giá",
    description: "Thiết kế hệ thống tối ưu, đảm bảo hiệu quả và chi phí.",
  },
  {
    id: 4,
    title: "Thi công lắp đặt",
    description: "Thi công chuyên nghiệp, đúng kỹ thuật, đảm bảo tiến độ và an toàn.",
  },
  {
    id: 5,
    title: "Bàn giao & Bảo hành",
    description: "Nghiệm thu, bàn giao và bảo hành, đồng hành lâu dài.",
  },
];

// ---------- SOLUTIONS SECTION ----------
export const solutionSection = {
  eyebrow: "VIETHUNGSOLAR CÓ THỂ GIÚP GÌ CHO BẠN?",
  headline: "Giải pháp phù hợp cho từng nhu cầu",
  description:
    "Chúng tôi cung cấp giải pháp điện mặt trời tối ưu cho từng đối tượng, giúp bạn tiết kiệm chi phí và chủ động nguồn năng lượng.",
};

export interface SolutionAudience {
  id: number;
  icon: "home" | "apartment" | "warehouse" | "factory";
  image: string;
  title: string;
  description: string;
  checklist: string[];
}

export const solutionAudiences: SolutionAudience[] = [
  {
    id: 1,
    icon: "home",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
    title: "Hộ gia đình",
    description: "Giảm hóa đơn tiền điện hàng tháng và tăng giá trị cho ngôi nhà của bạn.",
    checklist: [
      "Tiết kiệm đến 90% chi phí điện",
      "Hệ thống an toàn, thẩm mỹ",
      "Bảo hành và hỗ trợ dài hạn",
    ],
  },
  {
    id: 2,
    icon: "apartment",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    title: "Doanh nghiệp",
    description: "Kiểm soát chi phí điện và hướng tới phát triển bền vững.",
    checklist: [
      "Ổn định chi phí điện dài hạn",
      "Nâng cao hình ảnh doanh nghiệp",
      "Giải pháp linh hoạt theo nhu cầu",
    ],
  },
  {
    id: 3,
    icon: "warehouse",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
    title: "Nhà máy",
    description: "Tối ưu chi phí điện cho sản xuất và nâng cao năng lực cạnh tranh.",
    checklist: [
      "Giảm chi phí vận hành dài hạn",
      "Hệ thống công suất lớn, ổn định",
      "Thi công nhanh chóng, chuyên nghiệp",
    ],
  },
  {
    id: 4,
    icon: "factory",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80",
    title: "Công nghiệp",
    description: "Giải pháp năng lượng tối ưu cho hệ thống sản xuất lớn.",
    checklist: [
      "Giải pháp thiết kế chuyên biệt",
      "Vận hành ổn định, hiệu quả cao",
      "Hỗ trợ kỹ thuật 24/7",
    ],
  },
];

export const solutionContactBar = {
  title: "Tư vấn miễn phí",
  description:
    "Đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn giải pháp phù hợp nhất cho bạn.",
  hotlineLabel: "Hotline",
  cta: { label: "Nhận tư vấn ngay", href: "#contact" },
};

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