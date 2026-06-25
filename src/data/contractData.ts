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
  eyebrow: "LIÊN HỆ VỚI CHÚNG TÔI",
  headline: "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn",
  description:
    "Đội ngũ chuyên gia của SolarTech sẵn sàng tư vấn giải pháp năng lượng mặt trời tối ưu, tiết kiệm và bền vững cho bạn.",
};

// ---------- CONTACT INFO ----------
export const contactInfo = {
  address: "Số 123, Đường ABC, P. An Phú, TP. Thủ Đức, TP. HCM",
  phone: "1900 1234",
  email: "info@solartech.vn",
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
    value: "Số 123, Đường ABC, P. An Phú,\nTP. Thủ Đức, TP. HCM",
  },
  {
    id: 2,
    icon: "phone",
    label: "Hotline",
    value: "1900 1234",
    sub: "Hỗ trợ nhanh chóng",
    href: "tel:19001234",
    highlight: true,
  },
  {
    id: 3,
    icon: "email",
    label: "Email",
    value: "info@solartech.vn",
    sub: "Phản hồi trong 24h",
    href: "mailto:info@solartech.vn",
  },
  {
    id: 4,
    icon: "facebook",
    label: "Facebook / Messenger",
    value: "SolarTech Việt Nam",
    sub: "Nhắn tin để được tư vấn",
    href: "https://m.me/your-page",
  },
];

// ---------- MAP ----------
export const contactMap = {
  // Google Maps embed src — thay bằng địa chỉ thật
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4822840459456!2d106.74368557480754!3d10.849521889305626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c539f5a0c!2zVGjhu6cgxJDhu6ljLCBUUC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn",
  // Link mở Google Maps (nút "Xem trên Google Maps")
  mapsUrl: "https://maps.google.com/?q=10.849521889305626,106.74368557480754",
  buttonLabel: "Xem trên Google Maps",
  label: "Solartech Energy",
  address: "Số 123, Đường ABC, P. An Phú, TP. Thủ Đức, TP. HCM",
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