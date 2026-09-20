import { useMemo } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { aboutEcosystemSection } from "../../../data/aboutUsData";
import { products, productSections } from "../../../data/productData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { CountUp, GOLD, NAVY, Reveal, SectionHeading } from "./aboutShared";

const categoryIcon: Record<string, React.ReactNode> = {
  "tam-pin": <WbSunnyRoundedIcon sx={{ fontSize: 22 }} />,
  inverter: <MemoryRoundedIcon sx={{ fontSize: 22 }} />,
  "pin-luu-tru": <BatteryChargingFullRoundedIcon sx={{ fontSize: 22 }} />,
};

/**
 * Hệ sinh thái thiết bị — số liệu lấy trực tiếp từ danh mục sản phẩm,
 * nên trang Giới thiệu luôn khớp với trang Sản phẩm mà không cần sửa tay.
 */
export function EcosystemSection() {
  const categories = useMemo(
    () =>
      productSections.map((section) => {
        const items = products.filter((p) => p.category === section.id);
        const brands: string[] = [];
        const groups: string[] = [];
        for (const p of items) {
          if (!brands.includes(p.brand)) brands.push(p.brand);
          if (!groups.includes(p.group)) groups.push(p.group);
        }
        return { section, count: items.length, brands, groups };
      }),
    [],
  );

  const brandChips = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of products) if (!seen.has(p.brand)) seen.set(p.brand, p.brandColor ?? GOLD);
    return [...seen.entries()].map(([name, color]) => ({ name, color }));
  }, []);

  const gridRef = useAnimeOnView<HTMLDivElement>((el) => {
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const anim = animate(cards, {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.97, 1],
      duration: 720,
      delay: stagger(120),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  });

  return (
    <section className="bg-[#f7f8fa] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={aboutEcosystemSection.eyebrow}
            headline={aboutEcosystemSection.headline}
            description={aboutEcosystemSection.description}
          />
          <Reveal delay={100}>
            <Link
              to={aboutEcosystemSection.ctaTo}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: NAVY }}
            >
              {aboutEcosystemSection.ctaLabel}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>
          </Reveal>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map(({ section, count, brands, groups }) => (
            <Link
              key={section.id}
              to={aboutEcosystemSection.ctaTo}
              data-card
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  {categoryIcon[section.id]}
                </span>
                <span className="text-right">
                  <CountUp
                    value={count}
                    className="block text-2xl font-black leading-none"
                    style={{ color: NAVY }}
                  />
                  <span className="text-[11px] uppercase tracking-wide text-gray-400">mã thiết bị</span>
                </span>
              </div>

              <h3 className="text-base font-extrabold" style={{ color: NAVY }}>
                {section.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{section.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {groups.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-500"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="mt-4 border-t border-gray-50 pt-3 text-xs text-gray-400">
                {brands.join(" · ")}
              </p>

              <span
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                style={{ color: GOLD }}
              >
                Xem danh mục
                <ArrowForwardIcon sx={{ fontSize: 13 }} />
              </span>
            </Link>
          ))}
        </div>

        {/* Dải thương hiệu đang phân phối */}
        <Reveal delay={120} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-gray-100 bg-white px-6 py-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Thương hiệu phân phối
            </span>
            {brandChips.map((b) => (
              <span key={b.name} className="text-sm font-black uppercase" style={{ color: b.color }}>
                {b.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
