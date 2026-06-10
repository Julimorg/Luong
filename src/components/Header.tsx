import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { navLinks, headerPhone } from "../data/dashBoardData";

// Các route có hero ảnh tối → header transparent khi ở top
const DARK_HERO_ROUTES = ["/"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  // Chỉ transparent khi đang ở route có dark hero VÀ chưa scroll
  const hasDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const isTransparent = hasDarkHero && !scrolled;

  useEffect(() => {
    // Reset scroll state khi đổi route
    setScrolled(window.scrollY > 60);

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Text màu: transparent header → trắng, solid header → navy
  const isDark = isTransparent;
  const logoColor   = isDark ? "text-white"     : "text-[#1a3a5c]";
  const logoSub     = isDark ? "text-white/60"  : "text-gray-400";
  const phoneColor  = isDark ? "text-white/90"  : "text-[#1a3a5c]";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background-color 0.35s ease, box-shadow 0.35s ease, padding-top 0.35s ease, padding-bottom 0.35s ease",
        backgroundColor: isTransparent ? "transparent" : "#ffffff",
        boxShadow: isTransparent ? "none" : "0 2px 20px rgba(0,0,0,0.10)",
        paddingTop:    scrolled ? "8px"  : "16px",
        paddingBottom: scrolled ? "8px"  : "16px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#f5a623]">
            <FlashOnIcon sx={{ fontSize: 18, color: "#fff" }} />
          </span>
          <div>
            <span className={`font-extrabold text-lg tracking-widest transition-colors duration-300 ${logoColor}`}>
              SOLARTECH
            </span>
            <div className={`text-[10px] leading-none transition-colors duration-300 ${logoSub}`}>
              Năng lượng sạch cho tương lai
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors duration-300 no-underline relative group",
                    isDark
                      ? isActive ? "text-[#f5a623]" : "text-white/90 hover:text-white"
                      : isActive ? "text-[#f5a623]" : "text-gray-700 hover:text-[#f5a623]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#f5a623] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!isMobile && (
            <a
              href={`tel:${headerPhone}`}
              className={`flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors duration-300 ${phoneColor}`}
            >
              <PhoneIcon sx={{ fontSize: 16 }} />
              {headerPhone}
            </a>
          )}

          <Button
            component={Link}
            to="/lien-he"
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#f5a623",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              textTransform: "none",
              borderRadius: "6px",
              px: 2,
              py: 0.8,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#e09410",
                boxShadow: "0 4px 12px rgba(245,166,35,0.4)",
              },
            }}
          >
            Nhận tư vấn
          </Button>

          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: isDark ? "#fff" : "#1a3a5c" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280, backgroundColor: "#0d2137", color: "#fff" },
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link
            to="/"
            onClick={() => setDrawerOpen(false)}
            className="font-extrabold text-lg tracking-widest text-white no-underline"
          >
            SOLARTECH
          </Link>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                [
                  "py-3 text-base font-medium no-underline border-b border-white/5 transition-colors duration-200",
                  isActive ? "text-[#f5a623]" : "text-white/80 hover:text-[#f5a623]",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 mt-2">
          <a
            href={`tel:${headerPhone}`}
            className="flex items-center gap-2 text-white/70 text-sm no-underline mb-4"
          >
            <PhoneIcon sx={{ fontSize: 16 }} />
            {headerPhone}
          </a>
          <Button
            component={Link}
            to="/lien-he"
            variant="contained"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{
              backgroundColor: "#f5a623",
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "6px",
              "&:hover": { backgroundColor: "#e09410" },
            }}
          >
            Nhận tư vấn miễn phí
          </Button>
        </div>
      </Drawer>
    </header>
  );
}