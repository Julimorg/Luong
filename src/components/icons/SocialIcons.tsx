// ============================================================
// SocialIcons.tsx — Icon Zalo / Messenger dựng bằng SVG
// ------------------------------------------------------------
// MUI không có sẵn hai logo này nên vẽ tay, dùng chung cho
// Footer và trang Liên hệ để cả site chỉ có một bản icon.
// ============================================================

interface IconProps {
  /** Cạnh của icon tính theo px. */
  size?: number;
}

/** Logo Zalo: khối bo tròn xanh, chữ "Zalo" trắng ở giữa. */
export function ZaloIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Zalo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="12" fill="#0068FF" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Roboto, Arial, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        Zalo
      </text>
    </svg>
  );
}

/** Logo Messenger: bong bóng chat với tia sét, nền chuyển màu xanh–tím–hồng. */
export function MessengerIcon({ size = 22 }: IconProps) {
  // id gradient phải là duy nhất trong trang, nếu không icon thứ hai sẽ mất màu.
  const gradientId = "vh-messenger-gradient";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Messenger"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="24" y1="2" x2="24" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B2FF" />
          <stop offset="60%" stopColor="#006AFF" />
          <stop offset="100%" stopColor="#FF5C87" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M24 2C11.8 2 2 11.1 2 23.2c0 6.9 3.2 13 8.2 17v7.3l7.5-4.1c2 .6 4.1.9 6.3.9 12.2 0 22-9.1 22-21.1S36.2 2 24 2Z"
      />
      <path
        fill="#fff"
        d="m10.9 29.6 6.5-10.3 6.6 4.9 6.1-4.9-6.5 10.3-6.4-4.9-6.3 4.9Z"
      />
    </svg>
  );
}
