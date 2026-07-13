import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import { useNavigate } from "react-router-dom";
import { RevealSection, RevealItem } from "../common/Reveal";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { projectCards, projectsSection } from "../../../../data/dashBoardData";
import { GOLD, NAVY } from "../../themes/colors";

function ProjectCard({ project }: { project: typeof projectCards[number] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-gradient-to-t from-black/90 via-black/75 to-transparent px-4 pt-10 pb-5">
        <h3 className="text-white font-bold text-sm leading-snug mb-2">{project.title}</h3>
        <div className="flex items-center gap-1.5">
          <BoltIcon sx={{ fontSize: 14, color: GOLD }} />
          <span className="text-white/70 text-xs">Công suất: {project.capacity}</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionEyebrow text={projectsSection.eyebrow} />
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: NAVY }}>
              {projectsSection.headline}
            </h2>
          </div>
          <button
            onClick={() => navigate("/du-an")}
            className="flex items-center gap-1.5 font-semibold text-sm flex-shrink-0 transition-all duration-200 hover:gap-3"
            style={{ color: GOLD }}
          >
            {projectsSection.cta.label}
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projectCards.map((project, i) => (
            <RevealItem key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}