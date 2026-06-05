import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { sidebarLinks, siteConfig } from "../data/data";

const icons: Record<string, React.ReactNode> = {
  overview: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  projects: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round"/></svg>,
  construction: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 20h20M5 20V8l7-5 7 5v12M9 20v-5h6v5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clients: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round"/></svg>,
  reports: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round"/></svg>,
  settings: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
};

// ✅ Tách ra ngoài, nhận props
interface SidebarProps {
  collapsed: boolean;
  pathname: string;
  onLinkClick: () => void;
}

function Sidebar({ collapsed, pathname, onLinkClick }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-[#e8a020] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-xs">ABC</span>
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm">{siteConfig.company}</div>
            <div className="text-white/40 text-[10px]">Quản lý dự án</div>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = pathname === link.to || (link.to !== "/dashboard" && pathname.startsWith(link.to));
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={onLinkClick}
              title={collapsed ? link.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#e8a020] text-white shadow-lg shadow-[#e8a020]/20"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              } ${collapsed ? "justify-center" : ""}`}
            >
              {icons[link.icon]}
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-[#e8a020] to-[#d4911a] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white text-xs font-semibold truncate">Admin</div>
              <div className="text-white/40 text-[10px] truncate">admin@abccompany.vn</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f6fb] overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Desktop sidebar */}
      <aside className={`relative hidden md:flex flex-col bg-[#0a1628] flex-shrink-0 transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[220px]"}`}>
        <Sidebar collapsed={collapsed} pathname={pathname} onLinkClick={() => {}} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a1628] border border-white/10 text-white/60 hover:text-white rounded-full flex items-center justify-center transition z-10"
        >
          <svg className={`w-3 h-3 transition-transform ${collapsed ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-[220px] bg-[#0a1628] flex flex-col h-full shadow-2xl">
            <Sidebar collapsed={false} pathname={pathname} onLinkClick={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition text-gray-500" onClick={() => setMobileOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/></svg>
            </button>
            <div>
              <h1 className="text-[#0a1628] font-bold text-base">
                {sidebarLinks.find((l) => pathname === l.to || (l.to !== "/dashboard" && pathname.startsWith(l.to)))?.label ?? "Dashboard"}
              </h1>
              <p className="text-gray-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e8a020] rounded-full" />
            </button>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1628] hover:bg-[#0d2040] text-white text-xs font-semibold rounded-lg transition">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9M5 10v10h5v-5h4v5h5V10" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Trang chủ
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}