// ============================================================
// aboutUsData.ts — Cấu hình nội dung trang Giới thiệu
// ============================================================

// ---------- BREADCRUMB ----------
export const aboutBreadcrumb = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
];

// ---------- INTRO ----------
export const aboutIntro = {
  headline: "Giới thiệu về Solartech",
  description:
    "Với hơn 10 năm kinh nghiệm trong lĩnh vực năng lượng mặt trời, Solartech tự hào là đối tác tin cậy của hàng nghìn khách hàng trên khắp cả nước.",
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
  imageAlt: "Hệ thống năng lượng mặt trời Solartech",
  values: [
    {
      id: 1,
      icon: "visibility",
      label: "Tầm nhìn",
      description:
        "Trở thành công ty hàng đầu trong lĩnh vực năng lượng tái tạo tại Việt Nam.",
    },
    {
      id: 2,
      icon: "flag",
      label: "Sứ mệnh",
      description:
        "Mang đến giải pháp năng lượng sạch, hiệu quả và bền vững cho cộng đồng.",
    },
    {
      id: 3,
      icon: "diamond",
      label: "Giá trị cốt lõi",
      description: "Uy tín – Chất lượng – Hiệu quả – Bền vững.",
    },
  ],
};

// ---------- STATS ----------
export const aboutStats = [
  { id: 1, value: "10+", label: "Năm kinh nghiệm" },
  { id: 2, value: "500+", label: "Dự án hoàn thành" },
  { id: 3, value: "50MW+", label: "Công suất lắp đặt" },
  { id: 4, value: "300+", label: "Khách hàng" },
];

// ---------- FIELDS OF OPERATION ----------
export const aboutFieldsSection = {
  headline: "Lĩnh vực hoạt động",
};

export const aboutFields = [
  {
    id: 1,
    icon: "design_services",
    title: "Tư vấn & thiết kế",
    description:
      "Giải pháp tối ưu phù hợp với nhu cầu khách hàng.",
  },
  {
    id: 2,
    icon: "construction",
    title: "Thi công & lắp đặt",
    description:
      "Thi công chuyên nghiệp, đảm bảo chất lượng.",
  },
  {
    id: 3,
    icon: "settings",
    title: "Vận hành & bảo trì",
    description:
      "Bảo trì định kỳ, đảm bảo hệ thống vận hành ổn định.",
  },
  {
    id: 4,
    icon: "inventory",
    title: "Cung cấp thiết bị",
    description:
      "Thiết bị chính hãng, chất lượng đến từ các thương hiệu uy tín.",
  },
];

// ---------- CTA BANNER ----------
export const aboutCta = {
  backgroundImage:
    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1600&q=80",
  quote:
    "Solartech cam kết mang đến giá trị bền vững và góp phần xây dựng tương lai xanh.",
  cta: { label: "Liên hệ với chúng tôi", to: "/lien-he" },
};