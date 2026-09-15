import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShieldIcon from "@mui/icons-material/Shield";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  aboutBreadcrumb,
  aboutIntro,
  aboutStats,
  aboutManifesto,
  aboutShowcaseSection,
  aboutShowcaseTabs,
  aboutWhySection,
  aboutWhyItems,
  aboutTrustBand,
  aboutBrandLogos,
  aboutFinalCta,
  type WhyChooseItem,
} from "../../data/aboutUsData";
import { footerData } from "../../data/dashBoardData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { CompanyFlipbook } from "./components/companyFlipBook";
import { BrandMarquee } from "./components/brandMaque";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f5a623";
const NAVY = "#0d2137";

const whyIconMap: Record<WhyChooseItem["icon"], SvgIconComponent> = {
  search: SearchRoundedIcon,
  handshake: HandshakeIcon,
  shield: ShieldIcon,
  engineering: EngineeringIcon,
  support: SupportAgentIcon,
  check: FactCheckIcon,
};

// ─── Reveal wrapper dùng chung ──────────────────────────────────
function Reveal({
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

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Khối 1: Tuyên ngôn thương hiệu — typography lớn + parallax nhẹ ───
function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20 sm:py-28 bg-white">
      {/* Khối trang trí trôi nhẹ theo scroll */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -top-10 -left-16 w-64 h-64 rounded-full opacity-[0.07] blur-3xl"
        // eslint-disable-next-line
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: GOLD }} />
      </motion.div>
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -bottom-16 -right-10 w-72 h-72 rounded-full opacity-[0.06] blur-3xl"
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: NAVY }} />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            {aboutManifesto.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-5 text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ color: NAVY }}
          >
            “{aboutManifesto.quote}”
          </h2>
        </Reveal>
        <Reveal delay={220} className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-10 justify-center text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed sm:max-w-xs">
            {aboutManifesto.missionLine}
          </p>
          <span className="hidden sm:block w-px bg-gray-200" />
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed sm:max-w-xs">
            {aboutManifesto.visionLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Khối 2: Tab tương tác Dự án / Sản phẩm ─────────────────────
function ShowcaseTabsSection() {
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

// ─── Khối 3: Vì sao chọn — bento bất đối xứng ────────────────────
function WhyChooseBento() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
            {aboutWhySection.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight" style={{ color: NAVY }}>
            {aboutWhySection.headline}
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">{aboutWhySection.description}</p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {aboutWhyItems.map((item, i) => {
            const Icon = whyIconMap[item.icon];
            const isFeature = i === 0;
            const isClosing = i === aboutWhyItems.length - 1;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={[
                  "rounded-2xl p-6 sm:p-7 flex transition-shadow duration-300",
                  isFeature ? "lg:col-span-2 flex-col justify-between" : "",
                  isClosing ? "lg:col-span-3 flex-row items-center gap-6" : !isFeature ? "flex-col" : "",
                ].join(" ")}
                style={{
                  backgroundColor: isFeature ? `${GOLD}0F` : isClosing ? NAVY : "#f7f8fa",
                  border: isFeature ? `1px solid ${GOLD}40` : "1px solid transparent",
                }}
              >
                <span
                  className={`flex-shrink-0 flex items-center justify-center rounded-xl mb-4 ${
                    isFeature ? "w-14 h-14" : "w-11 h-11"
                  }`}
                  style={{
                    backgroundColor: isClosing ? `${GOLD}1A` : `${GOLD}1A`,
                    color: GOLD,
                    marginBottom: isClosing ? 0 : undefined,
                  }}
                >
                  <Icon sx={{ fontSize: isFeature ? 28 : 22 }} />
                </span>
                <div>
                  <p
                    className={`font-extrabold mb-2 ${isFeature ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}`}
                    style={{ color: isClosing ? "#fff" : NAVY }}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`leading-relaxed ${isFeature ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
                    style={{ color: isClosing ? "rgba(255,255,255,0.6)" : "#6b7280" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Khối 4: Dải niềm tin — checklist + chứng nhận + đối tác ────
function TrustBandSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#faf7f1" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          {/* Checklist */}
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              {aboutTrustBand.eyebrow}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold mb-4 leading-tight" style={{ color: NAVY }}>
              {aboutTrustBand.headline}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">{aboutTrustBand.description}</p>
            <ul className="flex flex-col gap-3">
              {aboutTrustBand.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircleIcon sx={{ fontSize: 19, color: GOLD, mt: "1px", flexShrink: 0 }} />
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: NAVY }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Chứng nhận */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-5 rounded-[2rem] blur-2xl opacity-20" style={{ backgroundColor: GOLD }} />
            <div
              className="relative rounded-2xl p-1.5"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #fff3d6, ${GOLD})` }}
            >
              <img
                src={aboutTrustBand.certificateImage}
                alt={aboutTrustBand.certificateAlt}
                className="max-h-[360px] w-auto rounded-xl object-contain"
                style={{ boxShadow: "0 25px 60px -15px rgba(13,33,55,0.4)" }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 18 }}
              className="absolute -top-3 -left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg"
              style={{ backgroundColor: NAVY }}
            >
              <VerifiedIcon sx={{ fontSize: 14, color: GOLD }} />
              <span className="text-[10px] font-bold uppercase tracking-wide text-white whitespace-nowrap">
                Chứng nhận chính hãng
              </span>
            </motion.div>
          </motion.div>

          {/* Đối tác — marquee tự cuộn */}
          <Reveal delay={100}>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-4">
              {aboutTrustBand.partnersHeading}
            </span>
            <BrandMarquee />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Khối 5: CTA kết — card sáng + góc liên hệ nhanh ─────────────
function FinalCtaSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16"
            style={{
              backgroundColor: "#faf7f1",
              backgroundImage: `radial-gradient(${GOLD}22 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
            }}
          >
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight" style={{ color: NAVY }}>
                  {aboutFinalCta.headline}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-7 max-w-lg">
                  {aboutFinalCta.description}
                </p>
                <button
                  onClick={() => navigate(aboutFinalCta.ctaTo)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: GOLD, boxShadow: `0 4px 20px ${GOLD}55` }}
                >
                  {aboutFinalCta.ctaLabel}
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </button>
              </div>

              <div
                className="bg-white rounded-2xl border-l-2 p-6 flex flex-col gap-4 shadow-sm"
                style={{ borderColor: GOLD }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Liên hệ nhanh</p>

                <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-3 no-underline group">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                  >
                    <PhoneIcon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="text-sm font-bold group-hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                    {footerData.contact.phone}
                  </span>
                </a>

                <a href={`mailto:${footerData.contact.email}`} className="flex items-center gap-3 no-underline group">
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                  >
                    <EmailIcon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="text-sm font-bold group-hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                    {footerData.contact.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function AboutUsPage() {
  return (
    <div className="pt-[72px]">
      {/* ══════════════════ BREADCRUMB (giữ nguyên) ══════════════════ */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {aboutBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />}
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

      {/* ══════════════════ INTRO + FLIPBOOK (giữ nguyên) ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  {aboutIntro.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2137] mb-5 leading-tight tracking-tight">
                {aboutIntro.brand}
              </h1>
              <div className="flex flex-col gap-4">
                {aboutIntro.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-500 text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

                            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-100">
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl font-extrabold" style={{ color: GOLD }}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-snug mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="flex justify-center lg:justify-end">
              <CompanyFlipbook />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════ TỪ ĐÂY LÀ PHẦN THÂN THIẾT KẾ MỚI ══════════════════ */}
      <ManifestoSection />
      <ShowcaseTabsSection />
      <WhyChooseBento />
      <TrustBandSection />
      <FinalCtaSection />
    </div>
  );
}