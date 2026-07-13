import { useRef } from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import  { heroData } from "../../../../data/dashBoardData";
import { GOLD, GOLD_DARK } from "../../themes/colors";


export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#0d2137]/70 to-[#0d2137]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/80 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-5 animate-[fadeInUp_0.8s_ease_both]">
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
              {heroData.eyebrow}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 animate-[fadeInUp_0.9s_0.1s_ease_both]"
            style={{ whiteSpace: "pre-line" }}
          >
            {heroData.headline}
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-[fadeInUp_0.9s_0.2s_ease_both]">
            {heroData.subheadline}
          </p>

          <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.9s_0.3s_ease_both]">
            <Button
              variant="contained"
              onClick={() => navigate("/lien-he")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: GOLD, color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                textTransform: "none", borderRadius: "8px", px: 3.5, py: 1.4,
                boxShadow: `0 4px 20px ${GOLD}55`,
                "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-1px)" },
                transition: "all 0.2s",
              }}
            >
              {heroData.ctaPrimary.label}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/giai-phap")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.5)", color: "#fff", fontWeight: 600, fontSize: "0.9rem",
                textTransform: "none", borderRadius: "8px", px: 3.5, py: 1.4,
                "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateY(-1px)" },
                transition: "all 0.2s",
              }}
            >
              {heroData.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}