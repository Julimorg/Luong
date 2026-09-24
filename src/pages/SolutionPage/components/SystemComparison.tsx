import { animate, stagger } from "animejs";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import ChangeHistoryRoundedIcon from "@mui/icons-material/ChangeHistoryRounded";
import {
  compareColumns,
  compareRows,
  systemComparisonHeader,
  type CompareValue,
} from "../../../data/solutionData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY, getSubTypeColor, iconMap } from "./solutionTheme";
import { SectionHeading } from "./solutionShared";

const SYMBOLS: Record<CompareValue, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  yes: {
    icon: <CheckRoundedIcon sx={{ fontSize: 16 }} />,
    label: "Có",
    color: "#0f7b45",
    bg: "#0f7b451A",
  },
  no: {
    icon: <CloseRoundedIcon sx={{ fontSize: 16 }} />,
    label: "Không",
    color: "#b42318",
    bg: "#b423181A",
  },
  partial: {
    icon: <ChangeHistoryRoundedIcon sx={{ fontSize: 14 }} />,
    label: "Tuỳ cấu hình",
    color: "#b26a00",
    bg: "#b26a001A",
  },
  na: {
    icon: <RemoveRoundedIcon sx={{ fontSize: 16 }} />,
    label: "Không áp dụng",
    color: "#98a2b3",
    bg: "#98a2b31A",
  },
};

function isSymbol(v: string): v is CompareValue {
  return v === "yes" || v === "no" || v === "partial" || v === "na";
}

function Cell({ value }: { value: string }) {
  if (isSymbol(value)) {
    const s = SYMBOLS[value];
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{ backgroundColor: s.bg, color: s.color }}
        title={s.label}
      >
        {s.icon}
        <span className="sr-only">{s.label}</span>
      </span>
    );
  }
  return (
    <span className="text-xs leading-snug text-gray-600 sm:text-sm">{value}</span>
  );
}

export function SystemComparison() {
  const ref = useAnimeOnView<HTMLDivElement>((el) => {
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    const anim = animate(rows, {
      opacity: [0, 1],
      y: [16, 0],
      duration: 560,
      delay: stagger(70),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  });

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={systemComparisonHeader.eyebrow}
          headline={systemComparisonHeader.headline}
          description={systemComparisonHeader.description}
          className="mb-10"
        />

        {/* ── Màn hẹp: mỗi loại hệ là một thẻ, đọc dọc thay vì vuốt ngang bảng ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {compareColumns.map((c, col) => {
            const Icon = iconMap[c.icon];
            const color = getSubTypeColor(c.icon);
            return (
              <div
                key={c.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5">
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-extrabold uppercase leading-tight"
                      style={{ color: NAVY }}
                    >
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-gray-400">
                      {c.tagline}
                    </p>
                  </div>
                </div>
                <div>
                  {compareRows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                        i % 2 === 1 ? "bg-gray-50/70" : "bg-white"
                      }`}
                    >
                      <span className="text-xs font-semibold" style={{ color: NAVY }}>
                        {row.label}
                      </span>
                      <span className="text-right">
                        <Cell value={row.values[col]} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Từ lg trở lên: bảng đối chiếu bốn cột ── */}
        <div ref={ref} className="hidden lg:block">
          <div>
            {/* ── Hàng tiêu đề: 4 loại hệ ── */}
            <div
              data-row
              className="grid grid-cols-[190px_repeat(4,1fr)] gap-3 pb-3"
            >
              <div />
              {compareColumns.map((c) => {
                const Icon = iconMap[c.icon];
                const color = getSubTypeColor(c.icon);
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-gray-100 bg-white px-4 py-4 text-center shadow-sm"
                  >
                    <span
                      className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${color}1A`, color }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                    </span>
                    <p
                      className="text-sm font-extrabold uppercase leading-tight"
                      style={{ color: NAVY }}
                    >
                      {c.name}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-gray-400">
                      {c.tagline}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ── Các tiêu chí ── */}
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {compareRows.map((row, i) => (
                <div
                  key={row.label}
                  data-row
                  className={`grid grid-cols-[190px_repeat(4,1fr)] items-center gap-3 px-4 py-3.5 ${
                    i % 2 === 1 ? "bg-gray-50/70" : "bg-white"
                  } ${i !== compareRows.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span
                    className="text-xs font-bold leading-snug sm:text-sm"
                    style={{ color: NAVY }}
                  >
                    {row.label}
                  </span>
                  {row.values.map((v, k) => (
                    <div key={compareColumns[k].id} className="text-center">
                      <Cell value={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chú thích ký hiệu */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {(["yes", "no", "partial", "na"] as CompareValue[]).map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: SYMBOLS[k].bg, color: SYMBOLS[k].color }}
              >
                {SYMBOLS[k].icon}
              </span>
              {SYMBOLS[k].label}
            </span>
          ))}
          <span className="text-[11px] italic text-gray-400">
            Bảng tóm tắt theo đặc điểm của 12 cấu hình phía trên — cấu hình cuối cùng
            phụ thuộc kết quả khảo sát thực tế.
          </span>
        </div>

        {/* Gạch vàng khép section */}
        <div
          aria-hidden
          className="mx-auto mt-10 h-0.5 w-16 rounded-full"
          style={{ backgroundColor: GOLD }}
        />
      </div>
    </section>
  );
}
