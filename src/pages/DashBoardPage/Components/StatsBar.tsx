import { Box, Container, Typography } from "@mui/material";
import { stats } from "../../../data/data";
import Grid from "@mui/material/Grid2";
export default function StatsBar() {
  return (
    <Box sx={{ bgcolor: "#0a1628", py: { xs: 5, sm: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          {stats.map((stat, i) => (
            <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  py: { xs: 2, sm: 0 },
                  px: 2,
                  borderRight: { md: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" },
                  borderBottom: { xs: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", md: "none" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 900,
                    fontSize: { xs: "1.8rem", sm: "2.5rem" },
                    color: "#e8a020",
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: { xs: "0.7rem", sm: "0.8rem" }, fontWeight: 500, letterSpacing: "0.05em" }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}