import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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

// ─── Product Card (catalog style) ─────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const navigate   = useNavigate();
  const brandColor = product.brandColor ?? GOLD;

  return (
    <div
      onClick={() => navigate(`/san-pham/${product.id}`)}
      className="group h-full bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/70 hover:shadow-2xl hover:shadow-gray-300/60 hover:border-gray-200 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Image — nền gradient nhạt để thiết bị nổi bật, object-contain để thấy trọn */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-5" style={{ height: 190 }}>
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-4 flex flex-col flex-1 text-center border-t border-gray-50">
        <h3 className="font-bold text-sm uppercase leading-snug text-[#1c2f5c] mb-3 min-h-[2.5rem] line-clamp-2 group-hover:text-[#f6b918] transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex flex-col gap-1 text-sm text-gray-500 mt-auto">
          {product.specs.map((s) => (
            <p key={s.label}>
              {s.label}: <span className="font-bold text-gray-800">{s.value}</span>
            </p>
          ))}
          <p>
            Thương hiệu: <span className="font-bold" style={{ color: brandColor }}>{product.brand}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Product Carousel (mũi tên + kéo thả) ─────────────────────
function ProductCarousel({ items }: { items: Product[] }) {
  const ref  = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Kéo thả bằng chuột (desktop); mobile dùng cuộn cảm ứng sẵn có
  const onMouseDown = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.pageX, startLeft: el.scrollLeft, moved: false };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const stop = () => { drag.current.active = false; };

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#1c2f5c] hover:bg-[#f6b918] text-white shadow-lg flex items-center justify-center transition-colors duration-200";

  return (
    <div className="relative">
      {canLeft && (
        <button aria-label="Trước" onClick={() => scrollByDir(-1)} className={`${arrowBase} left-0 -translate-x-1/2`}>
          <ChevronLeftIcon />
        </button>
      )}

      <div
        ref={ref}
        onScroll={update}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stop}
        onMouseLeave={stop}
        onClickCapture={(e) => {
          // Nếu vừa kéo thì chặn click (không điều hướng vào sản phẩm)
          if (drag.current.moved) {
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-[240px] sm:w-[256px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {canRight && (
        <button aria-label="Sau" onClick={() => scrollByDir(1)} className={`${arrowBase} right-0 translate-x-1/2`}>
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────
function CategorySection({ section }: { section: typeof productSections[number] }) {
  const items = products.filter((p) => p.category === section.id);

  return (
    <div className="mb-12">
      {/* Section header (đã bỏ "Xem tất cả") */}
      <Reveal>
        <div className="mb-5 pb-3 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-extrabold uppercase text-[#f6b918] leading-tight">
            {section.title}
          </h2>
          <div className="h-[2px] w-10 rounded-full mt-1" style={{ backgroundColor: GOLD }} />
        </div>
      </Reveal>

      {/* Carousel */}
      <Reveal>
        <ProductCarousel items={items} />
      </Reveal>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductsPage() {
  const navigate = useNavigate();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white">

      {/* ══ HERO ══ */}
      <div className="relative pt-[72px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
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

        {/* Breadcrumb */}
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

      {/* ══ CTA BANNER (full-bleed, kiểu trang chủ) ══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 180 }}>
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2f5c]/92 via-[#1c2f5c]/75 to-[#1c2f5c]/30" />

        <div
          ref={ctaRef}
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 transition-all duration-700 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-snug">
                {productCtaBanner.headline}
              </h2>
              <p className="text-white/60 text-base max-w-xl">{productCtaBanner.description}</p>
            </div>
            <button
              onClick={() => navigate("/lien-he")}
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: GOLD, boxShadow: `0 4px 20px ${GOLD}55` }}
            >
              {productCtaBanner.cta.label}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}