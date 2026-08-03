import { motion } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { footerData } from "../data/dashBoardData";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FacebookIcon sx={{ fontSize: 20 }} />,
  youtube: <YouTubeIcon sx={{ fontSize: 20 }} />,
  linkedin: <LinkedInIcon sx={{ fontSize: 20 }} />,
};

// ─── Brand colors (đồng bộ với Header) ─────────────────────────────
const GOLD = "#f6b918";

const LOGO_MAIN = "VIETHUNG";
const LOGO_SUB = "Solar Energy";

// ─── Animation variants: từng chữ cái của "VIETHUNG" bay lên tuần tự ──
const letterContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any },
  },
};

function AnimatedBrandLogo() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-3"
    >
      {/* VIETHUNG — từng chữ cái bay lên tuần tự */}
      <motion.span
        variants={letterContainerVariants}
        className="flex font-extrabold text-2xl tracking-wide text-white uppercase"
        aria-label={LOGO_MAIN}
      >
        {LOGO_MAIN.split("").map((char, i) => (
          <motion.span key={i} variants={letterVariants} className="inline-block">
            {char}
          </motion.span>
        ))}
      </motion.span>

      {/* Solar Energy — hiệu ứng shimmer ánh vàng lướt qua liên tục */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: LOGO_MAIN.length * 0.06 + 0.1, duration: 0.5 }}
        className="block font-semibold text-sm tracking-[0.05em] mt-0.5"
        style={{
          backgroundImage: `linear-gradient(90deg, ${GOLD} 0%, #fff2cc 50%, ${GOLD} 100%)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "footerShimmer 3s linear infinite",
        }}
      >
        {LOGO_SUB}
      </motion.span>

      {/* Keyframes cho shimmer — nằm inline vì component này không phải global CSS */}
      <style>{`
        @keyframes footerShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1c2f5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── Brand ── */}
          <div>
            <AnimatedBrandLogo />
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              {footerData.brand.tagline}
            </p>
            <div className="flex items-center gap-3">
              {footerData.socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-[#f5a623] hover:border-[#f5a623] hover:text-white transition-all duration-200 no-underline"
                >
                  {socialIconMap[s]}
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {footerData.contact.title}
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-white/55 text-sm leading-snug">
                <LocationOnIcon sx={{ fontSize: 17, color: "#f5a623", mt: "1px", flexShrink: 0 }} />
                {footerData.contact.address}
              </li>
              <li>
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#f5a623] text-sm no-underline transition-colors duration-200"
                >
                  <PhoneIcon sx={{ fontSize: 17, color: "#f5a623", flexShrink: 0 }} />
                  {footerData.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#f5a623] text-sm no-underline transition-colors duration-200"
                >
                  <EmailIcon sx={{ fontSize: 17, color: "#f5a623", flexShrink: 0 }} />
                  {footerData.contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">{footerData.copyright}</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs no-underline transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs no-underline transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}