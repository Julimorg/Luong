import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HTMLFlipBook, { type PageFlipMethods } from "react-pageflip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const GOLD = "#f5a623";

// ─── Cấu hình nguồn ảnh — 26 ảnh convert từ PDF ─────────────────────
const TOTAL_PAGES = 26;
const IMAGE_PATH_PREFIX = "/flipBookImg/flipBook_1_page-";
const IMAGE_EXTENSION = ".jpg";

function buildPageSrc(index: number) {
  const num = String(index + 1).padStart(4, "0");
  return `${IMAGE_PATH_PREFIX}${num}${IMAGE_EXTENSION}`;
}

interface FlipPageProps {
  src: string;
}

// Mỗi trang PHẢI dùng forwardRef — bắt buộc để react-pageflip gắn DOM ref vào từng trang
const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(({ src }, ref) => {
  return (
    <div ref={ref} className="relative w-full h-full bg-white overflow-hidden">
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
});
FlipPage.displayName = "FlipPage";

export function CompanyFlipbook() {
  const bookRef = useRef<{ pageFlip: () => PageFlipMethods } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pages = useMemo(() => Array.from({ length: TOTAL_PAGES }, (_, i) => buildPageSrc(i)), []);

  const goPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goNext = () => bookRef.current?.pageFlip().flipNext();
  const toggleFullscreen = () => setIsFullscreen((f) => !f);

  // Khoá cuộn trang nền + cho phép nhấn Esc để đóng khi đang xem toàn màn hình
  useEffect(() => {
    if (!isFullscreen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  // ─── Khung sách dùng chung cho cả 2 chế độ ─────────────────────
  // Kích thước theo tỉ lệ A4 (1 : 1.4133). minWidth quyết định ngưỡng
  // thư viện tự chuyển portrait (1 trang) <-> landscape (2 trang mở sách):
  // container đủ rộng >= 2×minWidth thì tự động hiện dạng sách mở.
  const bookProps = isFullscreen
    ? { width: 380, height: 537, minWidth: 260, maxWidth: 460, minHeight: 368, maxHeight: 650 }
    : { width: 280, height: 396, minWidth: 200, maxWidth: 380, minHeight: 283, maxHeight: 537 };

  const flipbookCore = (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={
          isFullscreen
            ? "relative w-[92vw] max-w-[1000px]"
            : "relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[640px] xl:max-w-[760px]"
        }
      >
        <HTMLFlipBook
          ref={bookRef as any}
          {...bookProps}
          size="stretch"
          showCover={true}
          usePortrait={true}
          mobileScrollSupport={true}
          drawShadow={true}
          maxShadowOpacity={0.5}
          flippingTime={600}
          className="mx-auto shadow-2xl rounded-lg overflow-hidden"
          onFlip={(e) => setCurrentPage(e.data)}
        >
          {pages.map((src, i) => (
            <FlipPage key={i} src={src} />
          ))}
        </HTMLFlipBook>

        {/* Mũi tên điều hướng 2 bên */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#f5a623] transition-colors duration-200"
          aria-label="Trang trước"
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 -right-3 sm:-right-4 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#f5a623] transition-colors duration-200"
          aria-label="Trang sau"
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      {/* Thanh trạng thái: số trang + nút fullscreen */}
      <div className="flex items-center gap-4 mt-4">
        <span className={`text-xs font-medium ${isFullscreen ? "text-white/70" : "text-gray-500"}`}>
          Trang {currentPage + 1} / {TOTAL_PAGES}
        </span>
        <button
          onClick={toggleFullscreen}
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 ${
            isFullscreen ? "text-white/90 hover:text-white" : ""
          }`}
          style={!isFullscreen ? { color: GOLD } : undefined}
        >
          {isFullscreen ? (
            <>
              <FullscreenExitIcon sx={{ fontSize: 16 }} />
              Thoát toàn màn hình
            </>
          ) : (
            <>
              <FullscreenIcon sx={{ fontSize: 16 }} />
              Xem toàn màn hình
            </>
          )}
        </button>
      </div>
    </div>
  );

  // ── Bản xem thường: nằm ngay trong luồng layout của trang ──
  if (!isFullscreen) {
    return <div className="relative w-full">{flipbookCore}</div>;
  }

  // ── Bản fullscreen: render qua Portal thẳng ra document.body ──
  // Bắt buộc phải dùng Portal — nếu chỉ đổi className tại chỗ, `position: fixed`
  // sẽ bị "nhốt" trong ancestor RevealSection (do RevealSection dùng transform
  // cho hiệu ứng cuộn trang), khiến lớp toàn màn hình không phủ đúng viewport.
  return createPortal(
    <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-4">
      <button
        onClick={toggleFullscreen}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors duration-200"
        aria-label="Đóng toàn màn hình"
      >
        <FullscreenExitIcon />
      </button>
      {flipbookCore}
    </div>,
    document.body
  );
}