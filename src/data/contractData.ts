// ============================================================
// contactData.ts — Cấu hình nội dung trang Liên hệ
// ============================================================

import { footerData, socialLinks } from "./dashBoardData";

// ---------- BREADCRUMB ----------
export const contactBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Liên hệ", to: "/lien-he" },
];

// ---------- PAGE HEADER ----------
export const contactPageHeader = {
  eyebrow: "LIÊN HỆ VỚI CHÚNG TÔI",
  headline: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn",
  description:
    "Đội ngũ kỹ thuật VIETHUNGSOLAR sẵn sàng khảo sát và tư vấn giải pháp điện năng lượng mặt trời tối ưu, tiết kiệm và bền vững cho bạn.",
};

// ---------- THÔNG TIN LIÊN HỆ ----------
// Số điện thoại, email và địa chỉ lấy chung từ footerData để cả site
// chỉ có một nguồn sự thật; sửa ở dashBoardData là mọi nơi đổi theo.
const { address: COMPANY_ADDRESS, phone: HOTLINE, email: COMPANY_EMAIL } = footerData.contact;

/** Email nhận yêu cầu tư vấn gửi từ form. */
export const CONTACT_EMAIL = COMPANY_EMAIL;

export const contactInfo = {
  address: COMPANY_ADDRESS,
  phone: HOTLINE,
  email: COMPANY_EMAIL,
  workingHours: "Thứ 2 – Thứ 7: 08:00 – 17:00",
};

export interface ContactItem {
  id: number;
  icon: "location_on" | "phone" | "email" | "facebook";
  label: string;
  value: string;
  sub?: string; // dòng mô tả phụ
  href?: string;
  highlight?: boolean; // tô màu vàng cho value (vd: hotline)
}

export const contactItems: ContactItem[] = [
  {
    id: 1,
    icon: "location_on",
    label: "Địa chỉ",
    value: COMPANY_ADDRESS,
  },
  {
    id: 2,
    icon: "phone",
    label: "Hotline",
    value: HOTLINE,
    sub: "Hỗ trợ nhanh chóng",
    href: `tel:${HOTLINE.replace(/\D/g, "")}`,
    highlight: true,
  },
  {
    id: 3,
    icon: "email",
    label: "Email",
    value: COMPANY_EMAIL,
    sub: "Phản hồi trong 24h",
    href: `mailto:${COMPANY_EMAIL}`,
  },
  {
    id: 4,
    icon: "facebook",
    label: "Facebook / Messenger",
    value: socialLinks.facebookName,
    sub: "Nhắn tin để được tư vấn",
    href: socialLinks.messenger,
  },
];

// ---------- BẢN ĐỒ ----------
export const contactMap = {
  // Dạng nhúng ?output=embed không cần API key, tự tra theo địa chỉ bên dưới.
  embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(COMPANY_ADDRESS)}&hl=vi&z=16&output=embed`,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`,
  buttonLabel: "Xem trên Google Maps",
  label: "VIETHUNGSOLAR",
  address: COMPANY_ADDRESS,
};

// ---------- FORM ----------
export const contactForm = {
  title: "GỬI YÊU CẦU TƯ VẤN",
  subtitle:
    "Vui lòng để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ với bạn sớm nhất.",
  securityNote: "Thông tin của bạn được bảo mật tuyệt đối.",
  fields: {
    name:    { label: "Họ và tên",        placeholder: "Nhập họ và tên của bạn",      required: true },
    email:   { label: "Email",            placeholder: "Nhập email của bạn",          required: true },
    phone:   { label: "Số điện thoại",    placeholder: "Nhập số điện thoại của bạn",  required: true },
    message: { label: "Nội dung cần tư vấn", placeholder: "Bạn đang quan tâm đến giải pháp nào? Hãy để lại thông tin để chúng tôi tư vấn chi tiết.", required: true },
  },
  submitLabel: "GỬI YÊU CẦU TƯ VẤN",
  sendingLabel: "ĐANG GỬI...",
  successMsg: "Yêu cầu đã được gửi! Chúng tôi sẽ liên hệ bạn sớm.",
  errorMsgDefault: "Gửi thất bại. Vui lòng thử lại sau.",
  errorMsgQuota: "Hệ thống đang bận, vui lòng liên hệ trực tiếp qua điện thoại.",
};