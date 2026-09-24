import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SubType } from "../../../data/solutionData";
import { NAVY, getSubTypeColor, iconMap } from "./solutionTheme";

// ─── Modal chi tiết sub-type — kiểu Ant Design: header / body / footer ─────
export function SubTypeDetailModal({
  sub,
  visible,
  onClose,
}: {
  sub: SubType;
  visible: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const color = getSubTypeColor(sub.icon);
  const Icon = iconMap[sub.icon];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(18,27,69,0.7)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl xl:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out max-h-[90vh] flex flex-col ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              <Icon sx={{ fontSize: 22 }} />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase leading-tight truncate" style={{ color: NAVY }}>
                {sub.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{sub.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Đóng"
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        {/* ── Body — flex (không phải grid) để mỗi cột tự quản lý overflow riêng ── */}
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* Ảnh — CỐ ĐỊNH, không cuộn theo, hiện trọn vẹn (object-contain vì có thể là ảnh chụp hoặc sơ đồ có chữ) */}
          <div className="relative bg-white flex items-center justify-center p-5 sm:p-6 h-56 sm:h-auto flex-shrink-0 sm:w-1/2">
            <img
              src={sub.image}
              alt={sub.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thông tin — CUỘN RIÊNG khi nội dung dài, ảnh bên trái không bị ảnh hưởng */}
          <div className="sm:w-1/2 min-h-0 overflow-y-auto p-6 sm:p-8 flex flex-col gap-7">
            {/* Mô tả chi tiết — dùng solution.description nếu có, fallback về subtitle */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Mô tả</p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {sub.solution?.description ?? sub.subtitle}
              </p>
            </div>

            {/* Đặc điểm nổi bật */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Đặc điểm nổi bật</p>
              <ul className="flex flex-col gap-3">
                {sub.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: color }}
                    >
                      <CheckIcon sx={{ fontSize: 12, color: "#fff" }} />
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thông số bổ sung — dạng bảng key-value, chỉ hiện khi solution.specs có data */}
            {sub.solution?.specs && sub.solution.specs.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Thông số kỹ thuật</p>
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  {sub.solution.specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                        i !== sub.solution!.specs!.length - 1 ? "border-b border-gray-100" : ""
                      } ${i % 2 === 1 ? "bg-gray-50/60" : "bg-white"}`}
                    >
                      <span className="text-gray-400">{s.label}</span>
                      <span className="font-bold text-right" style={{ color: NAVY }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phù hợp nhất — đối tượng khách hàng nên chọn giải pháp này */}
            {sub.solution?.bestFor && (
              <div className="rounded-xl border border-gray-100 px-4 py-3.5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Phù hợp nhất
                </p>
                <p className="text-sm leading-relaxed text-gray-600">{sub.solution.bestFor}</p>
              </div>
            )}

            {/* Ghi chú / lưu ý — chỉ hiện khi solution.note có data */}
            {sub.solution?.note && (
              <div
                className="rounded-xl px-4 py-3.5"
                style={{ backgroundColor: `${color}0D` }}
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color }}>
                  Lưu ý
                </p>
                <p className="text-sm leading-relaxed" style={{ color: NAVY }}>
                  {sub.solution.note}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors duration-200"
          >
            Đóng
          </button>
          <button
            onClick={() => navigate("/lien-he")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: color, boxShadow: `0 4px 16px ${color}55` }}
          >
            Nhận tư vấn miễn phí
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
