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

// ---------- FILTER THEO TRẠNG THÁI ----------
// Trước đây lọc theo loại hình công trình (bao gồm cả "Hộ gia đình") —
// giờ chuyển sang lọc theo tiến độ triển khai, phù hợp hơn cho trang showcase dự án lớn.
export type ProjectFilterValue = "all" | "completed" | "in-progress";

export const projectFilters: { label: string; value: ProjectFilterValue }[] = [
  { label: "Tất cả dự án", value: "all" },
  { label: "Đã hoàn thành", value: "completed" },
  { label: "Đang triển khai", value: "in-progress" },
];

// ---------- LOẠI HÌNH CÔNG TRÌNH ----------
// Không còn dùng để lọc — chỉ hiển thị như tag phân loại nhỏ trên mỗi card.
export type ProjectCategory = "nha-may" | "doanh-nghiep" | "cong-nghiep";

export const categoryLabels: Record<ProjectCategory, string> = {
  "nha-may": "Nhà máy",
  "doanh-nghiep": "Doanh nghiệp",
  "cong-nghiep": "Công nghiệp",
};

// ---------- PROJECTS ----------
export interface Project {
  id: number;
  category: ProjectCategory;
  image: string;
  title: string;
  capacity: string;
  location: string;
  status: "Hoàn thành" | "Đang thi công";
  featured?: boolean; // dự án nổi bật -> hiển thị card lớn hơn trong bố cục bento
}

export const projects: Project[] = [
  {
    id: 1,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
    title: "Nhà máy May Việt Tân – Hưng Yên",
    capacity: "1.2 MWp",
    location: "Hưng Yên",
    status: "Hoàn thành",
  },
  {
    id: 2,
    category: "nha-may",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80",
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    capacity: "2 MWp",
    location: "Bình Dương",
    status: "Hoàn thành",
  },
  {
    id: 3,
    category: "doanh-nghiep",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80",
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    capacity: "560 kWp",
    location: "TP. Hồ Chí Minh",
    status: "Hoàn thành",
  },
  {
    id: 4,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    title: "Nhà máy Cà Phê Chính xác – Đồng Nai",
    capacity: "5 MWp",
    location: "Đồng Nai",
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
    status: "Hoàn thành",
  },
  {
    id: 7,
    category: "cong-nghiep",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    title: "Khu công nghiệp VSIP – Bình Dương",
    capacity: "8 MWp",
    location: "Bình Dương",
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
    status: "Đang thi công",
  },
];