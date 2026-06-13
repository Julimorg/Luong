import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  products,
  productSections,
  productsPageHeader,
  productsBreadcrumb,
  productCtaBanner,
  type Product,
} from "../../data/productData";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

// ─── Reveal wrapper ───────────────────────────────────────────
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

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const navigate   = useNavigate();
  const brandColor = product.brandColor ?? GOLD;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:shadow-gray-200/80 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

      {/* Image */}
      <div className="relative bg-gray-50 overflow-hidden" style={{ height: 180 }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm font-extrabold mb-1 tracking-wide" style={{ color: brandColor }}>
          {product.brand}
        </p>
        <h3 className="font-bold text-sm leading-snug mb-3 text-gray-800 group-hover:text-[#1c2f5c] transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex flex-col gap-1.5 mb-4">
          {product.specs.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-xs text-gray-500">
              <span>{s.label}:</span>
              <span className="font-semibold text-gray-700">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <button
            onClick={() => navigate(`/san-pham/${product.id}`)}
            className="w-full flex items-center justify-center gap-1.5 border border-gray-300 hover:border-[#1c2f5c] hover:bg-[#1c2f5c] hover:text-white text-gray-700 text-xs font-semibold py-2.5 rounded-lg transition-all duration-200"
          >
            Xem chi tiết
            <NavigateNextOutlinedIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────
function CategorySection({ section }: { section: typeof productSections[number] }) {
  const items = products.filter((p) => p.category === section.id);

  // Tấm pin: 6 col, inverter: 4 col, pin: 4 col
  const gridCols =
    section.id === "tam-pin"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="mb-12">
      {/* Section header */}
      <Reveal>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold uppercase text-[#f6b918] leading-tight">
                {section.title}
              </h2>
              <div className="h-[2px] w-10 rounded-full mt-1" style={{ backgroundColor: GOLD }} />
            </div>
          </div>
          {section.viewAll && (
            <Link
              to={section.viewAll}
              className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-[#f6b918] no-underline transition-colors duration-200 flex-shrink-0"
            >
              Xem tất cả
              <NavigateNextIcon sx={{ fontSize: 18 }} />
            </Link>
          )}
        </div>
      </Reveal>

      {/* Cards */}
      <div className={`grid ${gridCols} gap-4`}>
        {items.map((product, i) => (
          <Reveal key={product.id} delay={i * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductsPage() {
  const navigate  = useNavigate();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ══ */}
      <div className="relative pt-[72px] overflow-hidden">
        {/* Ảnh nền thật, không filter màu */}
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          {/* Badge line */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
              {productsPageHeader.badge}
            </span>
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
            {productsPageHeader.headline}
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            {productsPageHeader.description}
          </p>
        </div>

        {/* Breadcrumb — nằm ngay dưới hero, nền hơi sáng hơn */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <nav className="flex items-center gap-0.5 text-sm">
              {productsBreadcrumb.map((crumb, i) => (
                <span key={crumb.to} className="flex items-center gap-0.5">
                  {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />}
                  {i < productsBreadcrumb.length - 1 ? (
                    <Link
                      to={crumb.to}
                      className="text-white/50 hover:text-white no-underline transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/90 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ══ CATEGORY SECTIONS ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {productSections.map((section) => (
          <CategorySection key={section.id} section={section} />
        ))}
      </div>

      {/* ══ CTA BANNER ══ */}
      <div
        ref={ctaRef}
        className={`mx-4 sm:mx-6 lg:mx-8 xl:mx-auto max-w-7xl mb-12 rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ backgroundColor: NAVY }}
      >
        <div className="px-6 py-10 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-start lg:items-center gap-8">

          {/* Left text */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">
              {productCtaBanner.headline}
            </h2>
            <p className="text-white/50 text-sm">{productCtaBanner.description}</p>
            <button
              onClick={() => navigate("/lien-he")}
              className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200"
              style={{ backgroundColor: GOLD }}
            >
              {productCtaBanner.cta.label}
            </button>
          </div>

          {/* Right badges */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 flex-shrink-0">
            {productCtaBanner.badges.map((b) => (
              <div key={b.title} className="flex items-center gap-3 text-white">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-bold">{b.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}