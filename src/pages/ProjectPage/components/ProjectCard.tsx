import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import GridViewIcon from "@mui/icons-material/GridView";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { categoryLabels, type Project } from "../../../data/projectData";

const GOLD = "#f6b918";

export const STATUS_DOT: Record<Project["status"], string> = {
  "Hoàn thành": "#4ade80",
  "Đang thi công": GOLD,
};

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex-shrink-0" style={{ color: GOLD }}>
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-white font-bold text-sm whitespace-nowrap">
          {value}
        </p>
        <p className="text-white/45 text-[11px] whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  orderIndex: number;
}

export function ProjectCard({ project, orderIndex }: ProjectCardProps) {
  return (
    <Link
      to={`/du-an/${project.id}`}
      className="group relative flex h-auto min-h-[320px] sm:min-h-[360px] w-full overflow-hidden rounded-2xl no-underline shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300/50"
    >
      {/* Ảnh nền — luôn có màu đầy đủ, chỉ zoom nhẹ khi hover */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient trái -> phải: chữ luôn dễ đọc, vẫn thấy ảnh rõ bên phải */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />

      {/* Số thứ tự ghost */}
      <span
        className="pointer-events-none absolute top-4 right-5 z-10 select-none font-extrabold text-white"
        style={{ fontSize: "1.75rem", opacity: 0.12 }}
      >
        {String(orderIndex + 1).padStart(2, "0")}
      </span>

      {/* Badge trạng thái — góc dưới phải, luôn hiện */}
      <span className="absolute bottom-4 right-5 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
        <span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ backgroundColor: STATUS_DOT[project.status] }}
        />
        {project.status}
      </span>

      {/* Nội dung — luôn hiện đầy đủ, căn trái */}
      <div className="relative z-10 flex max-w-xl flex-col justify-center gap-4 px-6 py-8 sm:px-10 sm:py-10">
        <span
          className="w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${GOLD}26`, color: GOLD }}
        >
          {categoryLabels[project.category]}
        </span>

        <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
          {project.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-white/60">
          <LocationOnIcon sx={{ fontSize: 14, color: GOLD }} />
          {project.location}
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <StatItem
            icon={<BoltIcon sx={{ fontSize: 17 }} />}
            value={project.capacity}
            label="Công suất"
          />
          <StatItem
            icon={<GridViewIcon sx={{ fontSize: 16 }} />}
            value={project.panelCount}
            label="Số lượng"
          />
          <StatItem
            icon={<EventAvailableIcon sx={{ fontSize: 16 }} />}
            value={project.timeline}
            label={project.status === "Hoàn thành" ? "Hoàn thành" : "Dự kiến"}
          />
        </div>

        <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all duration-200 group-hover:gap-2.5 group-hover:bg-white/20">
          Xem chi tiết dự án
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </span>
      </div>
    </Link>
  );
}
