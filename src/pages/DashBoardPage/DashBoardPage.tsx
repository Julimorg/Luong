import ActivityFeed from "./Components/ActivityFeed";
import RecentProjects from "./Components/RecentProject";
import StatsCards from "./Components/StatsCard";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#0a1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Tổng Quan Dự Án</h2>
          <p className="text-gray-400 text-sm mt-0.5">Theo dõi toàn bộ tiến độ công trình</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] hover:bg-[#0d2040] text-white text-sm font-semibold rounded-xl transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
          Thêm Dự Án
        </button>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <RecentProjects />
        <ActivityFeed />
      </div>
    </div>
  );
}