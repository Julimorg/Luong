import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { categoryLabels, projectFilters, projects, projectsBreadcrumb, type Project, type ProjectFilterValue } from "../../../../data/projectData";
import { ctaBanner } from "../../../../data/dashBoardData";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";


const GOLD = "#f6b918";

const STATUS_DOT: Record<Project["status"], string> = {
  "Hoàn thành": "#4ade80",
  "Đang thi công": GOLD,
};

// ─── Reveal wrapper (giữ nguyên, dùng cho phần hero/tabs) ──────
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

// ─── Animation cho lưới project (bento) ────────────────────────
const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Project Card ───────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const featured = project.featured;

  return (
    <motion.div
      variants={cardVariants}
      className={featured ? "row-span-2 sm:col-span-2 sm:row-span-2" : ""}
    >
      <Link
        to={`/du-an/${project.id}`}
        className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl no-underline"
      >
        {/* Ảnh nền — xám nhẹ lúc idle, lên màu + zoom khi hover */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out grayscale-[0.35] brightness-[0.72] group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Top: tag loại hình + trạng thái */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">
            {categoryLabels[project.category]}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: STATUS_DOT[project.status] }}
            />
            {project.status}
          </span>
        </div>

        {/* Bottom: tên + vị trí luôn hiện, công suất + CTA hiện khi hover */}
        <div
          className={`relative z-10 ${
            featured ? "p-5 sm:p-7 lg:p-8" : "p-4 sm:p-5"
          }`}
        >
          <h3
            className={`text-white font-bold leading-snug mb-1.5 ${
              featured ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
            }`}
          >
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 text-white/55 text-xs transition-all duration-300 group-hover:mb-3">
            <LocationOnIcon sx={{ fontSize: 14 }} />
            {project.location}
          </div>

          {/* Kỹ thuật CSS Grid 0fr -> 1fr: mở rộng chiều cao mượt mà, không giật như max-height */}
          <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span
                  className={`font-extrabold text-white ${
                    featured ? "text-xl" : "text-base"
                  }`}
                >
                  {project.capacity}
                </span>
                <span
                  className="flex items-center gap-1 text-xs font-bold whitespace-nowrap"
                  style={{ color: GOLD }}
                >
                  Xem chi tiết
                  <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "completed") return projects.filter((p) => p.status === "Hoàn thành");
    if (activeFilter === "in-progress") return projects.filter((p) => p.status === "Đang thi công");
    return projects;
  }, [activeFilter]);

  return (
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">

      {/* ══════════════════════ HERO (giữ nguyên) ══════════════════════════ */}
      <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "420px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

        <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl">
            <div className="flex items-center justify-center gap-3 mb-4 animate-[fadeInUp_0.8s_ease_both]">
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                Dự án tiêu biểu
              </span>
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 animate-[fadeInUp_0.9s_0.1s_ease_both]">
              {ctaBanner.headline}
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed animate-[fadeInUp_0.9s_0.2s_ease_both]">
              {ctaBanner.description}
            </p>
          </div>
        </div>

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

          {/* ── Filter theo trạng thái ── */}
          <Reveal delay={80} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((tab) => {
                const isActive = activeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
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

          {/* ── Bento grid ── */}
          <motion.div
            key={activeFilter}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={gridContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[260px] lg:auto-rows-[240px] grid-flow-row-dense"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

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