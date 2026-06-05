import { Box, Container, Typography, Button, Chip, Stack } from "@mui/material";
import { siteConfig } from "../../../data/data";


export default function Hero() {
  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,14,30,0.92) 0%, rgba(10,22,40,0.82) 50%, rgba(13,32,64,0.78) 100%)" }} />
      <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, #e8a020, transparent)" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center", px: { xs: 3, sm: 4 } }}>
        <Chip
          label="✦  HƠN 15 NĂM KINH NGHIỆM"
          sx={{
            mb: 4,
            bgcolor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            fontWeight: 600,
            height: 32,
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 900,
            fontSize: { xs: "2.6rem", sm: "4rem", md: "5.5rem", lg: "6rem" },
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "white",
            mb: 2.5,
          }}
        >
          {siteConfig.tagline.split(" ").map((word, i, arr) =>
            i === arr.length - 1
              ? <Box key={i} component="span" sx={{ color: "#e8a020" }}>{word} </Box>
              : <span key={i}>{word} </span>
          )}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.55)",
            fontSize: { xs: "0.85rem", sm: "1.1rem" },
            fontWeight: 300,
            letterSpacing: { xs: "0.1em", sm: "0.2em" },
            mb: 5,
          }}
        >
          {siteConfig.subtitle}
        </Typography>

        <Stack component="div" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            href="#contact"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#e8a020", "&:hover": { bgcolor: "#d4911a" },
              fontWeight: 700, borderRadius: 3, px: 4, py: 1.5,
              fontSize: "0.875rem", letterSpacing: "0.05em",
              boxShadow: "0 8px 24px rgba(232,160,32,0.35)",
              width: { xs: "100%", sm: "auto" },
              textTransform: "none",
            }}
          >
            Liên Hệ Ngay
          </Button>
          <Button
            href="#services"
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255,255,255,0.3)", color: "white",
              "&:hover": { borderColor: "rgba(255,255,255,0.6)", bgcolor: "rgba(255,255,255,0.08)" },
              fontWeight: 600, borderRadius: 3, px: 4, py: 1.5,
              fontSize: "0.875rem", letterSpacing: "0.05em",
              width: { xs: "100%", sm: "auto" },
              textTransform: "none",
            }}
          >
            Khám Phá Dịch Vụ
          </Button>
        </Stack>

        <Box sx={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", letterSpacing: "0.2em" }}>CUỘN XUỐNG</Typography>
          <Box sx={{ width: 1, height: 40, bgcolor: "rgba(255,255,255,0.2)", mx: "auto" }} />
        </Box>
      </Container>
    </Box>
  );
}