import { useEffect, useRef, useState } from "react";

export interface BrandStripItem {
  name: string;
  color: string;
  logo?: string;
}

// Tốc độ tự cuộn — px mỗi khung hình.
const SCROLL_SPEED = 0.4;
// Nền của thẻ bao, dùng cho dải mờ hai mép.
const CARD_BG = "#ffffff";

/**
 * Dải logo thương hiệu nằm ngang, tự chạy vòng lặp.
 * Dừng khi rê chuột hoặc khi người dùng tự kéo/chạm.
 */
export function BrandStrip({ items }: { items: BrandStripItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  // Giữ vị trí dạng số thực, tách khỏi scrollLeft (bị trình duyệt làm tròn)
  // để phần lẻ của mỗi bước luôn tích luỹ đúng.
  const posRef = useRef(0);

  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const touchingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const step = () => {
      const paused = hoveringRef.current || draggingRef.current || touchingRef.current;
      // Danh sách được nhân đôi nên chạy hết một nửa là quay về đầu, liền mạch.
      const half = el.scrollWidth / 2;
      if (!paused) {
        posRef.current += SCROLL_SPEED;
        if (half > 0 && posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      } else {
        // Đồng bộ lại vị trí thật để lúc chạy tiếp không bị giật về chỗ cũ.
        posRef.current = el.scrollLeft;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startDrag = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    draggingRef.current = true;
    setIsDragging(true);
    const startX = clientX;
    const startLeft = el.scrollLeft;

    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startLeft - (ev.clientX - startX);
    };
    const onUp = () => {
      draggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // Danh sách nhân đôi để vòng lặp không thấy điểm nối.
  const looped = [...items, ...items];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onMouseEnter={() => { hoveringRef.current = true; }}
        onMouseLeave={() => { hoveringRef.current = false; }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={() => { touchingRef.current = true; }}
        onTouchEnd={() => { touchingRef.current = false; }}
        className={`brand-strip-track w-full select-none overflow-x-auto ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ backgroundColor: CARD_BG }}
      >
        <div className="flex w-max items-center">
          {looped.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex h-20 w-44 flex-shrink-0 items-center justify-center px-4 sm:h-24 sm:w-60 sm:px-6"
              title={b.name}
            >
              {b.logo ? (
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  draggable={false}
                  // Nền thẻ màu trắng nên nhân với nền trắng của file logo
                  // sẽ triệt tiêu khung trắng thừa quanh logo.
                  className="max-h-10 w-auto max-w-full object-contain mix-blend-multiply sm:max-h-14"
                />
              ) : (
                // Hãng chưa có file logo -> hiển thị bằng chữ theo màu nhận diện.
                <span
                  className="whitespace-nowrap text-lg font-black uppercase tracking-wide sm:text-xl"
                  style={{ color: b.color }}
                >
                  {b.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mờ dần hai mép để dải logo trông như chạy vô tận */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20"
        style={{ background: `linear-gradient(to right, ${CARD_BG}, rgba(255,255,255,0))` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20"
        style={{ background: `linear-gradient(to left, ${CARD_BG}, rgba(255,255,255,0))` }}
      />

      {/* Ẩn thanh cuộn nhưng vẫn cho lăn/kéo/chạm bình thường */}
      <style>{`
        .brand-strip-track::-webkit-scrollbar { display: none; }
        .brand-strip-track { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
