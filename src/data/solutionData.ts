// ============================================================
// solutionData.ts — Cấu hình nội dung section Giải pháp NLMT
// ============================================================

export type Accent = "amber" | "navy";
export type SolutionIcon = "home" | "building";
export type TrustIcon    = "shield" | "award" | "coins" | "headset";

// ---------- SECTION HEADER ----------
export const solutionHeader = {
  badge:             "Giải pháp toàn diện",
  headlineLead:      "Giải pháp",
  headlineHighlight: "năng lượng mặt trời",
  description:
    "VIETHUNGSOLAR cung cấp giải pháp năng lượng mặt trời tối ưu, phù hợp với mọi nhu cầu từ hộ gia đình đến doanh nghiệp.",
};

// ---------- SPEC ITEM ----------
export interface SpecItem {
  iconKey: string;
  label:   string;
  value:   string;
}

// ---------- DETAIL ----------
export interface SolutionDetail {
  description: string;
  advantages:  string[];
  process:     string[];
}

// ---------- SUB TYPE (Hòa lưới / Lưu trữ) ----------
export interface SubType {
  id:          string;
  icon:        "grid" | "battery";
  name:        string;
  subtitle:    string;
  features:    string[];
  diagramType: "on-grid" | "hybrid";
}

// ---------- SOLUTION ----------
export interface SolutionItem {
  id:       string;
  icon:     SolutionIcon;
  title:    string;
  subtitle: string;
  features: string[];
  specs:    SpecItem[];
  detail:   SolutionDetail;
  image:    string;
  accent:   Accent;
  href:     string;
  subTypes: SubType[];         // ← 2 sub-section
  consumerLabel: string;       // label tải tiêu thụ trong diagram
}

export const solutions: SolutionItem[] = [
  {
    id:       "residential",
    icon:     "home",
    title:    "Hộ Gia Đình",
    subtitle: "Tiết kiệm điện – Chủ động năng lượng",
    features: [
      "Giảm đến 90% chi phí điện",
      "Tăng giá trị bất động sản",
      "Hệ thống vận hành tự động",
      "Bảo hành dài hạn",
    ],
    specs: [
      { iconKey: "bolt",    label: "Công suất điển hình", value: "5 – 20 kWp" },
      { iconKey: "percent", label: "Tiết kiệm điện",       value: "Đến 90%" },
      { iconKey: "verify",  label: "Bảo hành hệ thống",    value: "25 năm" },
    ],
    detail: {
      description:
        "Hệ thống điện mặt trời hộ gia đình được thiết kế tối ưu cho mái nhà dân dụng, từ nhà phố đến biệt thự. Chúng tôi khảo sát thực tế, tính toán chính xác nhu cầu tiêu thụ và thiết kế hệ thống phù hợp — đảm bảo hiệu suất tối đa suốt vòng đời 25 năm.",
      advantages: [
        "Giảm hóa đơn điện ngay từ tháng đầu vận hành",
        "Hệ thống giám sát từ xa qua ứng dụng điện thoại",
        "Không cần bảo trì thường xuyên, vận hành hoàn toàn tự động",
        "Tăng giá trị bất động sản từ 10 – 15%",
      ],
      process: [
        "Khảo sát miễn phí tại nhà & tư vấn giải pháp phù hợp",
        "Thiết kế hệ thống & ký hợp đồng — hoàn thành trong 3 ngày",
        "Lắp đặt & bàn giao — chỉ 1 – 3 ngày thi công",
      ],
    },
    image:  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "amber",
    href:   "/giai-phap/ho-gia-dinh",
    consumerLabel: "TẢI TIÊU THỤ\nTRONG GIA ĐÌNH",
    subTypes: [
      {
        id:          "residential-grid",
        icon:        "grid",
        name:        "Hòa Lưới",
        subtitle:    "Giải pháp tối ưu chi phí",
        features: [
          "Giảm chi phí tiền điện hàng tháng",
          "Vận hành đơn giản, ổn định",
          "Thân thiện với môi trường",
          "Hoàn vốn nhanh chóng",
        ],
        diagramType: "on-grid",
      },
      {
        id:          "residential-storage",
        icon:        "battery",
        name:        "Lưu Trữ",
        subtitle:    "Chủ động nguồn điện – An tâm sử dụng",
        features: [
          "Chủ động nguồn điện 24/7",
          "Dự phòng khi mất điện",
          "Tối ưu hiệu suất sử dụng",
          "Bảo vệ thiết bị điện",
        ],
        diagramType: "hybrid",
      },
    ],
  },
  {
    id:       "business",
    icon:     "building",
    title:    "Doanh Nghiệp",
    subtitle: "Tối ưu chi phí vận hành",
    features: [
      "Giảm chi phí điện hàng tháng",
      "Nâng cao hình ảnh doanh nghiệp xanh",
      "Gia tăng năng lực cạnh tranh",
      "Hoàn vốn nhanh",
    ],
    specs: [
      { iconKey: "bolt",    label: "Công suất điển hình", value: "20 – 500 kWp" },
      { iconKey: "percent", label: "Hoàn vốn",             value: "4 – 6 năm" },
      { iconKey: "verify",  label: "Bảo hành hệ thống",    value: "25 năm" },
    ],
    detail: {
      description:
        "Giải pháp năng lượng mặt trời cho doanh nghiệp — từ văn phòng, trường học đến tòa nhà thương mại. Hệ thống được tích hợp vào hạ tầng điện hiện có, giúp doanh nghiệp chủ động nguồn điện, cắt giảm chi phí vận hành và nâng cao hình ảnh thương hiệu xanh.",
      advantages: [
        "Tiết kiệm điện tối đa trong giờ cao điểm ban ngày",
        "Báo cáo hiệu suất tự động hàng tuần/tháng",
        "Đáp ứng tiêu chí ESG và chứng nhận xanh quốc tế",
        "Hoàn vốn đầu tư trong 4 – 6 năm",
      ],
      process: [
        "Khảo sát tòa nhà & phân tích hóa đơn điện 3 tháng gần nhất",
        "Lập phương án thiết kế & trình bày ROI chi tiết",
        "Thi công & đấu nối lưới — bàn giao kèm hướng dẫn vận hành",
      ],
    },
    image:  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    accent: "navy",
    href:   "/giai-phap/doanh-nghiep",
    consumerLabel: "TẢI TIÊU THỤ\nDOANH NGHIỆP",
    subTypes: [
      {
        id:          "business-grid",
        icon:        "grid",
        name:        "Hòa Lưới",
        subtitle:    "Giải pháp tối ưu chi phí",
        features: [
          "Giảm chi phí điện năng",
          "Tăng giá trị thương hiệu xanh",
          "Hiệu quả đầu tư cao",
          "Phù hợp với đa số doanh nghiệp",
        ],
        diagramType: "on-grid",
      },
      {
        id:          "business-storage",
        icon:        "battery",
        name:        "Lưu Trữ",
        subtitle:    "Chủ động nguồn điện – Vận hành ổn định",
        features: [
          "Chủ động nguồn điện 24/7",
          "Đảm bảo sản xuất liên tục",
          "Giảm rủi ro gián đoạn",
          "Tối ưu chi phí và hiệu suất",
        ],
        diagramType: "hybrid",
      },
    ],
  },
];

// ---------- TRUST BAR ----------
export interface TrustItem {
  id:     string;
  icon:   TrustIcon;
  title:  string;
  desc:   string;
  accent: Accent;
}

export const trustItems: TrustItem[] = [
  { id: "safe",     icon: "shield",  title: "An Toàn & Bền Bỉ",    desc: "Thiết bị chính hãng, chất lượng cao",    accent: "navy" },
  { id: "warranty", icon: "award",   title: "Bảo Hành Dài Hạn",    desc: "Bảo hành lên đến 25 năm",                accent: "amber" },
  { id: "saving",   icon: "coins",   title: "Tiết Kiệm Tối Đa",    desc: "Giảm đến 90% chi phí điện",              accent: "navy" },
  { id: "support",  icon: "headset", title: "Hỗ Trợ Toàn Diện",   desc: "Tư vấn – Khảo sát – Hỗ trợ 24/7",       accent: "amber" },
];