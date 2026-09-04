import { useEffect, useRef, useState } from "react";
import { aboutBrandLogos } from "../../../data/aboutUsData";

// Tốc độ tự cuộn — px mỗi khung hình, tăng/giảm để chỉnh nhanh/chậm
const SCROLL_SPEED = 0.5;
// Độ trễ trước khi tự cuộn chạy lại sau khi thả tay chạm (mobile),
// để tránh xung đột với cuộn quán tính (momentum) mà trình duyệt vẫn còn đang chạy.
const TOUCH_RESUME_DELAY = 400;

export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const touchResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Vị trí cuộn lưu dưới dạng số thực (float), tách biệt hoàn toàn khỏi el.scrollTop
  // (vốn có thể bị trình duyệt làm tròn về số nguyên) -> đảm bảo phần lẻ luôn tích luỹ đúng.
  const scrollPosRef = useRef(0);

  // 3 nguồn có thể tạm dừng auto-scroll: đang hover / đang kéo chuột / đang chạm (mobile)
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const isPaused = () =>
    isHoveringRef.current || isDraggingRef.current || isTouchingRef.current;

  // ── Vòng lặp tự cuộn xuống dưới ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const step = () => {
      const half = el.scrollHeight / 2;

      if (!isPaused()) {
        scrollPosRef.current += SCROLL_SPEED;
        if (half > 0 && scrollPosRef.current >= half) {
          scrollPosRef.current -= half;
        }
        el.scrollTop = scrollPosRef.current;
      } else {
        // Đang tạm dừng -> đồng bộ lại vị trí thực (người dùng có thể vừa
        // lăn/kéo/chạm để tự cuộn) để lúc chạy tiếp không bị "giật" về vị trí cũ.
        scrollPosRef.current = el.scrollTop;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (touchResumeTimeoutRef.current) clearTimeout(touchResumeTimeoutRef.current);
    };
  }, []);

  // ── Kéo bằng chuột (desktop): giữ chuột + kéo lên/xuống để cuộn thủ công ──
  const startDrag = (clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    const startY = clientY;
    const startScrollTop = el.scrollTop;

    const onMove = (ev: MouseEvent) => {
      el.scrollTop = startScrollTop - (ev.clientY - startY);
    };
    const onUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // ── Chạm để cuộn (mobile) — trình duyệt tự xử lý kéo, chỉ cần tạm dừng auto-scroll ──
  const handleTouchStart = () => {
    if (touchResumeTimeoutRef.current) clearTimeout(touchResumeTimeoutRef.current);
    isTouchingRef.current = true;
  };
  const handleTouchEnd = () => {
    if (touchResumeTimeoutRef.current) clearTimeout(touchResumeTimeoutRef.current);
    touchResumeTimeoutRef.current = setTimeout(() => {
      isTouchingRef.current = false;
    }, TOUCH_RESUME_DELAY);
  };

  const loopedBrands = [...aboutBrandLogos, ...aboutBrandLogos];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHoveringRef.current = true; }}
      onMouseLeave={() => { isHoveringRef.current = false; }}
      onMouseDown={(e) => startDrag(e.clientY)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`brand-marquee-scroll h-80 sm:h-96 w-full overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/60 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="flex flex-col">
        {loopedBrands.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex items-center justify-center border-b border-gray-100 py-6 last:border-b-0"
          >
            <span
              className="text-xl sm:text-2xl font-black uppercase tracking-wide"
              style={{ color: brand.color }}
            >
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      {/* Ẩn thanh cuộn nhưng vẫn cho phép cuộn bằng lăn chuột/kéo/chạm bình thường */}
      <style>{`
        .brand-marquee-scroll::-webkit-scrollbar { display: none; }
        .brand-marquee-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}