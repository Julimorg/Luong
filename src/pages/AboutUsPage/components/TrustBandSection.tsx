import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import { aboutTrustBand } from "../../../data/aboutUsData";
import { BrandMarquee } from "./brandMaque";
import { GOLD, NAVY, Reveal } from "./aboutShared";

// ─── Khối 4: Dải niềm tin — checklist + chứng nhận + đối tác ────
export function TrustBandSection() {
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
                style={{ boxShadow: "0 25px 60px -15px rgba(18,27,69,0.4)" }}
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
