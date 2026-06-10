import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import { products, type ProductCategory, productsBreadcrumb, productsPageHeader, productTabs } from "../../data/productData";

// ─── Tag color map ────────────────────────────────────────────
const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  "Bán chạy": { bg: "#f5a623",      text: "#fff" },
  "Mới":      { bg: "#0d2137",      text: "#fff" },
  "Khuyến mãi":{ bg: "#ef4444",     text: "#fff" },
};

// ─── Reveal wrapper (reused from ProjectsPage pattern) ────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({ product }: { product: (typeof products)[number] }) {
  const tag = product.tag ? TAG_STYLES[product.tag] : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer h-full flex flex-col">

      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Tag badge */}
        {tag && product.tag && (
          <span
            className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {product.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Brand */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#f5a623] mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-[#0d2137] font-bold text-sm leading-snug mb-4 group-hover:text-[#f5a623] transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="flex flex-col gap-2 mb-5">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-1.5 text-gray-400">
                <CheckCircleOutlineIcon sx={{ fontSize: 13, color: "#d1d5db" }} />
                {spec.label}
              </span>
              <span className="font-semibold text-[#0d2137]">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* CTA — Yêu cầu báo giá */}
        <div className="mt-auto">
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#0d2137] hover:bg-[#f5a623] text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-200 group/btn"
          >
            <RequestQuoteIcon sx={{ fontSize: 15 }} />
            <span>Yêu cầu báo giá</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductCategory>("all");

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? products
        : products.filter((p) => p.category === activeTab),
    [activeTab]
  );

  return (
    <div className="pt-[72px] bg-white min-h-screen">

      {/* ══════════════ BREADCRUMB ══════════════ */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {productsBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && (
                  <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                )}
                {i < productsBreadcrumb.length - 1 ? (
                  <Link
                    to={crumb.to}
                    className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0d2137] font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page header ── */}
          <Reveal className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d2137] mb-2 leading-tight">
              {productsPageHeader.headline}
            </h1>
            <p className="text-gray-500 text-base max-w-2xl">
              {productsPageHeader.description}
            </p>
          </Reveal>

          {/* ── Filter tabs ── */}
          <Reveal delay={80} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {productTabs.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={[
                      "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border",
                      isActive
                        ? "bg-[#f5a623] border-[#f5a623] text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-[#f5a623] hover:text-[#f5a623]",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ── Product count ── */}
          <Reveal delay={100} className="mb-5">
            <p className="text-sm text-gray-400">
              Hiển thị{" "}
              <span className="font-semibold text-[#0d2137]">
                {filtered.length}
              </span>{" "}
              sản phẩm
            </p>
          </Reveal>

          {/* ── Product grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={i * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-4xl mb-3">📦</div>
              <div className="text-base font-medium">
                Chưa có sản phẩm trong danh mục này.
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}