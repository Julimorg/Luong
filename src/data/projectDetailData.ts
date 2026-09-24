// ============================================================
// projectDetailData.ts — Chi tiết từng dự án
// Sinh tự động từ documents/duAn-documents bằng scripts/duan.py.
// Sửa hồ sơ Word rồi chạy lại script, không sửa tay file này.
// ============================================================

export interface ProjectStat {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  /** Ảnh minh hoạ cạnh phần Tổng quan dự án. */
  overviewImage?: string;
  location: string;
  capacity: string;
  status: "Hoàn thành" | "Đang thi công";
  /** Mốc bàn giao, hoặc "Đang triển khai" khi hồ sơ chưa chốt ngày. */
  completedAt?: string;
  client: string;
  /** Các con số hồ sơ có nêu — không có thì bỏ trống, không suy đoán. */
  stats?: ProjectStat[];
  overview: string;
  /** Loại hình dự án theo hồ sơ, VD "Điện mặt trời áp mái thương mại". */
  projectKind?: string;
  /** Tên công trình khi khác tên khách hàng. */
  building?: string;
  storage?: string;
  /** Hai dòng chữ hồ sơ ghi để hiển thị đè lên ảnh lớn. */
  highlightTitle?: string;
  highlightText?: string;
  equipment?: string[];
  gallery?: string[];
}

export const projectDetails: Record<number, ProjectDetail> = {

  1: {
    id: 1,
    title: "Nhà xưởng Hiếu Linh – Bình Dương",
    subtitle: "Giải pháp điện mặt trời cho nhà xưởng quy mô lớn",
    heroImage: "/du-an/nha-xuong-hieu-linh/tong.webp",
    overviewImage: "/du-an/nha-xuong-hieu-linh/phu-1.webp",
    location: "Bình Dương",
    capacity: "1 MWp",
    status: "Hoàn thành",
    completedAt: "Tháng 12/2020",
    client: "Công ty TNHH Thương Mại Và Xây Dựng Hiếu Linh",
    stats: [
      { label: "Công suất lắp đặt", value: "1", unit: "MWp" },
      { label: "Số tấm pin", value: "2.200", unit: "tấm" },
      { label: "Số inverter", value: "11", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái 1 MWp tại Bình Dương được triển khai trên hệ mái tôn của nhà xưởng quy mô lớn, hướng đến tối ưu nguồn điện sử dụng cho hoạt động sản xuất vào ban ngày. Hệ thống sử dụng 2.200 tấm pin Qcells công suất 450Wp kết hợp 11 inverter SMA Sunny Tripower 60 – STP 60-10, tạo thành giải pháp điện mặt trời công nghiệp đồng bộ, phù hợp với mô hình nhà xưởng có nhu cầu tiêu thụ điện lớn và ổn định trong giờ nắng.",
    projectKind: "Điện mặt trời áp mái nhà xưởng",
    highlightTitle: "Giải pháp điện mặt trời cho nhà xưởng quy mô lớn",
    highlightText: "Tối ưu nguồn điện ban ngày, nâng cao hiệu quả sử dụng năng lượng cho hoạt động sản xuất",
    equipment: [
      "Hệ thống áp mái 1 MWp trên nhà xưởng mái tôn",
      "11 inverter SMA Sunny Tripower 60 – STP 60-10",
      "2.200 tấm pin Qcells 450Wp",
    ],
    gallery: [
      "/du-an/nha-xuong-hieu-linh/phu-1.webp",
      "/du-an/nha-xuong-hieu-linh/phu-2.webp",
      "/du-an/nha-xuong-hieu-linh/phu-3.webp",
    ],
  },

  2: {
    id: 2,
    title: "Nhà hàng Song Phát 2 – Bình Dương",
    subtitle: "Giải pháp điện mặt trời cho công trình thương mại quy mô lớn",
    heroImage: "/du-an/nha-hang-song-phat-2/tong.webp",
    overviewImage: "/du-an/nha-hang-song-phat-2/phu-1.webp",
    location: "Bình Dương",
    capacity: "220 kWp",
    status: "Hoàn thành",
    completedAt: "12/2020",
    client: "Nhà hàng Song Phát 2",
    stats: [
      { label: "Công suất lắp đặt", value: "220", unit: "kWp" },
      { label: "Số tấm pin", value: "518", unit: "tấm" },
      { label: "Số inverter", value: "02", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái Nhà hàng Song Phát 2 có quy mô khoảng 220 kWp, được triển khai trên diện tích mái lớn của công trình nhằm tận dụng nguồn năng lượng mặt trời phục vụ nhu cầu sử dụng điện trong quá trình vận hành. Hệ thống sử dụng khoảng 518 tấm pin Qcells công suất 425Wp kết hợp 02 inverter Sungrow SG110CX công suất 110 kW, tạo thành hệ thống điện mặt trời hòa lưới phù hợp cho công trình thương mại có nhu cầu tiêu thụ điện lớn vào ban ngày. Giải pháp giúp khai thác hiệu quả diện tích mái, giảm lượng điện mua từ lưới và tối ưu chi phí vận hành.",
    projectKind: "Điện mặt trời áp mái thương mại",
    building: "Nhà hàng Song Phát 2",
    highlightTitle: "Giải pháp điện mặt trời cho công trình thương mại quy mô lớn",
    highlightText: "Tận dụng diện tích mái – tối ưu nguồn điện sử dụng ban ngày",
    equipment: [
      "Hệ thống điện mặt trời áp mái 220 kWp",
      "02 inverter Sungrow SG110CX – 110 kW",
      "518 tấm pin Qcells 425Wp",
    ],
    gallery: [
      "/du-an/nha-hang-song-phat-2/phu-1.webp",
      "/du-an/nha-hang-song-phat-2/phu-2.webp",
    ],
  },

  3: {
    id: 3,
    title: "Hộ gia đình – Lái Thiêu, TP.HCM",
    subtitle: "Điện mặt trời áp mái có lưu trữ",
    heroImage: "/du-an/ho-gia-dinh/tong.webp",
    overviewImage: "/du-an/ho-gia-dinh/phu-1.webp",
    location: "Lái Thiêu, TP.HCM",
    capacity: "10 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 07/2026",
    client: "Công trình dân dụng tại Lái Thiêu",
    stats: [
      { label: "Công suất lắp đặt", value: "10", unit: "kWp" },
      { label: "Số tấm pin", value: "16", unit: "tấm" },
      { label: "Số inverter", value: "01", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái 10 kWp tại Lái Thiêu, TP.HCM được triển khai nhằm tận dụng nguồn điện mặt trời ban ngày, nâng cao hiệu quả sử dụng điện và tăng tính chủ động về năng lượng cho công trình. Hệ thống sử dụng 16 tấm pin TCL Solar công suất 625Wp, kết hợp 01 inverter GoodWe ES Uniq 6 kW và 01 pin lưu trữ GoodWe Lynx A G4 16,1 kWh. Giải pháp giúp tăng tỷ lệ tự sử dụng điện mặt trời, lưu trữ phần điện dư để dùng khi cần và hỗ trợ nguồn điện dự phòng cho các tải phù hợp.",
    projectKind: "Điện mặt trời áp mái có lưu trữ",
    equipment: [
      "Hệ thống áp mái 10 kWp kết hợp lưu trữ 16,1 kWh",
      "01 inverter GoodWe ES Uniq 6 kW",
      "16 tấm pin TCL Solar 625Wp",
      "01 pin lưu trữ GoodWe Lynx A G4 16,1 kWh",
    ],
    gallery: [
      "/du-an/ho-gia-dinh/phu-1.webp",
    ],
  },

  4: {
    id: 4,
    title: "Trung tâm Đào tạo TOIDM Education – Thủ Đức, TP.HCM",
    subtitle: "Giải pháp điện mặt trời kết hợp lưu trữ trên hệ khung sắt",
    heroImage: "/du-an/trung-tam-dao-tao-toidm-education/tong.webp",
    overviewImage: "/du-an/trung-tam-dao-tao-toidm-education/phu-1.webp",
    location: "Thủ Đức, TP.HCM",
    capacity: "10 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 05/2026",
    client: "Trung tâm Đào tạo TOIDM Education",
    stats: [
      { label: "Công suất lắp đặt", value: "10", unit: "kWp" },
      { label: "Số tấm pin", value: "16", unit: "tấm" },
      { label: "Dung lượng lưu trữ", value: "16", unit: "kWh" },
      { label: "Số inverter", value: "01", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời 10 kWp tại Trung tâm Đào tạo TOIDM Education – Thủ Đức, TP.HCM được triển khai trên hệ khung sắt riêng biệt, giúp tận dụng không gian phía trên công trình để bố trí hệ thống điện mặt trời mà không lắp trực tiếp lên mái. Hệ thống sử dụng 16 tấm pin TCL Solar công suất 625Wp, kết hợp 01 inverter Hybrid GoodWe 6 kW và 01 pin lưu trữ Lithium Valley 16 kWh. Giải pháp giúp tận dụng nguồn điện mặt trời vào ban ngày, lưu trữ phần điện dư để sử dụng khi cần và tăng khả năng chủ động nguồn điện cho hoạt động của trung tâm.",
    projectKind: "Điện mặt trời khung sắt có lưu trữ",
    storage: "16 kWh",
    highlightTitle: "Giải pháp điện mặt trời kết hợp lưu trữ trên hệ khung sắt",
    highlightText: "Tận dụng không gian hiệu quả, lưu trữ năng lượng và chủ động nguồn điện cho hoạt động đào tạo",
    equipment: [
      "Hệ thống điện mặt trời 10 kWp lắp đặt trên khung sắt",
      "01 inverter GoodWe ES Uniq 6 kW",
      "01 pin lưu trữ Lithium Valley W16-5A 16 kWh",
      "16 tấm pin TCL Solar 625Wp",
    ],
    gallery: [
      "/du-an/trung-tam-dao-tao-toidm-education/phu-1.webp",
      "/du-an/trung-tam-dao-tao-toidm-education/phu-2.webp",
    ],
  },

  5: {
    id: 5,
    title: "Trung tâm Đào tạo Horizon – Dĩ An, TP.HCM",
    subtitle: "Giải pháp điện mặt trời kết hợp lưu trữ cho trung tâm đào tạo",
    heroImage: "/du-an/trung-tam-dao-tao-horizon/tong.webp",
    overviewImage: "/du-an/trung-tam-dao-tao-horizon/phu-1.webp",
    location: "Dĩ An, TP.HCM",
    capacity: "10 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 06/2026",
    client: "Trung tâm Đào tạo Horizon",
    stats: [
      { label: "Công suất lắp đặt", value: "10", unit: "kWp" },
      { label: "Số tấm pin", value: "16", unit: "tấm" },
      { label: "Dung lượng lưu trữ", value: "32", unit: "kWh" },
      { label: "Số inverter", value: "01", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái 10 kWp tại Trung tâm Đào tạo Horizon – Dĩ An, TP.HCM được triển khai nhằm tận dụng nguồn điện mặt trời ban ngày và tăng khả năng chủ động năng lượng cho hoạt động của trung tâm. Hệ thống sử dụng 16 tấm pin TCL Solar công suất 625Wp, kết hợp 01 inverter Hybrid GoodWe 10 kW và 02 pin lưu trữ Lithium Valley 16 kWh, cung cấp tổng dung lượng lưu trữ khoảng 32 kWh. Giải pháp giúp tăng tỷ lệ tự sử dụng điện mặt trời, lưu trữ điện dư để sử dụng ngoài giờ nắng và hỗ trợ nguồn điện dự phòng cho các tải phù hợp.",
    projectKind: "Điện mặt trời áp mái có lưu trữ",
    storage: "32 kWh",
    highlightTitle: "Giải pháp điện mặt trời kết hợp lưu trữ cho trung tâm đào tạo",
    highlightText: "Tận dụng điện mặt trời ban ngày, lưu trữ năng lượng và chủ động nguồn điện khi cần",
    equipment: [
      "Hệ thống điện mặt trời áp mái 10 kWp kết hợp lưu trữ 32 kWh",
      "01 inverter GoodWe ES Uniq 10 kW",
      "02 pin lưu trữ Lithium Valley W16-5A 16 kWh",
      "16 tấm pin TCL Solar 625Wp",
    ],
    gallery: [
      "/du-an/trung-tam-dao-tao-horizon/phu-1.webp",
      "/du-an/trung-tam-dao-tao-horizon/phu-2.webp",
    ],
  },

  6: {
    id: 6,
    title: "Nhà xưởng Hiệp Hòa Phát – Đồng Nai",
    subtitle: "Giải pháp điện mặt trời áp mái quy mô lớn cho nhà xưởng",
    heroImage: "/du-an/nha-xuong-hiep-hoa-phat/tong.webp",
    overviewImage: "/du-an/nha-xuong-hiep-hoa-phat/phu-1.webp",
    location: "Đồng Nai",
    capacity: "1,5 MWp",
    status: "Đang thi công",
    completedAt: "Đang triển khai",
    client: "Đang cập nhật",
    stats: [
      { label: "Công suất lắp đặt", value: "1,5", unit: "MWp" },
      { label: "Số tấm pin", value: "2.290", unit: "tấm" },
      { label: "Số inverter", value: "15", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái tại Nhà xưởng CP TTNT Hiệp Hòa Phát – Đồng Nai đang trong quá trình triển khai, với quy mô dự kiến khoảng 1,5 MWp. Hệ thống được thiết kế nhằm tận dụng diện tích mái nhà xưởng, bổ sung nguồn điện phục vụ hoạt động sản xuất ban ngày và hỗ trợ doanh nghiệp tối ưu chi phí điện năng. Theo phương án thiết kế sơ bộ, hệ thống dự kiến sử dụng khoảng 2.290 tấm pin TCL Solar công suất 655Wp kết hợp khoảng 15 inverter GoodWe. Số lượng inverter, cách chia chuỗi và công suất thực tế sẽ được chốt sau khi hoàn tất thiết kế kỹ thuật và khảo sát điều kiện thi công.",
    projectKind: "Điện mặt trời áp mái nhà xưởng",
    highlightTitle: "Giải pháp điện mặt trời áp mái quy mô lớn cho nhà xưởng",
    highlightText: "Dự kiến khai thác hiệu quả diện tích mái, tối ưu nguồn điện ban ngày và nâng cao hiệu quả vận hành",
    equipment: [
      "Hệ thống điện mặt trời áp mái dự kiến khoảng 1,5 MWp",
      "Khoảng 15 inverter GoodWe – cấu hình đang hoàn thiện",
      "Khoảng 2.290 tấm pin TCL Solar 655Wp",
    ],
    gallery: [
      "/du-an/nha-xuong-hiep-hoa-phat/phu-1.webp",
      "/du-an/nha-xuong-hiep-hoa-phat/phu-2.webp",
    ],
  },

  7: {
    id: 7,
    title: "Tòa nhà văn phòng TP.HCM 85 kWp",
    subtitle: "Giải pháp điện mặt trời cho tòa nhà văn phòng",
    heroImage: "/du-an/toa-nha-van-phong-tp-hcm/tong.webp",
    overviewImage: "/du-an/toa-nha-van-phong-tp-hcm/phu-1.webp",
    location: "TP.HCM",
    capacity: "85 kWp",
    status: "Đang thi công",
    completedAt: "Đang triển khai",
    client: "Đang cập nhật",
    stats: [
      { label: "Công suất lắp đặt", value: "85", unit: "kWp" },
      { label: "Số tấm pin", value: "132", unit: "tấm" },
      { label: "Số inverter", value: "01", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời tại tòa nhà văn phòng TP.HCM đang trong quá trình triển khai, với quy mô dự kiến khoảng 85 kWp. Hệ thống được thiết kế nhằm tận dụng không gian mái tòa nhà để bổ sung nguồn điện phục vụ các phụ tải hoạt động chủ yếu vào ban ngày, góp phần giảm lượng điện mua từ lưới và tối ưu chi phí vận hành. Theo phương án thiết kế sơ bộ, hệ thống dự kiến sử dụng khoảng 132 tấm pin TCL Solar công suất 645Wp kết hợp 01 inverter INVT công suất khoảng 60 kW. Số lượng tấm pin, model inverter và cấu hình chuỗi thực tế sẽ được hoàn thiện sau khi chốt phương án kỹ thuật và điều kiện thi công.",
    projectKind: "Điện mặt trời áp mái tòa nhà văn phòng",
    highlightTitle: "Giải pháp điện mặt trời cho tòa nhà văn phòng",
    highlightText: "Tận dụng không gian mái, tối ưu nguồn điện sử dụng ban ngày và nâng cao hiệu quả vận hành",
    equipment: [
      "Hệ thống điện mặt trời dự kiến khoảng 85 kWp",
      "Khoảng 01 inverter INVT công suất 60 kW",
      "Khoảng 132 tấm pin TCL Solar 645Wp",
    ],
    gallery: [
      "/du-an/toa-nha-van-phong-tp-hcm/phu-1.webp",
      "/du-an/toa-nha-van-phong-tp-hcm/phu-2.webp",
    ],
  },

  8: {
    id: 8,
    title: "Tòa nhà văn phòng TP.HCM 40 kWp",
    subtitle: "Giải pháp điện mặt trời cho tòa nhà văn phòng",
    heroImage: "/du-an/toa-nha-van-phong-tp-hcm/tong.webp",
    overviewImage: "/du-an/toa-nha-van-phong-tp-hcm/phu-1.webp",
    location: "TP.HCM",
    capacity: "40 kWp",
    status: "Đang thi công",
    completedAt: "Đang triển khai",
    client: "Tòa nhà văn phòng tại TP.HCM",
    stats: [
      { label: "Công suất lắp đặt", value: "40", unit: "kWp" },
      { label: "Số tấm pin", value: "62", unit: "tấm" },
      { label: "Số inverter", value: "01", unit: "bộ" },
    ],
    overview:
      "Dự án điện mặt trời áp mái tại tòa nhà văn phòng TP.HCM đang trong quá trình triển khai, với quy mô dự kiến khoảng 40 kWp. Hệ thống được thiết kế nhằm tận dụng diện tích mái tòa nhà, bổ sung nguồn điện phục vụ các phụ tải hoạt động chủ yếu vào ban ngày và hỗ trợ tối ưu chi phí điện năng. Theo phương án thiết kế sơ bộ, hệ thống dự kiến sử dụng khoảng 62 tấm pin TCL Solar công suất 645Wp kết hợp 01 inverter INVT công suất khoảng 30 kW. Số lượng tấm pin, model inverter, cách chia chuỗi và cấu hình thực tế sẽ được chốt sau khi hoàn thiện phương án kỹ thuật và điều kiện thi công.",
    projectKind: "Điện mặt trời áp mái tòa nhà văn phòng",
    highlightTitle: "Giải pháp điện mặt trời cho tòa nhà văn phòng",
    highlightText: "Tận dụng diện tích mái, tối ưu nguồn điện sử dụng ban ngày và nâng cao hiệu quả vận hành",
    equipment: [
      "Hệ thống điện mặt trời áp mái dự kiến khoảng 40 kWp",
      "Khoảng 01 inverter INVT công suất 30 kW",
      "Khoảng 62 tấm pin TCL Solar 645Wp",
    ],
    gallery: [
      "/du-an/toa-nha-van-phong-tp-hcm/phu-1.webp",
      "/du-an/toa-nha-van-phong-tp-hcm/phu-2.webp",
    ],
  },

};
