import { RevealSection, RevealItem } from "../common/Reveal";
import { SectionEyebrow } from "../common/SectionEyebrow";
import { processSection, processSteps } from "../../../../data/dashBoardData";
import { GOLD } from "../../themes/colors";

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: "#0d2137" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-14">
          <SectionEyebrow text={processSection.eyebrow} center />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            {processSection.headline}
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            {processSection.description}
          </p>
        </RevealSection>

        {/* Số bước + text — cùng 1 grid nên luôn thẳng cột */}
        <div className="relative grid grid-cols-5 gap-x-2">
          {/* đường nối, canh đúng tâm circle (top-7 = nửa chiều cao circle w-14/h-14) */}
          <div className="absolute top-7 left-[10%] right-[10%] h-px bg-white/20" />

          {processSteps.map((step, i) => (
            <RevealItem
              key={step.id}
              delay={i * 100}
              className="relative z-10 flex flex-col items-center text-center px-1"
            >
              <span
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 font-extrabold text-xl flex-shrink-0 mb-5"
                style={{ borderColor: GOLD, color: GOLD, backgroundColor: "#0d2137" }}
              >
                {step.id}
              </span>
              <h3 className="text-white font-bold text-sm sm:text-base mb-2">{step.title}</h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{step.description}</p>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}