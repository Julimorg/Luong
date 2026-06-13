// ============================================================
// solutionData.ts — Cấu hình nội dung section Giải pháp NLMT
// ============================================================

export type Accent = "amber" | "navy";

export type SolutionIcon = "home" | "building" | "factory" | "sprout";
export type TrustIcon = "shield" | "award" | "coins" | "headset";

// ---------- SECTION HEADER ----------
export const solutionHeader = {
  badge: "Giải pháp toàn diện",
  headlineLead: "Giải pháp",
  headlineHighlight: "năng lượng mặt trời",
  description:
    "VIETHUNGSOLAR cung cấp giải pháp năng lượng mặt trời tối ưu, phù hợp với mọi nhu cầu từ hộ gia đình đến doanh nghiệp, nhà máy và nông nghiệp.",
};

// ---------- SOLUTIONS ----------
export interface SolutionItem {
  id: string;
  icon: SolutionIcon;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
  accent: Accent;
  href: string;
}

export const solutions: SolutionItem[] = [
  {
    id: "residential",
    icon: "home",
    title: "Hộ Gia Đình",
    subtitle: "Tiết kiệm điện – Chủ động năng lượng",
    features: [
      "Giảm đến 90% chi phí điện",
      "Tăng giá trị bất động sản",
      "Hệ thống vận hành tự động",
      "Bảo hành dài hạn",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "amber",
    href: "/giai-phap/ho-gia-dinh",
  },
  {
    id: "business",
    icon: "building",
    title: "Doanh Nghiệp",
    subtitle: "Tối ưu chi phí vận hành",
    features: [
      "Giảm chi phí điện hàng tháng",
      "Nâng cao hình ảnh doanh nghiệp xanh",
      "Gia tăng năng lực cạnh tranh",
      "Hoàn vốn nhanh",
    ],
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    accent: "navy",
    href: "/giai-phap/doanh-nghiep",
  },
  {
    id: "industrial",
    icon: "factory",
    title: "Nhà Máy & Khu Công Nghiệp",
    subtitle: "Nguồn điện ổn định cho sản xuất",
    features: [
      "Công suất lớn theo nhu cầu",
      "Giảm áp lực chi phí sản xuất",
      "Tận dụng diện tích mái nhà xưởng",
      "Hiệu quả đầu tư lâu dài",
    ],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    accent: "amber",
    href: "/giai-phap/nha-may-khu-cong-nghiep",
  },
  {
    id: "agriculture",
    icon: "sprout",
    title: "Trang Trại & Nông Nghiệp",
    subtitle: "Năng lượng xanh cho nông nghiệp",
    features: [
      "Cấp điện cho hệ thống tưới tiêu",
      "Vận hành trang trại hiệu quả",
      "Giảm chi phí sản xuất",
      "Thân thiện với môi trường",
    ],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    accent: "navy",
    href: "/giai-phap/trang-trai-nong-nghiep",
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
  {
    id: "safe",
    icon: "shield",
    title: "An Toàn & Bền Bỉ",
    desc: "Thiết bị chính hãng, chất lượng cao",
    accent: "navy",
  },
  {
    id: "warranty",
    icon: "award",
    title: "Bảo Hành Dài Hạn",
    desc: "Bảo hành lên đến 25 năm",
    accent: "amber",
  },
  {
    id: "saving",
    icon: "coins",
    title: "Tiết Kiệm Tối Đa",
    desc: "Giảm đến 90% chi phí điện",
    accent: "navy",
  },
  {
    id: "support",
    icon: "headset",
    title: "Hỗ Trợ Toàn Diện",
    desc: "Tư vấn – Khảo sát – Hỗ trợ 24/7",
    accent: "amber",
  },
];