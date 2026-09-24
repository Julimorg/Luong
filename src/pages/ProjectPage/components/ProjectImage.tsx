import { useState } from "react";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import { GOLD, NAVY, NAVY_DEEP } from "../../../themes/brand";

/**
 * Ảnh dự án có sẵn ảnh thay thế: khi link ảnh hỏng hoặc chưa có ảnh thật,
 * vẽ một nền giàn pin bằng CSS thay vì khung vỡ hay ô màu phẳng — nhờ vậy
 * trang vẫn ra dáng công trình ngay cả khi chưa kịp bổ sung ảnh chụp.
 */
export function ProjectImage({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}
        aria-label={alt}
        role="img"
      >
        {/* Giàn pin nhìn chéo: các ô sáng tối xen kẽ, mờ dần về phía trên */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px)`,
            backgroundSize: "34px 22px",
            transform: "perspective(420px) rotateX(52deg) scale(1.9)",
            transformOrigin: "50% 100%",
            maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
          }}
        />
        {/* Vệt nắng vàng quét chéo */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 78% 18%, ${GOLD}2E 0%, transparent 62%)`,
          }}
        />
        <SolarPowerRoundedIcon
          sx={{ fontSize: 52 }}
          style={{ color: `${GOLD}59` }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
