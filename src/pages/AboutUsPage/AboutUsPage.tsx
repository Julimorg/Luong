import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  aboutBreadcrumb,
  aboutIntro,
  aboutWhySection,
  aboutCommitments,
  aboutCta,
} from "../../data/aboutUsData";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { CompanyFlipbook } from "./components/companyFlipBook";
import { motion } from "framer-motion";
import { BrandMarquee } from "./components/brandMaque";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f5a623";
const NAVY = "#0d2137";
const GREEN = "#22c55e";
const WHY_SECTION_BG = "#121b45";

// ─── Icon map ─────────────────────────────────────────────────


// ─── Reveal wrapper ───────────────────────────────────────────
function RevealSection({
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

// ─── MAIN ─────────────────────────────────────────────────────
export default function AboutUsPage() {
  return (
    <div className="pt-[72px]">
      {/* ══════════════════ BREADCRUMB ══════════════════ */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {aboutBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && (
                  <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                )}
                {i < aboutBreadcrumb.length - 1 ? (
                  <Link
                    to={crumb.to}
                    className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0d2137] font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════════════════ INTRO + FLIPBOOK ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — text */}
            <RevealSection>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: GOLD }}
                >
                  {aboutIntro.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2137] mb-5 leading-tight tracking-tight">
                {aboutIntro.brand}
              </h1>
              <div className="flex flex-col gap-4">
                {aboutIntro.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-500 text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </RevealSection>

            {/* Right — flipbook hồ sơ năng lực, thay cho ảnh cũ */}
            <RevealSection
              delay={150}
              className="flex justify-center lg:justify-end"
            >
              <CompanyFlipbook />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════════════ LĨNH VỰC HOẠT ĐỘNG ══════════════════ */}
      {/* <section className="py-12 sm:py-14" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="mb-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5" style={{ backgroundColor: GOLD }} />
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                {aboutFieldsSection.headline}
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {aboutFields.map((field, i) => (
              <RevealSection key={field.id} delay={i * 80}>
                <div className="group flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 h-full hover:bg-white/[0.08] hover:border-[#f5a623]/40 transition-all duration-300">
                  <span className="w-14 h-14 rounded-full bg-[#f5a623]/15 flex items-center justify-center text-[#f5a623] group-hover:bg-[#f5a623] group-hover:text-white transition-all duration-300">
                    {fieldIconMap[field.icon]}
                  </span>
                  <span className="text-white/90 text-sm font-semibold leading-snug">
                    {field.title}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════ VÌ SAO CHỌN — nền section navy đậm, bảng bên trong màu trắng ══════════════════ */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: WHY_SECTION_BG }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {aboutWhySection.headline}
            </h2>
            <div
              className="w-10 h-1 rounded-full mt-3"
              style={{ backgroundColor: GOLD }}
            />
          </RevealSection>

          <RevealSection>
            <div
              className="rounded-2xl border overflow-hidden bg-white"
              style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.55)" }}
            >
              {/* Header */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2"
                style={{ backgroundColor: NAVY }}
              >
                <div className="px-5 sm:px-6 py-3.5 text-white text-xs font-bold uppercase tracking-wide">
                  {aboutWhySection.colCommit}
                </div>
                <div className="hidden sm:block px-5 sm:px-6 py-3.5 text-white text-xs font-bold uppercase tracking-wide border-l border-white/10">
                  {aboutWhySection.colValue}
                </div>
              </div>

              {/* Rows */}
              {aboutCommitments.map((row, i) => (
                <div
                  key={row.commit}
                  className={`grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100 ${
                    i % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                  }`}
                >
                  {/* Commit */}
                  <div className="flex items-start gap-2.5 px-5 sm:px-6 py-4">
                    <CheckCircleIcon
                      sx={{
                        fontSize: 18,
                        color: GREEN,
                        mt: "1px",
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-[#0d2137] font-semibold text-sm leading-snug">
                      {row.commit}
                    </span>
                  </div>
                  {/* Value */}
                  <div className="px-5 sm:px-6 pb-4 sm:py-4 sm:border-l border-gray-100 pl-[2.65rem] sm:pl-6">
                    <span className="text-gray-500 text-sm leading-relaxed">
                      {row.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════ CAM KẾT CHẤT LƯỢNG / CHỨNG NHẬN — ảnh làm tâm điểm ══════════════════ */}
      {/* ══════════════════ CAM KẾT CHẤT LƯỢNG / CHỨNG NHẬN — ảnh làm tâm điểm ══════════════════ */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="max-w-2xl">
            <h2
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ color: NAVY }}
            >
              {aboutCta.headline}
            </h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              {aboutCta.description}
            </p>
          </RevealSection>

          <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            {/* Trái: marquee logo hãng — tự cuộn dọc, dừng khi rê chuột vào */}
            <RevealSection delay={80}>
              <BrandMarquee />
            </RevealSection>

            {/* Phải: ảnh chứng nhận — tâm điểm, khung viền vàng + đổ bóng sâu + huy hiệu xác thực */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Quầng sáng mờ phía sau, tăng cảm giác "nổi bật" cho ảnh */}
              <div
                className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-20"
                style={{ backgroundColor: GOLD }}
              />

              <div
                className="relative rounded-2xl p-1.5"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #fff3d6, ${GOLD})`,
                }}
              >
                <img
                  src={aboutCta.certificateImage}
                  alt={aboutCta.certificateAlt}
                  className="max-h-[480px] w-auto rounded-xl object-contain shadow-2xl"
                  style={{ boxShadow: "0 30px 70px -15px rgba(13,33,55,0.45)" }}
                />
              </div>

              {/* Huy hiệu xác thực, nổi ở góc ảnh */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="absolute -top-4 -left-4 flex items-center gap-1.5 rounded-full px-3 py-2 shadow-lg"
                style={{ backgroundColor: NAVY }}
              >
                <VerifiedIcon sx={{ fontSize: 16, color: GOLD }} />
                <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                  Chứng nhận chính hãng
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Hàng logo — phóng to đáng kể, nhãn dẫn nhập rõ ràng hơn */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 sm:mt-20 flex flex-col items-center gap-5"
          >
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
              Đại lý phân phối chính thức
            </span>
            <div className="flex items-center justify-center gap-10 sm:gap-14">
              <div className="flex flex-col leading-none">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide"
                  style={{ color: NAVY }}
                >
                  VIETHUNG
                </span>
                <span
                  className="text-base sm:text-lg font-semibold mt-1"
                  style={{ color: GOLD }}
                >
                  Solar Energy
                </span>
              </div>
              <span
                className="h-16 sm:h-20 w-px"
                style={{ backgroundColor: GOLD }}
              />
              {/* TODO: thay bằng ảnh logo thật của đối tác nếu có, hiện đang dùng text placeholder */}
              <span
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-wide"
                style={{ color: "#0055a4" }}
              >
                {aboutCta.partnerName}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
