// ============================================================
// projectData.ts — Cấu hình nội dung trang Dự án
// ============================================================

export const projectsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
];

// ---------- HERO ----------
export const projectsHero = {
  eyebrow: "Dự án tiêu biểu",
  headline: "Công trình điện mặt trời",
  headlineAccent: "VIETHUNGSOLAR đã bàn giao",
  description:
    "Từ nhà xưởng hàng MWp đến hệ áp mái hộ gia đình — mỗi dự án đều được khảo sát, thiết kế và thi công theo cùng một tiêu chuẩn kỹ thuật.",
  backgroundImage: "/background/dashboard/hero_background.png",
  primaryCta: { label: "Nhận khảo sát miễn phí", to: "/lien-he" },
  secondaryCta: { label: "Xem thiết bị sử dụng", to: "/san-pham" },
};

// ---------- DANH MỤC & TRẠNG THÁI ----------
export type ProjectCategory = "nha-may" | "cong-nghiep" | "doanh-nghiep" | "ho-gia-dinh";

export const categoryLabels: Record<ProjectCategory, string> = {
  "nha-may": "Nhà máy",
  "cong-nghiep": "Công nghiệp",
  "doanh-nghiep": "Doanh nghiệp",
  "ho-gia-dinh": "Hộ gia đình",
};

export type ProjectStatus = "Hoàn thành" | "Đang thi công";

export type ProjectFilterValue = "all" | "completed" | "in-progress";

export const projectFilters: { label: string; value: ProjectFilterValue }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đã hoàn thành", value: "completed" },
  { label: "Đang triển khai", value: "in-progress" },
];

// ---------- DỰ ÁN ----------
export interface Project {
  id: number;
  category: ProjectCategory;
  image: string;
  title: string;
  /** Một câu mô tả ngắn hiển thị trên thẻ dự án. */
  summary: string;
  capacity: string;
  /** Công suất quy về kWp — dùng để cộng tổng cho dải số liệu. */
  capacityKwp: number;
  location: string;
  panelCount: string;
  timeline: string;
  status: ProjectStatus;
  /** Chủ đầu tư — khớp với projectDetailData. */
  client: string;
  /** Sản lượng ước tính mỗi năm. */
  yearlyOutput?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 7,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80",
    title: "Khu công nghiệp VSIP – Bình Dương",
    summary:
      "Hệ áp mái quy mô lớn trải trên nhiều nhà xưởng trong khu công nghiệp, vận hành đồng bộ qua một hệ giám sát chung.",
    capacity: "8 MWp",
    capacityKwp: 8000,
    location: "Bình Dương",
    panelCount: "14.540 tấm pin",
    timeline: "01/2026",
    status: "Hoàn thành",
    client: "Ban Quản lý KCN VSIP Bình Dương",
    yearlyOutput: "11.500 MWh/năm",
    featured: true,
  },
  {
    id: 4,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1400&q=80",
    title: "Nhà máy Cà Phê Chính xác – Đồng Nai",
    summary:
      "Hệ 5 MWp cấp điện trực tiếp cho dây chuyền rang xay hoạt động liên tục, giảm mạnh chi phí điện giờ cao điểm.",
    capacity: "5 MWp",
    capacityKwp: 5000,
    location: "Đồng Nai",
    panelCount: "9.090 tấm pin",
    timeline: "11/2025",
    status: "Hoàn thành",
    client: "Công ty CP Cà Phê Chính xác Việt Nam",
    yearlyOutput: "7.200 MWh/năm",
    featured: true,
  },
  {
    id: 2,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1000&q=80",
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    summary:
      "Toàn bộ diện tích mái nhà xưởng được tận dụng, hệ thống đấu nối không làm gián đoạn sản xuất.",
    capacity: "2 MWp",
    capacityKwp: 2000,
    location: "Bình Dương",
    panelCount: "3.640 tấm pin",
    timeline: "04/2026",
    status: "Hoàn thành",
    client: "Công ty TNHH Bao bì Tân Tiến",
    yearlyOutput: "2.900 MWh/năm",
  },
  {
    id: 1,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=80",
    title: "Nhà máy May Việt Tân – Hưng Yên",
    summary:
      "Hệ hoà lưới 1,2 MWp cho nhà máy may, bù phần lớn lượng điện tiêu thụ trong giờ hành chính.",
    capacity: "1.2 MWp",
    capacityKwp: 1200,
    location: "Hưng Yên",
    panelCount: "2.180 tấm pin",
    timeline: "03/2025",
    status: "Hoàn thành",
    client: "Công ty May Việt Tân",
    yearlyOutput: "1.700 MWh/năm",
  },
  {
    id: 3,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&q=80",
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    summary:
      "Thi công theo tiến độ nghỉ hè để không ảnh hưởng việc dạy và học, kết hợp mái che sân trường.",
    capacity: "560 kWp",
    capacityKwp: 560,
    location: "TP. Hồ Chí Minh",
    panelCount: "1.020 tấm pin",
    timeline: "02/2026",
    status: "Hoàn thành",
    client: "Trường Quốc tế Việt Úc (VAS)",
    yearlyOutput: "800 MWh/năm",
  },
  {
    id: 5,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1000&q=80",
    title: "Tòa nhà văn phòng – Hà Nội",
    summary:
      "Hệ áp mái cho toà văn phòng, ưu tiên phần tải điều hoà vận hành ban ngày.",
    capacity: "220 kWp",
    capacityKwp: 220,
    location: "Hà Nội",
    panelCount: "400 tấm pin",
    timeline: "08/2025",
    status: "Hoàn thành",
    client: "Tập đoàn Bất động sản Vinhomes",
    yearlyOutput: "310 MWh/năm",
  },
  {
    id: 6,
    category: "ho-gia-dinh",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1000&q=80",
    title: "Biệt thự gia đình – Đà Nẵng",
    summary:
      "Hệ hybrid 10 kWp kèm pin lưu trữ, duy trì các tải quan trọng khi lưới điện gặp sự cố.",
    capacity: "10 kWp",
    capacityKwp: 10,
    location: "Đà Nẵng",
    panelCount: "18 tấm pin",
    timeline: "07/2025",
    status: "Hoàn thành",
    client: "Hộ gia đình (bảo mật thông tin)",
    yearlyOutput: "14 MWh/năm",
  },
  {
    id: 8,
    category: "ho-gia-dinh",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
    title: "Nhà phố khu dân cư – TP. HCM",
    summary:
      "Giải pháp gọn cho mái nhà phố diện tích hạn chế, lắp đặt và nghiệm thu trong 3 ngày.",
    capacity: "6 kWp",
    capacityKwp: 6,
    location: "TP. Hồ Chí Minh",
    panelCount: "11 tấm pin",
    timeline: "04/2025",
    status: "Hoàn thành",
    client: "Hộ gia đình (bảo mật thông tin)",
    yearlyOutput: "8,4 MWh/năm",
  },
  {
    id: 9,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1000&q=80",
    title: "Nhà máy Dệt may Thắng Lợi – Long An",
    summary:
      "Dự án 3,5 MWp đang trong giai đoạn lắp đặt khung và tấm pin trên mái nhà xưởng dệt.",
    capacity: "3.5 MWp",
    capacityKwp: 3500,
    location: "Long An",
    panelCount: "6.360 tấm pin",
    timeline: "Dự kiến 09/2026",
    status: "Đang thi công",
    client: "Tổng Công ty Dệt may Thắng Lợi",
    yearlyOutput: "5.000 MWh/năm",
  },
];

// ---------- DẢI SỐ LIỆU DƯỚI HERO ----------
export const projectsStatsNote =
  "Số liệu tổng hợp từ các công trình đã bàn giao và đang triển khai.";

// ---------- VÌ SAO CHỦ ĐẦU TƯ CHỌN VIETHUNGSOLAR ----------
export interface ProjectAssurance {
  icon: "survey" | "engineering" | "shield" | "support";
  title: string;
  description: string;
}

export const projectAssuranceSection = {
  eyebrow: "Cam kết trong mọi dự án",
  headline: "Cùng một tiêu chuẩn cho mọi quy mô công trình",
  description:
    "Dù là hệ 6 kWp cho nhà phố hay 8 MWp cho khu công nghiệp, quy trình và tiêu chuẩn kỹ thuật đều không thay đổi.",
};

export const projectAssurances: ProjectAssurance[] = [
  {
    icon: "survey",
    title: "Khảo sát và mô phỏng trước khi báo giá",
    description:
      "Đo đạc hiện trạng mái, hướng nắng và tủ điện, mô phỏng sản lượng theo hoá đơn điện thực tế của chủ đầu tư.",
  },
  {
    icon: "engineering",
    title: "Thi công không gián đoạn sản xuất",
    description:
      "Tiến độ được sắp theo lịch vận hành của nhà máy, đấu nối vào khung giờ đã thống nhất với bộ phận kỹ thuật.",
  },
  {
    icon: "shield",
    title: "Thiết bị chính hãng, hồ sơ đầy đủ",
    description:
      "Tấm pin, inverter và pin lưu trữ đều có CO, CQ, datasheet và chính sách bảo hành của hãng kèm theo hợp đồng.",
  },
  {
    icon: "support",
    title: "Theo dõi sản lượng sau nghiệm thu",
    description:
      "Bàn giao kèm hướng dẫn giám sát trên app, bảo trì định kỳ và hỗ trợ kỹ thuật trong suốt vòng đời hệ thống.",
  },
];
