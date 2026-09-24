import { useState } from "react";
import type { SubType } from "../../data/solutionData";
import { SolutionHero } from "./components/SolutionHero";
import { SolutionExplorer } from "./components/SolutionExplorer";
import { SystemComparison } from "./components/SystemComparison";
import { SubTypeDetailModal } from "./components/SubTypeDetailModal";

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

      {detailSub && (
        <SubTypeDetailModal sub={detailSub} visible={modalVisible} onClose={closeDetail} />
      )}
    </div>
  );
}
