// ============================================================
// pageSeo.ts — Tiêu đề và mô tả hiển thị trên Google cho từng trang
// ------------------------------------------------------------
// Giữ tiêu đề dưới ~60 ký tự và mô tả trong khoảng 120–160 ký tự;
// dài hơn Google sẽ cắt bớt khi hiện kết quả tìm kiếm.
// Mỗi trang PHẢI có tiêu đề khác nhau — trùng tiêu đề là lý do phổ biến
// nhất khiến Google không sinh sitelinks cho website.
// ============================================================

export const pageSeo = {
  home: {
    title: "VIETHUNGSOLAR — Điện năng lượng mặt trời trọn gói",
    description:
      "Tư vấn, thiết kế và thi công điện mặt trời cho hộ gia đình, doanh nghiệp, nhà xưởng và trang trại. Thiết bị chính hãng, bảo hành dài hạn, báo giá minh bạch.",
  },
  products: {
    title: "Sản phẩm điện mặt trời chính hãng",
    description:
      "Tấm pin, inverter hoà lưới và hybrid, pin lưu trữ từ LONGi, JA Solar, GoodWe, SolaX, INVT, Lithium Valley. Đầy đủ CO, CQ và datasheet kỹ thuật.",
  },
  projects: {
    title: "Dự án điện mặt trời đã bàn giao",
    description:
      "Công trình điện mặt trời VIETHUNGSOLAR đã thi công: nhà xưởng, toà nhà văn phòng, trung tâm đào tạo và hộ gia đình tại TP.HCM, Bình Dương, Đồng Nai.",
  },
  solutions: {
    title: "Giải pháp điện mặt trời theo từng nhu cầu",
    description:
      "So sánh hệ hoà lưới, hybrid, off-grid và ESS + EMS cho hộ gia đình, doanh nghiệp, nhà máy và nông nghiệp. Chọn đúng cấu hình trước khi đầu tư.",
  },
  about: {
    title: "Giới thiệu VIETHUNGSOLAR",
    description:
      "VIETHUNGSOLAR chuyên tư vấn, thiết kế và thi công hệ thống điện năng lượng mặt trời. Quy trình 5 bước minh bạch từ khảo sát đến bàn giao và bảo hành.",
  },
  contact: {
    title: "Liên hệ nhận khảo sát miễn phí",
    description:
      "Liên hệ VIETHUNGSOLAR: 189/1C, Phường Lái Thiêu, TP. Hồ Chí Minh. Hotline 0931 227 668. Nhận khảo sát và tư vấn giải pháp điện mặt trời miễn phí.",
  },
} as const;

/** Cắt mô tả về đúng độ dài Google hiển thị, cắt theo từ cho khỏi cụt chữ. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
