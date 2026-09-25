import { useEffect, useRef, useState } from "react";
import { aboutBrandLogos } from "../../../data/aboutUsData";

// Tốc độ tự cuộn — px mỗi khung hình, tăng/giảm để chỉnh nhanh/chậm
const SCROLL_SPEED = 0.5;
// Độ trễ trước khi tự cuộn chạy lại sau khi thả tay chạm (mobile),
// để tránh xung đột với cuộn quán tính (momentum) mà trình duyệt vẫn còn đang chạy.
const TOUCH_RESUME_DELAY = 400;
// Màu nền của khối đối tác — dùng cho cả dải mờ hai mép và nền khối cuộn.
const BAND_BG = "#faf7f1";

/** Dải logo đối tác tự chạy ngang, dừng khi rê chuột hoặc khi người dùng tự kéo. */
export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const touchResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Vị trí cuộn lưu dưới dạng số thực (float), tách biệt hoàn toàn khỏi el.scrollLeft
  // (vốn có thể bị trình duyệt làm tròn về số nguyên) -> đảm bảo phần lẻ luôn tích luỹ đúng.
  const scrollPosRef = useRef(0);

  // 3 nguồn có thể tạm dừng auto-scroll: đang hover / đang kéo chuột / đang chạm (mobile)
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const isPaused = () =>
    isHoveringRef.current || isDraggingRef.current || isTouchingRef.current;

  // ── Vòng lặp tự cuộn sang phải ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const step = () => {
      // Danh sách được nhân đôi nên cuộn hết một nửa là quay về đầu, tạo vòng lặp liền mạch.
      const half = el.scrollWidth / 2;

      if (!isPaused()) {
        scrollPosRef.current += SCROLL_SPEED;
        if (half > 0 && scrollPosRef.current >= half) {
          scrollPosRef.current -= half;
        }
        el.scrollLeft = scrollPosRef.current;
      } else {
        // Đang tạm dừng -> đồng bộ lại vị trí thực (người dùng có thể vừa
        // lăn/kéo/chạm để tự cuộn) để lúc chạy tiếp không bị "giật" về vị trí cũ.
        scrollPosRef.current = el.scrollLeft;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (touchResumeTimeoutRef.current) clearTimeout(touchResumeTimeoutRef.current);
    };
  }, []);

  // ── Kéo bằng chuột (desktop): giữ chuột + kéo ngang để cuộn thủ công ──
  const startDrag = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    const startX = clientX;
    const startScrollLeft = el.scrollLeft;

    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startScrollLeft - (ev.clientX - startX);
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
    <div className="relative">
      <div
        ref={containerRef}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // Nền đặt ngay trên khối cuộn để mix-blend-multiply của logo có màu
        // để trộn (hiệu ứng reveal bọc ngoài tạo stacking context riêng).
        style={{ backgroundColor: BAND_BG }}
        className={`brand-marquee-scroll w-full overflow-x-auto select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex w-max items-center">
          {loopedBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex h-24 w-40 flex-shrink-0 items-center justify-center px-6 sm:w-48"
              title={brand.name}
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  draggable={false}
                  // mix-blend-multiply: các file logo có nền trắng, trộn nhân
                  // giúp nền hoà vào màu kem của khối thay vì lộ ô trắng.
                  className="max-h-12 w-auto max-w-full object-contain opacity-90 mix-blend-multiply transition-opacity duration-300 hover:opacity-100"
                />
              ) : (
                // Hãng chưa có file logo -> hiển thị bằng chữ theo màu nhận diện.
                <span
                  className="whitespace-nowrap text-lg font-black uppercase tracking-wide sm:text-xl"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mờ dần hai mép để dải logo trông như chạy vô tận */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24"
        style={{ background: `linear-gradient(to right, ${BAND_BG}, rgba(250,247,241,0))` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24"
        style={{ background: `linear-gradient(to left, ${BAND_BG}, rgba(250,247,241,0))` }}
      />

      {/* Ẩn thanh cuộn nhưng vẫn cho phép cuộn bằng lăn chuột/kéo/chạm bình thường */}
      <style>{`
        .brand-marquee-scroll::-webkit-scrollbar { display: none; }
        .brand-marquee-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
