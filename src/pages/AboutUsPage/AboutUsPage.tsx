import { aboutIntro, aboutStats } from "../../data/aboutUsData";
import { CompanyFlipbook } from "./components/companyFlipBook";
import { GOLD, Reveal } from "./components/aboutShared";
import { ManifestoSection } from "./components/ManifestoSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ProcessSection } from "./components/ProcessSection";
import { EcosystemSection } from "./components/EcosystemSection";
import { WhyChooseBento } from "./components/WhyChooseBento";

// ─── MAIN ─────────────────────────────────────────────────────
export default function AboutUsPage() {
  return (
    <div className="pt-[72px]">
      {/* ══════════════════ INTRO + FLIPBOOK (giữ nguyên) ══════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                  {aboutIntro.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121b45] mb-5 leading-tight tracking-tight">
                {aboutIntro.brand}
              </h1>
              <div className="flex flex-col gap-4">
                {aboutIntro.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-500 text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

                            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-100">
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl font-extrabold" style={{ color: GOLD }}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-snug mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="flex justify-center lg:justify-end">
              <CompanyFlipbook />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════ TỪ ĐÂY LÀ PHẦN THÂN THIẾT KẾ MỚI ══════════════════ */}
      {/* Mạch nội dung: tin điều gì → năng lực → làm thế nào →
          thiết bị phân phối → vì sao chọn */}
      <ManifestoSection />
      <CapabilitiesSection />
      <ProcessSection />
      <EcosystemSection />
      <WhyChooseBento />
    </div>
  );
}
