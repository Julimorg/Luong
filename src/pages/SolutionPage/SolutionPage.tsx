import { useState } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  type DiagramType,
  type SubType,
  type MainSolution,
  solutionHeader,
  solutionHighlights,
  mainSolutions,
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
};

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

// ─── Diagrams ─────────────────────────────────────────────────
function OnGridDiagram({ consumerLabel }: { consumerLabel: string }) {
  const lines = consumerLabel.split("\n");
  return (
    <svg viewBox="0 0 240 150" className="w-full" style={{ maxHeight: 150 }}>
      <defs>
        <marker id="og-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={GOLD} /></marker>
        <marker id="og-s" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
      </defs>
      <circle cx="120" cy="16" r="11" fill={GOLD} />
      <text x="120" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">☀</text>
      <text x="120" y="34" textAnchor="middle" fontSize="6.5" fill="#64748b" fontWeight="600">TẤM PIN NLMT</text>
      <line x1="120" y1="37" x2="120" y2="64" stroke={GOLD} strokeWidth="1.5" markerEnd="url(#og-g)" />
      <rect x="78" y="66" width="84" height="26" rx="5" fill={NAVY} />
      <text x="120" y="83" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">INVERTER</text>
      <line x1="78" y1="79" x2="28" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#og-s)" />
      <line x1="162" y1="79" x2="212" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#og-s)" />
      <rect x="8" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="18" y="82" textAnchor="middle" fontSize="10">⚡</text>
      <text x="18" y="104" textAnchor="middle" fontSize="6" fill="#64748b">LƯỚI ĐIỆN</text>
      <rect x="212" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="222" y="82" textAnchor="middle" fontSize="10">🏠</text>
      {lines.map((l, i) => <text key={l} x="222" y={104 + i * 8} textAnchor="middle" fontSize="5.3" fill="#64748b">{l}</text>)}
    </svg>
  );
}

function HybridDiagram({ consumerLabel }: { consumerLabel: string }) {
  const lines = consumerLabel.split("\n");
  return (
    <svg viewBox="0 0 260 175" className="w-full" style={{ maxHeight: 175 }}>
      <defs>
        <marker id="hy-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={GOLD} /></marker>
        <marker id="hy-s" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
        <marker id="hy-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" /></marker>
      </defs>
      <circle cx="130" cy="16" r="11" fill={GOLD} />
      <text x="130" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">☀</text>
      <text x="130" y="34" textAnchor="middle" fontSize="6.5" fill="#64748b" fontWeight="600">TẤM PIN NLMT</text>
      <line x1="130" y1="37" x2="130" y2="64" stroke={GOLD} strokeWidth="1.5" markerEnd="url(#hy-g)" />
      <rect x="82" y="66" width="96" height="26" rx="5" fill={NAVY} />
      <text x="130" y="83" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="bold">HYBRID INVERTER</text>
      <line x1="82" y1="79" x2="24" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#hy-s)" />
      <line x1="178" y1="79" x2="230" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#hy-s)" />
      <line x1="130" y1="92" x2="130" y2="124" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#hy-b)" />
      <rect x="4" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="14" y="82" textAnchor="middle" fontSize="10">⚡</text>
      <text x="14" y="104" textAnchor="middle" fontSize="6" fill="#64748b">LƯỚI ĐIỆN</text>
      <rect x="230" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="240" y="82" textAnchor="middle" fontSize="10">🏠</text>
      {lines.map((l, i) => <text key={l} x="240" y={104 + i * 8} textAnchor="middle" fontSize="5.3" fill="#64748b">{l}</text>)}
      <rect x="100" y="126" width="60" height="24" rx="5" fill="#1d4ed8" />
      <text x="130" y="141" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">PIN LƯU TRỮ</text>
    </svg>
  );
}

function OffGridDiagram({ consumerLabel }: { consumerLabel: string }) {
  const lines = consumerLabel.split("\n");
  return (
    <svg viewBox="0 0 240 175" className="w-full" style={{ maxHeight: 175 }}>
      <defs>
        <marker id="of-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={GOLD} /></marker>
        <marker id="of-s" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
        <marker id="of-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" /></marker>
      </defs>
      <circle cx="100" cy="16" r="11" fill={GOLD} />
      <text x="100" y="20" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">☀</text>
      <text x="100" y="34" textAnchor="middle" fontSize="6.5" fill="#64748b" fontWeight="600">TẤM PIN NLMT</text>
      <line x1="100" y1="37" x2="100" y2="64" stroke={GOLD} strokeWidth="1.5" markerEnd="url(#of-g)" />
      <rect x="58" y="66" width="84" height="26" rx="5" fill={NAVY} />
      <text x="100" y="82" textAnchor="middle" fontSize="6.8" fill="white" fontWeight="bold">OFF-GRID INVERTER</text>
      {/* xuống pin */}
      <line x1="100" y1="92" x2="100" y2="124" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#of-b)" />
      {/* sang tải */}
      <line x1="142" y1="79" x2="200" y2="79" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#of-s)" />
      <rect x="200" y="66" width="20" height="26" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="210" y="82" textAnchor="middle" fontSize="10">🏠</text>
      {lines.map((l, i) => <text key={l} x="210" y={104 + i * 8} textAnchor="middle" fontSize="5.3" fill="#64748b">{l}</text>)}
      <rect x="70" y="126" width="60" height="24" rx="5" fill="#1d4ed8" />
      <text x="100" y="141" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">PIN LƯU TRỮ</text>
    </svg>
  );
}

function Diagram({ type, consumerLabel }: { type: DiagramType; consumerLabel: string }) {
  if (type === "hybrid")   return <HybridDiagram consumerLabel={consumerLabel} />;
  if (type === "off-grid") return <OffGridDiagram consumerLabel={consumerLabel} />;
  return <OnGridDiagram consumerLabel={consumerLabel} />;
}

// ─── Sub-type card ────────────────────────────────────────────
function SubTypeCard({ sub, index, consumerLabel }: { sub: SubType; index: number; consumerLabel: string }) {
  const Icon = iconMap[sub.icon];
  const color = sub.icon === "battery" ? "#1d4ed8" : sub.icon === "offgrid" ? NAVY : GOLD;
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
        <div className="mt-auto flex items-center justify-center bg-gray-50 rounded-xl p-3">
          <Diagram type={sub.diagramType} consumerLabel={consumerLabel} />
        </div>
      </div>
    </div>
  );
}

// ─── Main solution card (On-grid / Hybrid) ────────────────────
function MainSolutionCard({ ms }: { ms: MainSolution }) {
  const Icon = iconMap[ms.icon];
  const isHybrid = ms.id === "hybrid";
  const color = isHybrid ? "#1d4ed8" : GOLD;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}1A`, color }}>
            <Icon sx={{ fontSize: 22 }} />
          </span>
          <h3 className="text-lg font-extrabold" style={{ color: NAVY }}>{ms.title}</h3>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: color }}>{ms.tag}</span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">{ms.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
        <ul className="flex flex-col gap-2.5">
          {ms.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                <CheckIcon sx={{ fontSize: 10, color: "#fff" }} />
              </span>
              <span className="text-sm text-gray-600">{f}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-3">
          <Diagram type={ms.diagramType} consumerLabel={"TẢI\nTIÊU THỤ"} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function SolutionPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const model = solutions[active];
  const nextModel = solutions[(active + 1) % solutions.length];

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
            {/* Left */}
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

            {/* Right — highlights card */}
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

      {/* ══ 2 GIẢI PHÁP CHÍNH ══ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Giải pháp chính</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>2 giải pháp tổng quát cho mọi nhu cầu</h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mainSolutions.map((ms, i) => (
              <Reveal key={ms.id} delay={i * 100}>
                <MainSolutionCard ms={ms} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
          <div key={model.id} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Specs (left) */}
            <Reveal>
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

            {/* Sub-types (right) */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              {model.subTypes.map((sub, i) => (
                <Reveal key={sub.id} delay={i * 80}>
                  <SubTypeCard sub={sub} index={i} consumerLabel={model.consumerLabel} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* CTA: chuyển sang mô hình kế tiếp */}
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

    </div>
  );
}