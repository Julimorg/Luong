// ============================================================
// solutionData.ts — Cấu hình nội dung trang Giải pháp NLMT
// ============================================================

export type Accent = "amber" | "navy";
export type SolutionIcon = "home" | "building" | "factory" | "industrial";
export type TrustIcon = "shield" | "award" | "coins" | "headset";

// ---------- PAGE HEADER ----------
export const solutionHeader = {
  badge: "Giải pháp toàn diện",
  headline: "Giải pháp năng lượng mặt trời cho mọi nhu cầu",
  description:
    "VIETHUNGSOLAR cung cấp giải pháp năng lượng mặt trời tối ưu, phù hợp với mọi nhu cầu từ hộ gia đình, doanh nghiệp đến nhà máy và khu công nghiệp.",
  ctaPrimary: { label: "Nhận tư vấn miễn phí", to: "/lien-he" },
  ctaSecondary: { label: "Xem dự án", to: "/du-an" },
};

export const solutionHighlights: { icon: string; title: string; desc: string }[] = [
  { icon: "coins", title: "Tiết kiệm chi phí", desc: "Giảm đến 90% hóa đơn tiền điện" },
  { icon: "bolt", title: "Hiệu suất vượt trội", desc: "Công nghệ hiện đại, tối ưu sản lượng" },
  { icon: "shield", title: "Đảm bảo an toàn", desc: "Thiết bị chính hãng, bảo hành dài hạn" },
  { icon: "headset", title: "Hỗ trợ chuyên nghiệp", desc: "Tư vấn – Thiết kế – Thi công trọn gói" },
];

// ---------- 2 GIẢI PHÁP CHÍNH (On-grid / Hybrid) ----------
export interface MainSolution {
  id: string;
  tag: string;
  icon: "grid" | "battery";
  title: string;
  description: string;
  features: string[];
  image: string; // ảnh minh họa thay cho diagram
}

export const mainSolutions: MainSolution[] = [
  {
    id: "on-grid",
    tag: "ON-GRID",
    icon: "grid",
    title: "Điện mặt trời hòa lưới",
    description:
      "Hệ thống hòa lưới sử dụng điện mặt trời và hòa trực tiếp vào lưới điện quốc gia, giúp tối ưu chi phí đầu tư và tiền điện hàng tháng.",
    features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Không cần bảo trì nhiều", "Hoàn vốn nhanh"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
  },
  {
    id: "hybrid",
    tag: "HYBRID",
    icon: "battery",
    title: "Điện mặt trời có lưu trữ",
    description:
      "Hệ thống có pin lưu trữ giúp dự phòng điện mỗi đêm và khi mất điện, sử dụng điện mặt trời cả ngày lẫn đêm.",
    features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất sử dụng", "Quản lý thông minh"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80",
  },
];

// ---------- SPEC ITEM ----------
export interface SpecItem {
  iconKey: string;
  label: string;
  value: string;
}

// ---------- SOLUTION DETAIL — nội dung đầy đủ, chỉ hiện khi bấm "Hiện thêm" ----------
export interface SubTypeSolution {
  description?: string;                       // mô tả chi tiết dài hơn subtitle
  specs?: { label: string; value: string }[];  // bảng thông số bổ sung dạng key-value
  note?: string;                               // ghi chú / lưu ý đặc biệt
}

// ---------- SUB TYPE (mỗi hộ có bộ giải pháp riêng) ----------
export interface SubType {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  features: string[];
  image: string; // ảnh minh họa thay diagram
  // ── Khi chưa bấm "Hiện thêm": chỉ cần id -> image ở trên là đủ để render card.
  // ── Khi bấm "Hiện thêm": modal đọc toàn bộ nội dung trong `solution` bên dưới.
  solution?: SubTypeSolution;
}

// ---------- SOLUTION (Mô hình) ----------
export interface SolutionItem {
  id: string;
  icon: SolutionIcon;
  title: string;
  subtitle: string;
  specs: SpecItem[];
  accent: Accent;
  subTypes: SubType[];
}

export const solutions: SolutionItem[] = [
  // ─────────── HỘ GIA ĐÌNH — 3 giải pháp ───────────
  {
    id: "residential",
    icon: "home",
    title: "Hộ Gia Đình",
    subtitle: "Tiết kiệm điện – Chủ động năng lượng",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "5 – 20 kWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 90%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "residential-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Tối ưu chi phí",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Vận hành đơn giản", "Hoàn vốn nhanh"],
        image: "/solution/hoa_luoi.webp",
        solution: {
          description:
            "Giải pháp hòa lưới phù hợp cho hộ gia đình muốn tối ưu chi phí đầu tư ban đầu. Hệ thống hòa trực tiếp vào lưới điện quốc gia, tự động ưu tiên sử dụng điện mặt trời trước khi lấy điện từ lưới, giúp giảm hóa đơn tiền điện ngay từ tháng đầu vận hành.",
          specs: [
            { label: "Công suất khuyến nghị", value: "5 – 10 kWp" },
            { label: "Diện tích mái cần thiết", value: "30 – 60 m²" },
            { label: "Thời gian hoàn vốn", value: "4 – 5 năm" },
            { label: "Thời gian thi công", value: "3 – 5 ngày" },
          ],
          note: "Phù hợp nhất với hộ gia đình sử dụng điện chủ yếu vào ban ngày (giờ hành chính).",
        },
      },
      {
        id: "residential-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Chủ động nguồn điện",
        features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
        solution: {
          description:
            "Hệ thống tích hợp pin lưu trữ giúp gia đình chủ động nguồn điện suốt cả ngày. Điện mặt trời dư thừa ban ngày được lưu vào pin để sử dụng vào buổi tối, đồng thời tự động cấp điện dự phòng khi lưới điện gặp sự cố.",
          specs: [
            { label: "Công suất khuyến nghị", value: "5 – 12 kWp" },
            { label: "Dung lượng pin lưu trữ", value: "5 – 15 kWh" },
            { label: "Thời gian dự phòng", value: "4 – 8 giờ" },
            { label: "Thời gian hoàn vốn", value: "6 – 8 năm" },
          ],
        },
      },
      {
        id: "residential-offgrid",
        icon: "offgrid",
        name: "Off-Grid (Độc Lập)",
        subtitle: "Hoàn toàn độc lập",
        features: ["Không phụ thuộc điện lưới", "Tự chủ 100%", "Phù hợp vùng xa", "Kết hợp pin lưu trữ"],
        image: "https://images.unsplash.com/photo-1548611716-3f6f2e6c8fd8?w=600&q=80",
        solution: {
          description:
            "Giải pháp dành cho khu vực chưa có điện lưới hoặc muốn hoàn toàn độc lập về nguồn điện. Hệ thống kết hợp tấm pin mặt trời, pin lưu trữ dung lượng lớn và bộ điều khiển thông minh để tự chủ 100% nhu cầu sử dụng điện.",
          specs: [
            { label: "Công suất khuyến nghị", value: "3 – 10 kWp" },
            { label: "Dung lượng pin lưu trữ", value: "10 – 30 kWh" },
            { label: "Số ngày dự trữ (không nắng)", value: "1.5 – 2 ngày" },
          ],
          note: "Cần khảo sát kỹ nhu cầu sử dụng điện thực tế để tính toán dung lượng pin phù hợp, tránh thiếu hoặc dư thừa công suất.",
        },
      },
    ],
  },

  // ─────────── DOANH NGHIỆP — 3 giải pháp (khác cái thứ 3) ───────────
  {
    id: "business",
    icon: "building",
    title: "Doanh Nghiệp",
    subtitle: "Tối ưu chi phí vận hành",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "20 – 200 kWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 80%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "business-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Tối ưu chi phí",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Vận hành đơn giản", "Hoàn vốn nhanh"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
        solution: {
          description:
            "Giải pháp hòa lưới cho văn phòng, cửa hàng, showroom — nơi tiêu thụ điện tập trung vào giờ hành chính. Hệ thống giúp doanh nghiệp giảm đáng kể chi phí điện hàng tháng mà không cần đầu tư pin lưu trữ.",
          specs: [
            { label: "Công suất khuyến nghị", value: "20 – 100 kWp" },
            { label: "Diện tích mái cần thiết", value: "150 – 700 m²" },
            { label: "Thời gian hoàn vốn", value: "4 – 6 năm" },
          ],
        },
      },
      {
        id: "business-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Chủ động nguồn điện",
        features: ["Có pin lưu trữ", "Dự phòng khi mất điện", "Tối ưu hiệu suất", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
        solution: {
          description:
            "Phù hợp cho doanh nghiệp cần đảm bảo hoạt động liên tục (trung tâm dữ liệu, phòng khám, siêu thị...). Pin lưu trữ đảm bảo nguồn điện dự phòng tức thời khi mất điện lưới, tránh gián đoạn kinh doanh.",
          specs: [
            { label: "Công suất khuyến nghị", value: "20 – 150 kWp" },
            { label: "Dung lượng pin lưu trữ", value: "20 – 80 kWh" },
            { label: "Thời gian chuyển mạch dự phòng", value: "< 20 ms" },
          ],
        },
      },
      {
        id: "business-carport",
        icon: "carport",
        name: "Solar Carport",
        subtitle: "Vừa che nắng vừa tạo điện",
        features: ["Tận dụng bãi đỗ xe", "Tăng diện tích lắp đặt", "Tiết kiệm không gian mái", "Tăng tính thẩm mỹ"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
        solution: {
          description:
            "Giải pháp lắp đặt hệ thống điện mặt trời trên mái che bãi đỗ xe, tận dụng diện tích chưa sử dụng thay vì chỉ lắp trên mái nhà. Vừa tạo bóng mát cho xe, vừa tăng đáng kể tổng công suất lắp đặt cho doanh nghiệp có diện tích mái hạn chế.",
          specs: [
            { label: "Công suất khuyến nghị", value: "Theo diện tích bãi đỗ" },
            { label: "Chiều cao khung đỡ tiêu chuẩn", value: "2.5 – 3 m" },
            { label: "Kết cấu khung", value: "Thép mạ kẽm nhúng nóng" },
          ],
          note: "Chi phí đầu tư kết cấu khung đỡ thường cao hơn lắp mái truyền thống, phù hợp khi diện tích mái không đủ đáp ứng nhu cầu công suất.",
        },
      },
    ],
  },

  // ─────────── NHÀ MÁY — 4 giải pháp ───────────
  {
    id: "factory",
    icon: "factory",
    title: "Nhà Máy",
    subtitle: "Giảm chi phí sản xuất – Vận hành ổn định",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "100 kWp – 3 MWp" },
      { iconKey: "percent", label: "Tiết kiệm điện", value: "Đến 80%" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "factory-grid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Chi phí thấp – Hoàn vốn nhanh",
        features: ["Chi phí đầu tư thấp", "Hiệu suất cao", "Dễ mở rộng công suất", "Hoàn vốn nhanh"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
        solution: {
          description:
            "Giải pháp phổ biến nhất cho nhà máy sản xuất theo ca ngày, tận dụng tối đa mái xưởng diện tích lớn. Hệ thống có thể mở rộng theo từng giai đoạn, phù hợp với kế hoạch đầu tư dài hạn của doanh nghiệp.",
          specs: [
            { label: "Công suất khuyến nghị", value: "100 kWp – 2 MWp" },
            { label: "Diện tích mái cần thiết", value: "700 – 14.000 m²" },
            { label: "Thời gian hoàn vốn", value: "3.5 – 5 năm" },
          ],
        },
      },
      {
        id: "factory-hybrid",
        icon: "battery",
        name: "Hybrid (Có Lưu Trữ)",
        subtitle: "Ổn định sản xuất",
        features: ["Dự phòng khi mất điện", "Cắt giảm đỉnh công suất", "Tối ưu chi phí điện giờ cao điểm", "Quản lý thông minh"],
        image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80",
        solution: {
          description:
            "Kết hợp pin lưu trữ giúp nhà máy chủ động cắt giảm công suất tiêu thụ vào giờ cao điểm (giá điện cao) và chuyển sang dùng điện tích trữ, đồng thời đảm bảo dây chuyền sản xuất không gián đoạn khi mất điện lưới đột ngột.",
          specs: [
            { label: "Công suất khuyến nghị", value: "100 kWp – 1.5 MWp" },
            { label: "Dung lượng pin lưu trữ", value: "100 – 600 kWh" },
            { label: "Cắt giảm đỉnh công suất", value: "Đến 30%" },
          ],
        },
      },
      {
        id: "factory-bess",
        icon: "bess",
        name: "BESS (Pin Lưu Trữ Độc Lập)",
        subtitle: "Dự phòng công suất lớn",
        features: ["Lưu trữ điện quy mô lớn", "Cắt giảm phí công suất", "Dự phòng sự cố lưới", "Kéo dài tuổi thọ thiết bị"],
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
        solution: {
          description:
            "Hệ thống pin lưu trữ năng lượng quy mô lớn (BESS), hoạt động độc lập hoặc kết hợp với hệ thống điện mặt trời sẵn có. Giúp nhà máy cắt giảm chi phí công suất đăng ký với điện lực và tăng độ ổn định cho lưới điện nội bộ.",
          specs: [
            { label: "Dung lượng khuyến nghị", value: "500 kWh – 2 MWh" },
            { label: "Công nghệ pin", value: "LFP (Lithium Iron Phosphate)" },
            { label: "Vòng đời", value: "> 6.000 chu kỳ" },
          ],
          note: "Chi phí đầu tư BESS còn khá cao tại Việt Nam, phù hợp nhất với nhà máy có nhu cầu cắt giảm phí công suất lớn hoặc yêu cầu độ tin cậy vận hành cao.",
        },
      },
      {
        id: "factory-ems",
        icon: "ems",
        name: "EMS (Quản Lý Năng Lượng)",
        subtitle: "Giám sát – Tối ưu vận hành",
        features: ["Giám sát sản lượng real-time", "Phân tích tiêu thụ điện", "Cảnh báo sự cố tức thời", "Báo cáo tự động"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        solution: {
          description:
            "Hệ thống phần mềm quản lý năng lượng (EMS) giám sát toàn bộ sản lượng điện mặt trời và mức tiêu thụ điện của nhà máy theo thời gian thực, giúp ban quản lý ra quyết định vận hành và bảo trì kịp thời, tối ưu hiệu quả đầu tư.",
          specs: [
            { label: "Tần suất cập nhật dữ liệu", value: "Mỗi 1 – 5 phút" },
            { label: "Nền tảng truy cập", value: "Web & ứng dụng di động" },
            { label: "Loại báo cáo", value: "Ngày / Tuần / Tháng / Năm" },
          ],
        },
      },
    ],
  },

  // ─────────── KHU CÔNG NGHIỆP — 4 giải pháp ───────────
  {
    id: "industrial",
    icon: "industrial",
    title: "Khu Công Nghiệp",
    subtitle: "Năng lượng xanh quy mô lớn",
    specs: [
      { iconKey: "bolt", label: "Công suất lắp đặt", value: "1 – 20 MWp" },
      { iconKey: "percent", label: "Giảm phát thải", value: "Hàng nghìn tấn CO2/năm" },
      { iconKey: "verify", label: "Bảo hành hệ thống", value: "25 năm" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "industrial-utility",
        icon: "utility",
        name: "Utility Scale",
        subtitle: "Quy mô lớn – Đầu tư dài hạn",
        features: ["Công suất lớn MWp", "Hiệu suất tối ưu", "Đấu nối trực tiếp trạm biến áp", "Chi phí vận hành thấp"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        solution: {
          description:
            "Giải pháp điện mặt trời quy mô công nghiệp, đấu nối trực tiếp vào trạm biến áp riêng của khu công nghiệp. Phù hợp cho các chủ đầu tư hạ tầng khu công nghiệp muốn cung cấp năng lượng xanh cho toàn bộ nhà máy thành viên.",
          specs: [
            { label: "Công suất khuyến nghị", value: "1 – 20 MWp" },
            { label: "Diện tích cần thiết", value: "1 – 20 ha" },
            { label: "Thời gian hoàn vốn", value: "5 – 7 năm" },
          ],
        },
      },
      {
        id: "industrial-hybrid-bess",
        icon: "battery",
        name: "Hybrid + BESS",
        subtitle: "Chủ động nguồn điện quy mô lớn",
        features: ["Kết hợp pin lưu trữ công suất lớn", "Ổn định lưới điện nội bộ", "Dự phòng khi mất điện", "Cắt giảm chi phí đỉnh điểm"],
        image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
        solution: {
          description:
            "Kết hợp điện mặt trời công suất lớn với hệ thống pin lưu trữ (BESS) quy mô MWh, giúp khu công nghiệp chủ động điều tiết nguồn điện, giảm áp lực lên lưới điện quốc gia vào giờ cao điểm và tăng độ tin cậy cung cấp điện cho các nhà máy thành viên.",
          specs: [
            { label: "Công suất điện mặt trời", value: "1 – 15 MWp" },
            { label: "Dung lượng BESS", value: "1 – 10 MWh" },
            { label: "Cắt giảm đỉnh công suất", value: "Đến 25%" },
          ],
        },
      },
      {
        id: "industrial-ems",
        icon: "ems",
        name: "EMS (Quản Lý Năng Lượng)",
        subtitle: "Giám sát toàn khu công nghiệp",
        features: ["Giám sát nhiều trạm cùng lúc", "Tối ưu phân phối điện", "Cảnh báo & bảo trì dự đoán", "Báo cáo phát thải CO2"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        solution: {
          description:
            "Nền tảng quản lý năng lượng tập trung cho toàn khu công nghiệp, giám sát đồng thời nhiều trạm điện mặt trời và điểm tiêu thụ của các nhà máy thành viên. Hỗ trợ báo cáo phát thải CO2 phục vụ mục tiêu ESG và chứng chỉ xanh.",
          specs: [
            { label: "Số trạm giám sát đồng thời", value: "Không giới hạn" },
            { label: "Cảnh báo bảo trì dự đoán", value: "Dựa trên AI/dữ liệu lịch sử" },
            { label: "Báo cáo ESG/CO2", value: "Tự động, theo chuẩn quốc tế" },
          ],
        },
      },
      {
        id: "industrial-ev",
        icon: "ev",
        name: "EV Charging",
        subtitle: "Trạm sạc xe điện",
        features: ["Tích hợp trạm sạc nội khu", "Sử dụng điện mặt trời tại chỗ", "Quản lý sạc thông minh", "Hỗ trợ chuyển đổi xanh"],
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
        solution: {
          description:
            "Tích hợp trạm sạc xe điện sử dụng trực tiếp nguồn điện mặt trời tại chỗ, phục vụ xe nâng, xe tải nội bộ và phương tiện cán bộ nhân viên trong khu công nghiệp. Góp phần vào lộ trình chuyển đổi xanh và giảm phát thải giao thông.",
          specs: [
            { label: "Loại sạc hỗ trợ", value: "AC & DC nhanh" },
            { label: "Quản lý tải thông minh", value: "Tự động cân bằng công suất sạc" },
          ],
          note: "Cần đánh giá thêm nhu cầu sử dụng xe điện thực tế của khu công nghiệp trước khi đầu tư số lượng trụ sạc.",
        },
      },
    ],
  },
];

// ---------- TRUST BAR ----------
export interface TrustItem {
  id: string;
  icon: TrustIcon;
  title: string;
  desc: string;
  accent: Accent;
}

export const trustItems: TrustItem[] = [
  { id: "consult", icon: "headset", title: "Tư Vấn Chuyên Sâu", desc: "Giải pháp phù hợp từng nhu cầu", accent: "navy" },
  { id: "design", icon: "award", title: "Thiết Kế Tối Ưu", desc: "Hiệu quả – An toàn – Thẩm mỹ", accent: "amber" },
  { id: "build", icon: "shield", title: "Thi Công Chuyên Nghiệp", desc: "Đúng quy trình – Đúng tiến độ", accent: "navy" },
  { id: "warranty", icon: "coins", title: "Bảo Hành Dài Hạn", desc: "Lên đến 25 năm hệ thống", accent: "amber" },
];