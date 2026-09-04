import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  products,
  productSections,
  productsPageHeader,
  productCtaBanner,
  type Product,
} from "../../data/productData";
import { ProductCard } from "./components/ProductCard";
import { ComboSection } from "./components/ComboSection";

const GOLD = "#f6b918";
const NAVY = "#1c2f5c";
const HEADER_BG = "#121b45";

// ─── Icon theo danh mục ───
const categoryIconMap: Record<string, React.ReactNode> = {
  "tam-pin": <WbSunnyRoundedIcon sx={{ fontSize: 20 }} />,
  inverter: <MemoryRoundedIcon sx={{ fontSize: 20 }} />,
  "pin-luu-tru": <BatteryChargingFullRoundedIcon sx={{ fontSize: 20 }} />,
};
function pickCategoryIcon(id: string) {
  return categoryIconMap[id] ?? <GridViewRoundedIcon sx={{ fontSize: 20 }} />;
}

// ─── Lấy danh sách hãng duy nhất, giữ đúng thứ tự xuất hiện đầu tiên ───
function uniqueBrands(items: Product[]) {
  const seen = new Set<string>();
  const list: { name: string; color: string }[] = [];
  for (const p of items) {
    if (!seen.has(p.brand)) {
      seen.add(p.brand);
      list.push({ name: p.brand, color: p.brandColor ?? GOLD });
    }
  }
  return list;
}

// ─── Chỉ giữ thương hiệu từ đầu danh sách đến Astronergy ───
function limitBrandsToAstronergy(brands: { name: string; color: string }[]) {
  const cutoffIndex = brands.findIndex((b) => b.name === "Astronergy");
  return cutoffIndex === -1 ? brands : brands.slice(0, cutoffIndex + 1);
}

// ─── Reveal wrapper ───────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

// ─── Pill lọc thương hiệu — nền active trượt mượt bằng framer-motion layoutId ───
function FilterPill({
  label,
  isActive,
  color,
  layoutGroupId,
  onClick,
}: {
  label: string;
  isActive: boolean;
  color: string;
  layoutGroupId: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200"
      style={{
        color: isActive ? "#fff" : color,
        border: isActive ? "1px solid transparent" : `1px solid ${color}40`,
      }}
    >
      {isActive && (
        <motion.span
          layoutId={`pill-bg-${layoutGroupId}`}
          className="absolute inset-0"
          style={{ backgroundColor: color }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

// ─── Hàng lọc thương hiệu nằm ngang, phía trên lưới sản phẩm ───
function BrandFilterBar({
  brands,
  selected,
  onSelect,
  layoutGroupId,
}: {
  brands: { name: string; color: string }[];
  selected: string | null;
  onSelect: (brand: string | null) => void;
  layoutGroupId: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-2.5">
      <FilterPill
        label="Tất cả"
        isActive={selected === null}
        color={NAVY}
        layoutGroupId={layoutGroupId}
        onClick={() => onSelect(null)}
      />
      {brands.map((b) => (
        <FilterPill
          key={b.name}
          label={b.name}
          isActive={selected === b.name}
          color={b.color}
          layoutGroupId={layoutGroupId}
          onClick={() => onSelect(selected === b.name ? null : b.name)}
        />
      ))}
    </div>
  );
}

// ─── Variants cho lưới sản phẩm — stagger khi mount + khi đổi filter ───
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

// ─── Category Section ─────────────────────────────────────────
function CategorySection({
  section,
}: {
  section: (typeof productSections)[number];
}) {
  const items = useMemo(
    () => products.filter((p) => p.category === section.id),
    [section.id],
  );
  const brands = useMemo(
    () => limitBrandsToAstronergy(uniqueBrands(items)),
    [items],
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredItems = selectedBrand
    ? items.filter((p) => p.brand === selectedBrand)
    : items;

  return (
    <div>
      {/* Header danh mục */}
      <Reveal className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span style={{ color: GOLD }}>{pickCategoryIcon(section.id)}</span>
          <h2
            className="text-base sm:text-lg font-extrabold uppercase tracking-wide"
            style={{ color: GOLD }}
          >
            {section.title}
          </h2>
        </div>
        {section.subtitle && (
          <p className="text-sm text-gray-500">{section.subtitle}</p>
        )}
        {section.tagline && (
          <p className="text-xs text-gray-400 mt-0.5">{section.tagline}</p>
        )}
      </Reveal>

      {/* Hàng lọc thương hiệu — nằm NGANG phía trên, thay cho sidebar dọc cũ */}
      <Reveal delay={60}>
        <BrandFilterBar
          brands={brands}
          selected={selectedBrand}
          onSelect={setSelectedBrand}
          layoutGroupId={section.id}
        />
      </Reveal>

      {/* Lưới sản phẩm — wrapping grid chuẩn, KHÔNG còn cuộn ngang */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={gridVariants}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={cardVariants}
              exit="exit"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-400">
          Chưa có sản phẩm nào của thương hiệu này trong danh mục.
        </p>
      )}

      {/* Ghi chú cập nhật */}
      <Reveal delay={200}>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <InfoOutlinedIcon sx={{ fontSize: 15 }} />
          Các sản phẩm khác đang được cập nhật. Vui lòng liên hệ để được tư vấn
          chi tiết.
        </div>
      </Reveal>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductsPage() {
  const navigate = useNavigate();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({
    threshold: 0.1,
  });

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* ══ HEADER — nền màu đặc, không ảnh, căn trái ══ */}
      <div
        className="relative pt-[72px]"
        style={{ backgroundColor: HEADER_BG }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              {productsPageHeader.badge}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
            {productsPageHeader.headline}
          </h1>
          <p className="text-white/60 text-base max-w-xl leading-relaxed">
            {productsPageHeader.description}
          </p>
        </div>
      </div>

      <ComboSection />

      {/* ══ CATEGORY SECTIONS — có gạch ngang phân cách giữa các danh mục ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {productSections.map((section, i) => (
          <div key={section.id}>
            {i > 0 && (
              <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            )}
            <CategorySection section={section} />
          </div>
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
              <p className="text-white/60 text-base max-w-xl">
                {productCtaBanner.description}
              </p>
            </div>
            <button
              onClick={() => navigate("/lien-he")}
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: GOLD,
                boxShadow: `0 4px 20px ${GOLD}55`,
              }}
            >
              {productCtaBanner.cta.label}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Chừa sẵn chỗ cho thanh cuộn dọc -> triệt tiêu hiện tượng "chớp" khi trang đổi chiều cao */}
      <style>{`
        html { scrollbar-gutter: stable; }
      `}</style>
    </div>
  );
}
