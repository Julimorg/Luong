import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { navLinks, headerPhone } from "../data/dashBoardData";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD      = "#f6b918";
const GOLD_DARK = "#d9a210";
const NAVY      = "#1c2f5c";

const DARK_HERO_ROUTES = ["/"];

export default function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  const hasDarkHero   = DARK_HERO_ROUTES.includes(pathname);
  const isTransparent = hasDarkHero && !scrolled;
  const isDark        = isTransparent;

  useEffect(() => {
    const reset = () => setScrolled(window.scrollY > 60);
    queueMicrotask(reset);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          50,
        transition:      "background-color 0.35s ease, box-shadow 0.35s ease, padding-top 0.35s ease, padding-bottom 0.35s ease",
        backgroundColor: isTransparent ? "transparent" : "#ffffff",
        boxShadow:       isTransparent ? "none" : "0 2px 20px rgba(0,0,0,0.10)",
        paddingTop:      scrolled ? "8px"  : "16px",
        paddingBottom:   scrolled ? "8px"  : "16px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center no-underline">
          <img
            src="/logo/logoWebSite.png"
            alt="Solartech"
            style={{
              height: scrolled ? 120 : 120,
              width: "auto",
              transition: "height 0.35s ease",
              filter: isDark ? "brightness(0) invert(1)" : "none",
            }}
          />
        </Link>

        {/* ── Desktop nav ── */}
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
                      ? isActive ? "text-[#f6b918]" : "text-white/90 hover:text-white"
                      : isActive ? "text-[#f6b918]" : "text-gray-700 hover:text-[#f6b918]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{ backgroundColor: GOLD }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}

        {/* ── Right side ── */}
        <div className="flex items-center gap-3">
          <Button
            component={Link}
            to="/lien-he"
            variant="contained"
            size="small"
            sx={{
              backgroundColor: GOLD,
              color:           "#fff",
              fontWeight:      700,
              fontSize:        "0.75rem",
              textTransform:   "none",
              borderRadius:    "6px",
              px:              2,
              py:              0.8,
              boxShadow:       "none",
              "&:hover": {
                backgroundColor: GOLD_DARK,
                boxShadow:       `0 4px 12px ${GOLD}66`,
              },
            }}
          >
            Nhận tư vấn
          </Button>

          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: isDark ? "#fff" : NAVY }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280, backgroundColor: NAVY, color: "#fff" },
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link
            to="/"
            onClick={() => setDrawerOpen(false)}
            className="no-underline"
          >
            <img
              src="/logo/logoWebSite.png"
              alt="Solartech"
              style={{ height: 48, width: "auto" }}
            />
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
                  isActive ? "text-[#f6b918]" : "text-white/80 hover:text-[#f6b918]",
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
              backgroundColor: GOLD,
              color:           "#fff",
              fontWeight:      700,
              textTransform:   "none",
              borderRadius:    "6px",
              "&:hover": { backgroundColor: GOLD_DARK },
            }}
          >
            Nhận tư vấn miễn phí
          </Button>
        </div>
      </Drawer>
    </header>
  );
}