import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { products, productsBreadcrumb } from "../../data/productData";
import { productDetails } from "../../data/productDetailData";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

// ─── Hotline ──────────────────────────────────────────────────
const HOTLINE = "+84901234567"; // số gọi (dạng quốc tế, không khoảng trắng)
const HOTLINE_DISPLAY = "0908011931"; // số hiển thị

// ─── Reveal ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.06 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);
  const detail  = productDetails.find((d) => d.productId === productId);

  // Related products — cùng category, bỏ sản phẩm hiện tại
  const related = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  const [mainImg, setMainImg] = useState(0);

  // Nhận báo giá:
  //  - Tablet & mobile (< lg 1024px) → mở trình gọi điện
  //  - Desktop → hiện toast với hotline
  const handleRequestQuote = () => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;

    if (isMobileOrTablet) {
      window.location.href = `tel:${HOTLINE}`;
      return;
    }

    toast.info(
      <div className="flex flex-col gap-1">
        <span className="font-bold" style={{ color: NAVY }}>
          Nhận báo giá ngay
        </span>
        <span className="text-sm text-gray-600 leading-snug">
          Gọi hotline{" "}
          <a href={`tel:${HOTLINE}`} className="font-bold no-underline" style={{ color: GOLD }}>
            {HOTLINE_DISPLAY}
          </a>{" "}
          để được tư vấn &amp; báo giá nhanh nhất.
        </span>
      </div>,
      { autoClose: 5000 }
    );
  };

  if (!product || !detail) {
    return (
      <div className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Không tìm thấy sản phẩm.</p>
        <button
          onClick={() => navigate("/san-pham")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-bold"
          style={{ backgroundColor: NAVY }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Quay lại sản phẩm
        </button>
      </div>
    );
  }

  const brandColor = product.brandColor ?? GOLD;

  return (
    <div className="pt-[72px] min-h-screen bg-white">

      {/* ══ HERO / BREADCRUMB ══ */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-0.5 text-sm">
            {productsBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-0.5">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />}
                <Link to={crumb.to} className="text-gray-500 hover:text-[#f6b918] no-underline transition-colors duration-200">
                  {crumb.label}
                </Link>
              </span>
            ))}
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <span className="font-medium text-[#1c2f5c] line-clamp-1 max-w-[200px]">{product.name}</span>
          </nav>
          <button
            onClick={() => navigate("/san-pham")}
            className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1c2f5c] transition-colors duration-200"
          >
            <ArrowBackIcon sx={{ fontSize: 15 }} />
            Danh sách sản phẩm
          </button>
        </div>
      </div>

      {/* ══ MAIN: 2 CỘT ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Gallery ── */}
          <div className="lg:sticky lg:top-24">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] mb-3">
              <img
                src={detail.images[mainImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {/* Thumbnails */}
            {detail.images.length > 1 && (
              <div className="flex gap-2">
                {detail.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      mainImg === i ? "border-[#f6b918]" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ── */}
          <div className="flex flex-col gap-6">

            {/* Brand + name */}
            <div>
              <p className="text-sm font-extrabold tracking-widest mb-1" style={{ color: brandColor }}>
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug" style={{ color: NAVY }}>
                {product.name}
              </h1>
              <div className="h-[3px] w-14 rounded-full mt-3" style={{ backgroundColor: brandColor }} />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed border-l-2 pl-4" style={{ borderColor: brandColor }}>
              {detail.description}
            </p>

            {/* Highlights */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">Điểm nổi bật</p>
              <ul className="flex flex-col gap-2">
                {detail.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircleIcon sx={{ fontSize: 17, mt: "2px", flexShrink: 0 }} style={{ color: brandColor }} />
                    <span className="text-sm text-gray-600 leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-2">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-[11px] text-gray-400 mb-0.5">{s.label}</p>
                  <p className="text-sm font-extrabold" style={{ color: NAVY }}>{s.value}</p>
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-400 mb-0.5">Xuất xứ</p>
                <p className="text-sm font-extrabold" style={{ color: NAVY }}>{detail.origin}</p>
              </div>
            </div>

            {/* Warranty badge */}
            <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ borderColor: `${brandColor}40`, backgroundColor: `${brandColor}0D` }}>
              <VerifiedIcon sx={{ fontSize: 22, flexShrink: 0, mt: "1px" }} style={{ color: brandColor }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: NAVY }}>Bảo hành</p>
                <p className="text-sm text-gray-600 leading-snug">{detail.warranty}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRequestQuote}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                <PhoneIcon sx={{ fontSize: 17 }} />
                Nhận báo giá ngay
              </button>
              <button
                onClick={() => navigate("/lien-he")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                Yêu cầu tư vấn
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </button>
            </div>

          </div>
        </div>

        {/* ══ FULL SPECS TABLE ══ */}
        <Reveal className="mt-16">
          <h2 className="text-lg font-extrabold uppercase mb-5" style={{ color: NAVY }}>
            Thông số kỹ thuật
            <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
          </h2>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {detail.fullSpecs.map((s, i) => (
                  <tr key={s.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-5 text-gray-500 w-1/2 border-r border-gray-100">{s.label}</td>
                    <td className="py-3 px-5 font-semibold text-gray-800">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ══ DOCUMENTS ══ */}
        {detail.documents.length > 0 && (
          <Reveal className="mt-12">
            <h2 className="text-lg font-extrabold uppercase mb-5" style={{ color: NAVY }}>
              Tài liệu & Datasheet
              <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
            </h2>
            <div className="flex flex-wrap gap-3">
              {detail.documents.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium hover:border-[#f6b918] hover:text-[#1c2f5c] transition-all duration-200 no-underline"
                >
                  <DownloadIcon sx={{ fontSize: 17, color: GOLD }} />
                  {doc.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}

        {/* ══ RELATED PRODUCTS ══ */}
        {related.length > 0 && (
          <Reveal className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold uppercase" style={{ color: NAVY }}>
                Sản phẩm liên quan
                <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
              </h2>
              <Link
                to="/san-pham"
                className="flex items-center gap-0.5 text-sm text-gray-400 hover:text-[#f6b918] no-underline transition-colors duration-200"
              >
                Xem tất cả
                <NavigateNextIcon sx={{ fontSize: 18 }} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/san-pham/${p.id}`)}
                  className="group text-left bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-36 bg-gray-50 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-extrabold tracking-wide mb-1" style={{ color: p.brandColor ?? GOLD }}>
                      {p.brand}
                    </p>
                    <p className="text-xs font-semibold text-gray-700 leading-snug line-clamp-2">{p.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        )}

      </div>
    </div>
  );
}