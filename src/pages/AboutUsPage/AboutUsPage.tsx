import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import FactoryIcon from "@mui/icons-material/Factory";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  aboutBreadcrumb,
  aboutIntro,
  aboutFieldsSection,
  aboutFields,
  aboutWhySection,
  aboutCommitments,
  aboutCta,
  type AboutField,
} from "../../data/aboutUsData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f5a623";
const NAVY = "#0d2137";
const GREEN = "#22c55e";

// ─── Icon map ─────────────────────────────────────────────────
const fieldIconMap: Record<AboutField["icon"], React.ReactNode> = {
  home: <HomeIcon sx={{ fontSize: 30 }} />,
  business: <BusinessIcon sx={{ fontSize: 30 }} />,
  factory: <FactoryIcon sx={{ fontSize: 30 }} />,
  agriculture: <AgricultureIcon sx={{ fontSize: 30 }} />,
  battery: <BatteryChargingFullIcon sx={{ fontSize: 30 }} />,
};

// ─── Reveal wrapper ───────────────────────────────────────────
function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
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

// ─── MAIN ─────────────────────────────────────────────────────
export default function AboutUsPage() {
  return (
    <div className="pt-[72px]">

      {/* ══════════════════ BREADCRUMB ══════════════════ */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {aboutBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />}
                {i < aboutBreadcrumb.length - 1 ? (
                  <Link
                    to={crumb.to}
                    className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0d2137] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════════════════ INTRO + IMAGE ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <RevealSection>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  {aboutIntro.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2137] mb-5 leading-tight tracking-tight">
                {aboutIntro.brand}
              </h1>
              <div className="flex flex-col gap-4">
                {aboutIntro.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-500 text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </RevealSection>

            {/* Right — image */}
            <RevealSection delay={150} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutIntro.image}
                  alt={aboutIntro.imageAlt}
                  className="w-full h-[300px] sm:h-[380px] lg:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0d2137]/25 to-transparent" />
              </div>
            </RevealSection>

          </div>
        </div>
      </section>

      {/* ══════════════════ LĨNH VỰC HOẠT ĐỘNG ══════════════════ */}
      <section className="py-12 sm:py-14" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                {aboutFieldsSection.headline}
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {aboutFields.map((field, i) => (
              <RevealSection key={field.id} delay={i * 80}>
                <div className="group flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 h-full hover:bg-white/[0.08] hover:border-[#f5a623]/40 transition-all duration-300">
                  <span className="w-14 h-14 rounded-full bg-[#f5a623]/15 flex items-center justify-center text-[#f5a623] group-hover:bg-[#f5a623] group-hover:text-white transition-all duration-300">
                    {fieldIconMap[field.icon]}
                  </span>
                  <span className="text-white/90 text-sm font-semibold leading-snug">
                    {field.title}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ VÌ SAO CHỌN ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d2137]">
              {aboutWhySection.headline}
            </h2>
            <div className="w-10 h-1 rounded-full mt-3" style={{ backgroundColor: GOLD }} />
          </RevealSection>

          <RevealSection>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ backgroundColor: NAVY }}>
                <div className="px-5 sm:px-6 py-3.5 text-white text-xs font-bold uppercase tracking-wide">
                  {aboutWhySection.colCommit}
                </div>
                <div className="hidden sm:block px-5 sm:px-6 py-3.5 text-white text-xs font-bold uppercase tracking-wide border-l border-white/10">
                  {aboutWhySection.colValue}
                </div>
              </div>

              {/* Rows */}
              {aboutCommitments.map((row, i) => (
                <div
                  key={row.commit}
                  className={`grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100 ${
                    i % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                  }`}
                >
                  {/* Commit */}
                  <div className="flex items-start gap-2.5 px-5 sm:px-6 py-4">
                    <CheckCircleIcon sx={{ fontSize: 18, color: GREEN, mt: "1px", flexShrink: 0 }} />
                    <span className="text-[#0d2137] font-semibold text-sm leading-snug">
                      {row.commit}
                    </span>
                  </div>
                  {/* Value */}
                  <div className="px-5 sm:px-6 pb-4 sm:py-4 sm:border-l border-gray-100 pl-[2.65rem] sm:pl-6">
                    <span className="text-gray-500 text-sm leading-relaxed">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="relative overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutCta.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-[#0d2137]/80" />

        <div className="relative z-10 w-full py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left: quote + tags */}
              <div className="max-w-2xl">
                <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-5">
                  {aboutCta.quote}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {aboutCta.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-white/85 text-sm font-medium">
                      <CheckCircleIcon sx={{ fontSize: 16, color: GOLD }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: CTA button */}
              <Button
                component={Link}
                to={aboutCta.cta.to}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: GOLD,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3.5,
                  py: 1.4,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(245,166,35,0.3)",
                  "&:hover": {
                    backgroundColor: "#e09410",
                    boxShadow: "0 8px 28px rgba(245,166,35,0.45)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                {aboutCta.cta.label}
              </Button>
            </RevealSection>
          </div>
        </div>
      </section>

    </div>
  );
}