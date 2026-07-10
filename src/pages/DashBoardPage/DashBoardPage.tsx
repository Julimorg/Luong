import { useRef, useState, useMemo, useEffect } from "react";
import { Button, Slider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SavingsIcon from "@mui/icons-material/Savings";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import NatureIcon from "@mui/icons-material/Nature";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import BuildIcon from "@mui/icons-material/Build";
import ShieldIcon from "@mui/icons-material/Shield";
import { useNavigate } from "react-router-dom";
import {
  heroData,
  heroBadges,
  solutionsSection,
  solutionCards,
  projectsSection,
  projectCards,
  featuredBrandsSection,
  featuredBrands,
  ctaBanner,
  type FeaturedBrand,
} from "../../data/dashBoardData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Brand color ─────────────────────────────────────────────
const GOLD = "#f6b918";
const GOLD_DARK = "#d9a210";
const NAVY = "#0d2137";

// ─── Icon maps ───────────────────────────────────────────────
const badgeIconMap: Record<string, React.ReactNode> = {
  savings: <SavingsIcon sx={{ fontSize: 22 }} />,
  bolt:    <BoltIcon    sx={{ fontSize: 22 }} />,
  shield:  <VerifiedUserIcon sx={{ fontSize: 22 }} />,
  support: <HeadsetMicIcon  sx={{ fontSize: 22 }} />,
};

const solutionIconMap: Record<string, React.ReactNode> = {
  search:          <SearchIcon         sx={{ fontSize: 28 }} />,
  design_services: <DesignServicesIcon sx={{ fontSize: 28 }} />,
  engineering:     <EngineeringIcon    sx={{ fontSize: 28 }} />,
  headset_mic:     <HeadsetMicIcon     sx={{ fontSize: 28 }} />,
};

// ─── Reveal wrappers ─────────────────────────────────────────
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function RevealItem({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Section eyebrow ─────────────────────────────────────────
function SectionEyebrow({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${center ? "justify-center" : ""}`}>
      <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
      <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
        {text}
      </span>
      {center && <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />}
    </div>
  );
}

// ─── Project card with hover reveal ──────────────────────────
function ProjectCard({ project }: { project: typeof projectCards[number] }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div
        className="
          absolute inset-x-0 bottom-0
          translate-y-full group-hover:translate-y-0
          transition-transform duration-400 ease-out
          bg-gradient-to-t from-black/90 via-black/75 to-transparent
          px-4 pt-10 pb-5
        "
      >
        <h3 className="text-white font-bold text-sm leading-snug mb-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5">
          <BoltIcon sx={{ fontSize: 14, color: GOLD }} />
          <span className="text-white/70 text-xs">Công suất: {project.capacity}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Brand logo: CHỈ hiện ảnh (không khung, không chữ); ảnh lỗi thì ẩn ──
function BrandLogo({ brand }: { brand: FeaturedBrand }) {
  const [err, setErr] = useState(false);
  if (err || !brand.logo) return null;
  return (
    <div className="flex-shrink-0 w-44 sm:w-52 h-28 mx-4 sm:mx-8 flex items-center justify-center">
      <img
        src={brand.logo}
        alt={brand.name}
        draggable={false}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setErr(true)}
        className="max-h-16 max-w-full object-contain"
      />
    </div>
  );
}

// ─── Brands marquee: tự chạy + kéo thả ───────────────────────
function BrandsMarquee({ brands }: { brands: FeaturedBrand[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const paused = useRef(false);
  const items = [...brands, ...brands]; // nhân đôi để chạy liền mạch

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (el && !paused.current && !drag.current.active) {
        el.scrollLeft += 0.5;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const wrap = (el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (el.scrollLeft <= 0) el.scrollLeft += half;
    else if (el.scrollLeft >= half) el.scrollLeft -= half;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    wrap(el);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    drag.current.active = false;
    el?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="relative">
      {/* fade 2 mép */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="flex overflow-x-hidden select-none cursor-grab active:cursor-grabbing py-3"
        style={{ touchAction: "pan-y" }}
      >
        {items.map((b, i) => (
          <BrandLogo key={`${b.id}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ─── SOLAR CALCULATOR ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════
type LoaiCongTrinh = "nha_o" | "nha_xuong" | "van_phong" | "trang_trai";
type DienTichMai = "duoi_40" | "tu_40_80" | "tu_80_150" | "tren_150" | "khong_ro";

const CONG_TRINH_OPTIONS: { value: LoaiCongTrinh; label: string; icon: React.ReactNode }[] = [
  { value: "nha_o",      label: "Nhà ở",       icon: <HomeIcon sx={{ fontSize: 24 }} /> },
  { value: "nha_xuong",  label: "Nhà xưởng",   icon: <WarehouseIcon sx={{ fontSize: 24 }} /> },
  { value: "van_phong",  label: "Văn phòng",   icon: <ApartmentIcon sx={{ fontSize: 24 }} /> },
  { value: "trang_trai", label: "Trang trại",  icon: <AgricultureIcon sx={{ fontSize: 24 }} /> },
];

const DIEN_TICH_OPTIONS: { value: DienTichMai; label: string }[] = [
  { value: "duoi_40",   label: "< 40m²" },
  { value: "tu_40_80",  label: "40 - 80m²" },
  { value: "tu_80_150", label: "80 - 150m²" },
  { value: "tren_150",  label: "> 150m²" },
  { value: "khong_ro",  label: "Không rõ" },
];

// diện tích đại diện (m²) cho mỗi khoảng, dùng để kiểm tra công suất mái
const DIEN_TICH_AREA_MAP: Record<DienTichMai, number | null> = {
  duoi_40: 30,
  tu_40_80: 60,
  tu_80_150: 115,
  tren_150: 180,
  khong_ro: null,
};

function formatVND(n: number) {
  return Math.round(n).toLocaleString("vi-VN") + "đ";
}

function formatVNDShort(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " triệu";
  return formatVND(n);
}

function getGiaDien(loai: LoaiCongTrinh, tienDien: number): number {
  switch (loai) {
    case "nha_o":
      if (tienDien < 2_000_000) return 3100;
      if (tienDien <= 6_000_000) return 3400;
      return 3650;
    case "van_phong":
      return 3200; // Doanh nghiệp
    case "nha_xuong":
      return 2850; // Nhà máy
    case "trang_trai":
      return 2750; // Công nghiệp
  }
}

function useSolarResult(tienDien: number, loaiCongTrinh: LoaiCongTrinh, dienTichMai: DienTichMai) {
  return useMemo(() => {
    const giaDien = getGiaDien(loaiCongTrinh, tienDien);
    const dienNangTieuThu = tienDien / giaDien; // kWh/tháng
    const congSuatCanThiet = dienNangTieuThu / 120; // kWp trước hệ số bù
    const congSuatDeXuatRaw = congSuatCanThiet * 0.85;
    const congSuatDeXuat = Math.max(0.5, Math.round(congSuatDeXuatRaw * 2) / 2); // làm tròn 0.5

    const tietKiem = tienDien * 0.85;
    const hoanVon =
      congSuatDeXuat < 10 ? "4 - 5 năm" : congSuatDeXuat <= 30 ? "3.5 - 4 năm" : "3 - 4 năm";
    const co2 = congSuatDeXuat * 0.85; // tấn/năm (ước tính theo tỉ lệ tham chiếu)

    const roofArea = DIEN_TICH_AREA_MAP[dienTichMai];
    let roofStatus: { type: "success" | "warning" | "danger" | "info"; message: string };

    if (roofArea === null) {
      roofStatus = {
        type: "info",
        message:
          "Công suất được ước tính dựa trên mức tiêu thụ điện. Kỹ sư sẽ khảo sát thực tế để xác định công suất phù hợp.",
      };
    } else {
      const congSuatMaiToiDa = roofArea / 6.8;
      if (congSuatMaiToiDa >= congSuatDeXuat) {
        roofStatus = {
          type: "success",
          message: "Diện tích mái phù hợp để lắp đặt hệ thống đề xuất.",
        };
      } else {
        const chenhLech = (congSuatDeXuat - congSuatMaiToiDa) / congSuatDeXuat;
        if (chenhLech <= 0.2) {
          roofStatus = {
            type: "warning",
            message:
              "Diện tích mái có thể chưa đủ cho công suất đề xuất. Kỹ sư VIETHUNGSOLAR sẽ khảo sát và tối ưu phương án phù hợp.",
          };
        } else {
          roofStatus = {
            type: "danger",
            message:
              "Diện tích mái hiện tại chưa đáp ứng công suất đề xuất. Chúng tôi sẽ tư vấn phương án tối ưu theo diện tích thực tế hoặc nhu cầu sử dụng.",
          };
        }
      }
    }

    return { congSuatDeXuat, tietKiem, hoanVon, co2, roofStatus };
  }, [tienDien, loaiCongTrinh, dienTichMai]);
}

function RoofStatusBanner({ status }: { status: { type: "success" | "warning" | "danger" | "info"; message: string } }) {
  const styleMap = {
    success: { bg: "rgba(34,197,94,0.12)", color: "#4ade80", icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
    warning: { bg: "rgba(246,185,24,0.12)", color: GOLD, icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    danger:  { bg: "rgba(239,68,68,0.12)",  color: "#f87171", icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    info:    { bg: "rgba(96,165,250,0.12)", color: "#60a5fa", icon: <InfoIcon sx={{ fontSize: 18 }} /> },
  }[status.type];

  return (
    <div
      className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs leading-relaxed"
      style={{ backgroundColor: styleMap.bg, color: styleMap.color }}
    >
      <span className="mt-0.5 flex-shrink-0">{styleMap.icon}</span>
      <span>{status.message}</span>
    </div>
  );
}

function SolarCalculator() {
  const navigate = useNavigate();
  const [tienDien, setTienDien] = useState(6_000_000);
  const [loaiCongTrinh, setLoaiCongTrinh] = useState<LoaiCongTrinh>("nha_o");
  const [dienTichMai, setDienTichMai] = useState<DienTichMai>("tu_40_80");

  const result = useSolarResult(tienDien, loaiCongTrinh, dienTichMai);

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-10">
          <SectionEyebrow text="Calculator" center />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Ước tính hệ thống phù hợp
            <br />
            với bạn trong 30 giây
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Chỉ cần trả lời 4 câu hỏi đơn giản, bạn sẽ biết được hệ thống điện mặt trời phù hợp và số tiền có thể tiết kiệm mỗi tháng.
          </p>
        </RevealSection>

        <RevealSection>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5">
            {/* ── LEFT: FORM ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-8">
              {/* step dots */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map((n, i) => (
                  <div key={n} className="flex items-center gap-2 flex-1">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: GOLD, color: "#fff" }}
                    >
                      {n}
                    </span>
                    {i < 3 && <span className="h-0.5 flex-1 bg-gray-200" />}
                  </div>
                ))}
              </div>

              {/* Câu 1: Tiền điện */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 1. Tiền điện trung bình mỗi tháng của bạn là bao nhiêu?
                </p>
                <div
                  className="text-center font-bold text-sm py-2 rounded-lg mb-3"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD_DARK }}
                >
                  {formatVND(tienDien)}
                </div>
                <Slider
                  value={tienDien}
                  min={1_000_000}
                  max={20_000_000}
                  step={100_000}
                  onChange={(_, v) => setTienDien(v as number)}
                  sx={{
                    color: GOLD,
                    "& .MuiSlider-thumb": { boxShadow: `0 0 0 6px ${GOLD}33` },
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1 triệu</span>
                  <span>20 triệu+</span>
                </div>
              </div>

              {/* Câu 2: Loại công trình */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 2. Loại công trình của bạn là gì?
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {CONG_TRINH_OPTIONS.map((opt) => {
                    const active = loaiCongTrinh === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setLoaiCongTrinh(opt.value)}
                        className="flex flex-col items-center gap-1.5 rounded-xl border py-3 px-1 transition-all duration-200"
                        style={{
                          borderColor: active ? GOLD : "#e5e7eb",
                          backgroundColor: active ? `${GOLD}1A` : "#fff",
                          color: active ? GOLD_DARK : "#6b7280",
                        }}
                      >
                        {opt.icon}
                        <span className="text-[11px] font-medium leading-tight text-center">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Câu 3: Khu vực */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 3. Khu vực bạn đang ở đâu?
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-500">
                  <LocationOnIcon sx={{ fontSize: 18, color: GOLD }} />
                  TP. Hồ Chí Minh
                </div>
              </div>

              {/* Câu 4: Diện tích mái */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 4. Diện tích mái (ước lượng) của bạn là bao nhiêu?
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIEN_TICH_OPTIONS.map((opt) => {
                    const active = dienTichMai === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setDienTichMai(opt.value)}
                        className="rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200"
                        style={{
                          borderColor: active ? GOLD : "#e5e7eb",
                          backgroundColor: active ? `${GOLD}1A` : "#fff",
                          color: active ? GOLD_DARK : "#6b7280",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                fullWidth
                onClick={() => navigate("/lien-he")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: GOLD,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1.4,
                  boxShadow: `0 4px 20px ${GOLD}55`,
                  "&:hover": { backgroundColor: GOLD_DARK },
                }}
              >
                Xem kết quả
              </Button>
            </div>

            {/* ── RIGHT: RESULT ── */}
            <div className="rounded-2xl p-6 sm:p-7 flex flex-col" style={{ backgroundColor: "#132a4d" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: GOLD }}>
                Kết quả ước tính
              </p>

              <div className="mb-5">
                <p className="text-white/50 text-xs mb-1">Hệ thống đề xuất cho bạn</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white">{result.congSuatDeXuat}</span>
                  <span className="text-lg font-bold pb-1" style={{ color: GOLD }}>kWp</span>
                </div>
                <p className="text-white/40 text-xs mt-1">Phù hợp với nhu cầu sử dụng điện hiện tại</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <SavingsIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Tiết kiệm ước tính</span>
                  </div>
                  <p className="text-white font-bold text-sm">{formatVNDShort(result.tietKiem)}/tháng</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Thời gian hoàn vốn</span>
                  </div>
                  <p className="text-white font-bold text-sm">≈ {result.hoanVon}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <TrendingDownIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Giảm chi phí điện</span>
                  </div>
                  <p className="text-white font-bold text-sm">≈ 85%</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                      <NatureIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Giảm phát thải CO₂</span>
                  </div>
                  <p className="text-white font-bold text-sm">≈ {result.co2.toFixed(1)} tấn/năm</p>
                </div>
              </div>

              <div className="mb-5">
                <RoofStatusBanner status={result.roofStatus} />
              </div>

              <div className="mt-auto">
                <p className="text-white/40 text-xs mb-3">
                  Muốn nhận tư vấn chi tiết &amp; báo giá chính xác? Đội ngũ kỹ thuật của VIETHUNGSOLAR sẽ liên hệ và khảo sát miễn phí.
                </p>
                <Button
                  fullWidth
                  onClick={() => navigate("/lien-he")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: GOLD,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    py: 1.2,
                    "&:hover": { backgroundColor: GOLD_DARK },
                  }}
                >
                  Nhận tư vấn chi tiết
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* feature badges */}
        <RevealSection className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: <SearchIcon sx={{ fontSize: 22 }} />, title: "Khảo sát miễn phí", desc: "Đội ngũ kỹ thuật đến tận nơi khảo sát và tư vấn miễn phí." },
            { icon: <DesignServicesOutlinedIcon sx={{ fontSize: 22 }} />, title: "Thiết kế tối ưu", desc: "Giải pháp được thiết kế riêng, đảm bảo hiệu quả cao nhất." },
            { icon: <BuildIcon sx={{ fontSize: 22 }} />, title: "Thi công chuyên nghiệp", desc: "Đội ngũ giàu kinh nghiệm, thi công nhanh chóng, an toàn." },
            { icon: <ShieldIcon sx={{ fontSize: 22 }} />, title: "Bảo hành dài hạn", desc: "Hỗ trợ kỹ thuật 24/7, bảo hành thiết bị lên đến 10 năm." },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}>
                {f.icon}
              </span>
              <div>
                <p className="text-white font-semibold text-xs mb-0.5">{f.title}</p>
                <p className="text-white/40 text-[11px] leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}

// ─── MAIN ────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div id="home">

      {/* ══════════════════════ HERO ══════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5 animate-[fadeInUp_0.8s_ease_both]">
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {heroData.eyebrow}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 animate-[fadeInUp_0.9s_0.1s_ease_both]"
              style={{ whiteSpace: "pre-line" }}
            >
              {heroData.headline}
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-[fadeInUp_0.9s_0.2s_ease_both]">
              {heroData.subheadline}
            </p>

            <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.9s_0.3s_ease_both]">
              <Button
                variant="contained"
                onClick={() => navigate("/lien-he")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: GOLD,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3.5,
                  py: 1.4,
                  boxShadow: `0 4px 20px ${GOLD}55`,
                  "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-1px)" },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaPrimary.label}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/giai-phap")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3.5,
                  py: 1.4,
                  "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateY(-1px)" },
                  transition: "all 0.2s",
                }}
              >
                {heroData.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════ SOLUTIONS ═════════════════════ */}
      <section id="solutions" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <RevealSection>
              <SectionEyebrow text={solutionsSection.eyebrow} />
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: NAVY }}>
                {solutionsSection.headline}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                {solutionsSection.description}
              </p>
              <Button
                variant="outlined"
                onClick={() => navigate("/gioi-thieu")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: NAVY,
                  color: NAVY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 3,
                  py: 1.2,
                  "&:hover": { backgroundColor: NAVY, color: "#fff", borderColor: NAVY },
                  transition: "all 0.2s",
                }}
              >
                {solutionsSection.cta.label}
              </Button>
            </RevealSection>

            {/* Right 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {solutionCards.map((card, i) => (
                <RevealItem key={card.id} delay={i * 100}>
                  <div
                    className="group p-5 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-default"
                    style={{ ["--hover-border" as string]: `${GOLD}4D` }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300"
                      style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                    >
                      {solutionIconMap[card.icon]}
                    </span>
                    <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS ═════════════════════════ */}
      <section className="py-12 sm:py-14" style={{ backgroundColor: "#1c2f5c" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {heroBadges.map((badge, i) => (
              <RevealItem key={badge.id} delay={i * 100} className="text-center lg:px-8">
                <div className="flex justify-center mb-3" style={{ color: GOLD }}>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: `${GOLD}1A` }}>
                    {badgeIconMap[badge.icon]}
                  </span>
                </div>
                <div className="text-base font-bold text-white mb-1 leading-snug">{badge.title}</div>
                <div className="text-white/50 text-xs">{badge.description}</div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SOLAR CALCULATOR ══════════════ */}
      <SolarCalculator />

      {/* ══════════════════════ PROJECTS ══════════════════════ */}
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

      {/* ══════════════════════ NHÃN HÀNG NỔI BẬT (swiper kéo thả) ══════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
                {featuredBrandsSection.eyebrow}
              </span>
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
              {featuredBrandsSection.headline}
            </h2>
            <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
              {featuredBrandsSection.description}
            </p>
          </RevealSection>
        </div>

        <RevealSection>
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <BrandsMarquee brands={featuredBrands} />
          </div>
        </RevealSection>
      </section>

      {/* ══════════════════════ CTA BANNER ════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 180 }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

        <RevealSection>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                  {ctaBanner.headline}
                </h2>
                <p className="text-white/60 text-base max-w-xl">{ctaBanner.description}</p>
              </div>
              <Button
                variant="contained"
                onClick={() => navigate("/lien-he")}
                endIcon={<ArrowForwardIcon />}
                size="large"
                sx={{
                  backgroundColor: GOLD,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 4,
                  py: 1.5,
                  flexShrink: 0,
                  boxShadow: `0 4px 20px ${GOLD}4D`,
                  "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-2px)", boxShadow: `0 8px 28px ${GOLD}73` },
                  transition: "all 0.2s",
                }}
              >
                {ctaBanner.cta.label}
              </Button>
            </div>
          </div>
        </RevealSection>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}