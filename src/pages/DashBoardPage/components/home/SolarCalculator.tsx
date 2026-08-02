import { useEffect, useMemo, useState } from "react";
import { Autocomplete, Button, CircularProgress, Slider, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalculateIcon from "@mui/icons-material/Calculate";
import ReplayIcon from "@mui/icons-material/Replay";
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
import { useGetProvinces } from "../../../../hooks/useGetQueryProvince";
import type { IProvince } from "../../../../interface/IProvince";

type LoaiCongTrinh = "nha_o" | "nha_xuong" | "van_phong" | "trang_trai";
type DienTichMai = "duoi_40" | "tu_40_80" | "tu_80_150" | "tren_150" | "khong_ro";
type CalcStatus = "idle" | "loading" | "done";

const DEFAULT_PROVINCE_CODE = 79; // Thành phố Hồ Chí Minh
const FALLBACK_PROVINCES: IProvince[] = [
  { code: 79, name: "Thành phố Hồ Chí Minh", division_type: "thành phố trung ương", codename: "thanh_pho_ho_chi_minh", phone_code: 28 },
  { code: 1, name: "Thành phố Hà Nội", division_type: "thành phố trung ương", codename: "thanh_pho_ha_noi", phone_code: 24 },
  { code: 48, name: "Thành phố Đà Nẵng", division_type: "thành phố trung ương", codename: "thanh_pho_da_nang", phone_code: 236 },
  { code: 92, name: "Thành phố Cần Thơ", division_type: "thành phố trung ương", codename: "thanh_pho_can_tho", phone_code: 292 },
];

const CONG_TRINH_OPTIONS: { value: LoaiCongTrinh; label: string; icon: React.ReactNode }[] = [
  { value: "nha_o", label: "Nhà ở", icon: <HomeIcon sx={{ fontSize: 22 }} /> },
  { value: "nha_xuong", label: "Nhà xưởng", icon: <WarehouseIcon sx={{ fontSize: 22 }} /> },
  { value: "van_phong", label: "Văn phòng", icon: <ApartmentIcon sx={{ fontSize: 22 }} /> },
  { value: "trang_trai", label: "Trang trại", icon: <AgricultureIcon sx={{ fontSize: 22 }} /> },
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

// ─── Giới hạn nhập tiền điện ─────────────────────────────────────────
const MIN_TIEN_DIEN = 0;
const MAX_TIEN_DIEN = 1_000_000_000; // 1 tỷ
const SLIDER_MAX = 20_000_000; // slider dùng cho khoảng phổ biến, nhập tay vẫn tới 1 tỷ

const LOADING_MESSAGES = [
  "Đang phân tích mức tiêu thụ điện...",
  "Đang tính toán công suất phù hợp...",
  "Đang ước tính chi phí tiết kiệm...",
  "Đang hoàn thiện kết quả...",
];
const CALC_DURATION_MS = 2200;
const CALC_MESSAGE_INTERVAL_MS = 550;
const COLLAPSE_DURATION_MS = 300; // thời gian transition khi ẩn kết quả

function formatVND(n: number) {
  return Math.round(n).toLocaleString("vi-VN") + "đ";
}
function formatVNDShort(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 }) + " triệu";
  return formatVND(n);
}
function formatInputNumber(n: number) {
  return n.toLocaleString("vi-VN");
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
    success: { bg: "rgba(34,197,94,0.1)", color: "#16a34a", icon: <CheckCircleIcon sx={{ fontSize: 18 }} /> },
    warning: { bg: "rgba(246,185,24,0.12)", color: GOLD_DARK, icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    danger: { bg: "rgba(239,68,68,0.1)", color: "#dc2626", icon: <WarningAmberIcon sx={{ fontSize: 18 }} /> },
    info: { bg: "rgba(59,130,246,0.1)", color: "#2563eb", icon: <InfoIcon sx={{ fontSize: 18 }} /> },
  }[status.type];

  return (
    <div className="flex items-start gap-2 rounded-lg px-3.5 py-3 text-xs leading-relaxed" style={{ backgroundColor: styleMap.bg, color: styleMap.color }}>
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
  const [status, setStatus] = useState<CalcStatus>("idle");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [khuVuc, setKhuVuc] = useState<IProvince | null>(null);

  // ── Trạng thái mount/transition riêng cho khối kết quả (để có exit-animation mượt) ──
  const [resultMounted, setResultMounted] = useState(false);
  const [resultEntered, setResultEntered] = useState(false);

  // ── Fetch danh sách tỉnh/thành qua React Query ──
  const { data: provincesData, isLoading: provincesLoading, isError: provincesError } = useGetProvinces();
  const provinces: IProvince[] = provincesError ? FALLBACK_PROVINCES : provincesData ?? [];

  useEffect(() => {
    if (khuVuc || provinces.length === 0) return;
    setKhuVuc(provinces.find((p) => p.code === DEFAULT_PROVINCE_CODE) ?? provinces[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinces]);

  const result = useSolarResult(tienDien, loaiCongTrinh, dienTichMai);

  // ── Giả lập loading, chữ trên button đổi liên tục ──
  useEffect(() => {
    if (status !== "loading") return;
    setLoadingMsgIndex(0);

    const msgInterval = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, CALC_MESSAGE_INTERVAL_MS);

    const doneTimeout = setTimeout(() => {
      setStatus("done");
    }, CALC_DURATION_MS);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(doneTimeout);
    };
  }, [status]);

  // ── Khi status chuyển sang "done": mount khối kết quả rồi trigger transition-in ──
  useEffect(() => {
    if (status !== "done") return;
    setResultMounted(true);
    const t = setTimeout(() => setResultEntered(true), 20);
    return () => clearTimeout(t);
  }, [status]);

  // ── Thu gọn kết quả mượt mà (dùng cho: đổi input, hoặc bấm "Tính lại") ──
  const collapseResult = () => {
    if (status === "idle") return;
    if (status === "loading") {
      // Đang tính mà đổi input -> huỷ luôn, chưa có gì để animate
      setStatus("idle");
      setResultMounted(false);
      setResultEntered(false);
      return;
    }
    // status === "done": fade-out trước, unmount sau khi transition xong
    setResultEntered(false);
    setTimeout(() => {
      setResultMounted(false);
      setStatus("idle");
    }, COLLAPSE_DURATION_MS);
  };

  const handleTienDienSliderChange = (_: Event, v: number | number[]) => {
    setTienDien(v as number);
    collapseResult();
  };

  const handleTienDienInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ""); // chặn chữ + chặn số âm (loại luôn dấu "-")
    if (digitsOnly === "") {
      setTienDien(MIN_TIEN_DIEN);
      collapseResult();
      return;
    }
    const parsed = Math.min(parseInt(digitsOnly, 10), MAX_TIEN_DIEN); // chặn vượt quá 1 tỷ
    setTienDien(parsed);
    collapseResult();
  };

  const handleLoaiCongTrinhChange = (val: LoaiCongTrinh) => {
    setLoaiCongTrinh(val);
    collapseResult();
  };
  const handleDienTichChange = (val: DienTichMai) => {
    setDienTichMai(val);
    collapseResult();
  };
  const handleKhuVucChange = (val: IProvince | null) => {
    setKhuVuc(val);
    collapseResult();
  };

  const handleCalculate = () => {
    if (status === "loading") return;
    setStatus("loading");
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#f7f8fa" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-10">
          <SectionEyebrow text="Calculator" center />
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3" style={{ color: NAVY }}>
            Ước tính hệ thống điện mặt trời
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Tính toán nhanh công suất phù hợp chỉ trong 30 giây
          </p>
        </RevealSection>

        <RevealSection>
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-6 sm:p-9">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Câu 1: Tiền điện — nhập số trực tiếp + slider hỗ trợ */}
              <div>
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 1. Tiền điện trung bình mỗi tháng của bạn là bao nhiêu?
                </p>
                <TextField
                  fullWidth
                  value={formatInputNumber(tienDien)}
                  onChange={handleTienDienInputChange}
                  inputProps={{ inputMode: "numeric" }}
                  InputProps={{
                    endAdornment: (
                      <span style={{ color: GOLD_DARK, fontWeight: 700, fontSize: "0.85rem", marginLeft: 4 }}>đ</span>
                    ),
                  }}
                  sx={{
                    mb: 1,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: `${GOLD}1A`,
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: GOLD_DARK,
                      transition: "box-shadow 0.2s, background-color 0.2s",
                      "& input": { textAlign: "center", padding: "10px 8px" },
                      "& fieldset": { border: "1px solid transparent" },
                      "&:hover fieldset": { borderColor: GOLD },
                      "&.Mui-focused fieldset": { borderColor: GOLD, borderWidth: "1.5px" },
                    },
                  }}
                />
                <Slider
                  value={Math.min(tienDien, SLIDER_MAX)}
                  min={1_000_000}
                  max={SLIDER_MAX}
                  step={100_000}
                  onChange={handleTienDienSliderChange}
                  sx={{ color: GOLD, "& .MuiSlider-thumb": { boxShadow: `0 0 0 6px ${GOLD}33` } }}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1 triệu</span>
                  <span>Tối đa 1.000.000.000đ</span>
                </div>
              </div>

              {/* Câu 2: Loại công trình */}
              <div>
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 2. Loại công trình của bạn là gì?
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {CONG_TRINH_OPTIONS.map((opt) => {
                    const active = loaiCongTrinh === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleLoaiCongTrinhChange(opt.value)}
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
              <div>
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 3. Khu vực bạn đang ở đâu?
                </p>
                <Autocomplete
                  options={provinces}
                  value={khuVuc}
                  loading={provincesLoading}
                  onChange={(_, val) => handleKhuVucChange(val)}
                  getOptionLabel={(opt) => opt.name}
                  isOptionEqualToValue={(opt, val) => opt.code === val.code}
                  noOptionsText="Không tìm thấy tỉnh/thành phù hợp"
                  loadingText="Đang tải danh sách tỉnh/thành..."
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      "& fieldset": { borderColor: "#e5e7eb" },
                      "&:hover fieldset": { borderColor: GOLD },
                      "&.Mui-focused fieldset": { borderColor: GOLD, borderWidth: "1px" },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Tìm tỉnh/thành phố..."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <LocationOnIcon sx={{ fontSize: 18, color: GOLD, ml: 0.5, mr: 0.5 }} />
                        ),
                        endAdornment: (
                          <>
                            {provincesLoading ? <CircularProgress size={14} sx={{ color: GOLD }} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </div>

              {/* Câu 4: Diện tích mái */}
              <div>
                <p className="font-semibold text-sm mb-4" style={{ color: NAVY }}>
                  Câu 4. Diện tích mái (ước lượng) của bạn là bao nhiêu?
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIEN_TICH_OPTIONS.map((opt) => {
                    const active = dienTichMai === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleDienTichChange(opt.value)}
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
            </div>

            {/* ── Kết quả: nằm PHÍA TRÊN button, có fade + trượt nhẹ khi vào/ra ── */}
            {resultMounted && (
              <div
                className={`mt-8 pt-8 border-t border-gray-100 transition-all duration-300 ease-out ${
                  resultEntered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-6">
                  ─── Kết quả ước tính ───
                </p>

                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Công suất hệ thống đề xuất</p>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-extrabold" style={{ color: NAVY }}>{result.congSuatDeXuat}</span>
                      <span className="text-xl font-bold pb-1" style={{ color: GOLD }}>kWp</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      Phù hợp với nhu cầu sử dụng điện hiện tại{khuVuc ? ` tại ${khuVuc.name}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <SavingsIcon sx={{ fontSize: 15, color: GOLD }} /> Tiết kiệm mỗi tháng
                      </span>
                      <span className="font-bold text-sm" style={{ color: NAVY }}>{formatVNDShort(result.tietKiem)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <AccessTimeIcon sx={{ fontSize: 15, color: GOLD }} /> Thời gian hoàn vốn
                      </span>
                      <span className="font-bold text-sm" style={{ color: NAVY }}>≈ {result.hoanVon}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <NatureIcon sx={{ fontSize: 15, color: GOLD }} /> Giảm phát thải CO₂
                      </span>
                      <span className="font-bold text-sm" style={{ color: NAVY }}>≈ {result.co2.toFixed(1)} tấn/năm</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <RoofStatusBanner status={result.roofStatus} />
                </div>
              </div>
            )}

            {/* ── Button: crossfade mượt giữa 2 layout ── */}
            <div className="relative mt-9">
              {/* Layout A: "Tính toán kết quả" (idle/loading) */}
              <div
                className={`transition-all duration-300 ease-out ${
                  status === "done"
                    ? "absolute inset-0 opacity-0 scale-95 pointer-events-none"
                    : "relative opacity-100 scale-100"
                }`}
              >
                <Button
                  fullWidth
                  disabled={status === "loading"}
                  onClick={handleCalculate}
                  startIcon={status === "loading" ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <CalculateIcon />}
                  sx={{
                    backgroundColor: GOLD, color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                    textTransform: "none", borderRadius: "8px", py: 1.4,
                    boxShadow: `0 4px 20px ${GOLD}55`,
                    "&:hover": { backgroundColor: GOLD_DARK },
                    "&.Mui-disabled": { backgroundColor: GOLD, color: "#fff", opacity: 0.85 },
                    transition: "background-color 0.2s",
                  }}
                >
                  {status === "loading" ? LOADING_MESSAGES[loadingMsgIndex] : "Tính toán kết quả"}
                </Button>
              </div>

              {/* Layout B: "Gửi yêu cầu tư vấn" + "Tính lại" (done) */}
              <div
                className={`transition-all duration-300 ease-out ${
                  status === "done"
                    ? "relative opacity-100 scale-100"
                    : "absolute inset-0 opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/lien-he")}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      flex: 1,
                      backgroundColor: GOLD, color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                      textTransform: "none", borderRadius: "8px", py: 1.4,
                      boxShadow: `0 4px 20px ${GOLD}55`,
                      "&:hover": { backgroundColor: GOLD_DARK },
                    }}
                  >
                    Gửi yêu cầu tư vấn
                  </Button>
                  <Button
                    onClick={collapseResult}
                    startIcon={<ReplayIcon />}
                    variant="outlined"
                    sx={{
                      flexShrink: 0,
                      borderColor: "#d1d5db",
                      color: NAVY,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 2.5,
                      py: 1.4,
                      "&:hover": { borderColor: NAVY, backgroundColor: "rgba(13,33,55,0.04)" },
                    }}
                  >
                    Tính lại
                  </Button>
                </div>
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
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white border border-gray-100 p-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}>
                {f.icon}
              </span>
              <div>
                <p className="font-semibold text-xs mb-0.5" style={{ color: NAVY }}>{f.title}</p>
                <p className="text-gray-500 text-[11px] leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}