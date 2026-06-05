import { dashboardStats } from "../../../data/dashBoardData";


const iconMap: Record<string, React.ReactNode> = {
  projects: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  construction: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 20h20M5 20V8l7-5 7 5v12M9 20v-5h6v5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  done: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pending: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round"/></svg>,
};

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",    icon: "text-blue-600",    badge: "bg-blue-100 text-blue-700" },
  orange: { bg: "bg-orange-50",  icon: "text-[#e8a020]",   badge: "bg-orange-100 text-orange-700" },
  green:  { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  yellow: { bg: "bg-amber-50",   icon: "text-amber-600",   badge: "bg-amber-100 text-amber-700" },
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {dashboardStats.map((stat) => {
        const c = colorMap[stat.color];
        const trendIcon = stat.trend === "up" ? "↑" : stat.trend === "down" ? "↓" : "→";
        return (
          <div key={stat.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${c.bg} ${c.icon} rounded-xl flex items-center justify-center`}>{iconMap[stat.icon]}</div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${c.badge}`}>{trendIcon} {stat.change}</span>
            </div>
            <div className="text-3xl font-black text-[#0a1628] leading-none mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}