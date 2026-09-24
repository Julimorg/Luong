import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { categoryLabels, type Project } from "../../../data/projectData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY } from "../../../themes/brand";
import { ProjectImage } from "./ProjectImage";

/**
 * Danh mục công trình dạng hồ sơ năng lực: mỗi dự án là một dải ngang trải
 * hết chiều rộng, ảnh công trình nằm ngay sau chữ và sáng dần khi rê chuột.
 *
 * Chọn dạng này thay cho lưới thẻ vì đối tượng đọc là chủ đầu tư và đối tác:
 * họ cần đọc nhanh tên công trình, chủ đầu tư và các con số kỹ thuật theo
 * hàng, giống cách đọc một hồ sơ dự án — thay vì lướt qua các ô ảnh nhỏ.
 */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const done = project.status === "Hoàn thành";

  return (
    <Link
      to={`/du-an/${project.id}`}
      data-row
      className="group relative block overflow-hidden border-b border-white/10 no-underline"
    >
      {/* Ảnh công trình làm nền — mờ ở trạng thái thường, rõ dần khi rê chuột */}
      <ProjectImage
        src={project.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: `linear-gradient(90deg, ${NAVY}F2 0%, ${NAVY}D9 55%, ${NAVY}A6 100%)` }}
      />
      {/* Vạch vàng chạy dọc mép trái khi rê chuột */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
        style={{ backgroundColor: GOLD }}
      />

      {/* Từ lg trở lên xếp thành lưới cố định để các cột số liệu thẳng hàng
          giữa mọi dòng — đọc như một bảng hồ sơ dự án. */}
      <div className="relative z-10 flex flex-col gap-5 px-5 py-7 sm:px-8 lg:grid lg:grid-cols-[52px_minmax(0,1fr)_156px_176px_44px] lg:items-center lg:gap-7 lg:py-9">
        {/* Số thứ tự */}
        <span
          className="hidden text-4xl font-extrabold leading-none lg:block"
          style={{ color: `${GOLD}4D` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Tên công trình + thông tin nhận diện */}
        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
              style={{ backgroundColor: `${GOLD}26`, color: GOLD }}
            >
              {categoryLabels[project.category]}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <PlaceRoundedIcon sx={{ fontSize: 14 }} />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: done ? "#22c55e" : GOLD }}
              />
              {project.status} · {project.timeline}
            </span>
          </div>

          <h3 className="text-xl font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-[#fbae17] sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-2 flex items-start gap-1.5 text-xs text-white/50">
            <BusinessRoundedIcon sx={{ fontSize: 15, mt: "1px", flexShrink: 0 }} />
            Chủ đầu tư: <span className="font-semibold text-white/75">{project.client}</span>
          </p>
        </div>

        {/* Các con số kỹ thuật — thứ đối tác đối chiếu đầu tiên.
            Trên màn hẹp gom lại một hàng; từ lg trở lên tách thành các cột. */}
        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4 sm:justify-start sm:gap-8 lg:contents lg:border-t-0 lg:pt-0">
          <div className="lg:border-l lg:border-white/10 lg:pl-7">
            <p
              className="whitespace-nowrap text-2xl font-extrabold leading-none sm:text-3xl"
              style={{ color: GOLD }}
            >
              {project.capacity}
            </p>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-white/40">
              Công suất
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-white sm:text-sm">
              <GridViewRoundedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }} />
              {project.panelCount}
            </p>
            {project.yearlyOutput && (
              <p className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-white sm:text-sm">
                <InsightsRoundedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }} />
                {project.yearlyOutput}
              </p>
            )}
          </div>

          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:border-[#fbae17] group-hover:bg-[#fbae17] group-hover:text-[#121b45]">
            <ArrowForwardIcon
              sx={{ fontSize: 19 }}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const ref = useAnimeOnView<HTMLDivElement>((el) => {
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    const anim = animate(rows, {
      opacity: [0, 1],
      y: [24, 0],
      duration: 680,
      delay: stagger(80),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  }, { threshold: 0.05 });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10"
      style={{ backgroundColor: NAVY }}
    >
      {projects.map((p, i) => (
        <ProjectRow key={p.id} project={p} index={i} />
      ))}
    </div>
  );
}
