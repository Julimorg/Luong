import { useRef } from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SavingsIcon from "@mui/icons-material/Savings";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculateIcon from "@mui/icons-material/Calculate";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import ConstructionIcon from "@mui/icons-material/Construction";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import {
  heroData,
  heroBadges,
  solutionsSection,
  solutionCards,
  projectsSection,
  projectCards,
  processSection,
  processSteps,
  ctaBanner,
} from "../../data/dashBoardData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Brand color ─────────────────────────────────────────────
const GOLD = "#f6b918";
const GOLD_DARK = "#d9a210";
const NAVY = "#0d2137";

// ─── Icon maps ───────────────────────────────────────────────
const badgeIconMap: Record<string, React.ReactNode> = {
  savings: <SavingsIcon sx={{ fontSize: 22 }} />,
  bolt:    <BoltIcon    sx={{ fontSize: 22 }} />,
  shield:  <VerifiedUserIcon sx={{ fontSize: 22 }} />,
  support: <HeadsetMicIcon  sx={{ fontSize: 22 }} />,
};

const solutionIconMap: Record<string, React.ReactNode> = {
  search:          <SearchIcon         sx={{ fontSize: 28 }} />,
  design_services: <DesignServicesIcon sx={{ fontSize: 28 }} />,
  engineering:     <EngineeringIcon    sx={{ fontSize: 28 }} />,
  headset_mic:     <HeadsetMicIcon     sx={{ fontSize: 28 }} />,
};

const processIconMap: Record<string, React.ReactNode> = {
  description: <DescriptionIcon sx={{ fontSize: 26 }} />,
  calculate:   <CalculateIcon   sx={{ fontSize: 26 }} />,
  architecture:<ArchitectureIcon sx={{ fontSize: 26 }} />,
  construction:<ConstructionIcon sx={{ fontSize: 26 }} />,
  settings:    <SettingsIcon    sx={{ fontSize: 26 }} />,
};

// ─── Reveal wrappers ─────────────────────────────────────────
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

function RevealItem({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
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

// ─── Section eyebrow ─────────────────────────────────────────
function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
      <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
        {text}
      </span>
    </div>
  );
}

// ─── Project card with hover reveal ──────────────────────────
function ProjectCard({ project }: { project: typeof projectCards[number] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]">
      {/* Image — always full cover */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Static dark gradient — bottom always slightly visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Hover info panel — slides up from bottom */}
      <div
        className="
          absolute inset-x-0 bottom-0
          translate-y-full group-hover:translate-y-0
          transition-transform duration-400 ease-out
          bg-gradient-to-t from-black/90 via-black/75 to-transparent
          px-4 pt-10 pb-5
        "
      >
        <h3 className="text-white font-bold text-sm leading-snug mb-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5">
          <BoltIcon sx={{ fontSize: 14, color: GOLD }} />
          <span className="text-white/70 text-xs">Công suất: {project.capacity}</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div id="home">

      {/* ══════════════════════ HERO ══════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5 animate-[fadeInUp_0.8s_ease_both]">
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {heroData.eyebrow}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 animate-[fadeInUp_0.9s_0.1s_ease_both]"
              style={{ whiteSpace: "pre-line" }}
            >
              {heroData.headline}
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-[fadeInUp_0.9s_0.2s_ease_both]">
              {heroData.subheadline}
            </p>

            <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.9s_0.3s_ease_both]">
              <Button
                variant="contained"
                onClick={() => navigate("/lien-he")}
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
                  boxShadow: `0 4px 20px ${GOLD}55`,
                  "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-1px)" },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaPrimary.label}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/giai-phap")}
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
                  "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateY(-1px)" },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════ SOLUTIONS ═════════════════════ */}
      <section id="solutions" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <RevealSection>
              <SectionEyebrow text={solutionsSection.eyebrow} />
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: NAVY }}>
                {solutionsSection.headline}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {solutionsSection.description}
              </p>
              <Button
                variant="outlined"
                onClick={() => navigate("/gioi-thieu")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: NAVY,
                  color: NAVY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                  py: 1.2,
                  "&:hover": { backgroundColor: NAVY, color: "#fff", borderColor: NAVY },
                  transition: "all 0.2s",
                }}
              >
                {solutionsSection.cta.label}
              </Button>
            </RevealSection>

            {/* Right 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {solutionCards.map((card, i) => (
                <RevealItem key={card.id} delay={i * 100}>
                  <div
                    className="group p-5 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-default"
                    style={{ ["--hover-border" as string]: `${GOLD}4D` }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300"
                      style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                    >
                      {solutionIconMap[card.icon]}
                    </span>
                    <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ═════════════════════════ */}
      {/* Hiển thị heroBadges (Tiết kiệm / Hiệu suất / An toàn / Bảo hành) */}
      <section className="py-12 sm:py-14" style={{ backgroundColor: "#1c2f5c" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {heroBadges.map((badge, i) => (
              <RevealItem key={badge.id} delay={i * 100} className="text-center lg:px-8">
                <div className="flex justify-center mb-3" style={{ color: GOLD }}>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: `${GOLD}1A` }}>
                    {badgeIconMap[badge.icon]}
                  </span>
                </div>
                <div className="text-base font-bold text-white mb-1 leading-snug">{badge.title}</div>
                <div className="text-white/50 text-xs">{badge.description}</div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROJECTS ══════════════════════ */}
      <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionEyebrow text={projectsSection.eyebrow} />
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: NAVY }}>
                {projectsSection.headline}
              </h2>
            </div>
            <button
              onClick={() => navigate("/du-an")}
              className="flex items-center gap-1.5 font-semibold text-sm flex-shrink-0 transition-all duration-200 hover:gap-3"
              style={{ color: GOLD }}
            >
              {projectsSection.cta.label}
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>
          </RevealSection>

          {/* Cards — ảnh only + hover reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projectCards.map((project, i) => (
              <RevealItem key={project.id} delay={i * 100}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROCESS ═══════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
              {processSection.headline}
            </h2>
          </RevealSection>

          <div className="relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5 bg-gray-100 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
              {processSteps.map((step, i) => (
                <RevealItem key={step.id} delay={i * 100} className="relative z-10">
                  <div className="flex flex-col items-center text-center group">
                    <div
                      className="w-16 h-16 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center text-gray-400 transition-all duration-300 mb-3 relative"
                      style={{ ["--tw-border-opacity" as string]: "1" }}
                    >
                      {processIconMap[step.icon]}
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                        style={{ backgroundColor: GOLD }}
                      >
                        {step.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CTA BANNER ════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 180 }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

        <RevealSection>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                  {ctaBanner.headline}
                </h2>
                <p className="text-white/60 text-base max-w-xl">{ctaBanner.description}</p>
              </div>
              <Button
                variant="contained"
                onClick={() => navigate("/lien-he")}
                endIcon={<ArrowForwardIcon />}
                size="large"
                sx={{
                  backgroundColor: GOLD,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 4,
                  py: 1.5,
                  flexShrink: 0,
                  boxShadow: `0 4px 20px ${GOLD}4D`,
                  "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-2px)", boxShadow: `0 8px 28px ${GOLD}73` },
                  transition: "all 0.2s",
                }}
              >
                {ctaBanner.cta.label}
              </Button>
            </div>
          </div>
        </RevealSection>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [style*="animationDelay"] { animation-fill-mode: both; }
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}