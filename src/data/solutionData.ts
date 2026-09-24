// ============================================================
// solutionData.ts — Cấu hình nội dung trang Giải pháp NLMT
// ------------------------------------------------------------
// Toàn bộ nội dung 12 giải pháp bên dưới lấy theo tài liệu trong
// documents/giai-phap-doc (phần mô tả, đặc điểm nổi bật, thông số
// tham khảo, "phù hợp nhất" và lưu ý). Sơ đồ nguyên lý của từng
// giải pháp nằm trong public/solution/diagram.
// ============================================================

export type Accent = "amber" | "navy";
export type SolutionIcon = "home" | "building" | "factory" | "agriculture";
export type TrustIcon = "shield" | "award" | "coins" | "headset";

// ---------- PAGE HEADER ----------
export const solutionHeader = {
  badge: "Giải pháp toàn diện",
  headline: "Giải pháp năng lượng mặt trời cho mọi nhu cầu",
  description:
    "12 cấu hình hệ thống cho hộ gia đình, doanh nghiệp, nhà máy và nông nghiệp — từ hoà lưới cơ bản đến hệ lưu trữ ESS kết hợp quản lý năng lượng EMS.",
  ctaPrimary: { label: "Nhận tư vấn miễn phí", to: "/lien-he" },
  ctaSecondary: { label: "Xem dự án", to: "/du-an" },
};

export const solutionHighlights: { icon: string; title: string; desc: string }[] = [
  { icon: "coins", title: "Giảm chi phí điện", desc: "Ưu tiên dùng điện mặt trời tại chỗ" },
  { icon: "bolt", title: "Đúng cấu hình", desc: "On-grid, Hybrid, Off-grid hay ESS" },
  { icon: "shield", title: "Thiết bị chính hãng", desc: "Đầy đủ CO, CQ và bảo hành hãng" },
  { icon: "headset", title: "Trọn gói", desc: "Khảo sát – Thiết kế – Thi công – Bảo trì" },
];

// ---------- SPEC ITEM ----------
export interface SpecItem {
  iconKey: string;
  label: string;
  value: string;
}

// ---------- CHI TIẾT GIẢI PHÁP (hiện trong modal khi bấm "Hiện thêm") ----------
export interface SubTypeSolution {
  /** Đoạn MÔ TẢ trong tài liệu. */
  description?: string;
  /** Bảng THÔNG SỐ KỸ THUẬT — giá trị tham khảo. */
  specs?: { label: string; value: string }[];
  /** Dòng "Phù hợp nhất" trong tài liệu. */
  bestFor?: string;
  /** Dòng "Lưu ý" / ghi chú kỹ thuật. */
  note?: string;
}

// ---------- MỘT GIẢI PHÁP ----------
export interface SubType {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  /** 4 gạch đầu dòng ngắn hiển thị trên thẻ. */
  features: string[];
  /** Sơ đồ nguyên lý. */
  image: string;
  solution?: SubTypeSolution;
}

// ---------- NHÓM ĐỐI TƯỢNG ----------
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
  // ─────────── HỘ GIA ĐÌNH ───────────
  {
    id: "residential",
    icon: "home",
    title: "Hộ Gia Đình",
    subtitle: "Tiết kiệm điện – Chủ động nguồn điện",
    specs: [
      { iconKey: "bolt", label: "Công suất phổ biến", value: "3 – 15 kWp" },
      { iconKey: "percent", label: "Diện tích mái", value: "15 – 90 m²" },
      { iconKey: "verify", label: "Thời gian thi công", value: "2 – 5 ngày" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "residential-ongrid",
        icon: "grid",
        name: "Hòa Lưới (On-Grid)",
        subtitle: "Cấu hình đơn giản, hoàn vốn tốt",
        features: [
          "Tiết kiệm chi phí điện",
          "Không cần pin lưu trữ",
          "Hiệu suất vận hành cao",
          "Hoàn vốn nhanh",
        ],
        image: "/solution/diagram/ho-gia-dinh-hoa-luoi.webp",
        solution: {
          description:
            "Giải pháp điện mặt trời kết nối trực tiếp với hệ thống điện của gia đình và lưới điện. Điện mặt trời được ưu tiên sử dụng cho các thiết bị đang hoạt động; khi sản lượng không đủ, hệ thống tự động lấy thêm điện từ lưới. Đây là phương án có cấu hình đơn giản, chi phí đầu tư thấp và phù hợp với gia đình sử dụng nhiều điện vào ban ngày.",
          specs: [
            { label: "Công suất khuyến nghị", value: "3 – 10 kWp" },
            { label: "Diện tích mái cần thiết", value: "15 – 60 m²" },
            { label: "Thời gian hoàn vốn tham khảo", value: "Khoảng 4 – 7 năm" },
            { label: "Thời gian thi công", value: "2 – 4 ngày" },
          ],
          bestFor:
            "Hộ gia đình có mức tiêu thụ điện khá cao và sử dụng nhiều điện trong khoảng thời gian có nắng.",
          note: "Hệ on-grid tiêu chuẩn không phải nguồn điện dự phòng; khi lưới mất, inverter hòa lưới thông thường sẽ ngừng phát để bảo đảm an toàn.",
        },
      },
      {
        id: "residential-hybrid",
        icon: "battery",
        name: "Hybrid",
        subtitle: "Kết hợp lưu trữ, có dự phòng",
        features: [
          "Có pin lưu trữ",
          "Dự phòng khi mất điện",
          "Tăng tỷ lệ tự dùng điện",
          "Quản lý năng lượng thông minh",
        ],
        image: "/solution/diagram/ho-gia-dinh-hybrid.webp",
        solution: {
          description:
            "Giải pháp kết hợp điện mặt trời, điện lưới và pin lưu trữ. Năng lượng mặt trời được ưu tiên cấp cho phụ tải, phần năng lượng dư có thể được lưu vào pin để sử dụng vào buổi tối hoặc khi cần. Khi được thiết kế với ngõ ra dự phòng và hệ thống chuyển mạch phù hợp, hệ thống có thể tiếp tục cấp điện cho các tải ưu tiên khi lưới điện gặp sự cố.",
          specs: [
            { label: "Công suất điện mặt trời", value: "5 – 15 kWp" },
            { label: "Dung lượng lưu trữ", value: "5 – 30 kWh" },
            { label: "Diện tích mái cần thiết", value: "25 – 90 m²" },
            { label: "Thời gian thi công", value: "3 – 5 ngày" },
          ],
          bestFor:
            "Hộ gia đình sử dụng điện cả ban ngày lẫn buổi tối hoặc cần duy trì các thiết bị quan trọng khi mất điện.",
          note: "Việc có pin không đồng nghĩa toàn bộ căn nhà luôn được backup; công suất và thời gian dự phòng phụ thuộc inverter, dung lượng pin và nhóm tải được thiết kế cho ngõ backup.",
        },
      },
      {
        id: "residential-offgrid",
        icon: "offgrid",
        name: "Off-Grid",
        subtitle: "Độc lập hoàn toàn với lưới điện",
        features: [
          "Hoạt động độc lập",
          "Không phụ thuộc lưới điện",
          "Phù hợp khu vực vùng xa",
          "Chủ động nguồn điện",
        ],
        image: "/solution/diagram/ho-gia-dinh-off-grid.webp",
        solution: {
          description:
            "Giải pháp điện mặt trời hoạt động độc lập với lưới điện quốc gia. Hệ thống sử dụng điện mặt trời kết hợp pin lưu trữ để cung cấp năng lượng cho phụ tải cả khi có và không có nắng. Công suất tấm pin và dung lượng lưu trữ phải được tính toán dựa trên mức tiêu thụ điện, số giờ sử dụng và số ngày dự phòng mong muốn.",
          specs: [
            { label: "Công suất điện mặt trời", value: "Thường 1 – 10+ kWp" },
            { label: "Dung lượng lưu trữ", value: "Thường 5 – 40+ kWh" },
            { label: "Thời gian tự chủ thiết kế", value: "Khoảng 1 – 2 ngày hoặc theo yêu cầu" },
            { label: "Thời gian thi công", value: "2 – 5 ngày" },
          ],
          bestFor:
            "Nhà ở, nhà vườn hoặc công trình tại khu vực chưa có điện lưới hoặc chất lượng cấp điện không ổn định.",
        },
      },
    ],
  },

  // ─────────── DOANH NGHIỆP ───────────
  {
    id: "business",
    icon: "building",
    title: "Doanh Nghiệp",
    subtitle: "Tối ưu chi phí điện vận hành",
    specs: [
      { iconKey: "bolt", label: "Công suất phổ biến", value: "20 kWp – 1 MWp+" },
      { iconKey: "percent", label: "Diện tích mái", value: "Khoảng 5 – 6 m²/kWp" },
      { iconKey: "verify", label: "Thời gian triển khai", value: "1 – 8 tuần" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "business-ongrid",
        icon: "grid",
        name: "Hòa Lưới",
        subtitle: "Giảm điện mua trong giờ nắng",
        features: [
          "Giảm chi phí vận hành",
          "Tận dụng mái nhà xưởng",
          "Giảm phụ thuộc điện lưới",
          "Hiệu quả đầu tư lâu dài",
        ],
        image: "/solution/diagram/ho-gia-dinh-hoa-luoi.webp",
        solution: {
          description:
            "Giải pháp điện mặt trời hòa lưới dành cho văn phòng, showroom, trung tâm dịch vụ, cơ sở kinh doanh và doanh nghiệp có phụ tải điện ban ngày. Điện mặt trời được sử dụng trực tiếp tại công trình, giúp giảm lượng điện mua từ lưới trong thời gian hệ thống phát điện và tận dụng hiệu quả diện tích mái sẵn có.",
          specs: [
            { label: "Công suất hệ thống", value: "20 kWp – 1 MWp+" },
            { label: "Diện tích mái tham khảo", value: "Khoảng 5 – 6 m²/kWp" },
            { label: "Thời gian hoàn vốn tham khảo", value: "Khoảng 4 – 7 năm" },
            { label: "Thời gian thi công", value: "Khoảng 1 – 6 tuần" },
          ],
          bestFor: "Doanh nghiệp có phụ tải ổn định vào ban ngày và diện tích mái đủ lớn.",
          note: "Công suất nên được thiết kế dựa trên biểu đồ phụ tải thực tế, thay vì đơn thuần lắp tối đa diện tích mái.",
        },
      },
      {
        id: "business-hybrid",
        icon: "battery",
        name: "Hybrid",
        subtitle: "Phát điện kết hợp lưu trữ",
        features: [
          "Kết hợp lưu trữ năng lượng",
          "Duy trì tải quan trọng",
          "Giảm công suất giờ cao điểm",
          "Tối ưu chi phí điện",
        ],
        image: "/solution/diagram/doanh-nghiep-hybrid.webp",
        solution: {
          description:
            "Giải pháp kết hợp điện mặt trời với hệ thống lưu trữ cho doanh nghiệp. Năng lượng có thể được lưu lại để sử dụng vào thời điểm phù hợp, hạn chế công suất lấy từ lưới tại các thời điểm đặt mục tiêu và hỗ trợ duy trì các tải quan trọng khi xảy ra sự cố điện nếu hệ thống được cấu hình cho chế độ dự phòng.",
          specs: [
            { label: "Công suất PV", value: "30 kWp – 1 MWp+" },
            { label: "Dung lượng lưu trữ", value: "30 kWh – 2 MWh+" },
            { label: "Phạm vi dự phòng", value: "Thiết kế theo tải ưu tiên" },
            { label: "Thời gian triển khai", value: "Khoảng 2 – 8 tuần" },
          ],
          bestFor:
            "Doanh nghiệp sử dụng điện kéo dài sang buổi tối, có giá điện theo thời gian sử dụng hoặc cần duy trì các phụ tải quan trọng.",
        },
      },
      {
        id: "business-ess",
        icon: "bess",
        name: "ESS (Hệ Lưu Trữ)",
        subtitle: "Dịch chuyển giờ dùng điện",
        features: [
          "Lưu trữ năng lượng",
          "Cắt giảm công suất đỉnh",
          "Dịch chuyển giờ sử dụng",
          "Tăng độ ổn định hệ thống",
        ],
        image: "/solution/diagram/doanh-nghiep-ess.webp",
        solution: {
          description:
            "ESS/BESS là hệ thống lưu trữ điện bằng pin quy mô thương mại hoặc công nghiệp. Hệ thống có thể tích điện từ điện mặt trời hoặc nguồn điện phù hợp, sau đó xả điện theo chiến lược vận hành đã thiết lập để dịch chuyển thời gian sử dụng năng lượng, hạn chế công suất lấy từ lưới hoặc hỗ trợ nguồn điện dự phòng.",
          specs: [
            { label: "Công suất PCS", value: "30 kW – nhiều MW" },
            { label: "Dung lượng lưu trữ", value: "50 kWh – nhiều MWh" },
            { label: "Thời lượng lưu trữ thường dùng", value: "Khoảng 1 – 4 giờ" },
            { label: "Thời gian triển khai", value: "Khoảng 2 – 12 tuần tùy quy mô" },
          ],
          bestFor:
            "Doanh nghiệp có phụ tải lớn, phụ tải đỉnh rõ rệt hoặc cần chủ động dịch chuyển thời gian sử dụng điện.",
          note: "BESS hiện được ứng dụng cho peak shaving, vận hành theo giá điện thay đổi theo thời gian và kết hợp nguồn tái tạo.",
        },
      },
    ],
  },

  // ─────────── NHÀ MÁY ───────────
  {
    id: "factory",
    icon: "factory",
    title: "Nhà Máy",
    subtitle: "Giảm chi phí sản xuất – Vận hành ổn định",
    specs: [
      { iconKey: "bolt", label: "Công suất phổ biến", value: "300 kWp – 10 MWp+" },
      { iconKey: "percent", label: "Diện tích lắp đặt", value: "Khoảng 5 – 6 m²/kWp" },
      { iconKey: "verify", label: "Thời gian triển khai", value: "1 – 6+ tháng" },
    ],
    accent: "navy",
    subTypes: [
      {
        id: "factory-ongrid",
        icon: "utility",
        name: "Hòa Lưới Công Suất Lớn",
        subtitle: "Thiết kế theo phụ tải nhà máy",
        features: [
          "Phù hợp nhà máy quy mô lớn",
          "Công suất từ MWp",
          "Giảm chi phí sản xuất",
          "Vận hành ổn định",
        ],
        image: "/solution/diagram/nha-may-hoa-luoi-lon.webp",
        solution: {
          description:
            "Giải pháp điện mặt trời hòa lưới quy mô công nghiệp được thiết kế theo phụ tải của nhà máy và khả năng đấu nối của hệ thống điện. Nguồn điện mặt trời được sử dụng trực tiếp cho hoạt động sản xuất trong thời gian có nắng, giúp giảm lượng điện mua từ lưới và khai thác diện tích mái nhà xưởng.",
          specs: [
            { label: "Công suất hệ thống", value: "Khoảng 300 kWp – 10 MWp+" },
            { label: "Diện tích lắp đặt", value: "Khoảng 5 – 6 m²/kWp" },
            { label: "Cấp đấu nối", value: "Hạ áp hoặc trung áp tùy quy mô" },
            { label: "Thời gian triển khai", value: "Khoảng 1 – 4+ tháng" },
          ],
          bestFor:
            "Nhà máy có phụ tải điện lớn và ổn định vào ban ngày, mái nhà xưởng rộng và hạ tầng điện đáp ứng yêu cầu đấu nối.",
        },
      },
      {
        id: "factory-hybrid",
        icon: "battery",
        name: "Hybrid Công Nghiệp",
        subtitle: "PV công suất lớn kết hợp BESS",
        features: [
          "Kết hợp phát và lưu trữ",
          "Duy trì tải quan trọng",
          "Giảm phụ thuộc lưới điện",
          "Quản lý năng lượng linh hoạt",
        ],
        image: "/solution/diagram/nha-may-hybrid.webp",
        solution: {
          description:
            "Giải pháp kết hợp hệ thống điện mặt trời công suất lớn với BESS cho nhà máy. Hệ thống có thể ưu tiên sử dụng điện mặt trời cho sản xuất, lưu trữ phần năng lượng phù hợp và điều khiển xả pin theo phụ tải hoặc khung giờ. Khi được thiết kế theo kiến trúc microgrid/backup phù hợp, hệ thống có thể duy trì một phần tải quan trọng trong thời gian mất lưới.",
          specs: [
            { label: "Công suất PV", value: "0,3 – 10 MWp+" },
            { label: "Dung lượng BESS", value: "0,5 – 20 MWh+" },
            { label: "Thời lượng lưu trữ", value: "Thường 1 – 4 giờ hoặc theo phụ tải" },
            { label: "Thời gian triển khai", value: "Khoảng 2 – 6+ tháng" },
          ],
          bestFor:
            "Nhà máy có phụ tải lớn, yêu cầu quản lý năng lượng cao hoặc cần tăng khả năng duy trì hoạt động cho các tải quan trọng.",
          note: "PV + storage có thể hỗ trợ khả năng vận hành độc lập, nhưng cần inverter/PCS, thiết bị đóng cắt và chiến lược điều khiển được thiết kế cho mục tiêu này.",
        },
      },
      {
        id: "factory-ess-ems",
        icon: "ems",
        name: "ESS + EMS",
        subtitle: "Lưu trữ kèm quản lý năng lượng",
        features: [
          "Điều phối năng lượng tự động",
          "Quản lý sạc và xả pin",
          "Tối ưu chi phí vận hành",
          "Giám sát theo thời gian thực",
        ],
        image: "/solution/diagram/nha-may-ess-ems.webp",
        solution: {
          description:
            "Giải pháp kết hợp hệ thống lưu trữ năng lượng ESS với hệ thống quản lý năng lượng EMS. EMS thu thập dữ liệu từ công tơ, điện mặt trời, PCS/BMS và phụ tải để tự động điều phối quá trình sạc – xả theo chiến lược đã thiết lập, giúp doanh nghiệp kiểm soát dòng năng lượng và tối ưu vận hành toàn hệ thống.",
          specs: [
            { label: "Công suất PCS", value: "100 kW – nhiều MW" },
            { label: "Dung lượng ESS", value: "0,2 – 20 MWh+" },
            { label: "Thiết bị tích hợp", value: "BMS, PCS, meter, PV, SCADA/EMS" },
            { label: "Chiến lược vận hành", value: "Peak shaving / TOU / backup / giới hạn phát lưới" },
          ],
          bestFor:
            "Nhà máy có nhiều nguồn điện, BESS dung lượng lớn hoặc yêu cầu quản lý và tối ưu năng lượng theo thời gian thực.",
          note: "Các hệ thống quản lý năng lượng cấp cơ sở có thể giám sát và điều khiển các nguồn phía sau công tơ như PV và lưu trữ; việc dispatch pin có thể được lập lịch theo tải hoặc giá điện.",
        },
      },
    ],
  },

  // ─────────── NÔNG NGHIỆP ───────────
  {
    id: "agriculture",
    icon: "agriculture",
    title: "Nông Nghiệp",
    subtitle: "Chủ động điện cho trang trại, đồng ruộng",
    specs: [
      { iconKey: "bolt", label: "Công suất phổ biến", value: "0,75 kW – 500 kWp+" },
      { iconKey: "percent", label: "Cấu hình", value: "On-grid / Hybrid / Off-grid" },
      { iconKey: "verify", label: "Thời gian triển khai", value: "1 ngày – 6 tuần" },
    ],
    accent: "amber",
    subTypes: [
      {
        id: "agriculture-pump",
        icon: "pump",
        name: "Bơm Nước Năng Lượng Mặt Trời",
        subtitle: "Tưới tiêu bằng điện mặt trời",
        features: [
          "Không sử dụng điện lưới",
          "Tự động vận hành ban ngày",
          "Tiết kiệm chi phí tưới tiêu",
          "Phù hợp vùng nông nghiệp",
        ],
        image: "/solution/diagram/nong-nghiep-bom-nuoc.webp",
        solution: {
          description:
            "Giải pháp sử dụng điện từ tấm pin mặt trời để vận hành máy bơm phục vụ tưới tiêu, cấp nước hoặc chăn nuôi. Hệ thống có thể hoạt động độc lập với lưới hoặc kết hợp với nguồn điện khác. Với nhu cầu bơm chủ yếu vào ban ngày, nước có thể được tích vào hồ hoặc bồn chứa thay cho việc đầu tư pin lưu trữ điện.",
          specs: [
            { label: "Công suất bơm", value: "Khoảng 0,75 – 30 kW+" },
            { label: "Công suất PV", value: "Tính theo công suất bơm, cột áp và lưu lượng" },
            { label: "Lưu trữ", value: "Ưu tiên bể/hồ nước; pin điện là tùy chọn" },
            { label: "Thời gian thi công", value: "Khoảng 1 – 5 ngày" },
          ],
          bestFor:
            "Trang trại, vườn cây, khu tưới tiêu và khu vực có nhu cầu bơm nước chủ yếu vào ban ngày.",
          note: "FAO xem solar pumping là giải pháp đặc biệt phù hợp cho tưới tiêu ở nơi lưới điện không sẵn có hoặc nơi trước đây phải phụ thuộc máy bơm diesel.",
        },
      },
      {
        id: "agriculture-farm",
        icon: "farm",
        name: "Điện Mặt Trời Trang Trại",
        subtitle: "Cấp điện cho toàn trang trại",
        features: [
          "Cấp điện cho trang trại",
          "Giảm chi phí vận hành",
          "Tận dụng diện tích mái",
          "Phát triển bền vững",
        ],
        image: "/solution/diagram/nong-nghiep-trang-trai.webp",
        solution: {
          description:
            "Giải pháp điện mặt trời được thiết kế theo nhu cầu sử dụng điện của trang trại như máy bơm, quạt thông gió, chiếu sáng, hệ thống làm mát, kho lạnh và thiết bị sản xuất. Tùy điều kiện lưới điện và phụ tải, hệ thống có thể được cấu hình theo dạng on-grid, hybrid hoặc off-grid.",
          specs: [
            { label: "Công suất hệ thống", value: "10 – 500 kWp+" },
            { label: "Diện tích lắp đặt", value: "Khoảng 5 – 6 m²/kWp" },
            { label: "Cấu hình hệ thống", value: "On-grid / Hybrid / Off-grid" },
            { label: "Thời gian triển khai", value: "Khoảng 3 ngày – 6 tuần" },
          ],
          bestFor:
            "Trang trại có phụ tải điện thường xuyên, diện tích mái lớn hoặc nhu cầu sử dụng điện vào ban ngày cao.",
        },
      },
      {
        id: "agriculture-agrivoltaics",
        icon: "agrivoltaics",
        name: "Agrivoltaics",
        subtitle: "Điện mặt trời kết hợp canh tác",
        features: [
          "Kết hợp điện và nông nghiệp",
          "Tận dụng tối đa diện tích đất",
          "Hỗ trợ điều kiện canh tác",
          "Phát triển bền vững",
        ],
        image: "/solution/diagram/nong-nghiep-trang-trai.webp",
        solution: {
          description:
            "Agrivoltaics là mô hình bố trí hệ thống điện mặt trời và hoạt động nông nghiệp trên cùng một diện tích đất. Tấm pin có thể được nâng cao hoặc bố trí khoảng cách phù hợp để bên dưới hoặc giữa các dãy pin vẫn có thể trồng trọt, chăn thả hoặc thực hiện các hoạt động nông nghiệp khác.",
          specs: [
            { label: "Công suất hệ thống", value: "Từ vài chục kWp đến nhiều MWp" },
            { label: "Chiều cao / khoảng cách dãy pin", value: "Thiết kế theo cây trồng và máy nông nghiệp" },
            { label: "Tỷ lệ che sáng", value: "Tính riêng theo loại cây và điều kiện khí hậu" },
            { label: "Thời gian triển khai", value: "Từ vài tuần đến vài tháng tùy quy mô" },
          ],
          bestFor:
            "Khu nông nghiệp muốn đồng thời duy trì sản xuất nông nghiệp và khai thác năng lượng mặt trời trên cùng quỹ đất.",
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
  { id: "warranty", icon: "coins", title: "Bảo Hành Dài Hạn", desc: "Theo chính sách của từng hãng", accent: "amber" },
];

// ---------- SO SÁNH NHANH 4 LOẠI HỆ ----------
// Bảng dưới đây chỉ tóm tắt lại chính các đặc điểm đã nêu ở 12 giải pháp phía
// trên (mục `features` và `bestFor`), gom theo loại hệ để khách dễ đối chiếu
// khi chọn — không bổ sung thông tin nào ngoài tài liệu.

export type CompareValue = "yes" | "no" | "partial" | "na";

export interface CompareColumn {
  id: string;
  /** Tên loại hệ. */
  name: string;
  /** Một câu định vị ngắn. */
  tagline: string;
  icon: string;
}

export interface CompareRow {
  label: string;
  /** Cùng thứ tự với `compareColumns`. */
  values: (CompareValue | string)[];
}

export const systemComparisonHeader = {
  eyebrow: "Chọn đúng loại hệ",
  headline: "Bốn loại hệ thống khác nhau ở đâu?",
  description:
    "Cùng một mái nhà có thể lắp được nhiều loại hệ. Bảng dưới giúp bạn khoanh vùng trước khi đi vào khảo sát chi tiết.",
};

export const compareColumns: CompareColumn[] = [
  {
    id: "ongrid",
    name: "Hòa lưới",
    tagline: "Dùng bao nhiêu, phát bấy nhiêu",
    icon: "grid",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    tagline: "Vừa phát, vừa tích điện",
    icon: "battery",
  },
  {
    id: "offgrid",
    name: "Off-grid",
    tagline: "Độc lập, không cần lưới",
    icon: "offgrid",
  },
  {
    id: "ess",
    name: "ESS + EMS",
    tagline: "Lưu trữ kèm điều phối tự động",
    icon: "ems",
  },
];

export const compareRows: CompareRow[] = [
  { label: "Pin lưu trữ", values: ["no", "yes", "yes", "yes"] },
  { label: "Có điện khi mất lưới", values: ["no", "yes", "yes", "yes"] },
  { label: "Cần đấu nối lưới điện", values: ["yes", "yes", "no", "yes"] },
  { label: "Giảm công suất giờ cao điểm", values: ["no", "yes", "na", "yes"] },
  { label: "Điều phối năng lượng tự động", values: ["no", "partial", "no", "yes"] },
  {
    label: "Chi phí đầu tư ban đầu",
    values: ["Thấp nhất", "Trung bình", "Cao", "Cao"],
  },
  {
    label: "Hợp nhất với",
    values: [
      "Dùng điện nhiều vào giờ nắng",
      "Dùng điện cả ngày lẫn tối",
      "Nơi chưa có điện lưới",
      "Phụ tải lớn, đỉnh rõ rệt",
    ],
  },
];
