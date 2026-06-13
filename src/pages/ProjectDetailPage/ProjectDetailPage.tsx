import { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { projects } from "../../data/projectData";
import { useScrollReveal, revealClasses } from "../../hooks/useScrollReveal";
import { projectDetails } from "../../data/projectDetailData";

// ─── Reveal wrapper ───────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const cls =
    direction === "left"
      ? revealClasses.slideLeft(isVisible, delay)
      : direction === "right"
      ? `transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`
      : revealClasses.fadeUp(isVisible, delay);
  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);

  const detail = projectDetails[projectId];
  const project = projects.find((p) => p.id === projectId);

  // Prev / Next navigation
  const allIds = useMemo(() => projects.map((p) => p.id), []);
  const currentIdx = allIds.indexOf(projectId);
  const prevId = currentIdx > 0 ? allIds[currentIdx - 1] : null;
  const nextId = currentIdx < allIds.length - 1 ? allIds[currentIdx + 1] : null;

  if (!detail || !project) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-500 mb-6">Không tìm thấy dự án.</p>
          <Link
            to="/du-an"
            className="inline-flex items-center gap-2 text-[#f5a623] font-semibold no-underline hover:gap-3 transition-all duration-200"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">

      {/* ══════════════ BREADCRUMB ══════════════ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm flex-wrap">
            <Link to="/" className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200">
              Trang chủ
            </Link>
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <Link to="/du-an" className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200">
              Dự án
            </Link>
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <span className="text-[#0d2137] font-medium line-clamp-1">{detail.title}</span>
          </nav>
        </div>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <img
          src={detail.heroImage}
          alt={detail.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/85 via-[#0d2137]/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate("/du-an")}
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm"
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Dự án
        </button>

        {/* Status badge */}
        <div className="absolute top-6 right-4 sm:right-8">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{
              background: detail.status === "Hoàn thành" ? "#22c55e" : "#f59e0b",
            }}
          >
            {detail.status}
          </span>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-0">
          <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pb-10">
            <p className="text-[#f5a623] text-sm font-semibold mb-2 uppercase tracking-widest">
              {detail.location}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2 max-w-3xl">
              {detail.title}
            </h1>
            <p className="text-white/70 text-base max-w-2xl">{detail.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ══════════════ STAT CARDS ══════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-8 relative z-10">
          {detail.stats.map((stat, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="bg-white rounded-2xl px-5 py-4 shadow-md border border-gray-100 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0d2137]">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xs font-semibold text-[#f5a623]">{stat.unit}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════════════ OVERVIEW + META ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Overview text */}
          <Reveal className="lg:col-span-2">
            <h2 className="text-xl font-extrabold text-[#0d2137] mb-4">Tổng quan dự án</h2>
            <p className="text-gray-600 leading-relaxed text-base">{detail.overview}</p>
          </Reveal>

          {/* Meta card */}
          <Reveal delay={120}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                  <BoltIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                    Công suất
                  </div>
                  <div className="text-[#0d2137] font-bold text-sm">{detail.capacity}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                  <LocationOnIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                    Địa điểm
                  </div>
                  <div className="text-[#0d2137] font-bold text-sm">{detail.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                  <BusinessIcon sx={{ fontSize: 18 }} />
                </span>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                    Khách hàng
                  </div>
                  <div className="text-[#0d2137] font-bold text-sm">{detail.client}</div>
                </div>
              </div>

              {detail.completedAt && (
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  </span>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                      Hoàn thành
                    </div>
                    <div className="text-[#0d2137] font-bold text-sm">{detail.completedAt}</div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-gray-100">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{
                    background: detail.status === "Hoàn thành" ? "#22c55e" : "#f59e0b",
                  }}
                >
                  {detail.status}
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════ ZÍC ZẮC SECTIONS ══════════════ */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {detail.sections.map((section, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  isEven ? "" : "lg:[direction:rtl]"
                }`}
              >
                {/* Text */}
                <Reveal
                  direction={isEven ? "left" : "right"}
                  delay={80}
                  className="lg:[direction:ltr]"
                >
                  <div className="flex flex-col justify-center">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-[#f5a623] text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-[#f5a623]/20" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0d2137] mb-4 leading-snug">
                      {section.heading}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base">{section.body}</p>
                  </div>
                </Reveal>

                {/* Image */}
                <Reveal
                  direction={isEven ? "right" : "left"}
                  className="lg:[direction:ltr]"
                >
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-gray-200">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════ GALLERY ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal className="mb-6">
          <h2 className="text-xl font-extrabold text-[#0d2137]">Hình ảnh dự án</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {detail.gallery.map((src, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-gray-200 shadow-sm">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ PREV / NEXT ══════════════ */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          {prevId ? (
            <Link
              to={`/du-an/${prevId}`}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200 group"
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
              <span className="hidden sm:inline">
                {projects.find((p) => p.id === prevId)?.title}
              </span>
              <span className="sm:hidden">Dự án trước</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            to="/du-an"
            className="text-xs font-semibold text-gray-400 hover:text-[#f5a623] no-underline transition-colors duration-200 shrink-0"
          >
            Tất cả dự án
          </Link>

          {nextId ? (
            <Link
              to={`/du-an/${nextId}`}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200 group text-right"
            >
              <span className="hidden sm:inline">
                {projects.find((p) => p.id === nextId)?.title}
              </span>
              <span className="sm:hidden">Dự án tiếp</span>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

    </div>
  );
}