// ============================================================
// dashboardData.ts — Cấu hình toàn bộ nội dung trang chủ
// ============================================================

import { projects } from "./projectData";

// ---------- NAVIGATION ----------
export const navLinks = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
  { label: "Sản phẩm", to: "/san-pham" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Giải Pháp", to: "/giai-phap" },
];

export const headerPhone = "0931 227 668";

// ---------- HERO ----------
export const heroData = {
  eyebrow: "TỐI ƯU HIỆU QUẢ ĐẦU TƯ ĐIỆN MẶT TRỜI",
  headline: "Biến ánh nắng thành lợi nhuận",
  subheadline:
    "Thiết kế, thi công và đồng hành cùng doanh nghiệp, nhà xưởng và hộ gia đình trong hành trình tối ưu chi phí điện.",
  ctaPrimary: { label: "Trang Liên Hệ", href: "#contact" },
  ctaSecondary: { label: "Trang Dự Án", href: "#solutions" },
  backgroundImage: "/background/dashboard/hero_background.png",
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
    image: "/background/dashboard/solution_1.webp",
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
    image: "/background/dashboard/solution_4.webp",
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
    image: "/background/dashboard/solution_2.webp",
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
    image: "/background/dashboard/solution_3.webp",
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

// Thẻ dự án hiển thị ở trang chủ lấy thẳng từ dữ liệu trang Dự án
// (src/data/projectData.ts) để hai trang không bao giờ lệch nhau.
// HOME_PROJECT_COUNT quyết định lấy bao nhiêu dự án đầu danh sách.
const HOME_PROJECT_COUNT = 4;

export const projectCards = projects.slice(0, HOME_PROJECT_COUNT).map((p) => ({
  id: p.id,
  image: p.image,
  title: p.title,
  capacity: p.capacity,
  status: p.status,
  /** Đường dẫn sang trang chi tiết dự án. */
  to: `/du-an/${p.id}`,
}));

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
  logo: string; // file trong public/brands/ — cùng domain nên không bị adblock chặn
}

// Logo chính hãng do VIETHUNGSOLAR cung cấp (documents/dashboard-documents/logo),
// đã cắt viền trắng thừa và nén sang .webp trước khi đưa vào public/brands/.
export const featuredBrands: FeaturedBrand[] = [
  { id: 1, name: "LONGi",          logo: "/brands/longi.webp" },
  { id: 2, name: "JA Solar",       logo: "/brands/ja-solar.webp" },
  { id: 3, name: "GoodWe",         logo: "/brands/goodwe.webp" },
  { id: 4, name: "SolaX Power",    logo: "/brands/solax.webp" },
  { id: 5, name: "INVT",           logo: "/brands/invt.webp" },
  { id: 6, name: "Lithium Valley", logo: "/brands/lithium-valley.webp" },
  { id: 7, name: "Pylontech",      logo: "/brands/pylontech.webp" },
];


// ---------- CTA BANNER ----------
export const ctaBanner = {
  headline: "Sẵn sàng biến ánh nắng thành lợi nhuận?",
  description:
    "Khai thác nguồn năng lượng mặt trời để tiết kiệm chi phí và tạo ra lợi ích bền vững cho tương lai",
  cta: { label: "Nhận tư vấn miễn phí", href: "#contact" },
};

// ---------- FOOTER ----------
export const footerData = {
  brand: {
    name: "VIETHUNGSOLAR",
    tagline: "Thương hiệu của CÔNG TY TNHH XÂY DỰNG VÀ THƯƠNG MẠI HƯNG VIỆT HÙNG",
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
    address: "189/1C, Phường Lái Thiêu, Thành phố Hồ Chí Minh",
    phone: "0931 227 668",
    email: "viethungsolarenergy@gmail.com",
  },
  socials: ["facebook", "zalo"],
  copyright: "@2026 VIETHUNGSOLAR. All Rights Reserved.",
};

// ---------- MẠNG XÃ HỘI (dùng chung Footer + trang Liên hệ) ----------
export const socialLinks = {
  facebookName: "VIỆT HÙNG SOLAR",
  facebook: "https://www.facebook.com/viethungsolarhcm/",
  messenger: "https://www.messenger.com/t/311605852044332?locale=en_US",
  /** Chưa có Zalo OA riêng — tạm trỏ theo số hotline, đổi khi có link chính thức. */
  zalo: `https://zalo.me/${footerData.contact.phone.replace(/\D/g, "")}`,
};