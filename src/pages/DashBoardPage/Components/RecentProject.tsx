import { Box, Container, Typography, Chip, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { projects } from "../../../data/data";
import Grid from "@mui/material/Grid2";

export default function Projects() {
  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 14 }, bgcolor: "#0a1628" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1.5 }}>
            <Box sx={{ height: 1, width: 40, bgcolor: "#e8a020" }} />
            <Typography sx={{ color: "#e8a020", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Dự án</Typography>
            <Box sx={{ height: 1, width: 40, bgcolor: "#e8a020" }} />
          </Box>
          <Typography variant="h2" sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, color: "white", letterSpacing: "-0.02em" }}>
            Dự Án Tiêu Biểu
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.5)", maxWidth: 480, mx: "auto", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Một số công trình nổi bật mà chúng tôi đã thực hiện thành công.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  position: "relative", borderRadius: 4, overflow: "hidden", cursor: "pointer",
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                <Box sx={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={project.imageUrl}
                    alt={project.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                  />
                </Box>
                <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,14,30,0.9) 0%, rgba(6,14,30,0.2) 60%, transparent 100%)" }} />
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: { xs: 2.5, sm: 3 } }}>
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{ bgcolor: "rgba(232,160,32,0.9)", color: "white", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", mb: 1, height: 22 }}
                  />
                  <Typography sx={{ fontFamily: "'Sora', sans-serif", color: "white", fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.1rem" }, lineHeight: 1.3 }}>
                    {project.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "rgba(255,255,255,0.25)", color: "white",
              "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.07)" },
              fontWeight: 600, borderRadius: 3, px: 4, py: 1.5, textTransform: "none",
            }}
          >
            Xem Tất Cả Dự Án
          </Button>
        </Box>
      </Container>
    </Box>
  );
}