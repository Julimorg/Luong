import { animate, stagger } from "animejs";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { aboutProcessSection, aboutProcessSteps } from "../../../data/aboutUsData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY, SectionHeading } from "./aboutShared";

/**
 * Quy trình triển khai — đường kẻ vàng "vẽ" dần từ trên xuống,
 * mỗi bước trượt vào theo thứ tự bằng anime.js.
 */
export function ProcessSection() {
  const listRef = useAnimeOnView<HTMLDivElement>((el) => {
    const line = el.querySelector<HTMLElement>("[data-line]");
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    const dots = el.querySelectorAll<HTMLElement>("[data-dot]");

    const anims = [
      line &&
        animate(line, {
          scaleY: [0, 1],
          duration: 1400,
          ease: "inOutQuad",
        }),
      animate(steps, {
        opacity: [0, 1],
        x: [-26, 0],
        duration: 700,
        delay: stagger(150, { start: 180 }),
        ease: "outExpo",
      }),
      animate(dots, {
        scale: [0, 1],
        duration: 520,
        delay: stagger(150, { start: 180 }),
        ease: "outBack",
      }),
    ].filter(Boolean);

    return () => {
      anims.forEach((a) => a && a.cancel());
    };
  });

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={aboutProcessSection.eyebrow}
          headline={aboutProcessSection.headline}
          description={aboutProcessSection.description}
          className="mb-12"
        />

        <div ref={listRef} className="relative pl-12 sm:pl-16">
          {/* Đường kẻ dọc nối các bước */}
          <span
            data-line
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-[2px] origin-top sm:left-[27px]"
            style={{ background: `linear-gradient(${GOLD}, ${GOLD}22)` }}
          />

          <div className="flex flex-col gap-8 sm:gap-10">
            {aboutProcessSteps.map((s) => (
              <div key={s.step} className="relative">
                {/* Chấm mốc */}
                <span
                  data-dot
                  className="absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full text-xs font-black sm:-left-16 sm:h-14 sm:w-14 sm:text-sm"
                  style={{ backgroundColor: GOLD, color: NAVY }}
                >
                  {s.step}
                </span>

                <div
                  data-step
                  className="rounded-2xl border border-gray-100 bg-[#fbfbfd] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-200 hover:bg-white hover:shadow-lg sm:p-6"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-extrabold sm:text-lg" style={{ color: NAVY }}>
                      {s.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-gray-500 ring-1 ring-gray-200">
                      <ScheduleRoundedIcon sx={{ fontSize: 13, color: GOLD }} />
                      {s.duration}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
