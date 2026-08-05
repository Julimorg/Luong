// ============================================================
// projectsData.ts — Cấu hình nội dung trang Dự án
// ============================================================

export const projectsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
];

// ---------- PAGE HEADER ----------
export const projectsPageHeader = {
  eyebrow: "Dự án tiêu biểu",
  headline: "Các dự án\nchúng tôi đã triển khai",
  description:
    "Những công trình năng lượng mặt trời trên khắp Việt Nam\nHiệu quả – Bền vững – Thân thiện môi trường",
};
export type ProjectFilterValue = "all" | "completed" | "in-progress";

export const projectFilters: { label: string; value: ProjectFilterValue }[] = [
  { label: "Tất cả dự án", value: "all" },
  { label: "Đã hoàn thành", value: "completed" },
  { label: "Đang triển khai", value: "in-progress" },
];

export type ProjectCategory = "nha-may" | "doanh-nghiep" | "cong-nghiep";

export const categoryLabels: Record<ProjectCategory, string> = {
  "nha-may": "Nhà máy",
  "doanh-nghiep": "Doanh nghiệp",
  "cong-nghiep": "Công nghiệp",
};

export interface Project {
  id: number;
  category: ProjectCategory;
  image: string;
  title: string;
  capacity: string;
  location: string;
  panelCount: string;   // VD: "2.180 tấm pin" — TODO: thay số liệu thật
  timeline: string;     // VD: "04/2026" — TODO: thay số liệu thật
  status: "Hoàn thành" | "Đang thi công";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
    title: "Nhà máy May Việt Tân – Hưng Yên",
    capacity: "1.2 MWp",
    location: "Hưng Yên",
    panelCount: "2.180 tấm pin",
    timeline: "03/2025",
    status: "Hoàn thành",
  },
  {
    id: 2,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80",
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    capacity: "2 MWp",
    location: "Bình Dương",
    panelCount: "3.640 tấm pin",
    timeline: "04/2026",
    status: "Hoàn thành",
  },
  {
    id: 3,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80",
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    capacity: "560 kWp",
    location: "TP. Hồ Chí Minh",
    panelCount: "1.020 tấm pin",
    timeline: "02/2026",
    status: "Hoàn thành",
  },
  {
    id: 4,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    title: "Nhà máy Cà Phê Chính xác – Đồng Nai",
    capacity: "5 MWp",
    location: "Đồng Nai",
    panelCount: "9.090 tấm pin",
    timeline: "11/2025",
    status: "Hoàn thành",
    featured: true,
  },
  {
    id: 5,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=900&q=80",
    title: "Tòa nhà văn phòng – Hà Nội",
    capacity: "220 kWp",
    location: "Hà Nội",
    panelCount: "400 tấm pin",
    timeline: "08/2025",
    status: "Hoàn thành",
  },
  {
    id: 7,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    title: "Khu công nghiệp VSIP – Bình Dương",
    capacity: "8 MWp",
    location: "Bình Dương",
    panelCount: "14.540 tấm pin",
    timeline: "01/2026",
    status: "Hoàn thành",
    featured: true,
  },
  {
    id: 9,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&q=80",
    title: "Nhà máy Dệt may Thắng Lợi – Long An",
    capacity: "3.5 MWp",
    location: "Long An",
    panelCount: "6.360 tấm pin",
    timeline: "Dự kiến 09/2026",
    status: "Đang thi công",
  },
  {
    id: 10,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&q=80",
    title: "Nhà máy Dệt may Thắng Lợi – Long An",
    capacity: "3.5 MWp",
    location: "Long An",
    panelCount: "6.360 tấm pin",
    timeline: "Dự kiến 09/2026",
    status: "Đang thi công",
  },
];