import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { type ProjectCategory, projects, projectTabs, projectsBreadcrumb } from "../../data/projectData";
import { ctaBanner } from "../../data/dashBoardData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const GOLD = "#f6b918";

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

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? projects
        : projects.filter((p) => p.category === activeTab),
    [activeTab]
  );

  return (
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">

      {/* ══════════════════════ HERO ══════════════════════════ */}
      <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "420px" }}>
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

        {/* Center text */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4 animate-[fadeInUp_0.8s_ease_both]">
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                Dự án tiêu biểu
              </span>
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 animate-[fadeInUp_0.9s_0.1s_ease_both]"
            >
              {ctaBanner.headline}
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed animate-[fadeInUp_0.9s_0.2s_ease_both]">
              {ctaBanner.description}
            </p>
          </div>
        </div>

        {/* Breadcrumb bar — pinned to bottom of hero */}
        <div className="relative z-10 border-t border-white/10 bg-[#0d2137]/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1 text-sm">
              {projectsBreadcrumb.map((crumb, i) => (
                <span key={crumb.to} className="flex items-center gap-1">
                  {i > 0 && (
                    <NavigateNextIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />
                  )}
                  {i < projectsBreadcrumb.length - 1 ? (
                    <Link
                      to={crumb.to}
                      className="text-white/50 hover:text-white no-underline transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ══════════════ PROJECT LIST ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Filter tabs ── */}
          <Reveal delay={80} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {projectTabs.map((tab) => {
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

          {/* ── Project grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i * 60}>
                <Link
                  to={`/du-an/${project.id}`}
                  className="no-underline group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 h-full flex flex-col block"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor:
                          project.status === "Hoàn thành" ? "#22c55e" : "#f59e0b",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        height: 22,
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[#0d2137] font-bold text-base leading-snug mb-3 group-hover:text-[#f5a623] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <div className="flex flex-col gap-1.5 mb-4">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <BoltIcon sx={{ fontSize: 14, color: "#f5a623" }} />
                        <span>
                          Công suất:{" "}
                          <span className="font-semibold text-[#0d2137]">{project.capacity}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <LocationOnIcon sx={{ fontSize: 14, color: "#f5a623" }} />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1.5 text-[#f5a623] text-xs font-bold group-hover:gap-2.5 transition-all duration-200">
                        Xem chi tiết
                        <ArrowForwardIcon sx={{ fontSize: 13 }} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-4xl mb-3">📂</div>
              <div className="text-base font-medium">Chưa có dự án trong danh mục này.</div>
            </div>
          )}

        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}