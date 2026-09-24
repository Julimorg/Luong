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
  backgroundImage: "/du-an/nha-xuong-hieu-linh/tong.webp",
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
    id: 1,
    category: "nha-may",
    image: "/du-an/nha-xuong-hieu-linh/tong.webp",
    title: "Nhà xưởng Hiếu Linh – Bình Dương",
    summary:
      "Tối ưu nguồn điện ban ngày, nâng cao hiệu quả sử dụng năng lượng cho hoạt động sản xuất",
    capacity: "1 MWp",
    capacityKwp: 1000,
    location: "Bình Dương",
    panelCount: "2.200 tấm pin",
    timeline: "Tháng 12/2020",
    status: "Hoàn thành",
    client: "Công ty TNHH Thương Mại Và Xây Dựng Hiếu Linh",
    featured: true,
  },
  {
    id: 2,
    category: "doanh-nghiep",
    image: "/du-an/nha-hang-song-phat-2/tong.webp",
    title: "Nhà hàng Song Phát 2 – Bình Dương",
    summary:
      "Tận dụng diện tích mái – tối ưu nguồn điện sử dụng ban ngày",
    capacity: "220 kWp",
    capacityKwp: 220,
    location: "Bình Dương",
    panelCount: "518 tấm pin",
    timeline: "12/2020",
    status: "Hoàn thành",
    client: "Nhà hàng Song Phát 2",
    featured: true,
  },
  {
    id: 3,
    category: "ho-gia-dinh",
    image: "/du-an/ho-gia-dinh/tong.webp",
    title: "Hộ gia đình – Lái Thiêu, TP.HCM",
    summary:
      "Dự án điện mặt trời áp mái 10 kWp tại Lái Thiêu, TP.HCM được triển khai nhằm tận dụng nguồn điện mặt trời ban ngày, nâng cao hiệu quả sử dụng điện và tăng tính chủ động về năng lượng cho công trình.",
    capacity: "10 kWp",
    capacityKwp: 10,
    location: "Lái Thiêu, TP.HCM",
    panelCount: "16 tấm pin",
    timeline: "Tháng 07/2026",
    status: "Hoàn thành",
    client: "Công trình dân dụng tại Lái Thiêu",
  },
  {
    id: 4,
    category: "ho-gia-dinh",
    image: "/du-an/trung-tam-dao-tao-toidm-education/tong.webp",
    title: "Trung tâm Đào tạo TOIDM Education – Thủ Đức, TP.HCM",
    summary:
      "Tận dụng không gian hiệu quả, lưu trữ năng lượng và chủ động nguồn điện cho hoạt động đào tạo",
    capacity: "10 kWp",
    capacityKwp: 10,
    location: "Thủ Đức, TP.HCM",
    panelCount: "16 tấm pin",
    timeline: "Tháng 05/2026",
    status: "Hoàn thành",
    client: "Trung tâm Đào tạo TOIDM Education",
  },
  {
    id: 5,
    category: "ho-gia-dinh",
    image: "/du-an/trung-tam-dao-tao-horizon/tong.webp",
    title: "Trung tâm Đào tạo Horizon – Dĩ An, TP.HCM",
    summary:
      "Tận dụng điện mặt trời ban ngày, lưu trữ năng lượng và chủ động nguồn điện khi cần",
    capacity: "10 kWp",
    capacityKwp: 10,
    location: "Dĩ An, TP.HCM",
    panelCount: "16 tấm pin",
    timeline: "Tháng 06/2026",
    status: "Hoàn thành",
    client: "Trung tâm Đào tạo Horizon",
  },
  {
    id: 6,
    category: "nha-may",
    image: "/du-an/nha-xuong-hiep-hoa-phat/tong.webp",
    title: "Nhà xưởng Hiệp Hòa Phát – Đồng Nai",
    summary:
      "Dự kiến khai thác hiệu quả diện tích mái, tối ưu nguồn điện ban ngày và nâng cao hiệu quả vận hành",
    capacity: "1,5 MWp",
    capacityKwp: 1500,
    location: "Đồng Nai",
    panelCount: "2.290 tấm pin",
    timeline: "Đang triển khai",
    status: "Đang thi công",
    client: "Đang cập nhật",
  },
  {
    id: 7,
    category: "doanh-nghiep",
    image: "/du-an/toa-nha-van-phong-tp-hcm-85-kwp/tong.webp",
    title: "Tòa nhà văn phòng TP.HCM 85 kWp",
    summary:
      "Tận dụng không gian mái, tối ưu nguồn điện sử dụng ban ngày và nâng cao hiệu quả vận hành",
    capacity: "85 kWp",
    capacityKwp: 85,
    location: "TP.HCM",
    panelCount: "132 tấm pin",
    timeline: "Đang triển khai",
    status: "Đang thi công",
    client: "Đang cập nhật",
  },
  {
    id: 8,
    category: "doanh-nghiep",
    image: "/du-an/toa-nha-van-phong-tp-hcm-40-kwp/tong.webp",
    title: "Tòa nhà văn phòng TP.HCM 40 kWp",
    summary:
      "Tận dụng diện tích mái, tối ưu nguồn điện sử dụng ban ngày và nâng cao hiệu quả vận hành",
    capacity: "40 kWp",
    capacityKwp: 40,
    location: "TP.HCM",
    panelCount: "62 tấm pin",
    timeline: "Đang triển khai",
    status: "Đang thi công",
    client: "Tòa nhà văn phòng tại TP.HCM",
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
    "Dù là hệ 10 kWp cho hộ gia đình hay 1,5 MWp cho nhà xưởng, quy trình và tiêu chuẩn kỹ thuật đều không thay đổi.",
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
