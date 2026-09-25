import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { solutionHeader } from "../../../data/solutionData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY } from "./solutionTheme";

export function SolutionHero() {
  const ref = useAnimeOnView<HTMLDivElement>((el) => {
    const items = el.querySelectorAll<HTMLElement>("[data-hero]");
    const anim = animate(items, {
      opacity: [0, 1],
      y: [28, 0],
      duration: 820,
      delay: stagger(90),
      ease: "outExpo",
    });
    return () => anim.cancel();
  }, { threshold: 0.05 });

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: NAVY }}
    >
      {/* Nền: ảnh công trình + một lớp phủ chuyển màu, giống header trang
          Dự án và Sản phẩm — không làm mờ hay đánh bóng thêm. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/background/dashboard/hero_background.png)" }}
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
        ref={ref}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 lg:px-8"
      >
        <div className="max-w-3xl">
          <div data-hero className="mb-5 flex items-center gap-2">
            <span className="h-0.5 w-7" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              {solutionHeader.badge}
            </span>
          </div>

          <h1
            data-hero
            className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Giải pháp năng lượng mặt trời{" "}
            <span style={{ color: GOLD }}>cho mọi nhu cầu</span>
          </h1>

          <p
            data-hero
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {solutionHeader.description}
          </p>

          <div data-hero className="mt-8 flex flex-wrap gap-3">
            <Link
              to={solutionHeader.ctaPrimary.to}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: GOLD, color: NAVY, boxShadow: `0 8px 28px ${GOLD}4D` }}
            >
              {solutionHeader.ctaPrimary.label}
              <ArrowForwardIcon sx={{ fontSize: 17 }} />
            </Link>
            <Link
              to={solutionHeader.ctaSecondary.to}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-bold text-white no-underline transition-all duration-200 hover:border-white/60 hover:bg-white/10"
            >
              {solutionHeader.ctaSecondary.label}
            </Link>
          </div>

        </div>

      </div>

      {/* Gợi ý cuộn xuống */}
      <div
        aria-hidden
        className="relative z-10 flex justify-center pb-7 text-white/35"
      >
        <KeyboardArrowDownRoundedIcon
          sx={{ fontSize: 30 }}
          className="motion-safe:animate-bounce"
        />
      </div>
    </section>
  );
}
