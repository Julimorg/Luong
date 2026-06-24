// ============================================================
// projectDetailData.ts — Chi tiết từng dự án
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
  overviewImage?: string; // ảnh tượng trưng cho phần Tổng quan dự án
  location: string;
  capacity: string;
  status: "Hoàn thành" | "Đang thi công";
  completedAt?: string; // "Tháng 3, 2023"
  client: string;
  stats: ProjectStat[]; // 4 con số nổi bật dưới hero
  overview: string; // đoạn mô tả tổng quan

  // ── Thông số kỹ thuật ──
  equipment: string[]; // Thiết bị sử dụng
  constructionTime: string; // Thời gian thi công

  // ── Thách thức / Giải pháp / Kết quả ──
  challenge: string; // Thách thức của dự án
  solutions: string[]; // Giải pháp của VIETHUNGSOLAR
  results: string[]; // Kết quả

  gallery: string[]; // ảnh gallery cuối trang
}

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Nhà máy May Việt Tân – Hưng Yên",
    subtitle: "Hệ thống điện mặt trời áp mái quy mô lớn cho ngành dệt may",
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    location: "Hưng Yên",
    capacity: "1.2 MWp",
    status: "Hoàn thành",
    completedAt: "Tháng 3, 2023",
    client: "Công ty May Việt Tân",
    stats: [
      { label: "Công suất lắp đặt", value: "1.2", unit: "MWp" },
      { label: "Sản lượng năm", value: "1,440", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "2.1", unit: "tỷ đ/năm" },
      { label: "CO₂ giảm thải", value: "720", unit: "tấn/năm" },
    ],
    overview:
      "Dự án lắp đặt hệ thống điện mặt trời áp mái 1.2 MWp tại nhà máy may Việt Tân — một trong những nhà máy dệt may lớn nhất tỉnh Hưng Yên. Toàn bộ hệ thống được thiết kế để tối ưu diện tích mái xưởng, giảm tải điện lưới trong giờ cao điểm và đạt công suất phát ổn định quanh năm.",
    equipment: [
      "~2.180 tấm pin JA Solar 550W",
      "Inverter Huawei trung thế 100kW",
      "Khung đỡ nhôm chống ăn mòn cho mái tôn sóng",
      "Hệ thống giám sát thông minh theo thời gian thực",
    ],
    constructionTime: "45 ngày",
    challenge:
      "Mái xưởng có kết cấu tôn sóng nghiêng nhiều hướng, đòi hỏi giải pháp khung đỡ tùy chỉnh; đồng thời phải thi công khi nhà máy vẫn vận hành sản xuất bình thường.",
    solutions: [
      "Khảo sát kết cấu mái chi tiết, tính tải trọng từng vùng",
      "Thiết kế khung đỡ tùy chỉnh tối ưu góc nghiêng",
      "Triển khai giám sát thông minh kết hợp inverter trung thế",
      "Thi công theo ca, đảm bảo an toàn lao động 100%",
    ],
    results: [
      "Hiệu suất vận hành duy trì trên 98% suốt vòng đời dự án",
      "Sản lượng đạt 1.440 MWh/năm — vượt 8% so với dự toán",
      "Tiết kiệm ~175 triệu đồng/tháng, hoàn vốn dự kiến ~4.5 năm",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
    ],
  },

  2: {
    id: 2,
    title: "Nhà máy Bao bì Tân Tiến – Bình Dương",
    subtitle: "Giải pháp năng lượng tái tạo cho ngành công nghiệp bao bì",
    heroImage: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    location: "Bình Dương",
    capacity: "2 MWp",
    status: "Hoàn thành",
    completedAt: "Tháng 6, 2023",
    client: "Công ty TNHH Bao bì Tân Tiến",
    stats: [
      { label: "Công suất lắp đặt", value: "2", unit: "MWp" },
      { label: "Sản lượng năm", value: "2,400", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "3.5", unit: "tỷ đ/năm" },
      { label: "CO₂ giảm thải", value: "1,200", unit: "tấn/năm" },
    ],
    overview:
      "Hệ thống điện mặt trời 2 MWp được lắp đặt trên toàn bộ diện tích mái nhà xưởng của Bao bì Tân Tiến, đáp ứng 60% nhu cầu điện năng sản xuất. Đây là một trong những dự án áp mái lớn nhất khu công nghiệp VSIP 2 tính đến thời điểm hoàn thành.",
    equipment: [
      "~3.640 tấm pin mono PERC 550W",
      "Inverter string công suất lớn",
      "Khung đỡ nhôm chống ăn mòn",
      "Nền tảng giám sát từ xa qua cloud",
    ],
    constructionTime: "50 ngày",
    challenge:
      "Phải tối ưu toàn bộ diện tích mái xưởng và tránh bóng đổ từ thiết bị cơ điện trên mái để đạt sản lượng phát điện cao nhất.",
    solutions: [
      "Khảo sát kết cấu mái, phân tích bức xạ theo từng góc phần tư trong ngày",
      "Mô phỏng 3D toàn bộ hệ thống trước thi công",
      "Tối ưu số tấm pin, tránh bóng đổ thiết bị cơ điện",
      "Tích hợp giám sát cloud + báo cáo hiệu suất tự động hàng tuần",
    ],
    results: [
      "Đáp ứng 60% nhu cầu điện năng sản xuất của nhà máy",
      "Sản lượng 2.400 MWh/năm, giảm 1.200 tấn CO₂/năm",
      "Một trong những dự án áp mái lớn nhất KCN VSIP 2",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    ],
  },

  3: {
    id: 3,
    title: "Trường Quốc tế Việt Úc – TP. HCM",
    subtitle: "Điện mặt trời xanh cho môi trường giáo dục hiện đại",
    heroImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    location: "TP. Hồ Chí Minh",
    capacity: "560 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 9, 2022",
    client: "Trường Quốc tế Việt Úc (VAS)",
    stats: [
      { label: "Công suất lắp đặt", value: "560", unit: "kWp" },
      { label: "Sản lượng năm", value: "672", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "980", unit: "triệu đ/năm" },
      { label: "CO₂ giảm thải", value: "336", unit: "tấn/năm" },
    ],
    overview:
      "Dự án điện mặt trời áp mái 560 kWp tại hệ thống Trường Quốc tế Việt Úc là ví dụ điển hình của cam kết xanh trong giáo dục. Hệ thống cung cấp điện cho toàn bộ hoạt động chiếu sáng, điều hòa và thiết bị học tập trong giờ cao điểm ban ngày.",
    equipment: [
      "Tấm pin all-black mono PERC",
      "Inverter hiệu suất cao cho điều kiện bức xạ thấp",
      "Màn hình hiển thị dữ liệu phát điện thời gian thực",
    ],
    constructionTime: "30 ngày",
    challenge:
      "Hệ thống pin phải hài hòa với kiến trúc tổng thể khuôn viên trường, không ảnh hưởng đến thẩm mỹ công trình.",
    solutions: [
      "Thiết kế tích hợp kiến trúc, dùng pin all-black đồng bộ",
      "Tối ưu hiệu suất trong điều kiện bức xạ thấp",
      "Lắp màn hình hiển thị dữ liệu phát điện tại sảnh chính",
      "Biến hệ thống thành công cụ giáo dục trực quan cho học sinh",
    ],
    results: [
      "Cấp điện cho chiếu sáng, điều hòa, thiết bị học tập giờ cao điểm",
      "Sản lượng 672 MWh/năm, giảm 336 tấn CO₂/năm",
      "Trở thành điểm nhấn cam kết xanh trong giáo dục",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },

  4: {
    id: 4,
    title: "Nhà máy Cà Phê Chính xác – Đồng Nai",
    subtitle: "Hệ thống năng lượng tái tạo 5 MWp cho ngành chế biến nông sản",
    heroImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=80",
    location: "Đồng Nai",
    capacity: "5 MWp",
    status: "Hoàn thành",
    completedAt: "Tháng 1, 2024",
    client: "Công ty CP Cà Phê Chính xác Việt Nam",
    stats: [
      { label: "Công suất lắp đặt", value: "5", unit: "MWp" },
      { label: "Sản lượng năm", value: "6,000", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "8.7", unit: "tỷ đ/năm" },
      { label: "CO₂ giảm thải", value: "3,000", unit: "tấn/năm" },
    ],
    overview:
      "Với quy mô 5 MWp, đây là một trong những dự án điện mặt trời áp mái công nghiệp lớn nhất tỉnh Đồng Nai. Hệ thống đáp ứng 75% tổng nhu cầu điện của toàn nhà máy chế biến cà phê, giúp doanh nghiệp chủ động nguồn điện và giảm phụ thuộc vào điện lưới trong mùa cao điểm.",
    equipment: [
      "Hơn 12.000 tấm pin trên 35.000 m² mái",
      "Inverter trung thế 10 kV đấu trực tiếp thanh cái nội bộ",
      "Tích hợp hệ thống SCADA của nhà máy",
    ],
    constructionTime: "90 ngày",
    challenge:
      "Triển khai quy mô rất lớn trên 8 mái nhà xưởng, cần giảm tổn thất đường dây và tích hợp vào hệ thống điện nội bộ của nhà máy.",
    solutions: [
      "Lắp >12.000 tấm pin trên tổng diện tích 35.000 m²",
      "Inverter trung thế 10 kV đấu trực tiếp vào thanh cái nội bộ",
      "Tích hợp toàn bộ dữ liệu vận hành vào hệ thống SCADA",
      "Cảnh báo sự cố gửi đến di động trong vòng 30 giây",
    ],
    results: [
      "Đáp ứng 75% tổng nhu cầu điện của nhà máy",
      "Hiệu suất tổng thể đạt 98.2%",
      "Nhận chứng nhận RE100 đầu tiên ngành cà phê Việt Nam",
      "Giảm 3.000 tấn CO₂/năm ~ trồng 150.000 cây xanh",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=600&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
    ],
  },

  5: {
    id: 5,
    title: "Tòa nhà văn phòng – Hà Nội",
    subtitle: "Điện mặt trời tích hợp cho tòa nhà thương mại hiện đại",
    heroImage: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    location: "Hà Nội",
    capacity: "220 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 5, 2023",
    client: "Tập đoàn Bất động sản Vinhomes",
    stats: [
      { label: "Công suất lắp đặt", value: "220", unit: "kWp" },
      { label: "Sản lượng năm", value: "264", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "385", unit: "triệu đ/năm" },
      { label: "CO₂ giảm thải", value: "132", unit: "tấn/năm" },
    ],
    overview:
      "Hệ thống điện mặt trời 220 kWp được tích hợp vào thiết kế mái tòa nhà văn phòng hạng A tại trung tâm Hà Nội. Điện được ưu tiên cấp cho hệ thống chiếu sáng và điều hòa tầng hầm, giảm đáng kể chi phí vận hành của ban quản lý tòa nhà.",
    equipment: [
      "Tấm pin BIPV tích hợp trực tiếp vào vật liệu mái",
      "Inverter kết nối hệ thống BMS tòa nhà",
      "Thuật toán dự báo thời tiết tối ưu vận hành",
    ],
    constructionTime: "35 ngày",
    challenge:
      "Tích hợp hệ thống vào mái tòa nhà hạng A — vừa phát điện vừa đảm bảo thẩm mỹ kiến trúc và tính năng chống thấm.",
    solutions: [
      "Áp dụng giải pháp BIPV thay lớp chống thấm thông thường",
      "Kết nối BMS, ưu tiên các tải có thể dịch chuyển được",
      "Dùng thuật toán dự báo thời tiết tối ưu lịch vận hành",
      "Đảm bảo thẩm mỹ kiến trúc và chống thấm công trình",
    ],
    results: [
      "Ưu tiên cấp điện chiếu sáng và điều hòa tầng hầm",
      "Sản lượng 264 MWh/năm, giảm 132 tấn CO₂/năm",
      "Giảm đáng kể chi phí vận hành cho ban quản lý tòa nhà",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    ],
  },

  6: {
    id: 6,
    title: "Biệt thự gia đình – Đà Nẵng",
    subtitle: "Hệ thống điện mặt trời kết hợp lưu trữ cho hộ gia đình cao cấp",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1200&q=80",
    location: "Đà Nẵng",
    capacity: "10 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 7, 2023",
    client: "Hộ gia đình (bảo mật thông tin)",
    stats: [
      { label: "Công suất lắp đặt", value: "10", unit: "kWp" },
      { label: "Sản lượng năm", value: "14.5", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "25", unit: "triệu đ/năm" },
      { label: "Pin lưu trữ", value: "20", unit: "kWh" },
    ],
    overview:
      "Hệ thống 10 kWp kết hợp pin lưu trữ 20 kWh giúp gia đình hoàn toàn độc lập khỏi điện lưới vào ban đêm và các ngày mưa. Đây là giải pháp điện mặt trời toàn diện nhất trong phân khúc hộ gia đình mà chúng tôi đã triển khai tại khu vực miền Trung.",
    equipment: [
      "Inverter hybrid on-grid / off-grid",
      "Hệ pin lưu trữ 20 kWh",
      "Ứng dụng điều khiển thông minh + kết nối nhà thông minh",
    ],
    constructionTime: "7 ngày",
    challenge:
      "Gia đình cần độc lập hoàn toàn khỏi điện lưới vào ban đêm và ngày mưa, kể cả trong các đợt cắt điện luân phiên.",
    solutions: [
      "Lắp inverter hybrid ưu tiên: điện mặt trời → nạp pin → bán/mua lưới",
      "Tích hợp pin lưu trữ 20 kWh đảm bảo nguồn dự phòng",
      "Ứng dụng di động theo dõi sản lượng, pin và chi phí",
      "Kết nối thiết bị nhà thông minh tự bật/tắt theo giá điện",
    ],
    results: [
      "Chủ động hoàn toàn nguồn điện kể cả khi cắt điện luân phiên",
      "Sản lượng 14.5 MWh/năm",
      "Giải pháp toàn diện nhất phân khúc hộ gia đình miền Trung",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    ],
  },

  7: {
    id: 7,
    title: "Khu công nghiệp VSIP – Bình Dương",
    subtitle: "Năng lượng xanh quy mô lớn cho khu công nghiệp quốc tế",
    heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&q=80",
    location: "Bình Dương",
    capacity: "8 MWp",
    status: "Hoàn thành",
    completedAt: "Tháng 11, 2023",
    client: "Ban Quản lý KCN VSIP Bình Dương",
    stats: [
      { label: "Công suất lắp đặt", value: "8", unit: "MWp" },
      { label: "Sản lượng năm", value: "9,600", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "14", unit: "tỷ đ/năm" },
      { label: "CO₂ giảm thải", value: "4,800", unit: "tấn/năm" },
    ],
    overview:
      "Dự án 8 MWp tại VSIP Bình Dương là hệ thống điện mặt trời áp mái lớn nhất trong khu công nghiệp có vốn đầu tư nước ngoài tại Việt Nam tính đến năm 2023. Dự án góp phần giúp các doanh nghiệp trong KCN đáp ứng tiêu chí ESG và mục tiêu phát thải ròng bằng 0.",
    equipment: [
      "Hệ thống áp mái 8 MWp trên nhiều nhà xưởng",
      "Hệ thống microgrid chia sẻ điện nội bộ KCN",
      "Chứng nhận I-REC cho toàn bộ sản lượng",
    ],
    constructionTime: "60 ngày (gồm thủ tục cấp phép & đấu nối)",
    challenge:
      "Triển khai trong KCN quốc tế đòi hỏi phối hợp chặt chẽ với ban quản lý VSIP, EVN và nhiều doanh nghiệp thuê xưởng.",
    solutions: [
      "Đảm nhiệm toàn bộ quy trình xin phép đến đấu nối lưới",
      "Xây dựng microgrid phân phối điện nội bộ giữa các xưởng",
      "Tối ưu sử dụng điện theo ca sản xuất của từng doanh nghiệp",
      "Chứng nhận I-REC hỗ trợ doanh nghiệp báo cáo RE100",
    ],
    results: [
      "Hệ thống áp mái lớn nhất KCN FDI tại Việt Nam (2023)",
      "Sản lượng 9.600 MWh/năm, giảm 4.800 tấn CO₂/năm",
      "Giúp doanh nghiệp đáp ứng tiêu chí ESG và net-zero",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    ],
  },

  8: {
    id: 8,
    title: "Nhà phố khu dân cư – TP. HCM",
    subtitle: "Điện mặt trời tiết kiệm cho nhà phố đô thị",
    heroImage: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    location: "TP. Hồ Chí Minh",
    capacity: "6 kWp",
    status: "Hoàn thành",
    completedAt: "Tháng 4, 2023",
    client: "Hộ gia đình (bảo mật thông tin)",
    stats: [
      { label: "Công suất lắp đặt", value: "6", unit: "kWp" },
      { label: "Sản lượng năm", value: "8.4", unit: "MWh/năm" },
      { label: "Tiết kiệm điện", value: "14.5", unit: "triệu đ/năm" },
      { label: "Hoàn vốn", value: "5", unit: "năm" },
    ],
    overview:
      "Hệ thống 6 kWp được lắp đặt tối ưu trên mái sân thượng diện tích hạn chế của nhà phố tại quận Bình Thạnh. Thiết kế tập trung vào tối đa công suất trên từng m² mái sử dụng, kết hợp inverter on-grid có tính năng zero-export để đảm bảo tuân thủ quy định điện lực địa phương.",
    equipment: [
      "Tấm pin mono half-cell 420Wp hiệu suất cao",
      "Inverter on-grid tính năng zero-export",
      "Ứng dụng theo dõi sản lượng trên di động",
    ],
    constructionTime: "5 ngày",
    challenge:
      "Diện tích mái hữu dụng chỉ 40 m², phải tối đa công suất và tránh bóng đổ từ bồn nước và cột ăng-ten.",
    solutions: [
      "Chọn pin 420Wp mono half-cell tối đa công suất trên mỗi m²",
      "Tính hướng đặt panel riêng theo địa chỉ lắp đặt",
      "Dùng inverter zero-export tuân thủ quy định điện lực",
      "Tối ưu bố trí tránh bóng đổ thiết bị trên mái",
    ],
    results: [
      "Hóa đơn điện giảm từ 2.8 triệu xuống ~600.000 đồng/tháng",
      "Sản lượng 8.4 MWh/năm, hoàn vốn dự kiến ~5 năm",
      "Gia đình hài lòng, chủ động chia sẻ kinh nghiệm với hàng xóm",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
    ],
  },

  9: {
    id: 9,
    title: "Nhà máy Dệt may Thắng Lợi – Long An",
    subtitle: "Hệ thống điện mặt trời đang triển khai cho ngành dệt may miền Nam",
    heroImage: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1400&q=80",
    overviewImage: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=1200&q=80",
    location: "Long An",
    capacity: "3.5 MWp",
    status: "Đang thi công",
    client: "Tổng Công ty Dệt may Thắng Lợi",
    stats: [
      { label: "Công suất lắp đặt", value: "3.5", unit: "MWp" },
      { label: "Sản lượng dự kiến", value: "4,200", unit: "MWh/năm" },
      { label: "Tiết kiệm dự kiến", value: "6.1", unit: "tỷ đ/năm" },
      { label: "Tiến độ", value: "65", unit: "%" },
    ],
    overview:
      "Dự án 3.5 MWp đang trong giai đoạn thi công tại nhà máy dệt may Thắng Lợi — Long An, dự kiến hoàn thành Quý 3/2025. Đây là dự án tiếp nối chuỗi hợp tác giữa chúng tôi và Tổng Công ty Thắng Lợi sau thành công của dự án thí điểm 500 kWp năm 2022.",
    equipment: [
      "Tấm pin TOPCon thế hệ mới, hiệu suất 22.5%",
      "Inverter string 110 kW phân tán tăng độ dự phòng",
      "Hệ khung đỡ và cáp điện nội bộ trung thế",
    ],
    constructionTime: "Đang thi công — dự kiến hòa lưới Q3/2025",
    challenge:
      "Thi công nối tiếp chuỗi hợp tác, đảm bảo tiến độ hòa lưới đúng Quý 3/2025 trong khi nhà máy vẫn vận hành.",
    solutions: [
      "Hoàn thành 100% hạng mục móng và khung đỡ",
      "Lắp đặt 65% tổng số tấm pin TOPCon hiệu suất 22.5%",
      "Phân tán inverter string 110 kW tăng độ dự phòng hệ thống",
      "Hoàn thiện cáp điện nội bộ và tủ inverter trung thế",
    ],
    results: [
      "Tiến độ thi công hiện tại đạt 65%",
      "Sản lượng dự kiến 4.200 MWh/năm khi vận hành",
      "Dự kiến tiết kiệm 6.1 tỷ đồng/năm cho nhà máy",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
    ],
  },
};