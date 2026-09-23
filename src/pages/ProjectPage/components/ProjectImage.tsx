import { useState } from "react";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import { GOLD, NAVY } from "../../../themes/brand";

/**
 * Ảnh dự án có sẵn ảnh thay thế: khi link ảnh hỏng hoặc chưa có ảnh thật,
 * hiển thị nền navy + icon thay vì khung vỡ, để trang không bao giờ trông lỗi.
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
        className={`flex items-center justify-center ${className}`}
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #1b2a63 100%)`,
        }}
        aria-label={alt}
        role="img"
      >
        <SolarPowerRoundedIcon sx={{ fontSize: 56, color: `${GOLD}66` }} />
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
