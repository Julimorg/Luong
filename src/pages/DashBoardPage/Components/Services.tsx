import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { services } from "../../../data/data";
import Grid from "@mui/material/Grid2";


const iconMap: Record<string, React.ReactNode> = {
  design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  construction: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M2 20h20M5 20V8l7-5 7 5v12M9 20v-5h6v5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  maintenance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  planning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v5M15 4v5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

export default function Services() {
  return (
    <Box id="services" sx={{ py: { xs: 8, md: 14 }, bgcolor: "#f8f9fc" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1.5 }}>
            <Box sx={{ height: 1, width: 40, bgcolor: "#e8a020" }} />
            <Typography sx={{ color: "#e8a020", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Dịch vụ
            </Typography>
            <Box sx={{ height: 1, width: 40, bgcolor: "#e8a020" }} />
          </Box>
          <Typography variant="h2" sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 900, fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, color: "#0a1628", letterSpacing: "-0.02em" }}>
            Dịch Vụ Của Chúng Tôi
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 480, mx: "auto", fontSize: { xs: "0.875rem", sm: "1rem" }, lineHeight: 1.7 }}>
            Chúng tôi cung cấp đầy đủ các giải pháp từ tư vấn, thiết kế đến thi công và bảo trì lâu dài.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {services.map((service, idx) => (
            <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.100",
                  borderRadius: 4,
                  p: 1,
                  cursor: "default",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
                    borderColor: "rgba(232,160,32,0.25)",
                    transform: "translateY(-4px)",
                    "& .service-icon": { bgcolor: "rgba(232,160,32,0.1)", color: "#e8a020" },
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Box
                    className="service-icon"
                    sx={{
                      width: 52, height: 52,
                      bgcolor: "rgba(10,22,40,0.05)",
                      color: "#0a1628",
                      borderRadius: 3,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      mb: 2.5,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {iconMap[service.icon]}
                  </Box>
                  <Typography sx={{ color: "rgba(232,160,32,0.35)", fontSize: "0.65rem", fontWeight: 900, letterSpacing: "0.15em", mb: 1 }}>
                    0{idx + 1}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#0a1628", fontSize: { xs: "1rem", sm: "1.1rem" }, mb: 1.5 }}>
                    {service.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}