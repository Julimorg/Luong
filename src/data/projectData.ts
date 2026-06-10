// ============================================================
// projectsData.ts — Cấu hình nội dung trang Dự án
// ============================================================

// ---------- BREADCRUMB ----------
export const projectsBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Dự án", to: "/du-an" },
];

// ---------- PAGE HEADER ----------
export const projectsPageHeader = {
  headline: "Dự án tiêu biểu",
  description:
    "Khám phá những dự án năng lượng mặt trời tiêu biểu mà chúng tôi đã triển khai trên khắp toàn quốc.",
};

// ---------- FILTER TABS ----------
export type ProjectCategory = "all" | "nha-may" | "doanh-nghiep" | "ho-gia-dinh" | "cong-nghiep";

export const projectTabs: { label: string; value: ProjectCategory }[] = [
  { label: "Tất cả",       value: "all" },
  { label: "Nhà máy",      value: "nha-may" },
  { label: "Doanh nghiệp", value: "doanh-nghiep" },
  { label: "Hộ gia đình",  value: "ho-gia-dinh" },
  { label: "Công nghiệp",  value: "cong-nghiep" },
];

// ---------- PROJECTS ----------
export interface Project {
  id: number;
  category: ProjectCategory;
  image: string;
  title: string;
  capacity: string;
  location: string;
  status: "Hoàn thành" | "Đang thi công";
}

export const projects: Project[] = [
  {
    id: 1,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80",
    title: "Nhà máy May Việt Tân – Hưng Yên",
    capacity: "1.2 MWp",
    location: "Hưng Yên",
    status: "Hoàn thành",
  },
  {
    id: 2,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=700&q=80",
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    capacity: "2 MWp",
    location: "Bình Dương",
    status: "Hoàn thành",
  },
  {
    id: 3,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80",
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    capacity: "560 kWp",
    location: "TP. Hồ Chí Minh",
    status: "Hoàn thành",
  },
  {
    id: 4,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=700&q=80",
    title: "Nhà máy Cà Phê Chính xác – Đồng Nai",
    capacity: "5 MWp",
    location: "Đồng Nai",
    status: "Hoàn thành",
  },
  {
    id: 5,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=700&q=80",
    title: "Tòa nhà văn phòng – Hà Nội",
    capacity: "220 kWp",
    location: "Hà Nội",
    status: "Hoàn thành",
  },
  {
    id: 6,
    category: "ho-gia-dinh",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    title: "Biệt thự gia đình – Đà Nẵng",
    capacity: "10 kWp",
    location: "Đà Nẵng",
    status: "Hoàn thành",
  },
  {
    id: 7,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
    title: "Khu công nghiệp VSIP – Bình Dương",
    capacity: "8 MWp",
    location: "Bình Dương",
    status: "Hoàn thành",
  },
  {
    id: 8,
    category: "ho-gia-dinh",
    image: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=700&q=80",
    title: "Nhà phố khu dân cư – TP. HCM",
    capacity: "6 kWp",
    location: "TP. Hồ Chí Minh",
    status: "Hoàn thành",
  },
  {
    id: 9,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=700&q=80",
    title: "Nhà máy Dệt may Thắng Lợi – Long An",
    capacity: "3.5 MWp",
    location: "Long An",
    status: "Đang thi công",
  },
];