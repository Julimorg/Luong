import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  products,
  productSections,
  productsPageHeader,
  productsBreadcrumb,
  productCtaBanner,
  productBrandInfo,
  type Product,
} from "../../data/productData";
import { ProductCard } from "./components/ProductCard";

const GOLD = "#f6b918";


// ─── Icon theo danh mục — key phải khớp với ProductCategory trong productData.ts ───
const categoryIconMap: Record<string, React.ReactNode> = {
  "tam-pin": <WbSunnyRoundedIcon sx={{ fontSize: 18 }} />,
  "inverter": <MemoryRoundedIcon sx={{ fontSize: 18 }} />,
  "pin-luu-tru": <BatteryChargingFullRoundedIcon sx={{ fontSize: 18 }} />, // đã sửa từ "luu-tru"
};

function pickCategoryIcon(id: string) {
  return categoryIconMap[id] ?? <GridViewRoundedIcon sx={{ fontSize: 18 }} />;
}

// ─── Gom sản phẩm theo brand, giữ đúng thứ tự xuất hiện trong mảng gốc ───
function groupByBrand(items: Product[]) {
  const order: string[] = [];
  const map = new Map<string, Product[]>();
  for (const p of items) {
    if (!map.has(p.brand)) {
      map.set(p.brand, []);
      order.push(p.brand);
    }
    map.get(p.brand)!.push(p);
  }
  return order.map((brand) => ({ brand, items: map.get(brand)! }));
}

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

  // Mũi tên chỉ hiện từ lg trở lên — mobile/tablet dùng vuốt cảm ứng tự nhiên
  const arrowBase =
    "hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#1c2f5c] hover:bg-[#f6b918] text-white shadow-lg items-center justify-center transition-colors duration-200";

  return (
    <div className="relative min-w-0">
      {canLeft && (
        <button aria-label="Trước" onClick={() => scrollByDir(-1)} className={`${arrowBase} left-0 -translate-x-1/2`}>
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
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
          if (drag.current.moved) {
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 cursor-grab active:cursor-grabbing lg:cursor-default"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {canRight && (
        <button aria-label="Sau" onClick={() => scrollByDir(1)} className={`${arrowBase} right-0 translate-x-1/2`}>
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
      )}
    </div>
  );
}

// ─── Brand Row: khối mô tả hãng bên trái + dải sản phẩm bên phải ──────
function BrandRow({ brand, items }: { brand: string; items: Product[] }) {
  const info = productBrandInfo[brand];
  const brandColor = items[0]?.brandColor ?? GOLD;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] gap-4 lg:gap-8 py-7 border-b border-gray-100 last:border-b-0">
      {/* Trái: tên hãng + mô tả ngắn + link */}
      <div className="lg:pr-2">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2" style={{ color: brandColor }}>
          {brand}
        </h3>
        {info?.description && (
          <p className="text-gray-500 text-xs leading-relaxed mb-3 max-w-[220px]">
            {info.description}
          </p>
        )}
        <Link
          to={info?.linkTo ?? `/san-pham?brand=${encodeURIComponent(brand)}`}
          className="inline-flex items-center gap-1 text-xs font-bold no-underline transition-all duration-200 hover:gap-2"
          style={{ color: GOLD }}
        >
          Tìm hiểu về {brand}
          <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </Link>
      </div>

      {/* Phải: dải sản phẩm — min-w-0 BẮT BUỘC để grid track không bị content đẩy rộng ra */}
      <div className="min-w-0">
        <ProductCarousel items={items} />
      </div>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────
function CategorySection({ section }: { section: typeof productSections[number] }) {
  const items = products.filter((p) => p.category === section.id);
  const brandGroups = groupByBrand(items);

  return (
    <div className="mb-12">
      <Reveal>
        <div className="flex items-center gap-2 mb-1 pb-3 border-b-2 border-gray-100">
          <span style={{ color: GOLD }}>{pickCategoryIcon(section.id)}</span>
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide" style={{ color: GOLD }}>
            {section.title}
          </h2>
        </div>
      </Reveal>

      {brandGroups.map(({ brand, items: brandItems }) => (
        <Reveal key={brand}>
          <BrandRow brand={brand} items={brandItems} />
        </Reveal>
      ))}
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

      {/* ══ CATEGORY SECTIONS — theo hãng, không còn "Xem tất cả" ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {productSections.map((section) => (
          <CategorySection key={section.id} section={section} />
        ))}
      </div>

      {/* ══ CTA BANNER (giữ nguyên) ══ */}
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