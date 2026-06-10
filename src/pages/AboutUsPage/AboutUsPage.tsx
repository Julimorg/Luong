import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import DiamondIcon from "@mui/icons-material/Diamond";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ConstructionIcon from "@mui/icons-material/Construction";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { aboutBreadcrumb, aboutIntro, aboutStats, aboutFieldsSection, aboutFields, aboutCta } from "../../data/aboutUsData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Icon maps ────────────────────────────────────────────────
const valueIconMap: Record<string, React.ReactNode> = {
  visibility: <VisibilityIcon sx={{ fontSize: 20 }} />,
  flag: <FlagIcon sx={{ fontSize: 20 }} />,
  diamond: <DiamondIcon sx={{ fontSize: 20 }} />,
};

const fieldIconMap: Record<string, React.ReactNode> = {
  design_services: <DesignServicesIcon sx={{ fontSize: 32 }} />,
  construction: <ConstructionIcon sx={{ fontSize: 32 }} />,
  settings: <SettingsIcon sx={{ fontSize: 32 }} />,
  inventory: <InventoryIcon sx={{ fontSize: 32 }} />,
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
export default function AboutPage() {
  return (
    <div className="pt-[72px]">

      {/* ══════════════════ BREADCRUMB ══════════════════ */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {aboutBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && (
                  <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                )}
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
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0d2137] mb-4 leading-tight">
                {aboutIntro.headline}
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {aboutIntro.description}
              </p>

              {/* Values list */}
              <div className="flex flex-col gap-5">
                {aboutIntro.values.map((v, i) => (
                  <RevealSection key={v.id} delay={i * 100}>
                    <div className="flex gap-4 items-start group">
                      {/* Icon */}
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center group-hover:bg-[#f5a623] group-hover:text-white transition-all duration-300">
                        {valueIconMap[v.icon]}
                      </span>
                      <div>
                        <div className="font-bold text-[#0d2137] text-sm mb-0.5">
                          {v.label}
                        </div>
                        <div className="text-gray-500 text-sm leading-relaxed">
                          {v.description}
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>

            {/* Right — image */}
            <RevealSection delay={150} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutIntro.image}
                  alt={aboutIntro.imageAlt}
                  className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0d2137]/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
                <span className="w-10 h-10 rounded-full bg-[#f5a623]/10 flex items-center justify-center text-[#f5a623] font-extrabold text-lg">
                  10+
                </span>
                <div>
                  <div className="text-[#0d2137] font-bold text-sm leading-tight">Năm kinh nghiệm</div>
                  <div className="text-gray-400 text-xs">trong lĩnh vực năng lượng sạch</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS BAR ══════════════════ */}
      <section className="py-10 sm:py-12 bg-[#0d2137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {aboutStats.map((stat, i) => (
              <RevealSection
                key={stat.id}
                delay={i * 80}
                className="text-center lg:px-8"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#f5a623] mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FIELDS OF OPERATION ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d2137]">
              {aboutFieldsSection.headline}
            </h2>
            <div className="w-10 h-1 bg-[#f5a623] rounded-full mt-3" />
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutFields.map((field, i) => (
              <RevealSection key={field.id} delay={i * 100}>
                <div className="group p-6 rounded-xl border border-gray-100 hover:border-[#f5a623]/30 hover:shadow-lg hover:shadow-[#f5a623]/8 transition-all duration-300 cursor-default h-full">
                  {/* Icon */}
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-[#f5a623]/10 group-hover:text-[#f5a623] transition-all duration-300 mb-4">
                    {fieldIconMap[field.icon]}
                  </span>
                  <h3 className="text-[#0d2137] font-bold text-base mb-2">
                    {field.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {field.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="relative overflow-hidden min-h-[200px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutCta.backgroundImage})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0d2137]/75" />

        <div className="relative z-10 w-full py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-snug max-w-2xl text-center sm:text-left">
                {aboutCta.quote}
              </p>
              <Button
                component={Link}
                to={aboutCta.cta.to}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#f5a623",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3.5,
                  py: 1.4,
                  flexShrink: 0,
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