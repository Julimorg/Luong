import { Link } from "react-router-dom";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { categoryLabels, type Project } from "../../../data/projectData";
import { GOLD, NAVY } from "../../../themes/brand";
import { ProjectImage } from "./ProjectImage";

// Màu chấm trạng thái — chỉ dùng trong file này.
const STATUS_DOT: Record<Project["status"], string> = {
  "Hoàn thành": "#22c55e",
  "Đang thi công": GOLD,
};

function CardMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="min-w-0">
      <span className="mb-1 flex items-center gap-1.5 text-[11px] text-gray-400">
        <span style={{ color: GOLD }}>{icon}</span>
        {label}
      </span>
      <p className="truncate text-sm font-bold" style={{ color: NAVY }}>
        {value}
      </p>
    </div>
  );
}

/** Thẻ dự án dạng dọc: ảnh trên, thông tin dưới — dùng trong lưới 3 cột. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/du-an/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/70"
    >
      {/* Ảnh + nhãn */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121b45]/70 via-transparent to-transparent" />

        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          {categoryLabels[project.category]}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: STATUS_DOT[project.status] }}
          />
          {project.status}
        </span>

        {/* Công suất in đè lên ảnh — thông tin khách quan tâm nhất */}
        <span className="absolute bottom-3 left-4 text-xl font-black text-white drop-shadow">
          {project.capacity}
        </span>
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
          <PlaceRoundedIcon sx={{ fontSize: 14, color: GOLD }} />
          {project.location}
        </span>

        <h3
          className="mb-2 line-clamp-2 min-h-[2.75rem] text-base font-extrabold leading-snug"
          style={{ color: NAVY }}
        >
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {project.summary}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-50 pt-4">
          <CardMetric
            icon={<GridViewRoundedIcon sx={{ fontSize: 13 }} />}
            value={project.panelCount}
            label="Quy mô"
          />
          <CardMetric
            icon={
              project.status === "Hoàn thành" ? (
                <EventAvailableRoundedIcon sx={{ fontSize: 13 }} />
              ) : (
                <BoltRoundedIcon sx={{ fontSize: 13 }} />
              )
            }
            value={project.yearlyOutput ?? project.timeline}
            label={project.yearlyOutput ? "Sản lượng/năm" : "Thời gian"}
          />
        </div>

        <span
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5"
          style={{ color: GOLD }}
        >
          Xem chi tiết dự án
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </span>
      </div>
    </Link>
  );
}
