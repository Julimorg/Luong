import { animate, stagger } from "animejs";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  projectAssuranceSection,
  projectAssurances,
  type ProjectAssurance,
} from "../../../data/projectData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY } from "../../../themes/brand";

const iconMap: Record<ProjectAssurance["icon"], SvgIconComponent> = {
  survey: SearchRoundedIcon,
  engineering: EngineeringRoundedIcon,
  shield: ShieldRoundedIcon,
  support: SupportAgentRoundedIcon,
};

/** Dải cam kết — lý do chủ đầu tư yên tâm giao công trình. */
export function ProjectAssuranceSection() {
  const gridRef = useAnimeOnView<HTMLDivElement>((el) => {
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const anim = animate(cards, {
      opacity: [0, 1],
      y: [26, 0],
      duration: 700,
      delay: stagger(110),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  });

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              {projectAssuranceSection.eyebrow}
            </span>
          </div>
          <h2
            className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
            style={{ color: NAVY }}
          >
            {projectAssuranceSection.headline}
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            {projectAssuranceSection.description}
          </p>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectAssurances.map((a, i) => {
            const Icon = iconMap[a.icon];
            return (
              <div
                key={a.title}
                data-card
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-[#fbfbfd] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute -right-4 -top-3 select-none text-5xl font-black opacity-[0.06]"
                  style={{ color: NAVY }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </span>
                <p className="mb-2 text-sm font-extrabold leading-snug" style={{ color: NAVY }}>
                  {a.title}
                </p>
                <p className="text-xs leading-relaxed text-gray-500">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
