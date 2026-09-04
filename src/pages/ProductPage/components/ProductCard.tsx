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
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/70"
    >
      {/* Ảnh sản phẩm — nền gần trắng, object-contain để thấy trọn thiết bị */}
      <div
        className="flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-5"
        style={{ height: 180 }}
      >
        <img
          src={product.image}
          alt={product.name}
          draggable={false}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col gap-1.5 border-t border-gray-50 px-4 py-4">
        {/* Thương hiệu — dạng "logo chữ" nhỏ phía trên tên sản phẩm */}
        <span
          className="text-xs font-black uppercase tracking-wide"
          style={{ color: brandColor }}
        >
          {product.brand}
        </span>

        <h3
          className="min-h-[2.5rem] text-sm font-bold leading-snug line-clamp-2"
          style={{ color: NAVY }}
        >
          {product.name}
        </h3>

        <div className="mt-1 flex flex-col gap-0.5">
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