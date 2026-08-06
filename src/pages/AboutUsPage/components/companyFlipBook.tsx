import { forwardRef, useMemo, useRef, useState } from "react";
import HTMLFlipBook, { type PageFlipMethods } from "react-pageflip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const GOLD = "#f5a623";

// ─── Cấu hình nguồn ảnh — 26 ảnh convert từ PDF ─────────────────────
// Đặt 26 file ảnh vào: public/catalog/profile/
// Tên file theo mẫu: page-01.jpg, page-02.jpg ... page-26.jpg (2 chữ số, có số 0 đứng trước)
// Đổi IMAGE_EXTENSION thành ".png" nếu ảnh của bạn là định dạng PNG.
const TOTAL_PAGES = 26;
const IMAGE_PATH_PREFIX = "/catalog/profile/page-";
const IMAGE_EXTENSION = ".jpg";

function buildPageSrc(index: number) {
  const num = String(index + 1).padStart(2, "0");
  return `${IMAGE_PATH_PREFIX}${num}${IMAGE_EXTENSION}`;
}

interface FlipPageProps {
  src: string;
}

// Mỗi trang PHẢI dùng forwardRef — bắt buộc để react-pageflip gắn DOM ref vào từng trang
const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(({ src }, ref) => {
  return (
    <div ref={ref} className="bg-white flex items-center justify-center overflow-hidden">
      <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
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

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-4"
          : "relative"
      }
    >
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors duration-200"
          aria-label="Đóng toàn màn hình"
        >
          <FullscreenExitIcon />
        </button>
      )}

      <div className="relative w-full flex flex-col items-center">
        <div className="relative w-full" style={{ maxWidth: isFullscreen ? 900 : 640 }}>
          <HTMLFlipBook
            ref={bookRef as any}
            width={420}
            height={594} // tỉ lệ A4 dọc — khớp ảnh convert từ PDF khổ A4
            size="stretch"
            minWidth={280}
            maxWidth={900}
            minHeight={396}
            maxHeight={1273}
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
            className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#f5a623] transition-colors duration-200"
            aria-label="Trang trước"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#f5a623] transition-colors duration-200"
            aria-label="Trang sau"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Thanh trạng thái: số trang + nút fullscreen */}
        <div className="flex items-center gap-4 mt-5">
          <span className={`text-sm font-medium ${isFullscreen ? "text-white/70" : "text-gray-500"}`}>
            Trang {currentPage + 1} / {TOTAL_PAGES}
          </span>
          {!isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
              style={{ color: GOLD }}
            >
              <FullscreenIcon sx={{ fontSize: 18 }} />
              Xem toàn màn hình
            </button>
          )}
        </div>
      </div>
    </div>
  );
}