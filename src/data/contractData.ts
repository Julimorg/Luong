// ============================================================
// contactData.ts — Cấu hình nội dung trang Liên hệ
// ============================================================

// ---------- BREADCRUMB ----------
export const contactBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Liên hệ", to: "/lien-he" },
];

// ---------- PAGE HEADER ----------
export const contactPageHeader = {
  headline: "Liên hệ với chúng tôi",
  description: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.",
};

// ---------- CONTACT INFO ----------
export const contactInfo = {
  address: "Số 123, Đường ABC, P. An Phú, TP. Thủ Đức, TP. HCM",
  phone: "1900 1234",
  email: "info@solartech.vn",
  workingHours: "Thứ 2 – Thứ 7: 08:00 – 17:00",
};

export const contactItems = [
  {
    id: 1,
    icon: "location_on",
    label: "Địa chỉ",
    value: "Số 123, Đường ABC, P. An Phú,\nTP. Thủ Đức, TP. HCM",
  },
  {
    id: 2,
    icon: "phone",
    label: "Hotline",
    value: "1900 1234",
    href: "tel:19001234",
  },
  {
    id: 3,
    icon: "email",
    label: "Email",
    value: "info@solartech.vn",
    href: "mailto:info@solartech.vn",
  },
  {
    id: 4,
    icon: "schedule",
    label: "Thời gian làm việc",
    value: "Thứ 2 – Thứ 7: 08:00 – 17:00",
  },
];

// ---------- MAP ----------
export const contactMap = {
  // Google Maps embed src — thay bằng địa chỉ thật
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4822840459456!2d106.74368557480754!3d10.849521889305626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c539f5a0c!2zVGjhu6cgxJDhu6ljLCBUUC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn",
  label: "Solartech Energy",
  address: "Số 123, Đường ABC, P. An Phú, TP. Thủ Đức, TP. HCM",
};

// ---------- FORM ----------
export const contactForm = {
  title: "Gửi tin nhắn cho chúng tôi",
  fields: {
    name:    { label: "Họ và tên",        placeholder: "Nguyễn Văn A",      required: true },
    email:   { label: "Email",            placeholder: "email@example.com", required: true },
    phone:   { label: "Số điện thoại",    placeholder: "0909 xxx xxx",      required: false },
    message: { label: "Nội dung tin nhắn",placeholder: "Mô tả nhu cầu của bạn...", required: true },
  },
  submitLabel: "Gửi tin nhắn",
  sendingLabel: "Đang gửi...",
  successMsg: "Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ bạn sớm.",
  errorMsgDefault: "Gửi thất bại. Vui lòng thử lại sau.",
  errorMsgQuota: "Hệ thống đang bận, vui lòng liên hệ trực tiếp qua điện thoại.",
};