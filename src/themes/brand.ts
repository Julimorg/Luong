// ============================================================
// brand.ts — Bảng màu và font dùng chung cho toàn website
// ------------------------------------------------------------
// Chỉ có 3 màu thương hiệu. Mọi component nên import từ đây thay vì
// viết mã màu trực tiếp, để đổi nhận diện chỉ cần sửa một chỗ.
// ============================================================

/** Vàng thương hiệu — dùng cho nhấn mạnh, nút chính, icon. */
export const GOLD = "#fbae17";
/** Vàng đậm hơn — trạng thái hover của nút vàng. */
export const GOLD_DARK = "#dd9612";
/** Xanh navy đậm — chữ tiêu đề, nền tối, footer. */
export const NAVY = "#121b45";
/** Navy đậm hơn / nhạt hơn — dùng cho gradient nền tối. */
export const NAVY_DEEP = "#0b1130";
export const NAVY_SOFT = "#1b2a63";
/** Nền sáng mặc định. */
export const WHITE = "#ffffff";

/** Font chữ dùng chung toàn site. */
export const FONT_FAMILY = "'Roboto', 'Helvetica Neue', Arial, sans-serif";
