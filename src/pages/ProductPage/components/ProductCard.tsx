import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Product } from "../../../data/productData";

const GOLD = "#f6b918";
const NAVY = "#1c2f5c";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const brandColor = product.brandColor ?? GOLD;

  return (
    <Link
      to={`/san-pham/${product.id}`}
      className="group flex h-full w-[250px] sm:w-[270px] lg:w-[288px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/70"
    >
      {/* Ảnh sản phẩm — nền gradient nhạt, object-contain để thấy trọn thiết bị */}
      <div
        className="flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6"
        style={{ height: 220 }}
      >
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col gap-2 border-t border-gray-50 px-5 py-5">
        <h3
          className="mb-0.5 min-h-[2.8rem] text-sm font-bold leading-snug line-clamp-2"
          style={{ color: NAVY }}
        >
          {product.name}
        </h3>

        <div className="flex flex-col gap-1">
          {product.specs.map((s) => (
            <p key={s.label} className="text-xs text-gray-400">
              {s.label}: <span className="font-semibold text-gray-700">{s.value}</span>
            </p>
          ))}
        </div>

        <span
          className="mt-auto inline-flex w-fit items-center gap-1 pt-3 text-xs font-bold transition-all duration-200 group-hover:gap-1.5"
          style={{ color: brandColor }}
        >
          Xem chi tiết
          <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </span>
      </div>
    </Link>
  );
}