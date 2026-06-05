import { recentActivities } from "../../../data/dashBoardData";


const typeStyle: Record<string, { bg: string; icon: React.ReactNode }> = {
  update: { bg: "bg-blue-100 text-blue-600",    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.93-4.36M19.07 14.64A9 9 0 014 15" strokeLinecap="round"/></svg> },
  client: { bg: "bg-purple-100 text-purple-600", icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  done:   { bg: "bg-emerald-100 text-emerald-600", icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  budget: { bg: "bg-amber-100 text-amber-600",   icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round"/></svg> },
};

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="font-bold text-[#0a1628] text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>Hoạt Động Gần Đây</h3>
        <p className="text-gray-400 text-xs mt-0.5">Cập nhật mới nhất</p>
      </div>
      <div className="divide-y divide-gray-50">
        {recentActivities.map((a) => {
          const s = typeStyle[a.type];
          return (
            <div key={a.id} className="flex items-start gap-3 px-5 py-3.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${s.bg}`}>{s.icon}</div>
              <div className="min-w-0">
                <div className="text-[#0a1628] text-xs font-semibold">{a.action}</div>
                <div className="text-gray-400 text-xs truncate">{a.project}</div>
              </div>
              <div className="text-gray-300 text-[10px] whitespace-nowrap ml-auto pt-0.5">{a.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}