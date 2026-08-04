import { GOLD } from "../../themes/colors";


// ─── Section eyebrow ─────────────────────────────────────────
export function SectionEyebrow({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${center ? "justify-center" : ""}`}>
      <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
      <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
        {text}
      </span>
      {center && <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />}
    </div>
  );
}
