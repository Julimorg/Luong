import { BrandsSection } from "./components/home/BrandsSection";
import { CtaBannerSection } from "./components/home/CtaBannerSection";
import { HeroSection } from "./components/home/HeroSection";
import { ProjectsSection } from "./components/home/ProjectsSection";
import { SolarCalculator } from "./components/home/SolarCalculator";
import { SolutionsSection } from "./components/home/SolutionsSection";
import { ProcessSection } from "./components/home/StatsSection";

export default function HomePage() {
  return (
    <div id="home">
      <HeroSection />
      <SolutionsSection />
      <ProcessSection />
      <SolarCalculator />
      <ProjectsSection />
      <BrandsSection />
      <CtaBannerSection />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .duration-400 { transition-duration: 400ms; }
      `}</style>
    </div>
  );
}