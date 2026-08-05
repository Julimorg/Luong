import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { projectCards, projectsSection } from "../../../../data/dashBoardData";
import { GOLD, NAVY } from "../../themes/colors";

// ─── Điều chỉnh độ giãn nở khi hover ────────────────────────────────
const ACTIVE_FLEX_GROW = 4;
const IDLE_FLEX_GROW = 1;
const EXPAND_DURATION_MS = 700;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProjectAccordionCard({
  project,
  index,
  isActive,
  onEnter,
}: {
  project: (typeof projectCards)[number];
  index: number;
  isActive: boolean;
  onEnter: () => void;
}) {
  const orderLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={cardEntranceVariants}
      onMouseEnter={onEnter}
      className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        flexGrow: isActive ? ACTIVE_FLEX_GROW : IDLE_FLEX_GROW,
        flexShrink: 1,
        flexBasis: 0,
        transition: `flex-grow ${EXPAND_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {/* Ảnh nền */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isActive ? "scale(1.06)" : "scale(1)",
          filter: isActive ? "grayscale(0) brightness(0.85)" : "grayscale(0.25) brightness(0.6)",
          transition: `transform ${EXPAND_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${EXPAND_DURATION_MS}ms ease`,
        }}
      />

      {/* Gradient đáy — chỉ cần đậm khi active để làm nền cho chữ, mờ đi khi idle vì không có chữ */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        style={{
          opacity: isActive ? 1 : 0,
          transition: `opacity ${EXPAND_DURATION_MS}ms ease`,
        }}
      />

      {/* Số thứ tự ghost — luôn hiện, mờ bớt khi active để nhường chỗ nội dung */}
      <span
        className="absolute top-5 left-5 font-extrabold text-white select-none"
        style={{
          fontSize: "2.5rem",
          opacity: isActive ? 0.14 : 0.22,
          transition: `opacity ${EXPAND_DURATION_MS}ms ease`,
        }}
      >
        {orderLabel}
      </span>

      {/* Nội dung đầy đủ — chỉ xuất hiện khi card active (hover) */}
      <div
        className="absolute inset-x-0 bottom-0 p-6"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(16px)",
          transition: `opacity ${EXPAND_DURATION_MS}ms ease ${isActive ? 150 : 0}ms, transform ${EXPAND_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${isActive ? 150 : 0}ms`,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <p className="text-white/70 text-xs font-medium mb-2 whitespace-nowrap">
          Công suất {project.capacity}
        </p>
        <h3 className="text-white font-bold text-base sm:text-lg leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
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
        </motion.div>

        {/* ══════════ Desktop: accordion giãn ngang khi hover (>= lg) ══════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          onMouseLeave={() => setActiveIndex(null)}
          className="hidden lg:flex gap-3 h-[440px] xl:h-[560px]"
        >
          {projectCards.map((project, i) => (
            <ProjectAccordionCard
              key={project.id}
              project={project}
              index={i}
              isActive={activeIndex === i}
              onEnter={() => setActiveIndex(i)}
            />
          ))}
        </motion.div>

        {/* ══════════ Mobile / Tablet: grid card tĩnh, luôn hiện đủ thông tin (< lg) ══════════ */}
        {/* Trên mobile không có khái niệm hover thật, nên vẫn hiện đủ thông tin ngay từ đầu */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden"
        >
          {projectCards.map((project, i) => (
            <motion.div
              key={project.id}
              variants={cardEntranceVariants}
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span
                className="absolute top-4 left-4 font-extrabold text-white/20 select-none"
                style={{ fontSize: "2.25rem" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-white/70 text-xs font-medium mb-1.5">Công suất {project.capacity}</p>
                <h3 className="text-white font-bold text-sm leading-snug">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}