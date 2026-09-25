import { animate, stagger } from "animejs";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { aboutManifesto } from "../../../data/aboutUsData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY, Reveal } from "./aboutShared";

/**
 * Tuyên ngôn thương hiệu — câu trích dẫn lớn hiện lên theo từng từ,
 * bên dưới là hai thẻ Sứ mệnh / Tầm nhìn.
 */
export function ManifestoSection() {
  const quoteRef = useAnimeOnView<HTMLHeadingElement>((el) => {
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const anim = animate(words, {
      opacity: [0, 1],
      y: [22, 0],
      filter: ["blur(6px)", "blur(0px)"],
      duration: 900,
      delay: stagger(55),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  });

  const cards = [
    {
      icon: <FlagRoundedIcon sx={{ fontSize: 22 }} />,
      label: "Sứ mệnh",
      text: aboutManifesto.missionLine.replace(/^Sứ mệnh:\s*/i, ""),
    },
    {
      icon: <VisibilityRoundedIcon sx={{ fontSize: 22 }} />,
      label: "Tầm nhìn",
      text: aboutManifesto.visionLine.replace(/^Tầm nhìn:\s*/i, ""),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Vệt sáng trang trí */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: `${GOLD}1F` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: `${NAVY}14` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            {aboutManifesto.eyebrow}
          </span>
        </Reveal>

        <h2
          ref={quoteRef}
          className="mt-5 text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]"
          style={{ color: NAVY }}
        >
          {/* Tách hai vế để vế sau tô vàng; mỗi từ là một span cho hiệu ứng chạy chữ. */}
          {[
            { text: aboutManifesto.headline, color: NAVY },
            { text: aboutManifesto.headlineAccent, color: GOLD },
          ].map((part) =>
            part.text.split(" ").map((w, i) => (
              <span key={`${part.text}-${w}-${i}`} data-word className="inline-block" style={{ color: part.color }}>
                {w}
                {"\u00A0"}
              </span>
            )),
          )}
        </h2>

        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            {aboutManifesto.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 120}>
              <div className="flex h-full gap-4 rounded-2xl border border-gray-100 bg-[#fbfbfd] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:bg-white hover:shadow-lg">
                <span
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  {c.icon}
                </span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: NAVY }}>
                    {c.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
