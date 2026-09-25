import { aboutTrustBand } from "../../../data/aboutUsData";
import { BrandMarquee } from "./brandMaque";
import { Reveal } from "./aboutShared";

/** Dải logo các thương hiệu đang phân phối, tự chạy ngang. */
export function TrustBandSection() {
  return (
    <section className="py-14 sm:py-16" style={{ backgroundColor: "#faf7f1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            {aboutTrustBand.partnersHeading}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <BrandMarquee />
        </Reveal>
      </div>
    </section>
  );
}
