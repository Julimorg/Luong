import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { GOLD, NAVY } from "../../../themes/brand";
import { CountUp } from "../../../components/common/CountUp";

export { GOLD, NAVY, CountUp };


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
