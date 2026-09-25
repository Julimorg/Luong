// ============================================================
// solarCalculatorConfig.ts — Công thức tính tiết kiệm điện mặt trời
// ------------------------------------------------------------
// Toàn bộ hệ số, biểu giá và công thức trong file này lấy theo tài liệu
// "BẢNG TÍNH.docx" (documents/dashboard-documents), phiên bản giả định 2026.
// Muốn chỉnh giá điện / suất đầu tư / tỉ lệ bù, chỉ cần sửa ở đây.
// ============================================================

export const CALC_CONFIG = {
  /** Thuế VAT áp cho giá điện. */
  vatRate: 0.08,

  /** Tỉ lệ sản lượng điện mặt trời đặt mục tiêu bù cho nhu cầu tiêu thụ. */
  offsetRatio: {
    household: 0.8,
    production: 0.7,
    business: 0.7,
    farm: 0.7,
  },

  /** Sản lượng giả định của 1 kWp trong 1 ngày. */
  dailyYieldPerKwp: 4, // kWh/kWp/ngày
  /** Hiệu suất hệ thống (tổn hao dây, inverter, bụi bẩn, nhiệt độ). */
  systemPerformanceRatio: 0.9,
  daysPerMonth: 30,

  /** 1 kWp = 4 × 90% × 30 = 108 kWh/tháng. */
  monthlyYieldPerKwp: 4 * 0.9 * 30,

  /** Suất đầu tư ước tính. */
  systemCostPerKwp: 13_000_000, // VND/kWp

  /** Công suất đề xuất luôn làm tròn LÊN theo bước này. */
  powerRoundStep: 0.5,

  /** Khung giờ vận hành mặc định của nhà xưởng / doanh nghiệp (theo TOU 2026). */
  operatingHours: {
    start: "06:00",
    end: "18:00",
    normalHours: 11.5, // 06:00 – 17:30
    peakHours: 0.5, // 17:30 – 18:00
    lowHours: 0,
  },
} as const;

export type CustomerType = "household" | "production" | "business" | "farm";

// ─── A. Biểu giá bậc thang hộ gia đình ────────────────────────────
interface HouseholdTier {
  /** Số kWh của bậc (Infinity = bậc cuối). */
  limit: number;
  priceBeforeVat: number;
  priceWithVat: number;
}

const withVat = (price: number) => price * (1 + CALC_CONFIG.vatRate);

export const HOUSEHOLD_RATES: HouseholdTier[] = [
  { limit: 50, priceBeforeVat: 1984, priceWithVat: withVat(1984) }, // 2.142,72
  { limit: 50, priceBeforeVat: 2050, priceWithVat: withVat(2050) }, // 2.214,00
  { limit: 100, priceBeforeVat: 2380, priceWithVat: withVat(2380) }, // 2.570,40
  { limit: 100, priceBeforeVat: 2998, priceWithVat: withVat(2998) }, // 3.237,84
  { limit: 100, priceBeforeVat: 3350, priceWithVat: withVat(3350) }, // 3.618,00
  { limit: Infinity, priceBeforeVat: 3460, priceWithVat: withVat(3460) }, // 3.736,80
];

/** kWh → tiền điện (đã gồm VAT), tính lũy tiến theo bậc. */
export function calculateHouseholdBill(kwh: number): number {
  let remaining = kwh;
  let bill = 0;
  for (const tier of HOUSEHOLD_RATES) {
    if (remaining <= 0) break;
    const used = Math.min(remaining, tier.limit);
    bill += used * tier.priceWithVat;
    remaining -= used;
  }
  return bill;
}

/** Tiền điện → kWh (nghịch đảo của bảng bậc thang ở trên). */
export function householdBillToKwh(monthlyBill: number): number {
  const thresholds = [
    { maxBill: 107_136, baseKwh: 0, baseBill: 0, rate: 2142.72 },
    { maxBill: 217_836, baseKwh: 50, baseBill: 107_136, rate: 2214.0 },
    { maxBill: 474_876, baseKwh: 100, baseBill: 217_836, rate: 2570.4 },
    { maxBill: 798_660, baseKwh: 200, baseBill: 474_876, rate: 3237.84 },
    { maxBill: 1_160_460, baseKwh: 300, baseBill: 798_660, rate: 3618.0 },
  ];
  for (const tier of thresholds) {
    if (monthlyBill <= tier.maxBill) {
      return tier.baseKwh + (monthlyBill - tier.baseBill) / tier.rate;
    }
  }
  // Trên 400 kWh
  return 400 + (monthlyBill - 1_160_460) / 3736.8;
}

// ─── B & C. Giá điện nhà xưởng / doanh nghiệp ─────────────────────
// Không biết cấp điện áp của khách nên lấy trung bình các cấp, rồi quy về
// một mức giá đại diện cho khung giờ vận hành 06:00–18:00.
const PRODUCTION_AVG_WITH_VAT = { normal: 2033.1, low: 1314.9, peak: 3729.24 };
const BUSINESS_AVG_WITH_VAT = { normal: 3292.92, low: 1928.16, peak: 5633.64 };

function effectiveRate(rates: { normal: number; low: number; peak: number }) {
  const { normalHours, peakHours, lowHours } = CALC_CONFIG.operatingHours;
  const total = normalHours + peakHours + lowHours;
  return (
    (rates.normal * normalHours + rates.peak * peakHours + rates.low * lowHours) / total
  );
}

/** 2.103,7725 đ/kWh — chỉ làm tròn khi hiển thị, không làm tròn khi tính. */
export const PRODUCTION_RATE = effectiveRate(PRODUCTION_AVG_WITH_VAT);
/** 3.390,45 đ/kWh */
export const BUSINESS_RATE = effectiveRate(BUSINESS_AVG_WITH_VAT);

// ─── D. Làm tròn công suất ────────────────────────────────────────
export function roundUpPower(value: number): number {
  const step = CALC_CONFIG.powerRoundStep;
  return Math.ceil(value / step) * step;
}

// ─── Kết quả tính toán ────────────────────────────────────────────
export interface SolarCalcResult {
  /** Điện năng tiêu thụ ước tính mỗi tháng (kWh). */
  energy: number;
  /** Lượng điện ĐẶT MỤC TIÊU bù bằng điện mặt trời (theo offsetRatio). */
  targetOffsetEnergy: number;
  /** Sản lượng hệ PV đề xuất thực sự tạo ra mỗi tháng (kWh). */
  solarProduction: number;
  /** Lượng điện THỰC SỰ được bù — không vượt quá sản lượng hệ tạo ra. */
  actualOffsetEnergy: number;
  /** Phần còn phải mua từ lưới. */
  remainingEnergy: number;
  rawPower: number;
  /** Công suất đề xuất, đã làm tròn lên bước 0,5 kWp. */
  recommendedPower: number;
  /** Giá điện đại diện (chỉ có với nhà xưởng / doanh nghiệp / trang trại). */
  effectiveElectricityRate?: number;
  currentBill: number;
  billAfterSolar: number;
  monthlySaving: number;
  annualSaving: number;
  investment: number;
  paybackYears: number;
}

/**
 * Phần dùng chung của mọi nhóm khách: từ lượng điện tiêu thụ suy ra công
 * suất đề xuất và lượng điện thực sự được bù.
 *
 * Bước chặn `Math.min` là lưới an toàn: hệ thống không được phép tiết kiệm
 * nhiều hơn lượng điện nó thực sự tạo ra. Vì công suất luôn làm tròn LÊN nên
 * sản lượng luôn ≥ mục tiêu, thực tế mức chặn này chưa bao giờ cắt — nhưng
 * giữ lại để nếu sau này đổi cách làm tròn thì kết quả vẫn không bị ảo.
 */
function sizeSystem(energy: number, offsetRatio: number) {
  const targetOffsetEnergy = energy * offsetRatio;

  const rawPower = targetOffsetEnergy / CALC_CONFIG.monthlyYieldPerKwp;
  const recommendedPower = roundUpPower(rawPower);

  const solarProduction = recommendedPower * CALC_CONFIG.monthlyYieldPerKwp;
  const actualOffsetEnergy = Math.min(targetOffsetEnergy, solarProduction);
  const remainingEnergy = Math.max(0, energy - actualOffsetEnergy);

  return {
    targetOffsetEnergy,
    rawPower,
    recommendedPower,
    solarProduction,
    actualOffsetEnergy,
    remainingEnergy,
    investment: recommendedPower * CALC_CONFIG.systemCostPerKwp,
  };
}

/** Ghép phần tiền bạc vào kết quả sau khi đã biết hoá đơn còn lại. */
function finish(
  monthlyBill: number,
  billAfterSolar: number,
  sized: ReturnType<typeof sizeSystem>,
  energy: number,
  rate?: number,
): SolarCalcResult {
  const monthlySaving = monthlyBill - billAfterSolar;
  const annualSaving = monthlySaving * 12;
  return {
    energy,
    ...sized,
    effectiveElectricityRate: rate,
    currentBill: monthlyBill,
    billAfterSolar,
    monthlySaving,
    annualSaving,
    paybackYears: sized.investment / annualSaving,
  };
}

// ─── Hộ gia đình: tính lại hoá đơn theo biểu giá bậc thang ────────
export function calculateHousehold(monthlyBill: number): SolarCalcResult {
  const energy = householdBillToKwh(monthlyBill);
  const sized = sizeSystem(energy, CALC_CONFIG.offsetRatio.household);
  const billAfterSolar = calculateHouseholdBill(sized.remainingEnergy);
  return finish(monthlyBill, billAfterSolar, sized, energy);
}

// ─── Nhà xưởng / doanh nghiệp / trang trại: giá điện phẳng theo khung giờ ──
function calculateFlatRate(
  monthlyBill: number,
  rate: number,
  offsetRatio: number,
): SolarCalcResult {
  const energy = monthlyBill / rate;
  const sized = sizeSystem(energy, offsetRatio);
  const billAfterSolar = sized.remainingEnergy * rate;
  return finish(monthlyBill, billAfterSolar, sized, energy, rate);
}

export const calculateProduction = (monthlyBill: number) =>
  calculateFlatRate(monthlyBill, PRODUCTION_RATE, CALC_CONFIG.offsetRatio.production);

export const calculateBusiness = (monthlyBill: number) =>
  calculateFlatRate(monthlyBill, BUSINESS_RATE, CALC_CONFIG.offsetRatio.business);

/** Trang trại / nông nghiệp — dùng biểu giá sản xuất, tỉ lệ bù riêng. */
export const calculateFarm = (monthlyBill: number) =>
  calculateFlatRate(monthlyBill, PRODUCTION_RATE, CALC_CONFIG.offsetRatio.farm);

// ─── Hàm chung cho toàn website ───────────────────────────────────
export function calculateSolar({
  customerType,
  monthlyBill,
}: {
  customerType: CustomerType;
  monthlyBill: number;
}): SolarCalcResult {
  switch (customerType) {
    case "household":
      return calculateHousehold(monthlyBill);
    case "production":
      return calculateProduction(monthlyBill);
    case "business":
      return calculateBusiness(monthlyBill);
    case "farm":
      return calculateFarm(monthlyBill);
    default:
      throw new Error("Invalid customer type");
  }
}

/** Map loại công trình hiển thị trên giao diện sang nhóm biểu giá. */
export const CUSTOMER_TYPE_MAP: Record<string, CustomerType> = {
  "Nhà ở": "household",

  "Nhà xưởng": "production",
  "Nhà máy": "production",
  "Công nghiệp": "production",

  "Văn phòng": "business",
  "Doanh nghiệp": "business",
  "Kinh doanh": "business",

  "Trang trại": "farm",
  "Nông nghiệp": "farm",
};

/** Dòng ghi chú bắt buộc hiển thị kèm kết quả. */
export const CALC_DISCLAIMER =
  "Kết quả mang tính ước tính, dựa trên mức sử dụng điện, biểu giá điện hiện hành và giả định sản lượng điện mặt trời trung bình. Để có số liệu chính xác, vui lòng để đội ngũ kỹ thuật VIETHUNGSOLAR khảo sát thực tế.";
