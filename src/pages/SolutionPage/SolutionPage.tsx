import { useState } from "react";
import Home from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Savings from "@mui/icons-material/Savings";
import SupportAgent from "@mui/icons-material/SupportAgent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircle from "@mui/icons-material/CheckCircle";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  type SolutionIcon,
  type TrustIcon,
  type SolutionItem,
  solutionHeader,
  solutions,
  trustItems,
} from "../../data/solutionData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Icon maps ────────────────────────────────────────────────
const iconMap: Record<SolutionIcon | TrustIcon, SvgIconComponent> = {
  home:     Home,
  building: Apartment,
  shield:   VerifiedUser,
  award:    WorkspacePremium,
  coins:    Savings,
  headset:  SupportAgent,
};

// Map iconKey (từ data) → MUI icon component
const specIconMap: Record<string, SvgIconComponent> = {
  bolt:    BoltOutlined,
  percent: PercentOutlined,
  verify:  VerifiedOutlined,
};

// ─── Reveal wrapper ───────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${translate} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Single solution section ──────────────────────────────────
function SolutionSection({ item, index }: { item: SolutionItem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const isEven   = index % 2 === 0;
  const isAmber  = item.accent === "amber";
  const Icon     = iconMap[item.icon];

  const accentColor   = isAmber ? "#f6b918" : "#1c2f5c";
  const accentBg      = isAmber ? "bg-[#f6b918]"   : "bg-[#1c2f5c]";
  const accentText    = isAmber ? "text-[#f6b918]"  : "text-[#1c2f5c]";
  const accentSpecBg  = isAmber ? "bg-amber-50"     : "bg-blue-50";
  const accentBadgeBg = isAmber
    ? "bg-[#f6b918]/10 text-[#f6b918]"
    : "bg-[#1c2f5c]/10 text-[#1c2f5c]";

  return (
    <div className={`py-16 sm:py-20 ${isEven ? "bg-white" : "bg-[#f3f4f6]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
            isEven ? "" : "lg:[direction:rtl]"
          }`}
        >
          {/* ── Image ── */}
          <Reveal direction={isEven ? "left" : "right"} className="lg:[direction:ltr]">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] lg:sticky lg:top-24">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              <span className={`absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${accentBadgeBg}`}>
                {item.subtitle}
              </span>
              <span
                className="absolute bottom-4 right-5 text-7xl font-black leading-none select-none"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          {/* ── Content ── */}
          <Reveal direction={isEven ? "right" : "left"} delay={80} className="lg:[direction:ltr]">
            <div className="flex flex-col">

              {/* Icon + title */}
              <div className="flex items-center gap-4 mb-4">
                <span className={`flex-shrink-0 w-12 h-12 rounded-xl ${accentBg} flex items-center justify-center`}>
                  <Icon sx={{ fontSize: 24, color: "#fff" }} />
                </span>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${accentText}`}>
                    Giải pháp
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#1c2f5c] leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="w-12 h-[3px] rounded-full mb-5" style={{ background: accentColor }} />

              {/* Specs — đọc từ item.specs */}
              {item.specs.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {item.specs.map((s) => {
                    const SIcon = specIconMap[s.iconKey] ?? BoltOutlined;
                    return (
                      <div key={s.label} className={`${accentSpecBg} rounded-xl p-3 text-center`}>
                        <SIcon sx={{ fontSize: 20 }} className={accentText} />
                        <p className="text-base font-extrabold mt-1 text-[#1c2f5c]">{s.value}</p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle
                      sx={{ fontSize: 17, mt: "2px", flexShrink: 0 }}
                      style={{ color: accentColor }}
                    />
                    <span className="text-sm text-gray-600 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Toggle — đọc từ item.detail */}
              <button
                onClick={() => setExpanded((p) => !p)}
                className="flex items-center gap-2 text-sm font-bold transition-colors duration-200 self-start"
                style={{ color: accentColor, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <span>{expanded ? "Thu gọn" : "Xem thêm chi tiết"}</span>
                <ExpandMoreIcon
                  sx={{ fontSize: 20 }}
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>

              {/* Expandable detail — đọc từ item.detail */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: expanded ? 600 : 0, opacity: expanded ? 1 : 0 }}
              >
                <div className="pt-5 flex flex-col gap-5">

                  {/* Description */}
                  <p
                    className="text-sm text-gray-500 leading-relaxed border-l-2 pl-4"
                    style={{ borderColor: accentColor }}
                  >
                    {item.detail.description}
                  </p>

                  {/* Advantages */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">
                      Lợi thế nổi bật
                    </p>
                    <ul className="flex flex-col gap-2">
                      {item.detail.advantages.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <TaskAltIcon
                            sx={{ fontSize: 17, mt: "2px", flexShrink: 0 }}
                            style={{ color: accentColor }}
                          />
                          <span className="text-sm text-gray-600 leading-snug">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-gray-400">
                      Quy trình thực hiện
                    </p>
                    <ol className="flex flex-col gap-2.5">
                      {item.detail.process.map((step, i) => (
                        <li key={step} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full text-white text-xs font-extrabold flex items-center justify-center mt-0.5"
                            style={{ background: accentColor }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm text-gray-600 leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>
              </div>

            </div>
          </Reveal>
        </div>
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
      <div className="bg-[#1c2f5c] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-[#f6b918]" />
              <span className="text-[#f6b918] text-xs font-bold uppercase tracking-[0.2em]">
                {solutionHeader.badge}
              </span>
              <span className="w-6 h-0.5 bg-[#f6b918]" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              {solutionHeader.headlineLead}{" "}
              <span className="text-[#f6b918]">{solutionHeader.headlineHighlight}</span>
            </h1>
            <p className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed">
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white/70 text-xs font-semibold hover:bg-[#f6b918] hover:border-[#f6b918] hover:text-white transition-all duration-200 no-underline"
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
      <div className="bg-[#1c2f5c] py-12">
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
                        borderColor: isAmber ? "#f6b918" : "rgba(255,255,255,0.4)",
                        color:       isAmber ? "#f6b918" : "rgba(255,255,255,0.7)",
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