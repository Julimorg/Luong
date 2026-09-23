import { animate, utils } from "animejs";
import { useAnimeOnView } from "../../hooks/useAnimeOnView";

/**
 * Con số chạy từ 0 tới giá trị thật bằng anime.js khi cuộn tới.
 * Nếu người dùng bật "giảm chuyển động", số hiển thị ngay giá trị cuối.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className = "",
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const format = (n: number) =>
    `${prefix}${n.toLocaleString("vi-VN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  const ref = useAnimeOnView<HTMLSpanElement>((el) => {
    const target = { n: 0 };
    const anim = animate(target, {
      n: value,
      duration,
      ease: "outExpo",
      onUpdate: () => {
        el.textContent = format(target.n);
      },
    });
    return () => {
      anim.cancel();
      utils.set(el, {});
    };
  });

  return (
    <span ref={ref} className={className} style={style}>
      {format(value)}
    </span>
  );
}
