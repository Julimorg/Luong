import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BoltIcon from "@mui/icons-material/Bolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LayersIcon from "@mui/icons-material/Layers";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BusinessIcon from "@mui/icons-material/Business";
import GridViewIcon from "@mui/icons-material/GridView";
import HomeIcon from "@mui/icons-material/Home";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { products, productsBreadcrumb, productSections, type Product } from "../../data/productData";
import { productDetails, type ProductDetail } from "../../data/productDetailData";

const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

const HOTLINE = "+84901234567";
const HOTLINE_DISPLAY = "0908011931";

// ─── Reveal (giữ nguyên) ────────────────────────────────────────
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

function pickStatIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("hiệu suất")) return <SpeedIcon sx={{ fontSize: 22 }} />;
  if (l.includes("nhiệt độ")) return <DeviceThermostatIcon sx={{ fontSize: 22 }} />;
  if (l.includes("điện áp")) return <ElectricBoltIcon sx={{ fontSize: 22 }} />;
  if (l.includes("bảo hành")) return <WorkspacePremiumIcon sx={{ fontSize: 22 }} />;
  if (l.includes("kính") || l.includes("mặt")) return <LayersIcon sx={{ fontSize: 22 }} />;
  if (l.includes("công suất")) return <BoltIcon sx={{ fontSize: 22 }} />;
  return <CheckCircleIcon sx={{ fontSize: 22 }} />;
}

function pickHighlightIcon(text: string) {
  const l = text.toLowerCase();
  if (l.includes("hiệu suất")) return <TrendingUpIcon sx={{ fontSize: 22 }} />;
  if (l.includes("kính") || l.includes("mặt")) return <LayersIcon sx={{ fontSize: 22 }} />;
  if (l.includes("bền") || l.includes("chống") || l.includes("ăn mòn")) return <ShieldIcon sx={{ fontSize: 22 }} />;
  if (l.includes("bảo hành")) return <WorkspacePremiumIcon sx={{ fontSize: 22 }} />;
  if (l.includes("suy giảm") || l.includes("tuổi thọ") || l.includes("vòng đời")) return <AutorenewIcon sx={{ fontSize: 22 }} />;
  return <CheckCircleIcon sx={{ fontSize: 22 }} />;
}

const DEFAULT_APPLICATIONS: { label: string; icon: React.ReactNode }[] = [
  { label: "Nhà máy – Nhà xưởng", icon: <WarehouseIcon sx={{ fontSize: 22 }} /> },
  { label: "Hệ thống thương mại", icon: <ApartmentIcon sx={{ fontSize: 22 }} /> },
  { label: "Trang trại năng lượng", icon: <AgricultureIcon sx={{ fontSize: 22 }} /> },
  { label: "Tòa nhà – Văn phòng", icon: <BusinessIcon sx={{ fontSize: 22 }} /> },
  { label: "Dự án quy mô lớn", icon: <GridViewIcon sx={{ fontSize: 22 }} /> },
  { label: "Hộ gia đình", icon: <HomeIcon sx={{ fontSize: 22 }} /> },
];
const APPLICATION_ICONS = DEFAULT_APPLICATIONS.map((a) => a.icon);

function buildQuickStats(product: Product, detail: ProductDetail) {
  const stats: { icon: React.ReactNode; value: string; label: string }[] = [];

  product.specs.forEach((s) => {
    stats.push({ icon: pickStatIcon(s.label), value: s.value, label: s.label });
  });

  const keywords = ["hiệu suất", "nhiệt độ", "điện áp", "bảo hành công suất", "kính", "bảo hành"];
  for (const kw of keywords) {
    if (stats.length >= 6) break;
    const found = detail.fullSpecs.find(
      (s) => s.label.toLowerCase().includes(kw) && !stats.some((st) => st.label === s.label)
    );
    if (found) stats.push({ icon: pickStatIcon(found.label), value: found.value, label: found.label });
  }

  return stats.slice(0, 6);
}

function RelatedCarousel({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative min-w-0">
      <div className="absolute -top-11 right-0 flex items-center gap-2">
        <button
          onClick={() => scrollByDir(-1)}
          disabled={!canLeft}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#f6b918] hover:text-[#1c2f5c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>
        <button
          onClick={() => scrollByDir(1)}
          disabled={!canRight}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#f6b918] hover:text-[#1c2f5c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      <div
        ref={ref}
        onScroll={update}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/san-pham/${p.id}`)}
            className="group snap-start w-[170px] flex-shrink-0 text-left bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="h-28 bg-gray-50 overflow-hidden flex items-center justify-center p-3">
              <img
                src={p.image}
                alt={p.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 border-t border-gray-50">
              <p className="text-xs font-semibold text-gray-700 leading-snug line-clamp-2 mb-1.5">{p.name}</p>
              {p.specs[0] && (
                <p className="text-[11px] text-gray-400 mb-1.5">
                  {p.specs[0].label}: <span className="font-semibold text-gray-600">{p.specs[0].value}</span>
                </p>
              )}
              <span className="text-[11px] font-bold" style={{ color: p.brandColor ?? GOLD }}>
                Xem chi tiết →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);
  const detail = productDetails.find((d) => d.productId === productId);

  const related = useMemo(() => {
    if (!product) return [];
    const sameBrand = products.filter((p) => p.brand === product.brand && p.id !== productId);
    if (sameBrand.length >= 3) return sameBrand;
    const sameCategory = products.filter(
      (p) => p.category === product.category && p.id !== productId && p.brand !== product.brand
    );
    return [...sameBrand, ...sameCategory];
  }, [product, productId]);

  const handleRequestQuote = () => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobileOrTablet) {
      window.location.href = `tel:${HOTLINE}`;
      return;
    }
    toast.info(
      <div className="flex flex-col gap-1">
        <span className="font-bold" style={{ color: NAVY }}>Nhận báo giá ngay</span>
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
  const categoryTitle = productSections.find((s) => s.id === product.category)?.title;
  const quickStats = buildQuickStats(product, detail);
  const applications =
    detail.applications && detail.applications.length > 0
      ? detail.applications.map((label, i) => ({ label, icon: APPLICATION_ICONS[i % APPLICATION_ICONS.length] }))
      : DEFAULT_APPLICATIONS;

  return (
    <div className="pt-[72px] min-h-screen bg-white">

      {/* ══ BREADCRUMB — nền trắng thuần, không còn nền xám ══ */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center gap-0.5 text-sm flex-wrap">
            {productsBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-0.5">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />}
                <Link to={crumb.to} className="text-gray-400 hover:text-[#f6b918] no-underline transition-colors duration-200">
                  {crumb.label}
                </Link>
              </span>
            ))}
            {categoryTitle && (
              <>
                <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                <span className="text-gray-400">{categoryTitle}</span>
              </>
            )}
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <span className="font-medium text-[#1c2f5c] line-clamp-1 max-w-[240px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ══ MAIN: 2 CỘT — text trái, ảnh nổi trực tiếp trên nền trắng bên phải ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10 items-center mb-10">

          {/* ── LEFT: thông tin chính ── */}
          <Reveal>
            <p
              className="text-2xl sm:text-3xl font-black uppercase tracking-wide mb-1"
              style={{ color: brandColor }}
            >
              {product.brand}
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-snug mb-2" style={{ color: NAVY }}>
              {product.name}
            </h1>

            {detail.tags && detail.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                {detail.tags.map((tag, i) => (
                  <span key={tag} className="flex items-center gap-2">
                    {i > 0 && <span className="text-gray-300 font-normal">|</span>}
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-md">{detail.description}</p>

            <button
              onClick={() => navigate("/lien-he")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border-2 transition-all duration-200 hover:text-white mb-3"
              style={{
                borderColor: GOLD,
                color: GOLD,
                backgroundColor: `${GOLD}0D`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${GOLD}0D`)}
            >
              Liên hệ tư vấn giải pháp
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>

            <div>
              <button
                onClick={handleRequestQuote}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#1c2f5c] transition-colors duration-200"
              >
                <PhoneIcon sx={{ fontSize: 14 }} />
                Hoặc gọi hotline {HOTLINE_DISPLAY} để nhận báo giá nhanh
              </button>
            </div>
          </Reveal>

          {/* ── RIGHT: ảnh sản phẩm nổi trên nền trắng, không khung/không nền gradient ── */}
          <Reveal delay={100}>
            <div className="flex items-center justify-center lg:justify-end" style={{ minHeight: 280 }}>
              <img
                src={detail.images[0]}
                alt={product.name}
                className="max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] max-w-full object-contain"
              />
            </div>
          </Reveal>
        </div>

        {/* ══ DẢI CHỈ SỐ NHANH ══ */}
        {quickStats.length > 0 && (
          <Reveal className="mb-14">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm px-3 py-4"
                >
                  <span style={{ color: brandColor }}>{stat.icon}</span>
                  <span className="text-base font-extrabold" style={{ color: NAVY }}>{stat.value}</span>
                  <span className="text-[11px] text-gray-400 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ══ THÔNG SỐ KỸ THUẬT + ĐIỂM NỔI BẬT ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <Reveal>
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
                  <tr className={detail.fullSpecs.length % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-5 text-gray-500 w-1/2 border-r border-gray-100">Xuất xứ</td>
                    <td className="py-3 px-5 font-semibold text-gray-800">{detail.origin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-lg font-extrabold uppercase mb-5" style={{ color: NAVY }}>
              Điểm nổi bật
              <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {detail.highlights.map((h) => (
                <div
                  key={h}
                  className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-4"
                >
                  <span style={{ color: brandColor }}>{pickHighlightIcon(h)}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ══ TÀI LIỆU TẢI VỀ + ỨNG DỤNG PHÙ HỢP ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {detail.documents.length > 0 && (
            <Reveal>
              <h2 className="text-lg font-extrabold uppercase mb-5" style={{ color: NAVY }}>
                Tài liệu tải về
                <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
              </h2>
              <div className="rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {detail.documents.map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm text-gray-700 font-medium hover:bg-gray-50 hover:text-[#1c2f5c] transition-colors duration-200 no-underline"
                  >
                    <span className="flex items-center gap-2.5">
                      <DescriptionIcon sx={{ fontSize: 18, color: GOLD, flexShrink: 0 }} />
                      {doc.label}
                    </span>
                    <DownloadIcon sx={{ fontSize: 17, color: "#9ca3af", flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <h2 className="text-lg font-extrabold uppercase mb-5" style={{ color: NAVY }}>
              Ứng dụng phù hợp
              <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {applications.map((app) => (
                <div
                  key={app.label}
                  className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-2 py-4"
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
                  >
                    {app.icon}
                  </span>
                  <p className="text-[11px] text-gray-500 leading-tight">{app.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ══ SẢN PHẨM KHÁC CÙNG THƯƠNG HIỆU ══ */}
        {related.length > 0 && (
          <Reveal>
            <h2 className="text-lg font-extrabold uppercase mb-8" style={{ color: NAVY }}>
              Sản phẩm khác của {product.brand}
              <div className="h-[3px] w-10 rounded-full mt-1.5" style={{ backgroundColor: GOLD }} />
            </h2>
            <RelatedCarousel items={related} />
          </Reveal>
        )}

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}