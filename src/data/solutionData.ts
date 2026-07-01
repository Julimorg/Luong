// ============================================================
// solutionData.ts — Cấu hình nội dung trang Giải pháp NLMT
// ============================================================

export type Accent = "amber" | "navy";
export type SolutionIcon = "home" | "building" | "factory" | "industrial";
export type TrustIcon = "shield" | "award" | "coins" | "headset";

// ---------- PAGE HEADER ----------
export const solutionHeader = {
  badge: "Giải pháp toàn diện",
  headline: "Giải pháp năng lượng mặt trời cho mọi nhu cầu",
  description:
    "VIETHUNGSOLAR cung cấp giải pháp năng lượng mặt trời tối ưu, phù hợp với mọi nhu cầu từ hộ gia đình, doanh nghiệp đến nhà máy và khu công nghiệp.",
  ctaPrimary: { label: "Nhận tư vấn miễn phí", to: "/lien-he" },
  ctaSecondary: { label: "Xem dự án", to: "/du-an" },
};

export const solutionHighlights: { icon: string; title: string; desc: string }[] = [
  { icon: "coins", title: "Tiết kiệm chi phí", desc: "Giảm đến 90% hóa đơn tiền điện" },
  { icon: "bolt", title: "Hiệu suất vượt trội", desc: "Công nghệ hiện đại, tối ưu sản lượng" },
  { icon: "shield", title: "Đảm bảo an toàn", desc: "Thiết bị chính hãng, bảo hành dài hạn" },
  { icon: "headset", title: "Hỗ trợ chuyên nghiệp", desc: "Tư vấn – Thiết kế – Thi công trọn gói" },
];

// ---------- 2 GIẢI PHÁP CHÍNH (On-grid / Hybrid) ----------
export interface MainSolution {
  id: string;
  tag: string;
  icon: "grid" | "battery";
  title: string;
  description: string;
  features: string[];
  image: string; // ảnh minh họa thay cho diagram
}

export const mainSolutions: MainSolution[] = [
  {
    id: "on-grid",
    tag: "ON-GRID",
    icon: "grid",
    title: "Điện mặt trời hòa lưới",
    description:
      "Hệ thống hòa lưới sử dụng điện mặt trời và hòa trực tiếp vào lưới điện quốc gia, giúp tối ưu chi phí đầu tư và tiền điện hàng tháng.",
    features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Không cần bảo trì nhiều", "Hoàn vốn nhanh"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
  },
  {
    id: "hybrid",
    tag: "HYBRID",
    icon: "battery",
    title: "Điện mặt trời có lưu trữ",
    description:
      "Hệ thống có pin lưu trữ giúp dự phòng điện mỗi đêm và khi mất điện, sử dụng điện mặt trời cả ngày lẫn đêm.",
    features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất sử dụng", "Quản lý thông minh"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80",
  },
];

// ---------- SPEC ITEM ----------
export interface SpecItem {
  iconKey: string;
  label: string;
  value: string;
}

// ---------- SUB TYPE (mỗi hộ có bộ giải pháp riêng) ----------
export interface SubType {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  features: string[];
  image: string; // ảnh minh họa thay diagram
}

// ---------- SOLUTION (Mô hình) ----------
export interface SolutionItem {
  id: string;
  icon: SolutionIcon;
  title: string;
  subtitle: string;
  specs: SpecItem[];
  accent: Accent;
  subTypes: SubType[];
}

export const solutions: SolutionItem[] = [
  // ─────────── HỘ GIA ĐÌNH — 3 giải pháp ───────────
  {
    id: "residential",
    icon: "home",
    title: "Hộ Gia Đình",
    subtitle: "Tiết kiệm điện – Chủ động năng lượng",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "5 – 20 kWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 90%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "residential-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Tối ưu chi phí",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Vận hành đơn giản", "Hoàn vốn nhanh"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      },
      {
        id: "residential-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Chủ động nguồn điện",
        features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
      },
      {
        id: "residential-offgrid",
        icon: "offgrid",
        name: "Off-Grid (Độc Lập)",
        subtitle: "Hoàn toàn độc lập",
        features: ["Không phụ thuộc điện lưới", "Tự chủ 100%", "Phù hợp vùng xa", "Kết hợp pin lưu trữ"],
        image: "https://images.unsplash.com/photo-1548611716-3f6f2e6c8fd8?w=600&q=80",
      },
    ],
  },

  // ─────────── DOANH NGHIỆP — 3 giải pháp (khác cái thứ 3) ───────────
  {
    id: "business",
    icon: "building",
    title: "Doanh Nghiệp",
    subtitle: "Tối ưu chi phí vận hành",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "20 – 200 kWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 80%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "business-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Tối ưu chi phí",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Vận hành đơn giản", "Hoàn vốn nhanh"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      },
      {
        id: "business-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Chủ động nguồn điện",
        features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
      },
      {
        id: "business-carport",
        icon: "carport",
        name: "Solar Carport",
        subtitle: "Vừa che nắng vừa tạo điện",
        features: ["Tận dụng bãi đỗ xe", "Tăng diện tích lắp đặt", "Tiết kiệm không gian mái", "Tăng tính thẩm mỹ"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      },
    ],
  },

  // ─────────── NHÀ MÁY — 4 giải pháp ───────────
  {
    id: "factory",
    icon: "factory",
    title: "Nhà Máy",
    subtitle: "Giảm chi phí sản xuất – Vận hành ổn định",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "100 kWp – 3 MWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 80%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "factory-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Chi phí thấp – Hoàn vốn nhanh",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Dễ mở rộng công suất", "Hoàn vốn nhanh"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      },
      {
        id: "factory-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Ổn định sản xuất",
        features: ["Dự phòng khi mất điện", "Cắt giảm đỉnh công suất", "Tối ưu chi phí điện giờ cao điểm", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
      },
      {
        id: "factory-bess",
        icon: "bess",
        name: "BESS (Pin Lưu Trữ Độc Lập)",
        subtitle: "Dự phòng công suất lớn",
        features: ["Lưu trữ điện quy mô lớn", "Cắt giảm phí công suất", "Dự phòng sự cố lưới", "Kéo dài tuổi thọ thiết bị"],
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
      },
      {
        id: "factory-ems",
        icon: "ems",
        name: "EMS (Quản Lý Năng Lượng)",
        subtitle: "Giám sát – Tối ưu vận hành",
        features: ["Giám sát sản lượng real-time", "Phân tích tiêu thụ điện", "Cảnh báo sự cố tức thời", "Báo cáo tự động"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      },
    ],
  },

  // ─────────── KHU CÔNG NGHIỆP — 4 giải pháp ───────────
  {
    id: "industrial",
    icon: "industrial",
    title: "Khu Công Nghiệp",
    subtitle: "Năng lượng xanh quy mô lớn",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "1 – 20 MWp" },
      { iconKey: "percent", label: "Giảm phát thải", value: "Hàng nghìn tấn CO2/năm" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "industrial-utility",
        icon: "utility",
        name: "Utility Scale",
        subtitle: "Quy mô lớn – Đầu tư dài hạn",
        features: ["Công suất lớn MWp", "Hiệu suất tối ưu", "Đấu nối trực tiếp trạm biến áp", "Chi phí vận hành thấp"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      },
      {
        id: "industrial-hybrid-bess",
        icon: "battery",
        name: "Hybrid + BESS",
        subtitle: "Chủ động nguồn điện quy mô lớn",
        features: ["Kết hợp pin lưu trữ công suất lớn", "Ổn định lưới điện nội bộ", "Dự phòng khi mất điện", "Cắt giảm chi phí đỉnh điểm"],
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
      },
      {
        id: "industrial-ems",
        icon: "ems",
        name: "EMS (Quản Lý Năng Lượng)",
        subtitle: "Giám sát toàn khu công nghiệp",
        features: ["Giám sát nhiều trạm cùng lúc", "Tối ưu phân phối điện", "Cảnh báo & bảo trì dự đoán", "Báo cáo phát thải CO2"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      },
      {
        id: "industrial-ev",
        icon: "ev",
        name: "EV Charging",
        subtitle: "Trạm sạc xe điện",
        features: ["Tích hợp trạm sạc nội khu", "Sử dụng điện mặt trời tại chỗ", "Quản lý sạc thông minh", "Hỗ trợ chuyển đổi xanh"],
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
      },
    ],
  },
];

// ---------- TRUST BAR ----------
export interface TrustItem {
  id: string;
  icon: TrustIcon;
  title: string;
  desc: string;
  accent: Accent;
}

export const trustItems: TrustItem[] = [
  { id: "consult", icon: "headset", title: "Tư Vấn Chuyên Sâu", desc: "Giải pháp phù hợp từng nhu cầu", accent: "navy" },
  { id: "design", icon: "award", title: "Thiết Kế Tối Ưu", desc: "Hiệu quả – An toàn – Thẩm mỹ", accent: "amber" },
  { id: "build", icon: "shield", title: "Thi Công Chuyên Nghiệp", desc: "Đúng quy trình – Đúng tiến độ", accent: "navy" },
  { id: "warranty", icon: "coins", title: "Bảo Hành Dài Hạn", desc: "Lên đến 25 năm hệ thống", accent: "amber" },
];