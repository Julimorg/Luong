import { Link } from "react-router-dom";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { categoryLabels, type Project } from "../../../data/projectData";
import { GOLD, NAVY } from "../../../themes/brand";
import { ProjectImage } from "./ProjectImage";

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-extrabold leading-tight" style={{ color: NAVY }}>
          {value}
        </span>
        <span className="block text-[11px] text-gray-400">{label}</span>
      </span>
    </div>
  );
}

/**
 * Dự án trọng điểm — ảnh lớn một bên, thông tin bên kia.
 * `flip` đảo vị trí ảnh để hai dự án liên tiếp không bị lặp bố cục.
 */
export function FeaturedProject({ project, flip = false }: { project: Project; flip?: boolean }) {
  return (
    <article className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm lg:grid-cols-2">
      {/* Ảnh */}
      <div className={`relative min-h-[260px] lg:min-h-[420px] ${flip ? "lg:order-2" : ""}`}>
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          className="absolute left-5 top-5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          Dự án trọng điểm
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-9 lg:p-11">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: `${NAVY}0F`, color: NAVY }}
          >
            {categoryLabels[project.category]}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <PlaceRoundedIcon sx={{ fontSize: 15, color: GOLD }} />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.status === "Hoàn thành" ? "#22c55e" : GOLD }}
            />
            {project.status} · {project.timeline}
          </span>
        </div>

        <h3
          className="text-2xl font-extrabold leading-snug sm:text-3xl"
          style={{ color: NAVY }}
        >
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-500 sm:text-base">{project.summary}</p>

        <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-5 sm:grid-cols-3">
          <Metric
            icon={<BoltRoundedIcon sx={{ fontSize: 17 }} />}
            value={project.capacity}
            label="Công suất"
          />
          <Metric
            icon={<GridViewRoundedIcon sx={{ fontSize: 16 }} />}
            value={project.panelCount}
            label="Quy mô lắp đặt"
          />
          {project.yearlyOutput && (
            <Metric
              icon={<InsightsRoundedIcon sx={{ fontSize: 17 }} />}
              value={project.yearlyOutput}
              label="Sản lượng ước tính"
            />
          )}
        </div>

        {/* Chủ đầu tư để riêng một dòng — tên tổ chức thường dài */}
        <p className="flex items-start gap-2 text-sm text-gray-500">
          <BusinessRoundedIcon sx={{ fontSize: 17, color: GOLD, mt: "2px", flexShrink: 0 }} />
          <span>
            Chủ đầu tư:{" "}
            <span className="font-bold" style={{ color: NAVY }}>
              {project.client}
            </span>
          </span>
        </p>

        <Link
          to={`/du-an/${project.id}`}
          className="inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: NAVY }}
        >
          Xem hồ sơ dự án
          <ArrowForwardIcon sx={{ fontSize: 17 }} />
        </Link>
      </div>
    </article>
  );
}
