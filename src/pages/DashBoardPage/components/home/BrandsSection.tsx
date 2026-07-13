import { useEffect, useRef, useState } from "react";
import { RevealSection } from "../common/Reveal";
import { type FeaturedBrand, featuredBrandsSection, featuredBrands } from "../../../../data/dashBoardData";
import { GOLD, NAVY } from "../../themes/colors";

function BrandLogo({ brand }: { brand: FeaturedBrand }) {
  const [err, setErr] = useState(false);
  if (err || !brand.logo) return null;
  return (
    <div className="flex-shrink-0 w-44 sm:w-52 h-28 mx-4 sm:mx-8 flex items-center justify-center">
      <img
        src={brand.logo}
        alt={brand.name}
        draggable={false}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setErr(true)}
        className="max-h-16 max-w-full object-contain"
      />
    </div>
  );
}

function BrandsMarquee({ brands }: { brands: FeaturedBrand[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const paused = useRef(false);
  const items = [...brands, ...brands];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (el && !paused.current && !drag.current.active) {
        el.scrollLeft += 0.5;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const wrap = (el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (el.scrollLeft <= 0) el.scrollLeft += half;
    else if (el.scrollLeft >= half) el.scrollLeft -= half;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
    wrap(el);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    drag.current.active = false;
    el?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="flex overflow-x-hidden select-none cursor-grab active:cursor-grabbing py-3"
        style={{ touchAction: "pan-y" }}
      >
        {items.map((b, i) => (
          <BrandLogo key={`${b.id}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

export function BrandsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
            <span className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }}>
              {featuredBrandsSection.eyebrow}
            </span>
            <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
            {featuredBrandsSection.headline}
          </h2>
          <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
            {featuredBrandsSection.description}
          </p>
        </RevealSection>
      </div>

      <RevealSection>
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <BrandsMarquee brands={featuredBrands} />
        </div>
      </RevealSection>
    </section>
  );
}