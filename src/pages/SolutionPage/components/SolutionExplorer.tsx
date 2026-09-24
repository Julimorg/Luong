import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, stagger, utils } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import { solutions, type SubType } from "../../../data/solutionData";
import { GOLD, NAVY, getSubTypeColor, iconMap } from "./solutionTheme";
import { Reveal, SectionHeading } from "./solutionShared";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Thẻ một cấu hình hệ: sơ đồ nguyên lý + đặc điểm + đối tượng phù hợp. */
function SubTypeCard({
  sub,
  index,
  onOpen,
}: {
  sub: SubType;
  index: number;
  onOpen: (sub: SubType) => void;
}) {
  const Icon = iconMap[sub.icon];
  const color = getSubTypeColor(sub.icon);

  return (
    <button
      onClick={() => onOpen(sub)}
      data-card
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-gray-300/50"
    >
      {/* Sơ đồ nguyên lý — phần khách nhìn đầu tiên nên cho lên trên cùng */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white p-4">
        <span
          className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-extrabold text-white"
          style={{ backgroundColor: color }}
        >
          {index + 1}
        </span>
        <img
          src={sub.image}
          alt={`Sơ đồ nguyên lý ${sub.name}`}
          loading="lazy"
          className="h-40 w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Thanh màu mảnh chạy hết chiều ngang khi hover */}
      <span
        aria-hidden
        className="block h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />

      <div className="flex flex-1 flex-col gap-3.5 px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon sx={{ fontSize: 19 }} style={{ color }} />
          <p
            className="text-sm font-extrabold uppercase leading-tight"
            style={{ color: NAVY }}
          >
            {sub.name}
          </p>
        </div>
        <p className="-mt-2 text-xs leading-snug text-gray-400">{sub.subtitle}</p>

        <ul className="flex flex-col gap-2">
          {sub.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span
                className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1F`, color }}
              >
                <CheckIcon sx={{ fontSize: 10 }} />
              </span>
              <span className="text-xs leading-snug text-gray-600">{f}</span>
            </li>
          ))}
        </ul>

        {sub.solution?.bestFor && (
          <div className="mt-auto rounded-xl bg-gray-50 px-3.5 py-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Phù hợp nhất
            </p>
            <p className="line-clamp-3 text-xs leading-snug text-gray-600">
              {sub.solution.bestFor}
            </p>
          </div>
        )}

        <span
          className="inline-flex items-center gap-1 pt-0.5 text-xs font-bold transition-all duration-200 group-hover:gap-2"
          style={{ color }}
        >
          Xem chi tiết cấu hình
          <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </span>
      </div>
    </button>
  );
}

export function SolutionExplorer({ onOpen }: { onOpen: (sub: SubType) => void }) {
  const [active, setActive] = useState(0);
  const model = solutions[active];

  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Thanh nền trượt theo tab đang chọn, đo lại khi đổi tab hoặc khi resize.
  const moveIndicator = (animated: boolean) => {
    const bar = indicatorRef.current;
    const tabs = tabsRef.current;
    if (!bar || !tabs) return;
    const el = tabs.querySelectorAll<HTMLElement>("[data-tab]")[active];
    if (!el) return;
    const to = { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
    if (animated && !prefersReducedMotion()) {
      animate(bar, { ...to, duration: 520, ease: "outExpo" });
    } else {
      utils.set(bar, to);
    }
  };

  useLayoutEffect(() => {
    moveIndicator(false);
    const tabs = tabsRef.current;
    if (!tabs) return;
    const ro = new ResizeObserver(() => moveIndicator(false));
    ro.observe(tabs);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moveIndicator(true);
    // Thẻ của mô hình mới bay lên so le cho thấy rõ nội dung vừa đổi.
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");
    const anim = animate(cards, {
      opacity: [0, 1],
      y: [22, 0],
      duration: 620,
      delay: stagger(80),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section className="bg-[#f5f6f9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Giải pháp theo đối tượng"
          headline="Bạn đang tìm giải pháp cho mô hình nào?"
          description="Chọn nhóm phù hợp để xem các cấu hình hệ thống, sơ đồ nguyên lý và thông số tham khảo tương ứng."
          className="mb-8"
        />

        {/* ── Chọn nhóm đối tượng ── */}
        <Reveal className="mb-8">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Nhóm đối tượng"
            className="relative flex flex-wrap gap-1.5 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm"
          >
            <span
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 rounded-xl"
              style={{ backgroundColor: NAVY }}
            />
            {solutions.map((s, i) => {
              const Icon = iconMap[s.icon];
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  data-tab
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`relative z-10 flex min-w-[46%] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-300 sm:min-w-[140px] ${
                    isActive ? "text-white" : "text-gray-500 hover:text-[#121b45]"
                  }`}
                >
                  <Icon sx={{ fontSize: 18 }} />
                  {s.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Thông số chung của nhóm ── */}
        <Reveal className="mb-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:gap-8 sm:px-7">
            <div className="min-w-0 sm:max-w-xs">
              <p className="text-base font-extrabold" style={{ color: NAVY }}>
                {model.title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-gray-400">{model.subtitle}</p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 border-gray-100 sm:grid-cols-3 sm:border-l sm:pl-8">
              {model.specs.map((s) => {
                const SIcon = iconMap[s.iconKey] ?? BoltOutlined;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${GOLD}1F`, color: GOLD }}
                    >
                      <SIcon sx={{ fontSize: 18 }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] leading-tight text-gray-400">{s.label}</p>
                      <p
                        className="text-base font-extrabold leading-tight"
                        style={{ color: NAVY }}
                      >
                        {s.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Các cấu hình của nhóm đang chọn ── */}
        <div
          ref={gridRef}
          key={model.id}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {model.subTypes.map((sub, i) => (
            <SubTypeCard key={sub.id} sub={sub} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
