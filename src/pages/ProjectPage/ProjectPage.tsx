import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import {
  categoryLabels,
  projectFilters,
  projects,
  type ProjectCategory,
  type ProjectFilterValue,
} from "../../data/projectData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectsHero } from "./components/ProjectsHero";
import { FeaturedProject } from "./components/FeaturedProject";
import { GOLD, NAVY } from "../../themes/brand";
import { Seo } from "../../seo/Seo";
import { pageSeo } from "../../seo/pageSeo";
import { breadcrumbSchema } from "../../seo/siteMeta";

// ─── Reveal wrapper dùng cho tiêu đề / thanh lọc ───────────────
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

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// ─── Nút lọc dùng chung ────────────────────────────────────────
function FilterChip({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200"
      style={{
        color: isActive ? "#fff" : NAVY,
        backgroundColor: isActive ? NAVY : "#fff",
        borderColor: isActive ? NAVY : "rgba(18,27,69,0.15)",
      }}
    >
      {label}
      {count !== undefined && (
        <span className={isActive ? "ml-1.5 text-white/60" : "ml-1.5 text-gray-400"}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function ProjectsPage() {
  const [status, setStatus] = useState<ProjectFilterValue>("all");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");

  const featured = useMemo(() => projects.filter((p) => p.featured), []);

  const categoryOptions = useMemo(() => {
    const counts = new Map<ProjectCategory, number>();
    for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [...counts.entries()].map(([value, count]) => ({
      value,
      label: categoryLabels[value],
      count,
    }));
  }, []);

  const statusCounts = useMemo(
    () => ({
      all: projects.length,
      completed: projects.filter((p) => p.status === "Hoàn thành").length,
      "in-progress": projects.filter((p) => p.status === "Đang thi công").length,
    }),
    [],
  );

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchStatus =
          status === "all" ||
          (status === "completed" && p.status === "Hoàn thành") ||
          (status === "in-progress" && p.status === "Đang thi công");
        const matchCategory = category === "all" || p.category === category;
        return matchStatus && matchCategory;
      }),
    [status, category],
  );

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <Seo
        title={pageSeo.projects.title}
        description={pageSeo.projects.description}
        path="/du-an"
        schemas={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Dự án", path: "/du-an" },
          ]),
        ]}
      />
      <ProjectsHero />

      {/* ══ DỰ ÁN TRỌNG ĐIỂM ══ */}
      {featured.length > 0 && (
        <section className="bg-[#f7f8fa] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-8 max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: GOLD }}
                >
                  Công trình quy mô lớn
                </span>
              </div>
              <h2
                className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
                style={{ color: NAVY }}
              >
                Những dự án nói lên năng lực triển khai
              </h2>
              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                Hai công trình quy mô MWp cho thấy khả năng khảo sát, thiết kế và thi công của
                đội ngũ trên hiện trường công nghiệp.
              </p>
            </Reveal>

            <div className="flex flex-col gap-6">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <FeaturedProject project={p} flip={i % 2 === 1} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ TOÀN BỘ DỰ ÁN ══ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: GOLD }}
                >
                  Danh mục công trình
                </span>
              </div>
              <h2
                className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
                style={{ color: NAVY }}
              >
                Các dự án tiêu biểu
              </h2>
              <p className="mt-3 text-sm text-gray-500 sm:text-base">
                Lọc theo loại công trình hoặc trạng thái để xem dự án gần với nhu cầu của bạn nhất.
              </p>
            </div>

            {/* Lọc theo trạng thái */}
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((f) => (
                <FilterChip
                  key={f.value}
                  label={f.label}
                  count={statusCounts[f.value]}
                  isActive={status === f.value}
                  onClick={() => setStatus(f.value)}
                />
              ))}
            </div>
          </Reveal>

          {/* Lọc theo loại công trình */}
          <Reveal delay={60} className="mb-8">
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
              <span className="mr-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                Loại công trình
              </span>
              <button
                onClick={() => setCategory("all")}
                className="rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200"
                style={{
                  color: category === "all" ? NAVY : "#6b7280",
                  backgroundColor: category === "all" ? `${GOLD}26` : "#fff",
                  borderColor: category === "all" ? GOLD : "#e5e7eb",
                }}
              >
                Tất cả
              </button>
              {categoryOptions.map((c) => {
                const isActive = category === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className="rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200"
                    style={{
                      color: isActive ? NAVY : "#6b7280",
                      backgroundColor: isActive ? `${GOLD}26` : "#fff",
                      borderColor: isActive ? GOLD : "#e5e7eb",
                    }}
                  >
                    {c.label}
                    <span className="ml-1.5 text-gray-400">{c.count}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Lưới dự án */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={gridVariants}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div key={project.id} layout variants={cardVariants} exit="exit">
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
              <SearchOffRoundedIcon sx={{ fontSize: 40, color: "#d1d5db" }} />
              <p className="text-sm font-bold" style={{ color: NAVY }}>
                Chưa có dự án phù hợp bộ lọc này
              </p>
              <button
                onClick={() => {
                  setStatus("all");
                  setCategory("all");
                }}
                className="text-xs font-bold underline"
                style={{ color: GOLD }}
              >
                Xoá bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
