import { useRef } from "react";
import { Button, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SavingsIcon from "@mui/icons-material/Savings";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import HandshakeIcon from "@mui/icons-material/Handshake";
import StarIcon from "@mui/icons-material/Star";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculateIcon from "@mui/icons-material/Calculate";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import ConstructionIcon from "@mui/icons-material/Construction";
import SettingsIcon from "@mui/icons-material/Settings";
import { heroData, heroBadges, solutionsSection, solutionCards, statsData, projectsSection, projectCards, processSection, processSteps, ctaBanner } from "../../data/dashBoardData";
import { useScrollReveal } from "../../hooks/useScrollReveal";



// ─── Icon maps ────────────────────────────────────────────────
const badgeIconMap: Record<string, React.ReactNode> = {
  savings: <SavingsIcon sx={{ fontSize: 22 }} />,
  bolt: <BoltIcon sx={{ fontSize: 22 }} />,
  shield: <VerifiedUserIcon sx={{ fontSize: 22 }} />,
  support: <HeadsetMicIcon sx={{ fontSize: 22 }} />,
};

const solutionIconMap: Record<string, React.ReactNode> = {
  search: <SearchIcon sx={{ fontSize: 28 }} />,
  design_services: <DesignServicesIcon sx={{ fontSize: 28 }} />,
  engineering: <EngineeringIcon sx={{ fontSize: 28 }} />,
  headset_mic: <HeadsetMicIcon sx={{ fontSize: 28 }} />,
};

const statsIconMap: Record<string, React.ReactNode> = {
  solar_power: <SolarPowerIcon sx={{ fontSize: 28 }} />,
  bolt: <BoltIcon sx={{ fontSize: 28 }} />,
  handshake: <HandshakeIcon sx={{ fontSize: 28 }} />,
  star: <StarIcon sx={{ fontSize: 28 }} />,
};

const processIconMap: Record<string, React.ReactNode> = {
  description: <DescriptionIcon sx={{ fontSize: 26 }} />,
  calculate: <CalculateIcon sx={{ fontSize: 26 }} />,
  architecture: <ArchitectureIcon sx={{ fontSize: 26 }} />,
  construction: <ConstructionIcon sx={{ fontSize: 26 }} />,
  settings: <SettingsIcon sx={{ fontSize: 26 }} />,
};

// ─── Reveal wrapper ─────────────────────────────────────────
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function RevealItem({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

// ─── Section label ────────────────────────────────────────────
function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-0.5 bg-[#f5a623]" />
      <span className="text-[#f5a623] text-xs font-semibold uppercase tracking-[0.15em]">
        {text}
      </span>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div id="home">
      {/* ═══════════════════════════ HERO ═════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-0 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5 animate-[fadeInUp_0.8s_ease_both]">
              <span className="w-6 h-0.5 bg-[#f5a623]" />
              <span className="text-[#f5a623] text-xs font-semibold uppercase tracking-[0.2em]">
                {heroData.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5
                         animate-[fadeInUp_0.9s_0.1s_ease_both]"
              style={{ whiteSpace: "pre-line" }}
            >
              {heroData.headline}
            </h1>

            {/* Sub */}
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-[fadeInUp_0.9s_0.2s_ease_both]">
              {heroData.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.9s_0.3s_ease_both]">
              <Button
                variant="contained"
                href={heroData.ctaPrimary.href}
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
                  boxShadow: "0 4px 20px rgba(245,166,35,0.35)",
                  "&:hover": {
                    backgroundColor: "#e09410",
                    boxShadow: "0 6px 24px rgba(245,166,35,0.5)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaPrimary.label}
              </Button>
              <Button
                variant="outlined"
                href={heroData.ctaSecondary.href}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3.5,
                  py: 1.4,
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Hero badges bar */}
        <div className="relative z-10 mt-12 sm:mt-16">
          <div className="bg-white/10 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
                {heroBadges.map((badge, i) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5
                               animate-[fadeInUp_0.8s_ease_both]"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    <span className="text-[#f5a623] flex-shrink-0">
                      {badgeIconMap[badge.icon]}
                    </span>
                    <div>
                      <div className="text-white text-sm font-semibold leading-tight">
                        {badge.title}
                      </div>
                      <div className="text-white/50 text-xs mt-0.5">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ SOLUTIONS ════════════════════════ */}
      <section id="solutions" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <RevealSection>
              <SectionEyebrow text={solutionsSection.eyebrow} />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2137] leading-tight mb-4">
                {solutionsSection.headline}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {solutionsSection.description}
              </p>
              <Button
                variant="outlined"
                href={solutionsSection.cta.href}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "#0d2137",
                  color: "#0d2137",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                  py: 1.2,
                  "&:hover": {
                    backgroundColor: "#0d2137",
                    color: "#fff",
                    borderColor: "#0d2137",
                  },
                  transition: "all 0.2s",
                }}
              >
                {solutionsSection.cta.label}
              </Button>
            </RevealSection>

            {/* Right — 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {solutionCards.map((card, i) => (
                <RevealItem key={card.id} delay={i * 100}>
                  <div className="group p-5 rounded-xl border border-gray-100 hover:border-[#f5a623]/30 hover:shadow-lg hover:shadow-[#f5a623]/10 transition-all duration-300 cursor-default">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#f5a623]/10 text-[#f5a623] mb-4 group-hover:bg-[#f5a623] group-hover:text-white transition-all duration-300">
                      {solutionIconMap[card.icon]}
                    </span>
                    <h3 className="text-[#0d2137] font-bold text-base mb-2">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STATS ═══════════════════════════ */}
      <section className="py-12 sm:py-14 bg-[#0d2137]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {statsData.map((stat, i) => (
              <RevealItem key={stat.id} delay={i * 100} className="text-center lg:px-8">
                <div className="flex justify-center mb-2 text-[#f5a623]">
                  {statsIconMap[stat.icon]}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PROJECTS ════════════════════════ */}
      <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionEyebrow text={projectsSection.eyebrow} />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2137] leading-tight">
                {projectsSection.headline}
              </h2>
            </div>
            <a
              href={projectsSection.cta.href}
              className="flex items-center gap-1.5 text-[#f5a623] font-semibold text-sm no-underline hover:gap-3 transition-all duration-200 flex-shrink-0"
            >
              {projectsSection.cta.label}
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </a>
          </RevealSection>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projectCards.map((project, i) => (
              <RevealItem key={project.id} delay={i * 100}>
                <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "#22c55e",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-[#0d2137] font-semibold text-sm leading-snug mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <BoltIcon sx={{ fontSize: 14, color: "#f5a623" }} />
                      <span className="text-gray-500 text-xs">Công suất: {project.capacity}</span>
                    </div>
                    <a
                      href="#"
                      className="mt-3 flex items-center gap-1 text-[#f5a623] text-xs font-semibold no-underline hover:gap-2 transition-all duration-200"
                    >
                      Xem chi tiết <ArrowForwardIcon sx={{ fontSize: 12 }} />
                    </a>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PROCESS ═════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2137]">
              {processSection.headline}
            </h2>
          </RevealSection>

          {/* Steps */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5 bg-gray-100 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
              {processSteps.map((step, i) => (
                <RevealItem key={step.id} delay={i * 100} className="relative z-10">
                  <div className="flex flex-col items-center text-center group">
                    {/* Icon circle */}
                    <div className="w-16 h-16 rounded-full bg-gray-50 border-2 border-gray-100 group-hover:border-[#f5a623] group-hover:bg-[#f5a623]/10 flex items-center justify-center text-gray-400 group-hover:text-[#f5a623] transition-all duration-300 mb-3 relative">
                      {processIconMap[step.icon]}
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5a623] text-white text-[10px] font-bold flex items-center justify-center">
                        {step.id}
                      </span>
                    </div>
                    <h3 className="text-[#0d2137] font-bold text-sm mb-1.5">{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ CTA BANNER ═════════════════════════ */}
      <section className="py-14 sm:py-16 bg-[#0d2137] relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#f5a623]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#f5a623]/8 rounded-full blur-3xl pointer-events-none" />

        <RevealSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                  {ctaBanner.headline}
                </h2>
                <p className="text-white/60 text-base max-w-xl">{ctaBanner.description}</p>
              </div>
              <Button
                variant="contained"
                href={ctaBanner.cta.href}
                endIcon={<ArrowForwardIcon />}
                size="large"
                sx={{
                  backgroundColor: "#f5a623",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 4,
                  py: 1.5,
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
                {ctaBanner.cta.label}
              </Button>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [style*="animationDelay"] { animation-fill-mode: both; }
      `}</style>
    </div>
  );
}