import type { ReactNode } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";

const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

interface StatusPageProps {
  icon: ReactNode;
  eyebrow: string;
  headline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  facebookUrl: string;
}

export function StatusPage({
  icon,
  eyebrow,
  headline,
  description,
  phone,
  phoneDisplay,
  facebookUrl,
}: StatusPageProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #0d2137 100%)` }}
    >
      <div className="max-w-xl w-full text-center">
        {/* Icon trang trí */}
        <div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
        >
          {icon}
        </div>

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: GOLD }}
          >
            {eyebrow}
          </span>
          <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
        </div>

        {/* Big headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
          {headline}
        </h1>

        {/* Text nhỏ nhắn nhủ khách hàng */}
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
          {description}
        </p>

        {/* 2 button liên hệ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 no-underline"
            style={{ backgroundColor: GOLD, boxShadow: `0 4px 20px ${GOLD}55` }}
          >
            <PhoneIcon sx={{ fontSize: 18 }} />
            Gọi {phoneDisplay}
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-white border border-white/25 hover:bg-white/10 transition-all duration-200 no-underline"
          >
            <FacebookIcon sx={{ fontSize: 18 }} />
            Nhắn tin Facebook
          </a>
        </div>
      </div>
    </div>
  );
}