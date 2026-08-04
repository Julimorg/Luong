import { useScrollReveal } from "../../../../hooks/useScrollReveal";


// ─── Reveal wrappers ─────────────────────────────────────────
export function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function RevealItem({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
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
