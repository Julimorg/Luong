import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CheckCircleOutline as CheckCircleOutlineIcon } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { aboutInfo } from "../data/data";

export default function About() {
  return (
    <Box id="about" sx={{ py: { xs: 8, md: 14 }, bgcolor: "white", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: "center" }}>

          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <Box sx={{
                borderRadius: 4, overflow: "hidden",
                aspectRatio: "4/3",
                boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
              }}>
                <Box
                  component="img"
                  src={aboutInfo.imageUrl}
                  alt="ABC"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <Box sx={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,22,40,0.4), transparent)",
                }} />
              </Box>

              {/* Badge */}
              <Box sx={{
                position: "absolute", bottom: -20, right: { xs: -8, sm: -16 },
                bgcolor: "#e8a020", color: "white",
                borderRadius: 4, p: { xs: 2, sm: 2.5 },
                boxShadow: "0 12px 32px rgba(232,160,32,0.35)",
                textAlign: "center",
              }}>
                <Typography sx={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 900,
                  fontSize: { xs: "1.6rem", sm: "2rem" },
                  lineHeight: 1,
                }}>
                  15+
                </Typography>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, opacity: 0.9, mt: 0.5, whiteSpace: "nowrap" }}>
                  Năm Kinh Nghiệm
                </Typography>
              </Box>
            </Box>  
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ height: 1, width: 32, bgcolor: "#e8a020" }} />
              <Typography sx={{
                color: "#e8a020", fontSize: "0.65rem",
                fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              }}>
                Giới thiệu
              </Typography>
            </Box>

            <Typography variant="h3" sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 900,
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
              color: "#0a1628",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              mb: 3,
            }}>
              {aboutInfo.heading}
            </Typography> 

            <Typography sx={{
              color: "text.secondary", lineHeight: 1.8, mb: 4,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}>
              {aboutInfo.body}
            </Typography>

            <Stack spacing={1.5} sx={{ mb: 4.5 }}>
              {aboutInfo.features.map((item) => (
                <Box key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <CheckCircleOutlineIcon sx={{ color: "#e8a020", fontSize: 18, mt: 0.3, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.875rem", color: "text.secondary", lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Button
              href="#contact"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#0a1628", "&:hover": { bgcolor: "#0d2040" },
                fontWeight: 700, borderRadius: 3, px: 4, py: 1.5,
                textTransform: "none", fontSize: "0.875rem",
              }}
            >
              Liên Hệ Ngay
            </Button>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}