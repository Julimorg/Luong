import { Box, Container, Typography, Stack, Link as MuiLink, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { siteConfig, navLinks, contactInfo } from "../data/data";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#060e1e", color: "white" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 8, md: 10 }, pb: 4 }}>
        <Grid container spacing={{ xs: 5, md: 6 }} sx={{ mb: 6 }}>

          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <Box sx={{ width: 36, height: 36, bgcolor: "#e8a020", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: 11 }}>ABC</span>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>{siteConfig.company}</Typography>
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.8 }}>
              Đơn vị hàng đầu trong lĩnh vực xây dựng, thiết kế và tư vấn kỹ thuật tại Việt Nam.
            </Typography>
          </Grid>

          {/* Nav */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#e8a020", mb: 2.5 }}>
              Điều Hướng
            </Typography>
            <Stack spacing={1.5}>
              {navLinks.map((link) => (
                <MuiLink
                  key={link.to}
                  component={Link}
                  to={link.to}
                  underline="none"
                  sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", "&:hover": { color: "white" }, transition: "color 0.2s" }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 6, md: 5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#e8a020", mb: 2.5 }}>
              Liên Hệ
            </Typography>
            <Stack spacing={2}>
              {[
                { icon: "📍", value: contactInfo.address },
                { icon: "📞", value: contactInfo.phone },
                { icon: "✉️", value: contactInfo.email },
                { icon: "🕐", value: contactInfo.workingHours },
              ].map((item) => (
                <Box key={item.value} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                  <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />
        <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
          {siteConfig.copyright}
        </Typography>
      </Container>
    </Box>
  );
}