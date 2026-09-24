import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { GOLD, NAVY } from "../../../themes/brand";

/** Khối trượt lên khi cuộn tới. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Tiêu đề section dùng chung: gạch vàng + eyebrow + headline + mô tả. */
export function SectionHeading({
  eyebrow,
  headline,
  description,
  className = "",
  light = false,
}: {
  eyebrow: string;
  headline: string;
  description?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={className}>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
        <span
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: GOLD }}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
        style={{ color: light ? "#fff" : NAVY }}
      >
        {headline}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${
            light ? "text-white/60" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
