import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { projectFilters, projects, projectsPageHeader, type ProjectFilterValue } from "../../data/projectData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ProjectCard } from "./components/ProjectCard";

const GOLD = "#f6b918";
const NAVY = "#0d2137";

// ─── Reveal wrapper (giữ nguyên, dùng cho header/tabs) ──────
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

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "completed") return projects.filter((p) => p.status === "Hoàn thành");
    if (activeFilter === "in-progress") return projects.filter((p) => p.status === "Đang thi công");
    return projects;
  }, [activeFilter]);

  return (
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">

      {/* ══════════════════════ HEADER — sáng, căn trái, tối giản ══════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 sm:pt-16 sm:pb-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {projectsPageHeader.eyebrow}
              </span>
              <span className="h-px w-10 bg-gray-300" />
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
              style={{ color: NAVY, whiteSpace: "pre-line" }}
            >
              {projectsPageHeader.headline}
            </h1>

            <p
              className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ whiteSpace: "pre-line" }}
            >
              {projectsPageHeader.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ PROJECT LIST — banner full-width, xếp chồng dọc ══════════════ */}
      <section className="py-10 sm:py-12 lg:py-14">
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

          {/* ── Danh sách card, xếp chồng dọc, full width ── */}
          <motion.div
            key={activeFilter}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={listContainerVariants}
            className="flex flex-col gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div key={project.id} variants={cardEntranceVariants}>
                <ProjectCard project={project} orderIndex={i} />
              </motion.div>
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

    </div>
  );
}