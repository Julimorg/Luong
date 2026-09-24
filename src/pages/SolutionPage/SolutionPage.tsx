import { useState } from "react";
import type { SubType } from "../../data/solutionData";
import { trustItems } from "../../data/solutionData";
import { SolutionHero } from "./components/SolutionHero";
import { SolutionExplorer } from "./components/SolutionExplorer";
import { SystemComparison } from "./components/SystemComparison";
import { SubTypeDetailModal } from "./components/SubTypeDetailModal";
import { GOLD, NAVY, iconMap } from "./components/solutionTheme";
import { Reveal } from "./components/solutionShared";

/** Dải cam kết cuối trang — nền navy khép lại mạch nội dung. */
function TrustBand() {
  return (
    <section className="py-14 sm:py-16" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
            {trustItems.map((t) => {
              const Icon = iconMap[t.icon];
              const isAmber = t.accent === "amber";
              return (
                <div key={t.id} className="flex items-center gap-4 lg:px-8">
                  <span
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: isAmber ? GOLD : "rgba(255,255,255,0.28)",
                      color: isAmber ? GOLD : "rgba(255,255,255,0.75)",
                    }}
                  >
                    <Icon sx={{ fontSize: 21 }} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-white">{t.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-white/45">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function SolutionPage() {
  // Modal chi tiết một cấu hình — mở từ thẻ trong phần khám phá giải pháp.
  const [detailSub, setDetailSub] = useState<SubType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetail = (sub: SubType) => {
    setDetailSub(sub);
    requestAnimationFrame(() => setModalVisible(true));
  };
  const closeDetail = () => {
    setModalVisible(false);
    setTimeout(() => setDetailSub(null), 300); // đợi hiệu ứng thoát xong mới gỡ khỏi DOM
  };

  return (
    <div className="pt-[72px]">
      <SolutionHero />
      <SolutionExplorer onOpen={openDetail} />
      <SystemComparison />
      <TrustBand />

      {detailSub && (
        <SubTypeDetailModal sub={detailSub} visible={modalVisible} onClose={closeDetail} />
      )}
    </div>
  );
}
