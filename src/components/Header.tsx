import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Container, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { navLinks, siteConfig } from "../data/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(10,22,40,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
          transition: "all 0.3s ease",
          py: scrolled ? 0 : 0.5,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexGrow: 0 }}>
              <Box sx={{ width: 36, height: 36, bgcolor: "#e8a020", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: 11, letterSpacing: 0 }}>ABC</span>
              </Box>
              <Box component="span" sx={{ color: "white", fontWeight: 700, fontSize: "1rem", display: { xs: "none", sm: "block" } }}>
                {siteConfig.company}
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: pathname === link.to ? "#e8a020" : "rgba(255,255,255,0.8)",
                    bgcolor: pathname === link.to ? "rgba(232,160,32,0.1)" : "transparent",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.08)", color: "white" },
                    fontWeight: 500, fontSize: "0.875rem", textTransform: "none",
                    borderRadius: 2, px: 2,
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                component={Link}
                to="/dashboard"
                startIcon={<DashboardIcon sx={{ fontSize: "1rem !important" }} />}
                sx={{
                  ml: 1, bgcolor: "#e8a020", color: "white",
                  "&:hover": { bgcolor: "#d4911a" },
                  fontWeight: 700, fontSize: "0.8rem", textTransform: "none",
                  borderRadius: 2, px: 2.5,
                }}
              >
                Dashboard
              </Button>
            </Box>

            {/* Mobile burger */}
            <IconButton sx={{ display: { md: "none" }, color: "white" }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: "#0a1628" } }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 32, height: 32, bgcolor: "#e8a020", borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 900, fontSize: 10 }}>ABC</span>
            </Box>
            <Box component="span" sx={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>{siteConfig.company}</Box>
          </Box>
          <IconButton sx={{ color: "rgba(255,255,255,0.6)" }} onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
        <List sx={{ px: 1.5, py: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2, mb: 0.5,
                  color: pathname === link.to ? "#e8a020" : "rgba(255,255,255,0.7)",
                  bgcolor: pathname === link.to ? "rgba(232,160,32,0.1)" : "transparent",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)", color: "white" },
                }}
              >
                <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 1.5 }} />
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard"
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, bgcolor: "#e8a020", "&:hover": { bgcolor: "#d4911a" }, color: "white" }}
            >
              <DashboardIcon sx={{ mr: 1.5, fontSize: "1.1rem" }} />
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}