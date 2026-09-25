// ============================================================
// siteMeta.ts — Thông tin dùng cho SEO và dữ liệu có cấu trúc
// ------------------------------------------------------------
// Mọi URL tuyệt đối (canonical, og:url, sitemap) đều dựng từ SITE_URL,
// nên đổi tên miền chỉ cần sửa đúng một dòng ở đây.
// ============================================================

import { footerData, socialLinks } from "../data/dashBoardData";
import { OFFICE_COORDS } from "../data/contractData";

/** Tên miền chính thức, KHÔNG có dấu / ở cuối. */
export const SITE_URL = "https://viethungsolar.vn";

export const SITE_NAME = "VIETHUNGSOLAR";

/** Tên pháp nhân đầy đủ, hiển thị trong dữ liệu có cấu trúc. */
export const LEGAL_NAME = footerData.brand.tagline.replace(/^Thương hiệu của\s*/i, "");

/** Ảnh mặc định khi chia sẻ link (Facebook, Zalo, Messenger). */
export const DEFAULT_OG_IMAGE = "/og/viethungsolar-og.jpg";

/** Ghép đường dẫn tương đối thành URL tuyệt đối. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ─── Dữ liệu có cấu trúc dùng chung cho mọi trang ────────────────
// Organization giúp Google hiểu tên thương hiệu và logo; LocalBusiness
// gắn địa chỉ, toạ độ và số điện thoại để hiện trên Maps / tìm kiếm địa phương.

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo/logo_text_blue.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  email: footerData.contact.email,
  telephone: footerData.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: footerData.contact.address,
    addressLocality: "Thành phố Hồ Chí Minh",
    addressCountry: "VN",
  },
  sameAs: [socialLinks.facebook],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description:
    "Tư vấn, thiết kế và thi công hệ thống điện năng lượng mặt trời cho hộ gia đình, doanh nghiệp, nhà xưởng và trang trại.",
  url: SITE_URL,
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  telephone: footerData.contact.phone,
  email: footerData.contact.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: footerData.contact.address,
    addressLocality: "Thành phố Hồ Chí Minh",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: OFFICE_COORDS.lat,
    longitude: OFFICE_COORDS.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [socialLinks.facebook],
};

/**
 * WebSite schema — điều kiện để Google hiển thị TÊN SITE ("VIETHUNGSOLAR")
 * thay cho tên miền trần trong kết quả tìm kiếm.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: "Việt Hùng Solar",
  url: SITE_URL,
  inLanguage: "vi-VN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Dựng BreadcrumbList từ danh sách [tên, đường dẫn]. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
