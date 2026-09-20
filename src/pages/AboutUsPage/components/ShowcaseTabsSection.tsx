import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { aboutShowcaseSection, aboutShowcaseTabs } from "../../../data/aboutUsData";
import { GOLD, NAVY, Reveal } from "./aboutShared";

// ─── Khối 2: Tab tương tác Dự án / Sản phẩm ─────────────────────
export function ShowcaseTabsSection() {
  const [active, setActive] = useState(0);
  const tab = aboutShowcaseTabs[active];

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: NAVY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
            {aboutShowcaseSection.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {aboutShowcaseSection.headline}
          </h2>
          <p className="mt-3 text-white/55 text-sm sm:text-base">{aboutShowcaseSection.description}</p>
        </Reveal>

        {/* Tab bar dạng segmented control, nền trượt bằng layoutId */}
        <Reveal delay={80} className="flex justify-center mb-12">
          <div className="relative inline-flex rounded-full border border-white/15 bg-white/5 p-1">
            {aboutShowcaseTabs.map((t, i) => {
              const isActive = active === i;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className="relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-200"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="about-showcase-tab-bg"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: GOLD }}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-black"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  {tab.index}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  {tab.eyebrow}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-tight">{tab.headline}</h3>
              <div className="flex flex-col gap-4 mb-8">
                {tab.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <Link
                to={tab.cta.to}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, boxShadow: `0 4px 20px ${GOLD}55` }}
              >
                {tab.cta.label}
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                src={tab.image}
                alt={tab.headline}
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
