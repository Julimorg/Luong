import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { projectsCta } from "../../../data/projectData";
import { footerData } from "../../../data/dashBoardData";
import { GOLD, NAVY } from "../../../themes/brand";

/** CTA cuối trang Dự án — mời chủ đầu tư đặt lịch khảo sát. */
export function ProjectCtaSection() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-14"
          style={{ backgroundColor: NAVY }}
        >
          {/* Hoa văn nền */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              maskImage: "linear-gradient(120deg, transparent 40%, #000 100%)",
              WebkitMaskImage: "linear-gradient(120deg, transparent 40%, #000 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${GOLD}1F` }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                {projectsCta.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                {projectsCta.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                to={projectsCta.primary.to}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD, color: NAVY, boxShadow: `0 6px 24px ${GOLD}40` }}
              >
                {projectsCta.primary.label}
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Link>
              <a
                href={`tel:${footerData.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-bold text-white no-underline transition-all duration-200 hover:border-white/60 hover:bg-white/5"
              >
                <PhoneRoundedIcon sx={{ fontSize: 18, color: GOLD }} />
                {footerData.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
