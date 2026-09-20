import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { aboutFinalCta } from "../../../data/aboutUsData";
import { footerData } from "../../../data/dashBoardData";
import { GOLD, NAVY, Reveal } from "./aboutShared";

// ─── Khối 5: CTA kết — card sáng + góc liên hệ nhanh ─────────────
export function FinalCtaSection() {
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
