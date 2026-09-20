import { animate, stagger } from "animejs";
import { aboutCapabilities, aboutCapabilitySection } from "../../../data/aboutUsData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { CountUp, GOLD, SectionHeading } from "./aboutShared";

/** Dải năng lực trên nền navy — các con số chạy lên khi cuộn tới. */
export function CapabilitiesSection() {
  const gridRef = useAnimeOnView<HTMLDivElement>((el) => {
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const anim = animate(cards, {
      opacity: [0, 1],
      y: [28, 0],
      duration: 760,
      delay: stagger(110),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#0d2137" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={aboutCapabilitySection.eyebrow}
          headline={aboutCapabilitySection.headline}
          description={aboutCapabilitySection.description}
          align="center"
          tone="dark"
          className="mb-12"
        />

        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutCapabilities.map((c) => (
            <div
              key={c.label}
              data-card
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"
                style={{ backgroundColor: `${GOLD}33` }}
              />
              <CountUp
                value={c.value}
                prefix={c.prefix}
                suffix={c.suffix}
                className="block text-3xl font-black leading-none sm:text-4xl"
                style={{ color: GOLD }}
              />
              <p className="mt-3 text-sm font-bold text-white">{c.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
