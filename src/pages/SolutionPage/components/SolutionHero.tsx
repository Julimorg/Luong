import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { solutionHeader, solutionHighlights, solutions } from "../../../data/solutionData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { CountUp } from "../../../components/common/CountUp";
import { SolarFieldCanvas } from "../../../components/three/SolarFieldCanvas";
import { GOLD, NAVY, iconMap } from "./solutionTheme";

/** Số liệu rút thẳng từ danh sách giải pháp nên luôn khớp với nội dung bên dưới. */
function useHeroStats() {
  const configCount = solutions.reduce((n, s) => n + s.subTypes.length, 0);
  return [
    { value: configCount, suffix: "", label: "Cấu hình hệ thống" },
    { value: solutions.length, suffix: "", label: "Nhóm đối tượng" },
    { value: 4, suffix: "", label: "Loại hệ thống" },
  ];
}

export function SolutionHero() {
  const stats = useHeroStats();

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
      {/* Nền: ảnh tĩnh làm lớp đáy, cánh đồng pin 3D phủ lên khi máy chạy được */}
      <img
        src="/background/dashboard/hero_background.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <SolarFieldCanvas />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, #0b1130 0%, rgba(11,17,48,0.88) 30%, rgba(11,17,48,0.42) 62%, rgba(11,17,48,0.12) 100%)",
        }}
      />
      {/* Vệt sáng vàng mềm ở góc phải cho khung hình bớt phẳng */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: `${GOLD}26` }}
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

          {/* Ba con số chạy lên — lấy thẳng từ dữ liệu giải pháp */}
          <div
            data-hero
            className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-7"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold sm:text-3xl" style={{ color: GOLD }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/50 sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bốn cam kết ngắn — xếp ngang dưới cùng hero */}
        <div
          data-hero
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 lg:grid-cols-4"
        >
          {solutionHighlights.map((h) => {
            const Icon = iconMap[h.icon];
            return (
              <div key={h.title} className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}1F`, color: GOLD }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-white">{h.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-white/45">{h.desc}</p>
                </div>
              </div>
            );
          })}
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
