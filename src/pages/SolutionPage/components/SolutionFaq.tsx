import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { solutionFaqGroups, solutionFaqSection } from "../../../data/solutionData";
import { Reveal, SectionHeading } from "./solutionShared";
import { GOLD, NAVY } from "./solutionTheme";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Một dòng câu hỏi — phần trả lời mở/đóng mượt bằng anime.js. */
function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Animate theo chiều cao thật của nội dung nên không cần ước lượng max-height
  // và không bị giật khi câu trả lời dài ngắn khác nhau.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      if (!isOpen) return; // ban đầu đã đóng sẵn
    }
    if (prefersReducedMotion()) {
      el.style.height = isOpen ? "auto" : "0px";
      el.style.opacity = isOpen ? "1" : "0";
      return;
    }
    const from = el.getBoundingClientRect().height;
    const anim = animate(el, {
      height: [from, isOpen ? el.scrollHeight : 0],
      opacity: isOpen ? [0, 1] : [1, 0],
      duration: 420,
      ease: "outQuart",
      onComplete: () => {
        if (isOpen) el.style.height = "auto";
      },
    });
    return () => {
      anim.cancel();
    };
  }, [isOpen]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-colors duration-200 hover:border-gray-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-sm font-bold sm:text-base" style={{ color: NAVY }}>
          {question}
        </span>
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300"
          style={{
            backgroundColor: isOpen ? GOLD : `${GOLD}1A`,
            color: isOpen ? "#fff" : GOLD,
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 20 }} />
        </span>
      </button>

      <div
        ref={bodyRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
        aria-hidden={!isOpen}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 sm:px-6 sm:pb-6">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function SolutionFaq() {
  const [group, setGroup] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = solutionFaqGroups[group].items;

  // Đổi nhóm -> câu hỏi mới bay lên so le để thấy rõ nội dung vừa thay.
  useEffect(() => {
    const el = listRef.current;
    if (!el || prefersReducedMotion()) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-faq]");
    const anim = animate(rows, {
      opacity: [0, 1],
      y: [14, 0],
      duration: 520,
      delay: stagger(55),
      ease: "outExpo",
    });
    return () => {
      anim.cancel();
    };
  }, [group]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Cột trái: tiêu đề, chuyển nhóm và ô liên hệ */}
          <div>
            <SectionHeading
              eyebrow={solutionFaqSection.eyebrow}
              headline={solutionFaqSection.headline}
              description={solutionFaqSection.description}
            />

            <Reveal delay={80} className="mt-6">
              <div
                role="tablist"
                aria-label="Nhóm câu hỏi"
                className="flex flex-wrap gap-2"
              >
                {solutionFaqGroups.map((g, i) => {
                  const active = i === group;
                  return (
                    <button
                      key={g.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setGroup(i);
                        setOpenIndex(null);
                      }}
                      className="rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200"
                      style={{
                        color: active ? "#fff" : NAVY,
                        backgroundColor: active ? NAVY : "#fff",
                        borderColor: active ? NAVY : "rgba(18,27,69,0.14)",
                      }}
                    >
                      {g.label}
                      <span className={active ? "ml-1.5 text-white/55" : "ml-1.5 text-gray-400"}>
                        {g.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-6">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-[#fbfbfd] px-5 py-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  <SupportAgentRoundedIcon sx={{ fontSize: 20 }} />
                </span>
                <span>
                  <span className="block text-sm font-extrabold" style={{ color: NAVY }}>
                    Còn câu hỏi khác?
                  </span>
                  <span className="block text-xs text-gray-400">
                    Gửi yêu cầu, kỹ thuật viên sẽ liên hệ lại trong ngày
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Cột phải: danh sách câu hỏi của nhóm đang chọn */}
          <div ref={listRef} key={solutionFaqGroups[group].id} className="flex flex-col gap-3">
            {items.map((f, i) => (
              <div data-faq key={f.question}>
                <FaqRow
                  question={f.question}
                  answer={f.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
