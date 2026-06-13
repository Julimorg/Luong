// ============================================================
// projectDetailData.ts — Chi tiết từng dự án
// ============================================================

export interface ProjectStat {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
  image: string; // hình ảnh zíc zắc, đổi chiều mỗi section
}

export interface ProjectDetail {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  location: string;
  capacity: string;
  status: "Hoàn thành" | "Đang thi công";
  completedAt?: string;      // "Tháng 3, 2023"
  client: string;
  stats: ProjectStat[];      // 4 con số nổi bật dưới hero
  overview: string;          // đoạn mô tả tổng quan
  sections: ProjectSection[]; // bố cục zíc zắc
  gallery: string[];         // ảnh gallery cuối trang
}

export const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Nhà máy May Việt Tân – Hưng Yên",
    subtitle: "Hệ thống điện mặt trời áp mái quy mô lớn cho ngành dệt may",
    heroImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80",
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
    sections: [
      {
        heading: "Thách thức và giải pháp thiết kế",
        body: "Mái xưởng có kết cấu tôn sóng nghiêng nhiều hướng, đòi hỏi giải pháp khung đỡ tùy chỉnh để đảm bảo tải trọng và góc nghiêng tối ưu. Chúng tôi triển khai hệ thống giám sát thông minh kết hợp inverter trung thế, đảm bảo hiệu suất vận hành trên 98% trong suốt vòng đời dự án.",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
      },
      {
        heading: "Thi công và lắp đặt",
        body: "Toàn bộ quá trình thi công hoàn thành trong 45 ngày, không ảnh hưởng đến hoạt động sản xuất. Đội ngũ kỹ thuật làm việc theo ca, ưu tiên an toàn lao động và giữ nguyên tiến độ sản xuất của nhà máy trong suốt giai đoạn lắp đặt.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      },
      {
        heading: "Vận hành và hiệu quả thực tế",
        body: "Sau 12 tháng vận hành, hệ thống đạt sản lượng 1,440 MWh/năm — vượt 8% so với tính toán ban đầu. Nhà máy tiết kiệm trung bình 175 triệu đồng/tháng tiền điện, hoàn vốn dự kiến trong 4.5 năm.",
        image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Khảo sát và thiết kế hệ thống",
        body: "Đội ngũ kỹ sư tiến hành khảo sát chi tiết kết cấu mái, phân tích bức xạ mặt trời theo từng góc phần tư trong ngày. Mô phỏng 3D toàn bộ hệ thống trước thi công giúp tối ưu số tấm pin và tránh bóng đổ từ thiết bị cơ điện trên mái.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      },
      {
        heading: "Hệ thống lưu trữ và giám sát",
        body: "Dự án tích hợp hệ thống giám sát từ xa qua nền tảng cloud, cho phép đội vận hành theo dõi công suất, sản lượng, và cảnh báo sự cố theo thời gian thực. Báo cáo hiệu suất được gửi tự động hàng tuần đến ban quản lý nhà máy.",
        image: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Thiết kế tích hợp kiến trúc",
        body: "Hệ thống pin được thiết kế hài hòa với kiến trúc tổng thể của khuôn viên trường, không ảnh hưởng đến thẩm mỹ công trình. Chúng tôi sử dụng tấm pin all-black mono PERC để đảm bảo tính đồng bộ và hiệu suất cao trong điều kiện bức xạ thấp.",
        image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=80",
      },
      {
        heading: "Giáo dục và truyền thông xanh",
        body: "Ngoài chức năng phát điện, hệ thống còn được tích hợp màn hình hiển thị dữ liệu phát điện theo thời gian thực tại sảnh chính — trở thành công cụ giáo dục trực quan về năng lượng tái tạo cho học sinh toàn trường.",
        image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Quy mô và kỹ thuật triển khai",
        body: "Hơn 12,000 tấm pin được lắp đặt trên 8 mái nhà xưởng với tổng diện tích 35,000 m². Hệ thống inverter trung thế 10 kV kết nối trực tiếp vào thanh cái điện nội bộ, giảm thiểu tổn thất đường dây và tăng hiệu suất tổng thể lên 98.2%.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      },
      {
        heading: "Tích hợp hệ thống SCADA",
        body: "Toàn bộ dữ liệu vận hành được tích hợp vào hệ thống SCADA của nhà máy, cho phép vận hành viên theo dõi và điều phối tải điện tự động. Cảnh báo sự cố được gửi đến thiết bị di động trong vòng 30 giây, đảm bảo thời gian khắc phục tối thiểu.",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      },
      {
        heading: "Kết quả và chứng nhận xanh",
        body: "Sau 6 tháng vận hành, dự án đã nhận chứng nhận RE100 đầu tiên trong ngành cà phê Việt Nam. Lượng CO₂ giảm thải 3,000 tấn/năm tương đương trồng 150,000 cây xanh — thông điệp được truyền thông rộng rãi trên các kênh xuất khẩu của doanh nghiệp.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Thiết kế kiến trúc và tích hợp BIPV",
        body: "Dự án áp dụng giải pháp BIPV (Building-Integrated Photovoltaics) — tấm pin được tích hợp trực tiếp vào vật liệu mái, thay thế lớp chống thấm thông thường. Giải pháp này vừa phát điện vừa đảm bảo thẩm mỹ kiến trúc và tính năng chống thấm của công trình.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      },
      {
        heading: "Vận hành thông minh tòa nhà",
        body: "Hệ thống kết nối với BMS (Building Management System) của tòa nhà, tự động điều phối nguồn điện mặt trời ưu tiên cho các tải có thể dịch chuyển được. Thuật toán dự báo thời tiết giúp tối ưu lịch vận hành thiết bị theo sản lượng phát điện dự kiến trong ngày.",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Hệ thống hybrid on-grid / off-grid",
        body: "Inverter hybrid cho phép hệ thống vận hành linh hoạt: ưu tiên dùng điện mặt trời — nạp pin — bán điện lưới — mua điện lưới theo thứ tự ưu tiên. Gia đình chủ động hoàn toàn về nguồn điện, kể cả trong các đợt cắt điện luân phiên.",
        image: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=800&q=80",
      },
      {
        heading: "Ứng dụng điều khiển thông minh",
        body: "Ứng dụng di động cho phép chủ nhà xem sản lượng phát điện, tình trạng pin, và chi phí điện tiết kiệm theo ngày/tháng/năm. Hệ thống cũng tích hợp với các thiết bị nhà thông minh để tự động bật/tắt tải theo giá điện và sản lượng phát.",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Phối hợp đa bên và quy trình phê duyệt",
        body: "Triển khai trong khu công nghiệp quốc tế đòi hỏi sự phối hợp chặt chẽ với ban quản lý VSIP, EVN, và các doanh nghiệp thuê xưởng. Chúng tôi đảm nhiệm toàn bộ quy trình xin phép, từ thẩm định thiết kế đến đấu nối lưới — hoàn thành trong 60 ngày.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      },
      {
        heading: "Mô hình chia sẻ điện nội bộ KCN",
        body: "Lần đầu tiên tại Việt Nam, điện mặt trời được phân phối nội bộ giữa các nhà xưởng trong cùng KCN thông qua hệ thống microgrid riêng. Mô hình này giúp tối ưu hóa sử dụng điện theo nhu cầu từng ca sản xuất của từng doanh nghiệp.",
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
      },
      {
        heading: "Chứng nhận quốc tế và báo cáo ESG",
        body: "Toàn bộ sản lượng điện mặt trời phát ra được chứng nhận I-REC (International Renewable Energy Certificate), giúp các doanh nghiệp FDI trong KCN báo cáo RE100 và đáp ứng yêu cầu của chuỗi cung ứng toàn cầu.",
        image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Giải pháp tối ưu cho mái nhỏ",
        body: "Với diện tích mái hữu dụng chỉ 40 m², chúng tôi chọn tấm pin hiệu suất cao 420Wp mono half-cell để tối đa công suất. Hướng đặt panel được tính toán riêng theo địa chỉ lắp đặt để tránh bóng đổ từ bồn nước và cột ăng-ten.",
        image: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=80",
      },
      {
        heading: "Kết quả sử dụng thực tế",
        body: "Sau 12 tháng, hóa đơn điện trung bình giảm từ 2.8 triệu xuống còn 600,000 đồng/tháng. Gia đình hài lòng với khả năng theo dõi sản lượng qua ứng dụng và chủ động chia sẻ kinh nghiệm với hàng xóm trong khu dân cư.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      },
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
    sections: [
      {
        heading: "Tiến độ thi công hiện tại",
        body: "Hiện đã hoàn thành 100% hạng mục móng và khung đỡ, lắp đặt được 65% tổng số tấm pin. Giai đoạn tiếp theo là hoàn thiện hệ thống cáp điện nội bộ và lắp đặt tủ inverter trung thế. Dự kiến hòa lưới vào cuối tháng 9/2025.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      },
      {
        heading: "Công nghệ và vật liệu sử dụng",
        body: "Dự án sử dụng tấm pin TOPCon thế hệ mới với hiệu suất 22.5% — cao hơn 15% so với công nghệ PERC thông thường. Hệ thống inverter string 110 kW được phân tán để tăng độ dự phòng và giảm thiểu ảnh hưởng khi một cụm gặp sự cố.",
        image: "https://images.unsplash.com/photo-1584622781867-1c5fe959b77b?w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80",
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80",
    ],
  },
};