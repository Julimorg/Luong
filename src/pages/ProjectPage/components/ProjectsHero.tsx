import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { projectsBreadcrumb, projectsHero, projectsStatsNote } from "../../../data/projectData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { CountUp } from "../../../components/common/CountUp";
import { GOLD, NAVY } from "../../../themes/brand";

export interface HeroStat {
  icon: React.ReactNode;
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

/** Hero trang Dự án: nền ảnh tối + số liệu tổng hợp chạy lên khi vào khung nhìn. */
export function ProjectsHero({
  totalMwp,
  projectCount,
  provinceCount,
  yearlyGwh,
}: {
  totalMwp: number;
  projectCount: number;
  provinceCount: number;
  yearlyGwh: number;
}) {
  const stats: HeroStat[] = [
    {
      icon: <BoltRoundedIcon sx={{ fontSize: 20 }} />,
      value: totalMwp,
      decimals: 1,
      suffix: " MWp",
      label: "Tổng công suất đã lắp đặt",
    },
    {
      icon: <FactoryRoundedIcon sx={{ fontSize: 20 }} />,
      value: projectCount,
      suffix: "",
      label: "Công trình tiêu biểu",
    },
    {
      icon: <PlaceRoundedIcon sx={{ fontSize: 20 }} />,
      value: provinceCount,
      suffix: "",
      label: "Tỉnh thành đã triển khai",
    },
    {
      icon: <SolarPowerRoundedIcon sx={{ fontSize: 20 }} />,
      value: yearlyGwh,
      decimals: 1,
      suffix: " GWh",
      label: "Sản lượng ước tính mỗi năm",
    },
  ];

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
        {/* Breadcrumb */}
        <nav data-hero-item className="flex items-center gap-1 pt-6 text-sm">
          {projectsBreadcrumb.map((crumb, i) => (
            <span key={crumb.to} className="flex items-center gap-1">
              {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />}
              {i < projectsBreadcrumb.length - 1 ? (
                <Link
                  to={crumb.to}
                  className="text-white/55 no-underline transition-colors duration-200 hover:text-[#fbae17]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="max-w-3xl pb-10 pt-10 sm:pt-14">
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

        {/* Dải số liệu — nổi lên trên mép dưới của hero */}
        <div
          data-hero-item
          className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[#121b45]/85 px-5 py-6 backdrop-blur-sm sm:px-6">
              <span
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${GOLD}1F`, color: GOLD }}
              >
                {s.icon}
              </span>
              <CountUp
                value={s.value}
                decimals={s.decimals ?? 0}
                suffix={s.suffix}
                className="block text-2xl font-black leading-none text-white sm:text-[1.75rem]"
              />
              <p className="mt-2 text-xs leading-snug text-white/45">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="pb-10 pt-3 text-[11px] text-white/40">{projectsStatsNote}</p>
      </div>
    </section>
  );
}
