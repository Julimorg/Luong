import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { RevealSection } from "../common/Reveal";
import { ctaBanner } from "../../../../data/dashBoardData";
import { GOLD, GOLD_DARK } from "../../themes/colors";

export function CtaBannerSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 180 }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/92 via-[#0d2137]/72 to-[#0d2137]/25" />

      <RevealSection>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                {ctaBanner.headline}
              </h2>
              <p className="text-white/60 text-base max-w-xl">{ctaBanner.description}</p>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate("/lien-he")}
              endIcon={<ArrowForwardIcon />}
              size="large"
              sx={{
                backgroundColor: GOLD,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                flexShrink: 0,
                boxShadow: `0 4px 20px ${GOLD}4D`,
                "&:hover": { backgroundColor: GOLD_DARK, transform: "translateY(-2px)", boxShadow: `0 8px 28px ${GOLD}73` },
                transition: "all 0.2s",
              }}
            >
              {ctaBanner.cta.label}
            </Button>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
