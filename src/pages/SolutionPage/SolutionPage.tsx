import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import Factory from "@mui/icons-material/Factory";
import DomainIcon from "@mui/icons-material/Domain";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Savings from "@mui/icons-material/Savings";
import SupportAgent from "@mui/icons-material/SupportAgent";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import GridOnOutlined from "@mui/icons-material/GridOnOutlined";
import BatteryChargingFullOutlined from "@mui/icons-material/BatteryChargingFullOutlined";
import PowerOffOutlined from "@mui/icons-material/PowerOffOutlined";
import LocalParkingOutlined from "@mui/icons-material/LocalParkingOutlined";
import Battery6BarOutlined from "@mui/icons-material/Battery6BarOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import HubOutlined from "@mui/icons-material/HubOutlined";
import ElectricCarOutlined from "@mui/icons-material/ElectricCarOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  type SubType,
  solutionHeader,
  solutionHighlights,
  solutions,
  trustItems,
} from "../../data/solutionData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Colors ───────────────────────────────────────────────────
const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

// ─── Icon map ─────────────────────────────────────────────────
const iconMap: Record<string, SvgIconComponent> = {
  home: Home, building: Apartment, factory: Factory, industrial: DomainIcon,
  shield: VerifiedUser, award: WorkspacePremium, coins: Savings, headset: SupportAgent,
  bolt: BoltOutlined, percent: PercentOutlined, verify: VerifiedOutlined,
  grid: GridOnOutlined, battery: BatteryChargingFullOutlined, offgrid: PowerOffOutlined,
  carport: LocalParkingOutlined, bess: Battery6BarOutlined, ems: InsightsOutlined,
  utility: HubOutlined, ev: ElectricCarOutlined,
};

// ─── Màu theo icon — dùng chung cho cả card lẫn modal ──────────
function getSubTypeColor(icon: string) {
  return icon === "battery" || icon === "bess" ? "#1d4ed8"
    : icon === "offgrid" || icon === "utility" ? NAVY
    : GOLD;
}

// ─── Reveal ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Sub-type card ────────────────────────────────────────────
function SubTypeCard({
  sub,
  index,
  onViewMore,
}: {
  sub: SubType;
  index: number;
  onViewMore: (sub: SubType) => void;
}) {
  const Icon = iconMap[sub.icon];
  const color = getSubTypeColor(sub.icon);
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
        <span className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-extrabold" style={{ backgroundColor: color }}>
          {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <Icon sx={{ fontSize: 18 }} style={{ color }} />
          <p className="text-sm font-extrabold uppercase leading-tight" style={{ color: NAVY }}>{sub.name}</p>
        </div>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        <ul className="flex flex-col gap-2">
          {sub.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: color }}>
                <CheckIcon sx={{ fontSize: 10, color: "#fff" }} />
              </span>
              <span className="text-xs text-gray-600 leading-snug">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-xl overflow-hidden bg-gray-50 p-3">
          <img
            src={sub.image}
            alt={sub.name}
            loading="lazy"
            className="w-full h-32 object-contain"
          />
        </div>

        {/* Nút "Hiện thêm" -> mở modal chi tiết */}
        <button
          onClick={() => onViewMore(sub)}
          className="self-start inline-flex items-center gap-1 text-xs font-bold transition-all duration-200 hover:gap-1.5"
          style={{ color }}
        >
          Hiện thêm
          <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </button>
      </div>
    </div>
  );
}

// ─── Modal chi tiết sub-type — kiểu Ant Design: header / body / footer ─────
function SubTypeDetailModal({
  sub,
  visible,
  onClose,
}: {
  sub: SubType;
  visible: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const color = getSubTypeColor(sub.icon);
  const Icon = iconMap[sub.icon];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(13,33,55,0.7)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl xl:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out max-h-[90vh] flex flex-col ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase leading-tight truncate" style={{ color: NAVY }}>
                {sub.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{sub.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Đóng"
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        {/* ── Body — flex (không phải grid) để mỗi cột tự quản lý overflow riêng ── */}
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* Ảnh — CỐ ĐỊNH, không cuộn theo, hiện trọn vẹn (object-contain vì có thể là ảnh chụp hoặc sơ đồ có chữ) */}
          <div className="relative bg-gray-50 flex items-center justify-center p-5 sm:p-6 h-56 sm:h-auto flex-shrink-0 sm:w-1/2">
            <img
              src={sub.image}
              alt={sub.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thông tin — CUỘN RIÊNG khi nội dung dài, ảnh bên trái không bị ảnh hưởng */}
          <div className="sm:w-1/2 min-h-0 overflow-y-auto p-6 sm:p-8 flex flex-col gap-7">
            {/* Mô tả chi tiết — dùng solution.description nếu có, fallback về subtitle */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Mô tả</p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {sub.solution?.description ?? sub.subtitle}
              </p>
            </div>

            {/* Đặc điểm nổi bật */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Đặc điểm nổi bật</p>
              <ul className="flex flex-col gap-3">
                {sub.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: color }}
                    >
                      <CheckIcon sx={{ fontSize: 12, color: "#fff" }} />
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thông số bổ sung — dạng bảng key-value, chỉ hiện khi solution.specs có data */}
            {sub.solution?.specs && sub.solution.specs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Thông số kỹ thuật</p>
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  {sub.solution.specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                        i !== sub.solution!.specs!.length - 1 ? "border-b border-gray-100" : ""
                      } ${i % 2 === 1 ? "bg-gray-50/60" : "bg-white"}`}
                    >
                      <span className="text-gray-400">{s.label}</span>
                      <span className="font-bold text-right" style={{ color: NAVY }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ghi chú / lưu ý — chỉ hiện khi solution.note có data */}
            {sub.solution?.note && (
              <div
                className="rounded-xl px-4 py-3.5 text-sm leading-relaxed"
                style={{ backgroundColor: `${color}0D`, color: NAVY }}
              >
                {sub.solution.note}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors duration-200"
          >
            Đóng
          </button>
          <button
            onClick={() => navigate("/lien-he")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: color, boxShadow: `0 4px 16px ${color}55` }}
          >
            Nhận tư vấn miễn phí
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function SolutionPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const model = solutions[active];
  const nextModel = solutions[(active + 1) % solutions.length];

  // ─── Modal chi tiết sub-type ─────────────────────────────────
  const [detailSub, setDetailSub] = useState<SubType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetail = (sub: SubType) => {
    setDetailSub(sub);
    requestAnimationFrame(() => setModalVisible(true));
  };
  const closeDetail = () => {
    setModalVisible(false);
    setTimeout(() => setDetailSub(null), 300); // đợi transition thoát xong mới gỡ khỏi DOM
  };

  return (
    <div className="pt-[72px]">

      {/* ══ HERO ══ */}
      <div className="relative py-14 sm:py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/95 via-[#0d2137]/85 to-[#0d2137]/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{solutionHeader.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                {solutionHeader.headline}
              </h1>
              <p className="text-white/70 text-base max-w-xl leading-relaxed mb-7">{solutionHeader.description}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(solutionHeader.ctaPrimary.to)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ backgroundColor: GOLD, boxShadow: `0 4px 20px ${GOLD}55` }}
                >
                  {solutionHeader.ctaPrimary.label}
                </button>
                <button
                  onClick={() => navigate(solutionHeader.ctaSecondary.to)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white border border-white/40 hover:bg-white/10 transition-all duration-200"
                >
                  {solutionHeader.ctaSecondary.label}
                </button>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-2xl bg-[#0d2137]/60 backdrop-blur-sm border border-white/10 p-6 flex flex-col gap-5">
                {solutionHighlights.map((h) => {
                  const Icon = iconMap[h.icon];
                  return (
                    <div key={h.title} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}>
                        <Icon sx={{ fontSize: 20 }} />
                      </span>
                      <div>
                        <p className="text-white text-sm font-bold leading-tight">{h.title}</p>
                        <p className="text-white/50 text-xs mt-0.5">{h.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══ GIẢI PHÁP THEO MÔ HÌNH (TABS) ══ */}
      <section className="py-14 sm:py-20 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Giải pháp theo đối tượng</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>Giải pháp phù hợp cho từng mô hình</h2>
          </Reveal>

          {/* Tab bar */}
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-gray-100 shadow-sm">
              {solutions.map((s, i) => {
                const Icon = iconMap[s.icon];
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive ? "text-white shadow-md" : "text-gray-500 hover:text-[#1c2f5c] hover:bg-gray-50"
                    }`}
                    style={isActive ? { backgroundColor: NAVY } : undefined}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                    {s.title}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active model content */}
          <div key={model.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Specs (left) */}
            <Reveal className="lg:col-span-3">
              <div className="flex flex-col gap-3 h-full">
                {model.specs.map((s) => {
                  const SIcon = iconMap[s.iconKey] ?? BoltOutlined;
                  return (
                    <div key={s.label} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex-1">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                        <SIcon sx={{ fontSize: 20, color: "#fff" }} />
                      </span>
                      <div>
                        <p className="text-[11px] text-gray-400 leading-tight">{s.label}</p>
                        <p className="text-lg font-extrabold leading-tight" style={{ color: NAVY }}>{s.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Sub-types (right) — tự động 3 hoặc 4 cột tùy số lượng */}
            <div
              className={`lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                model.subTypes.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
              }`}
            >
              {model.subTypes.map((sub, i) => (
                <Reveal key={sub.id} delay={i * 80}>
                  <SubTypeCard sub={sub} index={i} onViewMore={openDetail} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-8 text-center">
            <button
              onClick={() => setActive((active + 1) % solutions.length)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: NAVY }}
            >
              Xem giải pháp cho {nextModel.title}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══ TRUST BAR ══ */}
      <div className="py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
              {trustItems.map((t, i) => {
                const Icon = iconMap[t.icon];
                const isAmber = t.accent === "amber";
                return (
                  <div key={t.id} className="flex items-center gap-4 lg:px-8" style={{ transitionDelay: `${i * 80}ms` }}>
                    <span
                      className="flex-shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: isAmber ? GOLD : "rgba(255,255,255,0.4)", color: isAmber ? GOLD : "rgba(255,255,255,0.7)" }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </span>
                    <div>
                      <p className="text-white text-sm font-bold leading-tight">{t.title}</p>
                      <p className="text-white/50 text-xs mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══ MODAL CHI TIẾT SUB-TYPE ══ */}
      {detailSub && (
        <SubTypeDetailModal sub={detailSub} visible={modalVisible} onClose={closeDetail} />
      )}

    </div>
  );
}