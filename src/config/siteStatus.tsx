// ============================================================
// siteStatus.ts — Công tắc trạng thái toàn bộ website
// ============================================================
// Chỉ cần đổi giá trị SITE_STATUS bên dưới để chuyển cả site sang
// bảo trì / đang cập nhật dữ liệu / chạy bình thường.
// KHÔNG cần sửa App.tsx hay bất kỳ route nào khác.

export type SiteStatus = "running" | "maintenance" | "updating";

// "running"     -> website hoạt động bình thường, hiện đúng route đang truy cập
// "maintenance" -> toàn site hiện trang "Website đang bảo trì"
// "updating"    -> toàn site hiện trang "Đang cập nhật dữ liệu"
export const SITE_STATUS: SiteStatus = "running";