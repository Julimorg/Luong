import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { animate, utils } from "animejs";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import AgricultureRoundedIcon from "@mui/icons-material/Agriculture";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { combos, comboSectionHeader, type ComboItem, type ComboSegment } from "../../../data/comboData";
import { ComboPoster } from "./ComboPoster";
import { GOLD, NAVY } from "../../../themes/brand";


const AUTOPLAY_MS = 6000;

// Số slide hé ra mỗi bên slide giữa (1 -> tổng cộng 3 slide hiển thị).
const VISIBLE_SIDE_SLIDES = 1;

const segmentTabs: { id: ComboSegment | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Tất cả combo", icon: <GridViewRoundedIcon sx={{ fontSize: 17 }} /> },
  { id: "residential", label: "Hộ gia đình", icon: <HomeRoundedIcon sx={{ fontSize: 17 }} /> },
  { id: "business", label: "Doanh nghiệp", icon: <ApartmentRoundedIcon sx={{ fontSize: 17 }} /> },
  { id: "agriculture", label: "Nông nghiệp", icon: <AgricultureRoundedIcon sx={{ fontSize: 17 }} /> },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ─── Reveal wrapper cho phần tiêu đề ────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Bảng thông tin của combo đang xem ──────────────────────────
function ComboDetailPanel({ combo }: { combo: ComboItem }) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // Nội dung đổi theo slide -> cho các dòng bay lên so le bằng anime.js.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const items = el.querySelectorAll<HTMLElement>("[data-stagger]");
    animate(items, {
      opacity: [0, 1],
      y: [14, 0],
      duration: 520,
      delay: (_el, i) => (i ?? 0) * 60,
      ease: "outExpo",
    });
  }, [combo.id]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-8"
    >
      {/* Điểm nổi bật */}
      <div>
        <div data-stagger className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: combo.brandColor }}
          >
            {combo.brand}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-extrabold" style={{ color: NAVY }}>
            <BoltRoundedIcon sx={{ fontSize: 17, color: GOLD }} />
            {combo.capacity}
          </span>
          <span className="text-sm text-gray-400">
            Bảo hành đồng bộ{" "}
            <span className="font-bold" style={{ color: NAVY }}>{combo.warrantyYears} năm</span>
          </span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {combo.highlights.map((h) => (
            <li key={h} data-stagger className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${GOLD}1F`, color: GOLD }}
              >
                <CheckRoundedIcon sx={{ fontSize: 13 }} />
              </span>
              <span className="text-sm leading-snug text-gray-600">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Thiết bị trong combo — bấm vào để mở trang sản phẩm */}
      <div>
        <p data-stagger className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
          Thiết bị trong combo
        </p>
        <div className="flex flex-col gap-2">
          {combo.devices.map((d) => {
            const row = (
              <>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wide text-gray-400">{d.role}</span>
                  <span className="block truncate text-sm font-bold" style={{ color: NAVY }}>{d.label}</span>
                </span>
                <span className="flex flex-shrink-0 items-center gap-2">
                  {d.quantity && <span className="text-xs text-gray-400">{d.quantity}</span>}
                  {d.productId && (
                    <ArrowForwardIcon
                      sx={{ fontSize: 15, color: GOLD }}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  )}
                </span>
              </>
            );
            const className =
              "group flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3 no-underline transition-colors duration-200 hover:border-gray-200 hover:bg-gray-50";
            return d.productId ? (
              <Link key={d.role + d.label} data-stagger to={`/san-pham/${d.productId}`} className={className}>
                {row}
              </Link>
            ) : (
              <div key={d.role + d.label} data-stagger className={className}>
                {row}
              </div>
            );
          })}
        </div>

        <button
          data-stagger
          onClick={() => navigate("/lien-he")}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: NAVY }}
        >
          Nhận tư vấn combo này
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </button>
      </div>
    </div>
  );
}

export function ComboSection() {
  const [segment, setSegment] = useState<ComboSegment | "all">("all");
  const list = useMemo(
    () => (segment === "all" ? combos : combos.filter((c) => c.segment === segment)),
    [segment],
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState({ slideW: 640, spacing: 470, compact: false });

  const count = list.length;

  // ── Kích thước slide theo bề rộng khung, tính lại khi resize ──
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const isNarrow = w < 720;
      const slideW = isNarrow ? Math.min(w * 0.88, 560) : Math.min(w * 0.6, 780);
      setMetrics({ slideW, spacing: slideW * (isNarrow ? 0.94 : 0.76), compact: slideW < 520 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Vị trí từng slide theo khoảng cách tới slide đang xem ──
  const layoutOf = useCallback(
    (i: number, active: number, dragPx = 0) => {
      let offset = i - active;
      if (count > 2) {
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;
      }
      const abs = Math.abs(offset);
      // Chỉ hiện 3 slide: slide giữa + 1 slide hé ra mỗi bên.
      const visible = abs <= VISIBLE_SIDE_SLIDES;
      return {
        x: offset * metrics.spacing + dragPx,
        scale: abs === 0 ? 1 : Math.max(0.78, 1 - abs * 0.12),
        opacity: visible ? (abs === 0 ? 1 : 0.45) : 0,
        zIndex: 20 - Math.round(abs * 2),
        visible,
      };
    },
    [count, metrics.spacing],
  );

  // ── Áp layout: anime.js khi chuyển slide, set thẳng khi đang kéo ──
  const applyLayout = useCallback(
    (active: number, dragPx: number, animated: boolean) => {
      slideRefs.current.slice(0, count).forEach((el, i) => {
        if (!el) return;
        const l = layoutOf(i, active, dragPx);
        el.style.zIndex = String(l.zIndex);
        el.style.pointerEvents = l.visible && l.x === dragPx ? "auto" : "none";
        if (animated && !prefersReducedMotion()) {
          animate(el, {
            x: l.x,
            scale: l.scale,
            opacity: l.opacity,
            duration: 720,
            ease: "outExpo",
          });
        } else {
          utils.set(el, { x: l.x, scale: l.scale, opacity: l.opacity });
        }
      });
    },
    [count, layoutOf],
  );

  useLayoutEffect(() => {
    applyLayout(index, 0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics.spacing, count]);

  useEffect(() => {
    applyLayout(index, 0, true);
  }, [index, applyLayout]);

  const go = useCallback(
    (dir: number) => setIndex((prev) => (prev + dir + count) % count),
    [count],
  );

  // ── Tự động chạy + thanh tiến trình ──
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    if (paused || count < 2 || prefersReducedMotion()) {
      utils.set(bar, { scaleX: 0 });
      return;
    }
    const anim = animate(bar, {
      scaleX: [0, 1],
      duration: AUTOPLAY_MS,
      ease: "linear",
      onComplete: () => go(1),
    });
    return () => {
      anim.cancel();
    };
  }, [index, paused, count, go]);

  // ── Kéo/vuốt để chuyển slide ──
  const drag = useRef({ active: false, startX: 0, dx: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (count < 2) return;
    drag.current = { active: true, startX: e.clientX, dx: 0 };
    setPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.dx = e.clientX - drag.current.startX;
    applyLayout(index, drag.current.dx, false);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    const { dx } = drag.current;
    drag.current.active = false;
    const threshold = Math.min(90, metrics.slideW * 0.16);
    if (Math.abs(dx) > threshold) go(dx < 0 ? 1 : -1);
    else applyLayout(index, 0, true);
    setPaused(false);
  };

  const active = list[Math.min(index, count - 1)];
  if (!active) return null;

  return (
    <section className="relative overflow-hidden bg-[#f7f8fb] py-12 sm:py-16">
      {/* Vệt sáng trang trí */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${GOLD}1A` }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Tiêu đề + bộ lọc phân khúc ── */}
        <Reveal className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                {comboSectionHeader.eyebrow}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: NAVY }}>
              {comboSectionHeader.headline}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-gray-500">{comboSectionHeader.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {segmentTabs.map((t) => {
              const isActive = segment === t.id;
              const disabled =
                t.id !== "all" && !combos.some((c) => c.segment === t.id);
              return (
                <button
                  key={t.id}
                  disabled={disabled}
                  onClick={() => {
                    // Đổi bộ lọc -> quay lại slide đầu tiên của nhóm mới.
                    setSegment(t.id);
                    setIndex(0);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200 disabled:opacity-40"
                  style={{
                    color: isActive ? "#fff" : NAVY,
                    backgroundColor: isActive ? NAVY : "transparent",
                    borderColor: isActive ? NAVY : `${NAVY}22`,
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Sân khấu carousel ── */}
        <div
          ref={stageRef}
          className="relative mb-6 select-none"
          style={{
            height: metrics.slideW * (metrics.compact ? 0.75 : 0.625) + 24,
            touchAction: "pan-y",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            endDrag();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-roledescription="carousel"
          aria-label="Combo trọn gói"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {list.map((combo, i) => (
              <div
                key={combo.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
                style={{
                  width: metrics.slideW,
                  aspectRatio: metrics.compact ? "4 / 3" : "16 / 10",
                  willChange: "transform, opacity",
                  cursor: i === index ? "grab" : "pointer",
                }}
                onClick={() => i !== index && setIndex(i)}
                aria-hidden={i !== index}
              >
                {combo.poster ? (
                  <img
                    src={combo.poster}
                    alt={combo.title}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ComboPoster combo={combo} compact={metrics.compact} />
                )}

                {combo.badge && i === index && (
                  <span
                    className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px]"
                    style={{ backgroundColor: GOLD, color: "#20262e" }}
                  >
                    {combo.badge}
                  </span>
                )}

                {/* Lớp mờ nhẹ cho slide hai bên để slide giữa nổi lên */}
                {i !== index && <div className="absolute inset-0 bg-[#0b1130]/25" />}
              </div>
            ))}
          </div>

          {/* Nút điều hướng — trên màn hẹp chuyển xuống dưới để không che nội dung poster */}
          {count > 1 && !metrics.compact && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Combo trước"
                className="absolute left-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:text-[#121b45] sm:left-3 sm:h-12 sm:w-12"
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 28 }} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Combo kế tiếp"
                className="absolute right-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:text-[#121b45] sm:right-3 sm:h-12 sm:w-12"
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 28 }} />
              </button>
            </>
          )}
        </div>

        {/* ── Chấm chỉ mục + thanh tiến trình tự chạy ── */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {count > 1 && metrics.compact && (
              <button
                onClick={() => go(-1)}
                aria-label="Combo trước"
                className="mr-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow"
              >
                <ChevronLeftRoundedIcon sx={{ fontSize: 22 }} />
              </button>
            )}
            {list.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setIndex(i)}
                aria-label={`Xem ${c.title}`}
                aria-current={i === index}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8,
                  backgroundColor: i === index ? GOLD : `${NAVY}33`,
                }}
              />
            ))}
            {count > 1 && metrics.compact && (
              <button
                onClick={() => go(1)}
                aria-label="Combo kế tiếp"
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow"
              >
                <ChevronRightRoundedIcon sx={{ fontSize: 22 }} />
              </button>
            )}
          </div>
          <div className="h-[3px] w-40 overflow-hidden rounded-full bg-gray-200">
            <span
              ref={progressRef}
              className="block h-full origin-left rounded-full"
              style={{ backgroundColor: GOLD, transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* ── Thông tin chi tiết combo đang xem ── */}
        <ComboDetailPanel combo={active} />
      </div>
    </section>
  );
}
