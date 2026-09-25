import { useState } from "react";
import type { SubType } from "../../data/solutionData";
import { SolutionHero } from "./components/SolutionHero";
import { SolutionExplorer } from "./components/SolutionExplorer";
import { SystemComparison } from "./components/SystemComparison";
import { SolutionFaq } from "./components/SolutionFaq";
import { SubTypeDetailModal } from "./components/SubTypeDetailModal";
import { Seo } from "../../seo/Seo";
import { pageSeo } from "../../seo/pageSeo";
import { breadcrumbSchema } from "../../seo/siteMeta";

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
      <Seo
        title={pageSeo.solutions.title}
        description={pageSeo.solutions.description}
        path="/giai-phap"
        schemas={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Giải pháp", path: "/giai-phap" },
          ]),
        ]}
      />
      <SolutionHero />
      <SolutionExplorer onOpen={openDetail} />
      <SystemComparison />
      <SolutionFaq />

      {detailSub && (
        <SubTypeDetailModal sub={detailSub} visible={modalVisible} onClose={closeDetail} />
      )}
    </div>
  );
}
