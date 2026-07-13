import { useMemo, useState } from "react";
import { Button, Slider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SavingsIcon from "@mui/icons-material/Savings";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import NatureIcon from "@mui/icons-material/Nature";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import BuildIcon from "@mui/icons-material/Build";
import ShieldIcon from "@mui/icons-material/Shield";
import { useNavigate } from "react-router-dom";
import { RevealSection } from "../common/Reveal";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { GOLD, NAVY, GOLD_DARK } from "../../themes/colors";

type LoaiCongTrinh = "nha_o" | "nha_xuong" | "van_phong" | "trang_trai";
type DienTichMai = "duoi_40" | "tu_40_80" | "tu_80_150" | "tren_150" | "khong_ro";

const CONG_TRINH_OPTIONS: { value: LoaiCongTrinh; label: string; icon: React.ReactNode; image: string }[] = [
  {
    value: "nha_o",
    label: "Nhà ở",
    icon: <HomeIcon sx={{ fontSize: 24 }} />,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
  },
  {
    value: "nha_xuong",
    label: "Nhà xưởng",
    icon: <WarehouseIcon sx={{ fontSize: 24 }} />,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
  },
  {
    value: "van_phong",
    label: "Văn phòng",
    icon: <ApartmentIcon sx={{ fontSize: 24 }} />,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    value: "trang_trai",
    label: "Trang trại",
    icon: <AgricultureIcon sx={{ fontSize: 24 }} />,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80",
  },
];

const DIEN_TICH_OPTIONS: { value: DienTichMai; label: string }[] = [
  { value: "duoi_40", label: "< 40m²" },
  { value: "tu_40_80", label: "40 - 80m²" },
  { value: "tu_80_150", label: "80 - 150m²" },
  { value: "tren_150", label: "> 150m²" },
  { value: "khong_ro", label: "Không rõ" },
];

const DIEN_TICH_AREA_MAP: Record<DienTichMai, number | null> = {
  duoi_40: 30, tu_40_80: 60, tu_80_150: 115, tren_150: 180, khong_ro: null,
};

function formatVND(n: number) {
  return Math.round(n).toLocaleString("vi-VN") + "đ";
}
function formatVNDShort(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " triệu";
  return formatVND(n);
}
function getGiaDien(loai: LoaiCongTrinh, tienDien: number): number {
  switch (loai) {
    case "nha_o":
      if (tienDien < 2_000_000) return 3100;
      if (tienDien <= 6_000_000) return 3400;
      return 3650;
    case "van_phong": return 3200;
    case "nha_xuong": return 2850;
    case "trang_trai": return 2750;
  }
}

function useSolarResult(tienDien: number, loaiCongTrinh: LoaiCongTrinh, dienTichMai: DienTichMai) {
  return useMemo(() => {
    const giaDien = getGiaDien(loaiCongTrinh, tienDien);
    const dienNangTieuThu = tienDien / giaDien;
    const congSuatCanThiet = dienNangTieuThu / 120;
    const congSuatDeXuatRaw = congSuatCanThiet * 0.85;
    const congSuatDeXuat = Math.max(0.5, Math.round(congSuatDeXuatRaw * 2) / 2);

    const tietKiem = tienDien * 0.85;
    const hoanVon = congSuatDeXuat < 10 ? "4 - 5 năm" : congSuatDeXuat <= 30 ? "3.5 - 4 năm" : "3 - 4 năm";
    const co2 = congSuatDeXuat * 0.85;

    const roofArea = DIEN_TICH_AREA_MAP[dienTichMai];
    let roofStatus: { type: "success" | "warning" | "danger" | "info"; message: string };

    if (roofArea === null) {
      roofStatus = {
        type: "info",
        message: "Công suất được ước tính dựa trên mức tiêu thụ điện. Kỹ sư sẽ khảo sát thực tế để xác định công suất phù hợp.",
      };
    } else {
      const congSuatMaiToiDa = roofArea / 6.8;
      if (congSuatMaiToiDa >= congSuatDeXuat) {
        roofStatus = { type: "success", message: "Diện tích mái phù hợp để lắp đặt hệ thống đề xuất." };
      } else {
        const chenhLech = (congSuatDeXuat - congSuatMaiToiDa) / congSuatDeXuat;
        roofStatus = chenhLech <= 0.2
          ? { type: "warning", message: "Diện tích mái có thể chưa đủ cho công suất đề xuất. Kỹ sư VIETHUNGSOLAR sẽ khảo sát và tối ưu phương án phù hợp." }
          : { type: "danger", message: "Diện tích mái hiện tại chưa đáp ứng công suất đề xuất. Chúng tôi sẽ tư vấn phương án tối ưu theo diện tích thực tế hoặc nhu cầu sử dụng." };
      }
    }

    return { congSuatDeXuat, tietKiem, hoanVon, co2, roofStatus };
  }, [tienDien, loaiCongTrinh, dienTichMai]);
}

function RoofStatusBanner({ status }: { status: { type: "success" | "warning" | "danger" | "info"; message: string } }) {
  const styleMap = {
    success: { bg: "rgba(34,197,94,0.12)", color: "#4ade80", icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
    warning: { bg: "rgba(246,185,24,0.12)", color: GOLD, icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    danger: { bg: "rgba(239,68,68,0.12)", color: "#f87171", icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    info: { bg: "rgba(96,165,250,0.12)", color: "#60a5fa", icon: <InfoIcon sx={{ fontSize: 18 }} /> },
  }[status.type];

  return (
    <div className="flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs leading-relaxed" style={{ backgroundColor: styleMap.bg, color: styleMap.color }}>
      <span className="mt-0.5 flex-shrink-0">{styleMap.icon}</span>
      <span>{status.message}</span>
    </div>
  );
}

export function SolarCalculator() {
  const navigate = useNavigate();
  const [tienDien, setTienDien] = useState(6_000_000);
  const [loaiCongTrinh, setLoaiCongTrinh] = useState<LoaiCongTrinh>("nha_o");
  const [dienTichMai, setDienTichMai] = useState<DienTichMai>("tu_40_80");

  const result = useSolarResult(tienDien, loaiCongTrinh, dienTichMai);
  const activeCongTrinh = CONG_TRINH_OPTIONS.find((opt) => opt.value === loaiCongTrinh)!;

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-10">
          <SectionEyebrow text="Calculator" center />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Ước tính hệ thống phù hợp
            <br />
            với bạn trong 30 giây
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Chỉ cần trả lời 4 câu hỏi đơn giản, bạn sẽ biết được hệ thống điện mặt trời phù hợp và số tiền có thể tiết kiệm mỗi tháng.
          </p>
        </RevealSection>

        <RevealSection>
          <div className="grid lg:grid-cols-2 gap-5">
            {/* ── LEFT: FORM ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-8">
              {/* Câu 1: Tiền điện */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 1. Tiền điện trung bình mỗi tháng của bạn là bao nhiêu?
                </p>
                <div className="text-center font-bold text-sm py-2 rounded-lg mb-3" style={{ backgroundColor: `${GOLD}1A`, color: GOLD_DARK }}>
                  {formatVND(tienDien)}
                </div>
                <Slider
                  value={tienDien}
                  min={1_000_000}
                  max={20_000_000}
                  step={100_000}
                  onChange={(_, v) => setTienDien(v as number)}
                  sx={{ color: GOLD, "& .MuiSlider-thumb": { boxShadow: `0 0 0 6px ${GOLD}33` } }}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1 triệu</span>
                  <span>20 triệu+</span>
                </div>
              </div>

              {/* Câu 2: Loại công trình */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 2. Loại công trình của bạn là gì?
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {CONG_TRINH_OPTIONS.map((opt) => {
                    const active = loaiCongTrinh === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setLoaiCongTrinh(opt.value)}
                        className="flex flex-col items-center gap-1.5 rounded-xl border py-3 px-1 transition-all duration-200"
                        style={{
                          borderColor: active ? GOLD : "#e5e7eb",
                          backgroundColor: active ? `${GOLD}1A` : "#fff",
                          color: active ? GOLD_DARK : "#6b7280",
                        }}
                      >
                        {opt.icon}
                        <span className="text-[11px] font-medium leading-tight text-center">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Câu 3: Khu vực */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 3. Khu vực bạn đang ở đâu?
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-500">
                  <LocationOnIcon sx={{ fontSize: 18, color: GOLD }} />
                  TP. Hồ Chí Minh
                </div>
              </div>

              {/* Câu 4: Diện tích mái */}
              <div className="mb-7">
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 4. Diện tích mái (ước lượng) của bạn là bao nhiêu?
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIEN_TICH_OPTIONS.map((opt) => {
                    const active = dienTichMai === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setDienTichMai(opt.value)}
                        className="rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200"
                        style={{
                          borderColor: active ? GOLD : "#e5e7eb",
                          backgroundColor: active ? `${GOLD}1A` : "#fff",
                          color: active ? GOLD_DARK : "#6b7280",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                fullWidth
                onClick={() => navigate("/lien-he")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: GOLD, color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                  textTransform: "none", borderRadius: "8px", py: 1.4,
                  boxShadow: `0 4px 20px ${GOLD}55`,
                  "&:hover": { backgroundColor: GOLD_DARK },
                }}
              >
                Xem kết quả
              </Button>
            </div>

            {/* ── RIGHT: RESULT ── */}
            <div className="rounded-2xl p-6 sm:p-7 flex flex-col" style={{ backgroundColor: "#132a4d" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-4" style={{ color: GOLD }}>
                Kết quả ước tính
              </p>

              <div className="flex items-start gap-4 mb-5">
                <div className="flex-1">
                  <p className="text-white/50 text-xs mb-1">Hệ thống đề xuất cho bạn</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-white">{result.congSuatDeXuat}</span>
                    <span className="text-lg font-bold pb-1" style={{ color: GOLD }}>kWp</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">Phù hợp với nhu cầu sử dụng điện hiện tại</p>
                </div>
                <div className="w-28 sm:w-32 aspect-square rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={activeCongTrinh.image}
                    alt={activeCongTrinh.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <SavingsIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Tiết kiệm ước tính</span>
                  </div>
                  <p className="text-white font-bold text-sm">{formatVNDShort(result.tietKiem)}/tháng</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Thời gian hoàn vốn</span>
                  </div>
                  <p className="text-white font-bold text-sm">≈ {result.hoanVon}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 col-span-2">
                  <div className="flex items-center gap-1.5 mb-1.5" style={{ color: GOLD }}>
                    <NatureIcon sx={{ fontSize: 16 }} />
                    <span className="text-[11px] text-white/50">Giảm phát thải CO₂</span>
                  </div>
                  <p className="text-white font-bold text-sm">≈ {result.co2.toFixed(1)} tấn/năm</p>
                </div>
              </div>

              <div className="mb-5">
                <RoofStatusBanner status={result.roofStatus} />
              </div>

              <div className="mt-auto">
                <p className="text-white/40 text-xs mb-3">
                  Muốn nhận tư vấn chi tiết &amp; báo giá chính xác? Đội ngũ kỹ thuật của VIETHUNGSOLAR sẽ liên hệ và khảo sát miễn phí.
                </p>
                <Button
                  fullWidth
                  onClick={() => navigate("/lien-he")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: GOLD, color: "#fff", fontWeight: 700, fontSize: "0.85rem",
                    textTransform: "none", borderRadius: "8px", py: 1.2,
                    "&:hover": { backgroundColor: GOLD_DARK },
                  }}
                >
                  Nhận tư vấn chi tiết
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: <SearchIcon sx={{ fontSize: 22 }} />, title: "Khảo sát miễn phí", desc: "Đội ngũ kỹ thuật đến tận nơi khảo sát và tư vấn miễn phí." },
            { icon: <DesignServicesOutlinedIcon sx={{ fontSize: 22 }} />, title: "Thiết kế tối ưu", desc: "Giải pháp được thiết kế riêng, đảm bảo hiệu quả cao nhất." },
            { icon: <BuildIcon sx={{ fontSize: 22 }} />, title: "Thi công chuyên nghiệp", desc: "Đội ngũ giàu kinh nghiệm, thi công nhanh chóng, an toàn." },
            { icon: <ShieldIcon sx={{ fontSize: 22 }} />, title: "Bảo hành dài hạn", desc: "Hỗ trợ kỹ thuật 24/7, bảo hành thiết bị lên đến 10 năm." },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}>
                {f.icon}
              </span>
              <div>
                <p className="text-white font-semibold text-xs mb-0.5">{f.title}</p>
                <p className="text-white/40 text-[11px] leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}