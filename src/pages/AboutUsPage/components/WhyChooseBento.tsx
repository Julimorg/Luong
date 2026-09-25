import { motion, type Variants } from "framer-motion";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShieldIcon from "@mui/icons-material/Shield";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import type { SvgIconComponent } from "@mui/icons-material";
import { aboutWhySection, aboutWhyItems, type WhyChooseItem } from "../../../data/aboutUsData";
import { GOLD, NAVY, Reveal } from "./aboutShared";

const whyIconMap: Record<WhyChooseItem["icon"], SvgIconComponent> = {
  search: SearchRoundedIcon,
  handshake: HandshakeIcon,
  shield: ShieldIcon,
  engineering: EngineeringIcon,
  support: SupportAgentIcon,
  check: FactCheckIcon,
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Khối 3: Vì sao chọn — bento bất đối xứng ────────────────────
export function WhyChooseBento() {
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

            // Thẻ dạng ảnh: ảnh đã có nền và chữ riêng nên bỏ hết padding,
            // nền và nội dung của thẻ, chỉ để ảnh phủ kín.
            if (item.banner) {
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-2xl lg:col-span-3"
                >
                  <img
                    src={item.banner.src}
                    alt={item.banner.alt}
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={[
                  "rounded-2xl p-6 sm:p-7 flex transition-shadow duration-300",
                  isFeature ? "lg:col-span-2 flex-col justify-between" : "flex-col",
                ].join(" ")}
                style={{
                  backgroundColor: isFeature ? `${GOLD}0F` : "#f7f8fa",
                  border: isFeature ? `1px solid ${GOLD}40` : "1px solid transparent",
                }}
              >
                <span
                  className={`flex-shrink-0 flex items-center justify-center rounded-xl mb-4 ${
                    isFeature ? "w-14 h-14" : "w-11 h-11"
                  }`}
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  <Icon sx={{ fontSize: isFeature ? 28 : 22 }} />
                </span>
                <div>
                  <p
                    className={`font-extrabold mb-2 ${isFeature ? "text-xl sm:text-2xl" : "text-sm sm:text-base"}`}
                    style={{ color: NAVY }}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`leading-relaxed ${isFeature ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
                    style={{ color: "#6b7280" }}
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
