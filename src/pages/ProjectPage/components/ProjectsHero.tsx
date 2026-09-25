import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { projectsHero } from "../../../data/projectData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY } from "../../../themes/brand";

/** Hero trang Dự án: nền ảnh công trình tối, chữ và nút trượt lên khi vào khung nhìn. */
export function ProjectsHero() {
  const contentRef = useAnimeOnView<HTMLDivElement>((el) => {
    const items = el.querySelectorAll<HTMLElement>("[data-hero-item]");
    const anim = animate(items, {
      opacity: [0, 1],
      y: [26, 0],
      duration: 760,
      delay: stagger(90),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  }, { threshold: 0.05 });

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
      {/* Ảnh nền + lớp phủ để chữ luôn đọc rõ */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${projectsHero.backgroundImage})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(18,27,69,0.96) 0%, rgba(18,27,69,0.88) 45%, rgba(18,27,69,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: `${GOLD}22` }}
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl pb-14 pt-14 sm:pb-20 sm:pt-20">
          <div data-hero-item className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-7" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              {projectsHero.eyebrow}
            </span>
          </div>

          <h1
            data-hero-item
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]"
          >
            {projectsHero.headline}
            <br />
            <span style={{ color: GOLD }}>{projectsHero.headlineAccent}</span>
          </h1>

          <p
            data-hero-item
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/60"
          >
            {projectsHero.description}
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap gap-3">
            <Link
              to={projectsHero.primaryCta.to}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: GOLD, color: NAVY, boxShadow: `0 6px 24px ${GOLD}40` }}
            >
              {projectsHero.primaryCta.label}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>
            <Link
              to={projectsHero.secondaryCta.to}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-bold text-white no-underline transition-all duration-200 hover:border-white/60 hover:bg-white/5"
            >
              {projectsHero.secondaryCta.label}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
