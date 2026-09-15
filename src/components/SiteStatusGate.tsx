import type { ReactNode } from "react";
import { SITE_STATUS } from "../config/siteStatus";
import MaintenancePage from "../pages/StatusPage/MaintenancePage";
import UpdatingDataPage from "../pages/StatusPage/UpdatingDataPage";

// Bọc quanh toàn bộ <Routes> — chỉ hiện đúng route bình thường khi
// SITE_STATUS === "running". Đổi trạng thái ở duy nhất 1 nơi:
// src/config/siteStatus.ts
export function SiteStatusGate({ children }: { children: ReactNode }) {
  if (SITE_STATUS === "maintenance") return <MaintenancePage />;
  if (SITE_STATUS === "updating") return <UpdatingDataPage />;
  return <>{children}</>;
}