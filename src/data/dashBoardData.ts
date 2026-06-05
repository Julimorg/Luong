export type ProjectStatus = "Đang thi công" | "Hoàn thành" | "Chờ duyệt" | "Tạm dừng";

export const dashboardStats = [
  { id: 1, label: "Tổng Dự Án",     value: "48", change: "+3 tháng này",          trend: "up",      icon: "projects",     color: "blue" },
  { id: 2, label: "Đang Thi Công",  value: "12", change: "+2 so với tháng trước", trend: "up",      icon: "construction", color: "orange" },
  { id: 3, label: "Hoàn Thành",     value: "31", change: "64.6% tổng số",         trend: "neutral", icon: "done",         color: "green" },
  { id: 4, label: "Chờ Duyệt",      value: "5",  change: "-1 so với tuần trước",  trend: "down",    icon: "pending",      color: "yellow" },
];

export const recentProjects = [
  { id: 1, name: "Tòa nhà Central Tower",    client: "Công ty TNHH Bảo Minh",   category: "Thương Mại",      status: "Đang thi công" as ProjectStatus, progress: 68,  deadline: "30/09/2026", budget: "4.2 tỷ" },
  { id: 2, name: "Khu dân cư Green Valley",  client: "Tập đoàn Phú Mỹ Hưng",   category: "Dân Dụng",        status: "Đang thi công" as ProjectStatus, progress: 45,  deadline: "15/12/2026", budget: "12.8 tỷ" },
  { id: 3, name: "Nhà máy SmartFactory",     client: "Samsung Electronics VN",  category: "Công Nghiệp",     status: "Hoàn thành"    as ProjectStatus, progress: 100, deadline: "01/04/2026", budget: "8.5 tỷ" },
  { id: 4, name: "Trung tâm Y tế Quận 7",   client: "Sở Y tế TP.HCM",          category: "Công Trình Công", status: "Chờ duyệt"     as ProjectStatus, progress: 0,   deadline: "31/03/2027", budget: "6.1 tỷ" },
  { id: 5, name: "Khách sạn The Grand",      client: "Tập đoàn Vingroup",       category: "Thương Mại",      status: "Tạm dừng"      as ProjectStatus, progress: 22,  deadline: "TBD",        budget: "18.0 tỷ" },
];

export const recentActivities = [
  { id: 1, action: "Cập nhật tiến độ",          project: "Central Tower",  time: "5 phút trước", type: "update" },
  { id: 2, action: "Khách hàng mới liên hệ",    project: "Dự án Quận 9",  time: "1 giờ trước",  type: "client" },
  { id: 3, action: "Hoàn thành hạng mục",        project: "SmartFactory",   time: "3 giờ trước",  type: "done" },
  { id: 4, action: "Yêu cầu duyệt ngân sách",   project: "Green Valley",   time: "Hôm qua",      type: "budget" },
];