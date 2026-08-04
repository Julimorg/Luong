import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import FactoryIcon from "@mui/icons-material/Factory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { RevealSection, RevealItem } from "../common/Reveal";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { solutionSection, solutionAudiences } from "../../../../data/dashBoardData";
import { NAVY, GOLD } from "../../themes/colors";

const audienceIconMap: Record<string, React.ReactNode> = {
  home: <HomeIcon sx={{ fontSize: 20 }} />,
  apartment: <ApartmentIcon sx={{ fontSize: 20 }} />,
  warehouse: <WarehouseIcon sx={{ fontSize: 20 }} />,
  factory: <FactoryIcon sx={{ fontSize: 20 }} />,
};

export function SolutionsSection() {
  const navigate = useNavigate();

  return (
    <section id="solutions" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-12">
          <SectionEyebrow text={solutionSection.eyebrow} center />
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3" style={{ color: NAVY }}>
            {solutionSection.headline}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            {solutionSection  .description}
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionAudiences.map((item, i) => (
            <RevealItem key={item.id} delay={i * 100} className="h-full">
              <div
                className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: "0 4px 20px rgba(13,33,55,0.08)" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                    >
                      {audienceIconMap[item.icon]}
                    </span>
                    <h3 className="font-bold text-lg" style={{ color: NAVY }}>{item.title}</h3>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>

                  <ul className="space-y-2 mb-5">
                    {item.checklist.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircleIcon sx={{ fontSize: 18, color: GOLD, flexShrink: 0, mt: "1px" }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/giai-phap")}
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      mt: "auto",
                      borderColor: "#e5e7eb",
                      color: NAVY,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "none",
                      borderRadius: "8px",
                      py: 1,
                      "&:hover": { backgroundColor: NAVY, color: "#fff", borderColor: NAVY },
                      transition: "all 0.2s",
                    }}
                  >
                    Tìm hiểu giải pháp
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}