import { Head } from "vite-react-ssg";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  organizationSchema,
  websiteSchema,
} from "./siteMeta";

interface SeoProps {
  /** Tiêu đề riêng của trang, sẽ được ghép thêm tên thương hiệu. */
  title: string;
  description: string;
  /** Đường dẫn của trang, ví dụ "/san-pham". */
  path: string;
  /** Ảnh hiển thị khi chia sẻ link; bỏ trống thì dùng ảnh mặc định. */
  image?: string;
  /** "website" cho trang danh mục, "article" cho trang chi tiết. */
  type?: "website" | "article";
  /** Dữ liệu có cấu trúc riêng của trang (breadcrumb, product...). */
  schemas?: object[];
  /** Chặn lập chỉ mục — dùng cho trang bảo trì. */
  noIndex?: boolean;
}

/**
 * Đặt toàn bộ thẻ <head> cho một trang.
 *
 * Nhờ vite-react-ssg, những thẻ này được ghi thẳng vào file HTML tĩnh lúc
 * build. Nghĩa là bot của Facebook và Zalo — vốn KHÔNG chạy JavaScript —
 * vẫn đọc được tiêu đề, mô tả và ảnh khi khách dán link.
 */
export function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  schemas = [],
  noIndex = false,
}: SeoProps) {
  // Trang chủ giữ tiêu đề nguyên vẹn, các trang khác thêm hậu tố thương hiệu.
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? DEFAULT_OG_IMAGE);

  // Organization + WebSite lặp trên mọi trang là đúng chuẩn schema.org:
  // Google gộp theo @id nên không bị tính là trùng lặp.
  const allSchemas = [organizationSchema, websiteSchema, ...schemas];

  return (
    <Head>
      <html lang="vi" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph — Facebook, Messenger, Zalo đọc nhóm thẻ này */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}
