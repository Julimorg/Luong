import { motion, type Variants } from "framer-motion";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { processSection, processSteps } from "../../../../data/dashBoardData";
import { GOLD } from "../../themes/colors";

// ─── Timing: điều chỉnh 2 số này để nhanh/chậm hiệu ứng ───────────────
const STEP_STAGGER = 0.18;
const STEP_DURATION = 0.55;
const START_DELAY = 0.15;

const TOTAL_LINE_DURATION =
  START_DELAY + STEP_STAGGER * (processSteps.length - 1) + STEP_DURATION;

// ── Khai báo rõ kiểu `Variants` để TS hiểu đúng shape của transition/ease ──
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STEP_STAGGER,
      delayChildren: START_DELAY,
    },
  },
};

const circleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: STEP_DURATION, ease: [0.22, 1, 0.36, 1] },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: STEP_DURATION, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#0d2137" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <SectionEyebrow text={processSection.eyebrow} center />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            {processSection.headline}
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            {processSection.description}
          </p>
        </motion.div>

        {/* ══════════ Desktop: timeline NGANG (>= lg) ══════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative hidden lg:grid grid-cols-5 gap-x-2"
        >
          <div className="absolute top-7 left-[10%] right-[10%] h-px bg-white/10" />
          <motion.div
            className="absolute top-7 left-[10%] right-[10%] h-px origin-left"
            style={{ backgroundColor: GOLD }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: TOTAL_LINE_DURATION, ease: "easeInOut" }}
          />

          {processSteps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center px-1">
              <motion.span
                variants={circleVariants}
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 font-extrabold text-xl flex-shrink-0 mb-5"
                style={{ borderColor: GOLD, color: GOLD, backgroundColor: "#0d2137" }}
              >
                {step.id}
              </motion.span>
              <motion.div variants={textVariants}>
                <h3 className="text-white font-bold text-sm sm:text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* ══════════ Mobile / Tablet: timeline DỌC (< lg) ══════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="relative flex lg:hidden flex-col gap-10"
        >
          <div className="absolute top-7 bottom-7 left-7 w-px bg-white/10" />
          <motion.div
            className="absolute top-7 bottom-7 left-7 w-px origin-top"
            style={{ backgroundColor: GOLD }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: TOTAL_LINE_DURATION, ease: "easeInOut" }}
          />

          {processSteps.map((step) => (
            <div key={step.id} className="relative z-10 flex items-start gap-5">
              <motion.span
                variants={circleVariants}
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 font-extrabold text-xl flex-shrink-0"
                style={{ borderColor: GOLD, color: GOLD, backgroundColor: "#0d2137" }}
              >
                {step.id}
              </motion.span>
              <motion.div variants={textVariants} className="pt-3">
                <h3 className="text-white font-bold text-sm sm:text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-md">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}