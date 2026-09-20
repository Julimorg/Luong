import { animate, utils } from "animejs";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";

export const GOLD = "#f5a623";
export const NAVY = "#0d2137";

/** Khối nội dung hiện lên khi cuộn tới (dùng CSS transition, nhẹ và mượt). */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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

/** Tiêu đề chuẩn của các khối trong trang Giới thiệu. */
export function SectionHeading({
  eyebrow,
  headline,
  description,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  headline: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
        {eyebrow}
      </span>
      <h2
        className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
        style={{ color: onDark ? "#fff" : NAVY }}
      >
        {headline}
      </h2>
      {description && (
        <p className={`mt-3 text-sm sm:text-base ${onDark ? "text-white/55" : "text-gray-500"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

/**
 * Con số chạy từ 0 tới giá trị thật bằng anime.js khi cuộn tới.
 * Có fallback: nếu người dùng tắt hiệu ứng, số hiển thị ngay giá trị cuối.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useAnimeOnView<HTMLSpanElement>((el) => {
    const target = { n: 0 };
    const anim = animate(target, {
      n: value,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(target.n)}${suffix}`;
      },
    });
    return () => {
      anim.cancel();
      utils.set(el, {});
    };
  });

  return (
    <span ref={ref} className={className} style={style}>
      {`${prefix}${value}${suffix}`}
    </span>
  );
}
