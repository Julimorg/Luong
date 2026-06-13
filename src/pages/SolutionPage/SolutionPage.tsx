import { useState } from "react";
import Home from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import Factory from "@mui/icons-material/Factory";
import EnergySavingsLeaf from "@mui/icons-material/EnergySavingsLeaf";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Savings from "@mui/icons-material/Savings";
import SupportAgent from "@mui/icons-material/SupportAgent";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CheckCircle from "@mui/icons-material/CheckCircle";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import {
  type SolutionIcon,
  type TrustIcon,
  type SolutionItem,
  type Accent,
  solutionHeader,
  solutions,
  trustItems,
} from "../../data/solutionData";
import { useScrollReveal, revealClasses } from "../../hooks/useScrollReveal";

// ─── Icon map ────────────────────────────────────────────────
const iconMap: Record<SolutionIcon | TrustIcon, SvgIconComponent> = {
  home:     Home,
  building: Apartment,
  factory:  Factory,
  sprout:   EnergySavingsLeaf,
  shield:   VerifiedUser,
  award:    WorkspacePremium,
  coins:    Savings,
  headset:  SupportAgent,
};

// ─── Accent tokens ───────────────────────────────────────────
const accentToken: Record<Accent, {
  tabActive: string;
  tabHover: string;
  iconCircle: string;
  check: string;
  divider: string;
  btn: string;
  specBg: string;
  specLabel: string;
  badge: string;
}> = {
  amber: {
    tabActive:  "border-amber-400 text-amber-500 bg-amber-50",
    tabHover:   "hover:border-amber-300 hover:text-amber-400",
    iconCircle: "bg-amber-400 text-white",
    check:      "text-amber-400",
    divider:    "bg-amber-400",
    btn:        "bg-amber-400 text-blue-900 hover:bg-amber-500",
    specBg:     "bg-amber-50",
    specLabel:  "text-amber-600",
    badge:      "bg-amber-100 text-amber-600",
  },
  navy: {
    tabActive:  "border-blue-900 text-blue-900 bg-blue-50",
    tabHover:   "hover:border-blue-700 hover:text-blue-800",
    iconCircle: "bg-blue-900 text-white",
    check:      "text-blue-700",
    divider:    "bg-blue-900",
    btn:        "bg-blue-900 text-white hover:bg-blue-950",
    specBg:     "bg-blue-50",
    specLabel:  "text-blue-700",
    badge:      "bg-blue-100 text-blue-700",
  },
};

// ─── Static specs per solution (extend in solutionData if needed) ─
const specsMap: Record<string, { icon: SvgIconComponent; label: string; value: string }[]> = {
  residential: [
    { icon: BoltOutlined,    label: "Công suất điển hình", value: "5 – 20 kWp" },
    { icon: PercentOutlined, label: "Tiết kiệm điện",       value: "Đến 90%" },
    { icon: VerifiedOutlined,label: "Bảo hành hệ thống",    value: "25 năm" },
  ],
  business: [
    { icon: BoltOutlined,    label: "Công suất điển hình", value: "20 – 500 kWp" },
    { icon: PercentOutlined, label: "Hoàn vốn",             value: "4 – 6 năm" },
    { icon: VerifiedOutlined,label: "Bảo hành hệ thống",    value: "25 năm" },
  ],
  industrial: [
    { icon: BoltOutlined,    label: "Công suất điển hình", value: "500 kWp – 5 MWp" },
    { icon: PercentOutlined, label: "Tiết kiệm điện",       value: "Đến 80%" },
    { icon: VerifiedOutlined,label: "Bảo hành hệ thống",    value: "25 năm" },
  ],
  agriculture: [
    { icon: BoltOutlined,    label: "Công suất điển hình", value: "10 – 200 kWp" },
    { icon: PercentOutlined, label: "Giảm chi phí SX",      value: "Đến 70%" },
    { icon: VerifiedOutlined,label: "Bảo hành hệ thống",    value: "25 năm" },
  ],
};

// ─── Trust bar styles ────────────────────────────────────────
const trustStyles: Record<Accent, { icon: string; border: string }> = {
  amber: { icon: "text-amber-400", border: "border-amber-400" },
  navy:  { icon: "text-blue-900",  border: "border-blue-900" },
};

// ─── Tab button ──────────────────────────────────────────────
function TabButton({
  item,
  active,
  onClick,
}: {
  item: SolutionItem;
  active: boolean;
  onClick: () => void;
}) {
  const tk = accentToken[item.accent];
  const Icon = iconMap[item.icon];

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-1 flex-col items-center gap-2 rounded-xl border-2 px-3 py-4
        text-center text-[12px] font-bold uppercase tracking-wide
        transition-all duration-200
        sm:flex-row sm:gap-3 sm:text-left sm:text-[13px]
        ${active
          ? `${tk.tabActive} shadow-sm`
          : `border-slate-200 text-slate-500 bg-white ${tk.tabHover}`
        }
      `}
    >
      {/* Icon circle */}
      <span
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center rounded-full
          transition-colors duration-200
          ${active ? tk.iconCircle : "bg-slate-100 text-slate-400"}
        `}
      >
        <Icon sx={{ fontSize: 20 }} />
      </span>
      <span className="leading-snug">{item.title}</span>
    </button>
  );
}

// ─── Detail panel ────────────────────────────────────────────
function DetailPanel({ item }: { item: SolutionItem }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const tk = accentToken[item.accent];
  const specs = specsMap[item.id] ?? [];

  return (
    <div
      ref={ref}
      className={`mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_32px_rgba(0,0,0,0.10)] ring-1 ring-slate-100 ${revealClasses.fadeUp(isVisible)}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: image ── */}
        <div className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[420px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Badge trên ảnh */}
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tk.badge}`}>
            {item.subtitle}
          </span>
        </div>

        {/* ── Right: content ── */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">

          {/* Title */}
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tk.iconCircle}`}>
              {(() => { const Icon = iconMap[item.icon]; return <Icon sx={{ fontSize: 22 }} />; })()}
            </span>
            <div>
              <h3 className="text-xl font-extrabold uppercase leading-snug text-blue-900 sm:text-2xl">
                {item.title}
              </h3>
              <div className={`mt-1 h-[3px] w-10 rounded-full ${tk.divider}`} />
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-[14px] leading-relaxed text-slate-500">
            {item.subtitle} — Giải pháp năng lượng mặt trời tối ưu, phù hợp với đặc thù và quy mô của từng khách hàng.
          </p>

          {/* Specs row */}
          {specs.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {specs.map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className={`flex flex-col items-center rounded-xl p-3 text-center ${tk.specBg}`}>
                    <SIcon className={tk.specLabel} sx={{ fontSize: 22 }} />
                    <p className="mt-1 text-[15px] font-extrabold text-blue-900">{s.value}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500 leading-tight">{s.label}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Features */}
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckCircle className={`mt-0.5 shrink-0 ${tk.check}`} sx={{ fontSize: 17 }} />
                <span className="text-[13px] leading-snug text-slate-600">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <a
              href={item.href}
              className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold uppercase tracking-wide transition-colors duration-200 ${tk.btn}`}
            >
              Xem giải pháp chi tiết
              <ArrowForward
                className="transition-transform duration-200 group-hover:translate-x-1"
                sx={{ fontSize: 16 }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SolutionSection ─────────────────────────────────────────
export default function SolutionSection() {
  const [activeId, setActiveId] = useState<string>(solutions[0].id);
  const header   = useScrollReveal<HTMLDivElement>();
  const trustRef = useScrollReveal<HTMLDivElement>();

  const activeItem = solutions.find((s) => s.id === activeId) ?? solutions[0];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div
          ref={header.ref}
          className={`mb-10 text-center ${revealClasses.fadeUp(header.isVisible)}`}
        >
          <h2 className="text-3xl font-extrabold uppercase leading-tight text-blue-900 sm:text-4xl lg:text-[42px]">
            {solutionHeader.headlineLead}{" "}
            <span className="text-amber-400">{solutionHeader.headlineHighlight}</span>
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-amber-400" />
          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-500">
            {solutionHeader.description}
          </p>
        </div>

        {/* ── Tab buttons ── */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {solutions.map((item) => (
            <TabButton
              key={item.id}
              item={item}
              active={activeId === item.id}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </div>

        {/* ── Detail panel ── */}
        <DetailPanel key={activeId} item={activeItem} />

        {/* ── Trust bar ── */}
        <div
          ref={trustRef.ref}
          className={`mt-12 rounded-2xl bg-white px-6 py-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-1 ring-slate-100 ${revealClasses.fadeUp(trustRef.isVisible)}`}
        >
          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {trustItems.map((t) => {
              const Icon = iconMap[t.icon];
              const ts = trustStyles[t.accent];
              return (
                <div key={t.id} className="flex items-center gap-3 py-4 sm:px-5 sm:py-0 lg:first:pl-0 lg:last:pr-0">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${ts.border} ${ts.icon}`}>
                    <Icon sx={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wide text-blue-900">{t.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}