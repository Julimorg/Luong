import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { products, combos, type ComboItem, type ComboSegment } from "../../../data/productData";

const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

const segmentIconMap: Record<ComboSegment, React.ReactNode> = {
  residential: <HomeIcon sx={{ fontSize: 20 }} />,
  business: <ApartmentIcon sx={{ fontSize: 20 }} />,
  agriculture: <AgricultureIcon sx={{ fontSize: 20 }} />,
};

// ─── Reveal wrapper (dùng cho phần tiêu đề section) ─────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Animation cho lưới combo — bay vào so le từng card khi cuộn tới ───
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Card combo — gọn, chỉ ảnh + thông tin sơ bộ, bấm để mở modal ───
function ComboCard({ combo, onOpen }: { combo: ComboItem; onOpen: (c: ComboItem) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(combo)}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-200/70"
    >
      {/* Ảnh + badge + icon phân khúc */}
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: NAVY }}>
        <img
          src={combo.image}
          alt={combo.name}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c2f5c]/90 via-[#1c2f5c]/20 to-transparent" />

        {combo.badge && (
          <span
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: GOLD }}
          >
            {combo.badge}
          </span>
        )}

        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${GOLD}E6`, color: NAVY }}
          >
            {segmentIconMap[combo.segment]}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold leading-tight text-white">{combo.name}</p>
            <p className="truncate text-xs text-white/70">{combo.tagline}</p>
          </div>
        </div>
      </div>

      {/* Thông tin sơ bộ */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-[11px] text-gray-400">Công suất</p>
          <p className="text-base font-extrabold" style={{ color: NAVY }}>{combo.capacity}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-gray-400">Giá tham khảo</p>
          <p className="text-base font-extrabold" style={{ color: GOLD }}>{combo.priceFrom}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-50 px-5 py-3">
        <span className="text-xs font-bold" style={{ color: GOLD }}>Xem chi tiết</span>
        <ArrowForwardIcon
          sx={{ fontSize: 15, color: GOLD }}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </motion.button>
  );
}

// ─── Modal chi tiết combo — kiểu Ant Design: header / body / footer ───
function ComboDetailModal({
  combo,
  visible,
  onClose,
}: {
  combo: ComboItem;
  visible: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const thumbnails = combo.includedItems.map((item) =>
    products.find((p) => p.category === item.category)
  );

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
      style={{ backgroundColor: "rgba(13,33,55,0.7)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl xl:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out max-h-[90vh] flex flex-col ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
            >
              {segmentIconMap[combo.segment]}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-extrabold leading-tight truncate" style={{ color: NAVY }}>
                {combo.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{combo.tagline}</p>
            </div>
          </div>
          {combo.badge && (
            <span
              className="hidden sm:inline-block flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: GOLD }}
            >
              {combo.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Đóng"
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        {/* Body — ảnh cố định bên trái, thông tin cuộn riêng bên phải */}
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          <div className="relative h-56 sm:h-auto flex-shrink-0 sm:w-1/2">
            <img src={combo.image} alt={combo.name} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          <div className="sm:w-1/2 min-h-0 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <p className="text-[11px] text-gray-400">Công suất hệ thống</p>
                <p className="text-xl font-extrabold" style={{ color: NAVY }}>{combo.capacity}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400">Giá tham khảo</p>
                <p className="text-xl font-extrabold" style={{ color: GOLD }}>{combo.priceFrom}</p>
              </div>
            </div>
            {combo.priceNote && (
              <p className="-mt-4 text-xs leading-relaxed text-gray-400">{combo.priceNote}</p>
            )}

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Điểm nổi bật</p>
              <ul className="flex flex-col gap-2.5">
                {combo.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: GOLD }}
                    >
                      <CheckIcon sx={{ fontSize: 12, color: "#fff" }} />
                    </span>
                    <span className="text-sm leading-snug text-gray-600">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Thiết bị trong combo</p>
              <div className="flex flex-col gap-2">
                {combo.includedItems.map((item, i) => (
                  <div
                    key={item.category}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5"
                  >
                    {thumbnails[i] && (
                      <img
                        src={thumbnails[i]!.image}
                        alt={thumbnails[i]!.name}
                        className="h-10 w-10 flex-shrink-0 rounded-lg border border-gray-100 bg-gray-50 object-contain p-1"
                      />
                    )}
                    <span className="text-sm text-gray-700">{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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
            style={{ backgroundColor: NAVY }}
          >
            Nhận tư vấn combo này
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ComboSection() {
  const [activeCombo, setActiveCombo] = useState<ComboItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openCombo = (combo: ComboItem) => {
    setActiveCombo(combo);
    requestAnimationFrame(() => setModalVisible(true));
  };
  const closeCombo = () => {
    setModalVisible(false);
    setTimeout(() => setActiveCombo(null), 300); // đợi transition thoát xong mới gỡ khỏi DOM
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Reveal className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
            Combo nổi bật
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
          Combo trọn gói theo từng nhu cầu
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Gói thiết bị đã được lựa chọn sẵn, tối ưu cho hộ gia đình, doanh nghiệp và trang trại nông nghiệp.
        </p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={gridVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {combos.map((combo) => (
          <ComboCard key={combo.id} combo={combo} onOpen={openCombo} />
        ))}
      </motion.div>

      {activeCombo && (
        <ComboDetailModal combo={activeCombo} visible={modalVisible} onClose={closeCombo} />
      )}
    </section>
  );
}