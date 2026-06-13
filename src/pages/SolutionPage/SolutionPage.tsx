import Home from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Savings from "@mui/icons-material/Savings";
import SupportAgent from "@mui/icons-material/SupportAgent";
import CheckCircle from "@mui/icons-material/CheckCircle";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GridOnOutlined from "@mui/icons-material/GridOnOutlined";
import BatteryChargingFullOutlined from "@mui/icons-material/BatteryChargingFullOutlined";
import CheckIcon from "@mui/icons-material/Check";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  type SolutionIcon,
  type TrustIcon,
  type SolutionItem,
  type SubType,
  solutionHeader,
  solutions,
  trustItems,
} from "../../data/solutionData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Colors ───────────────────────────────────────────────────
const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

// ─── Icon maps ────────────────────────────────────────────────
const iconMap: Record<SolutionIcon | TrustIcon, SvgIconComponent> = {
  home:     Home,
  building: Apartment,
  shield:   VerifiedUser,
  award:    WorkspacePremium,
  coins:    Savings,
  headset:  SupportAgent,
};

const specIconMap: Record<string, SvgIconComponent> = {
  bolt:    BoltOutlined,
  percent: PercentOutlined,
  verify:  VerifiedOutlined,
};

const subIconMap: Record<string, SvgIconComponent> = {
  grid:    GridOnOutlined,
  battery: BatteryChargingFullOutlined,
};

// ─── Reveal ───────────────────────────────────────────────────
function Reveal({
  children, delay = 0, className = "", direction = "up",
}: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: "up" | "left" | "right";
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const translate =
    direction === "left"  ? (isVisible ? "translate-x-0" : "-translate-x-10")
    : direction === "right" ? (isVisible ? "translate-x-0" : "translate-x-10")
    :                          (isVisible ? "translate-y-0" : "translate-y-8");
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"} ${translate} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── On-grid SVG ──────────────────────────────────────────────
function OnGridDiagram({ consumerLabel }: { consumerLabel: string }) {
  const lines = consumerLabel.split("\n");
  return (
    <svg viewBox="0 0 240 190" className="w-full" style={{ maxHeight: 190 }}>
      <defs>
        <marker id="ag" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GOLD} />
        </marker>
        <marker id="ag2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>
      {/* Sun */}
      <circle cx="120" cy="16" r="11" fill={GOLD} />
      <text x="120" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">☀</text>
      <text x="120" y="34" textAnchor="middle" fontSize="6.5" fill="#64748b" fontWeight="600">TẤM PIN NLMT</text>
      {/* Sun→Inverter */}
      <line x1="120" y1="37" x2="120" y2="64" stroke={GOLD} strokeWidth="1.5" markerEnd="url(#ag)" />
      {/* Inverter */}
      <rect x="78" y="66" width="84" height="26" rx="5" fill={NAVY} />
      <text x="120" y="83" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">INVERTER</text>
      {/* Left→Grid */}
      <line x1="78" y1="79" x2="28" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag2)" />
      {/* Right→Consumer */}
      <line x1="162" y1="79" x2="212" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ag2)" />
      {/* Grid box */}
      <rect x="8" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="18" y="82" textAnchor="middle" fontSize="10">⚡</text>
      <text x="18" y="106" textAnchor="middle" fontSize="6" fill="#64748b">LƯỚI ĐIỆN</text>
      {/* Consumer box */}
      <rect x="212" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="222" y="82" textAnchor="middle" fontSize="10">🏠</text>
      {lines.map((l, i) => (
        <text key={l} x="222" y={106 + i * 9} textAnchor="middle" fontSize="5.5" fill="#64748b">{l}</text>
      ))}
    </svg>
  );
}

// ─── Hybrid SVG ───────────────────────────────────────────────
function HybridDiagram({ consumerLabel }: { consumerLabel: string }) {
  const lines = consumerLabel.split("\n");
  return (
    <svg viewBox="0 0 260 210" className="w-full" style={{ maxHeight: 210 }}>
      <defs>
        <marker id="ah" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GOLD} />
        </marker>
        <marker id="ah2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
        <marker id="ah3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" />
        </marker>
      </defs>
      {/* Sun */}
      <circle cx="130" cy="16" r="11" fill={GOLD} />
      <text x="130" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">☀</text>
      <text x="130" y="34" textAnchor="middle" fontSize="6.5" fill="#64748b" fontWeight="600">TẤM PIN NLMT</text>
      {/* Sun→Hybrid */}
      <line x1="130" y1="37" x2="130" y2="64" stroke={GOLD} strokeWidth="1.5" markerEnd="url(#ah)" />
      {/* Hybrid inverter */}
      <rect x="82" y="66" width="96" height="26" rx="5" fill={NAVY} />
      <text x="130" y="83" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="bold">HYBRID INVERTER</text>
      {/* Left→Grid */}
      <line x1="82" y1="79" x2="24" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ah2)" />
      {/* Right→Consumer */}
      <line x1="178" y1="79" x2="230" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ah2)" />
      {/* Down→Battery */}
      <line x1="130" y1="92" x2="130" y2="126" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#ah3)" />
      {/* Grid */}
      <rect x="4" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="14" y="82" textAnchor="middle" fontSize="10">⚡</text>
      <text x="14" y="105" textAnchor="middle" fontSize="6" fill="#64748b">LƯỚI ĐIỆN</text>
      {/* Consumer */}
      <rect x="230" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="240" y="82" textAnchor="middle" fontSize="10">🏠</text>
      {lines.map((l, i) => (
        <text key={l} x="240" y={105 + i * 9} textAnchor="middle" fontSize="5.5" fill="#64748b">{l}</text>
      ))}
      {/* Battery */}
      <rect x="100" y="128" width="60" height="24" rx="5" fill="#1d4ed8" />
      <text x="130" y="143" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">PIN LƯU TRỮ</text>
    </svg>
  );
}

// ─── SubType Panel ────────────────────────────────────────────
function SubTypePanel({
  sub,
  accentColor,
  consumerLabel,
}: {
  sub: SubType;
  accentColor: string;
  consumerLabel: string;
}) {
  const Icon = subIconMap[sub.icon];
  const isStorage = sub.icon === "battery";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
        <span
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: isStorage ? `${NAVY}15` : `${accentColor}20` }}
        >
          <Icon sx={{ fontSize: 20 }} style={{ color: isStorage ? NAVY : accentColor }} />
        </span>
        <div>
          <p className="text-sm font-extrabold uppercase leading-tight"
            style={{ color: isStorage ? NAVY : accentColor }}>
            {sub.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{sub.subtitle}</p>
        </div>
      </div>

      {/* Content — always visible */}
      <div className="px-5 pb-5 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Features */}
          <ul className="flex flex-col gap-2.5">
            {sub.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span
                  className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: isStorage ? "#1d4ed8" : accentColor }}
                >
                  <CheckIcon sx={{ fontSize: 10, color: "#fff" }} />
                </span>
                <span className="text-xs text-gray-600 leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          {/* Diagram */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-3">
            {sub.diagramType === "on-grid"
              ? <OnGridDiagram consumerLabel={consumerLabel} />
              : <HybridDiagram consumerLabel={consumerLabel} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SolutionSection ──────────────────────────────────────────
function SolutionSection({ item, index }: { item: SolutionItem; index: number }) {
  const isEven       = index % 2 === 0;
  const isAmber      = item.accent === "amber";
  const Icon         = iconMap[item.icon];
  const accentColor  = isAmber ? GOLD : NAVY;
  const accentBg     = isAmber ? "bg-[#f6b918]"  : "bg-[#1c2f5c]";
  const accentText   = isAmber ? "text-[#f6b918]" : "text-[#1c2f5c]";
  const accentSpecBg = isAmber ? "bg-amber-50"    : "bg-blue-50";
  const accentLightBg = isAmber ? "bg-amber-50/60" : "bg-blue-50/60";

  return (
    <div className={`py-14 sm:py-20 ${isEven ? "bg-white" : "bg-[#f3f4f6]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <Reveal className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className={`flex-shrink-0 w-12 h-12 rounded-xl ${accentBg} flex items-center justify-center shadow-md`}>
              <Icon sx={{ fontSize: 24, color: "#fff" }} />
            </span>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 ${accentText}`}>Giải pháp</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c2f5c] leading-tight">{item.title}</h2>
            </div>
          </div>
          <div className="w-14 h-[3px] rounded-full ml-16" style={{ background: accentColor }} />
        </Reveal>

        {/* ── Row 1: Specs + Description + Advantages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Specs — 3 thẻ dọc */}
          <Reveal delay={0}>
            <div className="flex flex-col gap-3 h-full">
              {item.specs.map((s) => {
                const SIcon = specIconMap[s.iconKey] ?? BoltOutlined;
                return (
                  <div
                    key={s.label}
                    className={`flex items-center gap-4 ${accentSpecBg} rounded-2xl px-5 py-4 flex-1`}
                  >
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <SIcon sx={{ fontSize: 20, color: "#fff" }} />
                    </span>
                    <div>
                      <p className="text-[11px] text-gray-400 leading-tight">{s.label}</p>
                      <p className="text-lg font-extrabold text-[#1c2f5c] leading-tight">{s.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Description + Features */}
          <Reveal delay={80} className="lg:col-span-2">
            <div className={`rounded-2xl ${accentLightBg} border border-gray-100 p-6 h-full flex flex-col gap-5`}>
              {/* Description */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tổng quan</p>
                <p className="text-sm text-gray-600 leading-relaxed border-l-2 pl-4" style={{ borderColor: accentColor }}>
                  {item.detail.description}
                </p>
              </div>
              {/* Features 2 cột */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Đặc điểm nổi bật</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle sx={{ fontSize: 16, mt: "2px", flexShrink: 0 }} style={{ color: accentColor }} />
                      <span className="text-sm text-gray-600 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Row 2: Advantages + Process — full width, no separate boxes ── */}
        <Reveal delay={60} className="mb-8">
          <div className={`rounded-2xl border border-gray-100 overflow-hidden ${isEven ? "bg-white" : "bg-white"} shadow-sm`}>

            {/* Advantages */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Lợi thế nổi bật</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                {item.detail.advantages.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${accentColor}18` }}
                    >
                      <TaskAltIcon sx={{ fontSize: 13 }} style={{ color: accentColor }} />
                    </span>
                    <span className="text-sm text-gray-600 leading-snug">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process — timeline ngang */}
            <div className="px-6 py-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Quy trình thực hiện</p>
              <div className="relative">
                {/* Connector line */}
                <div
                  className="absolute top-4 left-4 right-4 h-[2px]"
                  style={{ backgroundColor: `${accentColor}25` }}
                />
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${item.detail.process.length}, 1fr)` }}>
                  {item.detail.process.map((step, i) => (
                    <div key={step} className="flex flex-col items-center text-center relative z-10">
                      {/* Step number circle */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-extrabold mb-3 ring-4 ring-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs text-gray-600 leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* ── Row 3: SubType panels (Hòa lưới + Lưu trữ) ── */}
        <Reveal delay={140}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Loại hệ thống</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.subTypes.map((sub) => (
              <SubTypePanel
                key={sub.id}
                sub={sub}
                accentColor={accentColor}
                consumerLabel={item.consumerLabel}
              />
            ))}
          </div>
        </Reveal>

      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function SolutionPage() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: trustRef,  isVisible: trustVisible  } = useScrollReveal({ threshold: 0.1 });

  return (
    <div className="pt-[72px]">

      {/* ══ PAGE HERO ══ */}
      <div className="relative py-14 sm:py-20 overflow-hidden">
        {/* Ảnh nền */}
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&q=85"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {solutionHeader.badge}
              </span>
              <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              {solutionHeader.headlineLead}{" "}
              <span className="text-white">{solutionHeader.headlineHighlight}</span>
            </h1>
            <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed">
              {solutionHeader.description}
            </p>
            {/* Quick-nav pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {solutions.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a
                    key={s.id}
                    href={`#solution-${s.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold no-underline"
                    style={{ backgroundColor: GOLD }}
                  >
                    <Icon sx={{ fontSize: 14 }} />
                    {s.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SOLUTION SECTIONS ══ */}
      {solutions.map((item, index) => (
        <div key={item.id} id={`solution-${item.id}`}>
          <SolutionSection item={item} index={index} />
        </div>
      ))}

      {/* ══ TRUST BAR ══ */}
      <div className="py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={trustRef}
            className={`transition-all duration-700 ease-out ${
              trustVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
              {trustItems.map((t, i) => {
                const Icon    = iconMap[t.icon];
                const isAmber = t.accent === "amber";
                return (
                  <div
                    key={t.id}
                    className={`flex items-center gap-4 lg:px-8 transition-all duration-700 ease-out ${
                      trustVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span
                      className="flex-shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: isAmber ? GOLD : "rgba(255,255,255,0.4)",
                        color:       isAmber ? GOLD : "rgba(255,255,255,0.7)",
                      }}
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
          </div>
        </div>
      </div>

    </div>
  );
}