import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { Link } from "react-router-dom";
import { aboutFaqSection, aboutFaqs } from "../../../data/aboutUsData";
import { GOLD, NAVY, Reveal, SectionHeading } from "./aboutShared";

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

  // Mở/đóng bằng cách animate chiều cao thật của nội dung -> không giật, không cần max-height ước lượng.
  // Chạy theo `isOpen` nên khi mở câu khác, câu đang mở cũng tự đóng lại.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      if (!isOpen) return; // trạng thái ban đầu đã đóng sẵn
    }
    const open = isOpen;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.height = open ? "auto" : "0px";
      el.style.opacity = open ? "1" : "0";
      return;
    }
    const from = el.getBoundingClientRect().height;
    const target = open ? el.scrollHeight : 0;
    const anim = animate(el, {
      height: [from, target],
      opacity: open ? [0, 1] : [1, 0],
      duration: 420,
      ease: "outQuart",
      onComplete: () => {
        if (open) el.style.height = "auto";
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
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 sm:px-6 sm:pb-6">{answer}</p>
      </div>
    </div>
  );
}

/** Câu hỏi thường gặp + ô liên hệ nhanh. */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={aboutFaqSection.eyebrow}
              headline={aboutFaqSection.headline}
              description={aboutFaqSection.description}
            />
            <Reveal delay={120} className="mt-6">
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

          <div className="flex flex-col gap-3">
            {aboutFaqs.map((f, i) => (
              <Reveal key={f.question} delay={i * 70}>
                <FaqRow
                  question={f.question}
                  answer={f.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
