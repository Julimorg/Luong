import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BoltIcon from "@mui/icons-material/Bolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import GridViewIcon from "@mui/icons-material/GridView";
import MemoryIcon from "@mui/icons-material/Memory";
import NatureIcon from "@mui/icons-material/Nature";
import SavingsIcon from "@mui/icons-material/Savings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { projects, categoryLabels } from "../../data/projectData";
import { useScrollReveal, revealClasses } from "../../hooks/useScrollReveal";
import { projectDetails } from "../../data/projectDetailData";

const GOLD = "#f5a623";
const NAVY = "#0d2137";

// ─── Reveal wrapper (giữ nguyên) ───────────────────────────────
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

function pickStatIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("phát thải") || l.includes("co2") || l.includes("co₂"))
    return <NatureIcon sx={{ fontSize: 20 }} />;
  if (l.includes("tiết kiệm") || l.includes("chi phí") || l.includes("vnđ"))
    return <SavingsIcon sx={{ fontSize: 20 }} />;
  if (l.includes("sản lượng")) return <SolarPowerIcon sx={{ fontSize: 20 }} />;
  if (l.includes("công suất")) return <BoltIcon sx={{ fontSize: 20 }} />;
  return <TaskAltIcon sx={{ fontSize: 20 }} />;
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);

  const detail = projectDetails[projectId];
  const project = projects.find((p) => p.id === projectId);

  const heroImages = useMemo(
    () => (detail ? [detail.heroImage, ...(detail.gallery ?? [])] : []),
    [detail],
  );
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const goPrevImg = () =>
    setActiveImgIdx((i) => (i - 1 + heroImages.length) % heroImages.length);
  const goNextImg = () => setActiveImgIdx((i) => (i + 1) % heroImages.length);

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

  const metaRows: { label: string; value?: string }[] = [
    { label: "Loại hình dự án", value: categoryLabels[project.category] },
    { label: "Địa điểm", value: detail.location },
    { label: "Công suất hệ thống", value: detail.capacity },
    { label: "Sản lượng dự kiến", value: detail.expectedOutput },
    { label: "Diện tích mái", value: detail.roofArea },
    { label: "Ngày hoàn thành", value: detail.completedAt },
    { label: "Phạm vi thực hiện", value: detail.scope },
    { label: "Khách hàng", value: detail.client },
  ].filter((row) => Boolean(row.value));

  const hasEquipmentStrip =
    (detail.equipmentItems?.length ?? 0) > 0 ||
    (detail.equipment?.length ?? 0) > 0 ||
    Boolean(project.panelCount) ||
    Boolean(detail.inverterCount);

  return (
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">
      {/* ══════════════ BREADCRUMB ══════════════ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm flex-wrap">
            <Link
              to="/"
              className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
            >
              Trang chủ
            </Link>
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <Link
              to="/du-an"
              className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
            >
              Dự án
            </Link>
            <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
            <span className="text-[#0d2137] font-medium line-clamp-1">
              {detail.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ══════════════ HERO — ảnh full-bleed + card kính mờ, THẲNG HÀNG với container bên dưới ══════════════ */}
      <div className="relative h-[560px] sm:h-[600px] lg:h-[620px] overflow-hidden bg-[#0d2137]">
        <img
          key={activeImgIdx}
          src={heroImages[activeImgIdx]}
          alt={detail.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/70 via-[#0d2137]/10 to-[#0d2137]/40" />

        <button
          onClick={() => navigate("/du-an")}
          className="absolute top-5 left-4 sm:left-8 z-20 flex items-center gap-1.5 text-white/85 hover:text-white text-sm font-medium transition-colors duration-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10"
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Dự án
        </button>

        {heroImages.length > 1 && (
          <div className="absolute bottom-5 right-4 sm:right-8 z-20 flex items-center gap-2">
            <button
              onClick={goPrevImg}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Ảnh trước"
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 13 }} />
            </button>
            <button
              onClick={goNextImg}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Ảnh tiếp"
            >
              <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
            </button>
          </div>
        )}

        {/* Wrapper full-width; dùng ĐÚNG container max-w-7xl mx-auto px-... giống breadcrumb/equipment/overview
            bên dưới -> mép trái card luôn thẳng hàng với mọi section khác trong trang */}
        <div className="absolute inset-0 z-10 flex items-start pointer-events-none">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-auto mt-20 sm:mt-24 max-w-[calc(100%-2rem)] sm:max-w-[440px]">
              <Reveal>
                <div className="rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md p-5 sm:p-7 shadow-2xl">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: GOLD, color: "#fff" }}
                  >
                    {categoryLabels[project.category]}
                  </span>

                  <h1
                    className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                  >
                    {detail.title}
                  </h1>

                  <div className="flex items-center gap-1.5 text-white/75 text-sm mb-3">
                    <LocationOnIcon sx={{ fontSize: 16, color: GOLD }} />
                    {detail.location}
                  </div>

                  <p className="text-white/65 text-sm leading-relaxed mb-4">
                    {detail.subtitle}
                  </p>

                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
                      style={{
                        background:
                          detail.status === "Hoàn thành" ? "#22c55e" : "#f59e0b",
                      }}
                    >
                      {detail.status}
                    </span>
                    {detail.completedAt && (
                      <span className="text-white/50 text-xs font-medium">
                        {detail.completedAt}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-white/15 mb-5">
                    {detail.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="flex-shrink-0" style={{ color: GOLD }}>
                          {pickStatIcon(stat.label)}
                        </span>
                        <div className="leading-tight">
                          <div className="flex items-baseline gap-1">
                            <span className="text-white font-extrabold text-base">
                              {stat.value}
                            </span>
                            {stat.unit && (
                              <span
                                className="text-[11px] font-bold"
                                style={{ color: GOLD }}
                              >
                                {stat.unit}
                              </span>
                            )}
                          </div>
                          <p className="text-white/45 text-[10px] whitespace-nowrap">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/lien-he"
                    className="inline-flex items-center gap-1.5 w-fit rounded-lg px-4 py-2.5 text-sm font-bold no-underline transition-all duration-200 hover:gap-2.5"
                    style={{ backgroundColor: GOLD, color: "#fff" }}
                  >
                    Liên hệ nhận giải pháp
                    <ArrowForwardIcon sx={{ fontSize: 15 }} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop (lg+): grid chia đều, full width, KHÔNG overflow. Mobile/tablet: cuộn ngang. */}
      {/* ══════════════ THIẾT BỊ SỬ DỤNG ══════════════ */}
      {hasEquipmentStrip && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto no-scrollbar divide-x divide-gray-200 lg:grid lg:grid-flow-col lg:auto-cols-fr lg:overflow-visible">
              {/* Nhãn — luôn là cột đầu tiên */}
              <div className="flex-shrink-0 lg:min-w-0 flex items-center pr-6 lg:pr-4 py-5">
                <span className="text-gray-400 text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                  Thiết bị sử dụng
                </span>
              </div>

              {/* Thiết bị dạng brand + spec (2 dòng) — ưu tiên dùng nếu có */}
              {detail.equipmentItems?.map((item, i) => (
                <div
                  key={`eq-${i}`}
                  className="flex-shrink-0 lg:min-w-0 flex flex-col justify-center px-6 lg:px-4 py-5"
                >
                  <span
                    className="font-extrabold text-sm tracking-wide whitespace-nowrap lg:whitespace-normal lg:leading-snug"
                    style={{ color: NAVY }}
                  >
                    {item.brand}
                  </span>
                  <span className="text-gray-400 text-xs whitespace-nowrap lg:whitespace-normal lg:leading-snug mt-0.5">
                    {item.spec}
                  </span>
                </div>
              ))}

              {/* Fallback: nếu chưa có equipmentItems, dùng equipment: string[] cũ */}
              {!detail.equipmentItems?.length &&
                detail.equipment?.map((item, i) => (
                  <div
                    key={`eq-legacy-${i}`}
                    className="flex-shrink-0 lg:min-w-0 flex items-center px-6 lg:px-4 py-5"
                  >
                    <span
                      className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal lg:leading-snug"
                      style={{ color: NAVY }}
                    >
                      {item}
                    </span>
                  </div>
                ))}

              {/* Số lượng tấm pin */}
              {project.panelCount && (
                <div className="flex-shrink-0 lg:min-w-0 flex items-center gap-2.5 px-6 lg:px-4 py-5">
                  <GridViewIcon
                    sx={{ fontSize: 20, color: GOLD, flexShrink: 0 }}
                  />
                  <span
                    className="font-extrabold text-sm whitespace-nowrap lg:whitespace-normal lg:leading-snug"
                    style={{ color: NAVY }}
                  >
                    {project.panelCount}
                  </span>
                </div>
              )}

              {/* Số lượng inverter */}
              {detail.inverterCount && (
                <div className="flex-shrink-0 lg:min-w-0 flex items-center gap-2.5 px-6 lg:px-4 py-5">
                  <MemoryIcon
                    sx={{ fontSize: 20, color: GOLD, flexShrink: 0 }}
                  />
                  <div className="leading-tight">
                    <span
                      className="font-extrabold text-sm block whitespace-nowrap lg:whitespace-normal"
                      style={{ color: NAVY }}
                    >
                      {detail.inverterCount}
                    </span>
                    <span className="text-gray-400 text-xs whitespace-nowrap lg:whitespace-normal">
                      Inverter
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ TỔNG QUAN DỰ ÁN ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Reveal className="lg:col-span-2">
            <h2 className="text-xl font-extrabold text-[#0d2137] mb-4">
              Tổng quan dự án
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              {detail.overview}
            </p>

            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              {metaRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3 text-sm ${
                    i !== metaRows.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="text-gray-400">{row.label}</span>
                  <span
                    className="font-bold text-right"
                    style={{ color: NAVY }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm group aspect-[16/11]">
              <img
                src={
                  detail.overviewImage ??
                  detail.gallery?.[0] ??
                  detail.heroImage
                }
                alt={detail.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-sm">
                <div className="rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <SolarPowerIcon sx={{ fontSize: 17, color: GOLD }} />
                    <h3 className="text-white font-bold text-sm">
                      Giải pháp tối ưu cho sản xuất xanh
                    </h3>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {detail.solutions?.[0] ??
                      detail.challenge ??
                      detail.overview}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ GALLERY ══════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal className="mb-6">
          <h2 className="text-xl font-extrabold text-[#0d2137]">
            Hình ảnh dự án
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {detail.gallery.map((src, i) => (
            <Reveal key={i} delay={i * 70}>
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

      {/* ══════════════ FOOTER — quay lại + CTA ══════════════ */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          <Link
            to="/du-an"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Quay lại danh sách dự án
          </Link>

          <Link
            to="/lien-he"
            className="inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-bold no-underline transition-all duration-200 hover:gap-2.5"
            style={{ backgroundColor: GOLD, color: "#fff" }}
          >
            Liên hệ nhận giải pháp
            <ArrowForwardIcon sx={{ fontSize: 15 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}