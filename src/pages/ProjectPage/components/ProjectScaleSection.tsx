import { Link } from "react-router-dom";
import { animate, stagger } from "animejs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { categoryLabels, projects } from "../../../data/projectData";
import { useAnimeOnView } from "../../../hooks/useAnimeOnView";
import { GOLD, NAVY } from "../../../themes/brand";

/**
 * Dải quy mô công trình — mỗi dự án là một thanh ngang, thanh dài dần theo
 * công suất. Dùng thang log vì khoảng cách giữa 6 kWp và 8.000 kWp quá lớn;
 * nếu vẽ theo thang tuyến tính thì toàn bộ dự án dân dụng sẽ biến mất.
 *
 * Mục đích: cho chủ đầu tư thấy ngay công ty làm được cả hệ nhà phố lẫn
 * hệ hàng MWp, thay vì phải tự đọc từng thẻ dự án để suy ra.
 */
export function ProjectScaleSection() {
  // Sắp từ lớn xuống nhỏ để mắt đi từ công trình ấn tượng nhất.
  const rows = [...projects].sort((a, b) => b.capacityKwp - a.capacityKwp);
  const max = Math.log10(rows[0].capacityKwp);
  const min = Math.log10(rows[rows.length - 1].capacityKwp);
  const widthOf = (kwp: number) => {
    const t = (Math.log10(kwp) - min) / Math.max(max - min, 0.001);
    return 14 + t * 86; // luôn chừa một đoạn tối thiểu để thanh nhỏ nhất vẫn đọc được
  };

  const ref = useAnimeOnView<HTMLDivElement>((el) => {
    const bars = el.querySelectorAll<HTMLElement>("[data-bar]");
    const labels = el.querySelectorAll<HTMLElement>("[data-row]");
    const anims = [
      animate(labels, {
        opacity: [0, 1],
        x: [-18, 0],
        duration: 620,
        delay: stagger(70),
        ease: "outExpo",
      }),
      animate(bars, {
        scaleX: [0, 1],
        duration: 1000,
        delay: stagger(70, { start: 120 }),
        ease: "outExpo",
      }),
    ];
    return () => {
      anims.forEach((a) => a.cancel());
    };
  }, { threshold: 0.12 });

  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-6" style={{ backgroundColor: GOLD }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: GOLD }}
              >
                Dải quy mô
              </span>
            </div>
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Từ mái nhà phố 6 kWp đến khu công nghiệp 8 MWp
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
              Cùng một đội kỹ thuật, cùng một quy trình — chỉ khác nhau ở quy mô
              thiết bị và thời gian thi công.
            </p>
          </div>
          <Link
            to="/lien-he"
            className="inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Nhận khảo sát cho công trình của bạn
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </div>

        <div ref={ref} className="flex flex-col gap-2.5">
          {rows.map((p) => (
            <Link
              key={p.id}
              to={`/du-an/${p.id}`}
              data-row
              className="group grid grid-cols-1 items-center gap-2 rounded-xl px-3 py-2.5 no-underline transition-colors duration-200 hover:bg-white/5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_88px] sm:gap-4"
            >
              {/* Tên công trình */}
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-white group-hover:text-[#fbae17]">
                  {p.title}
                </span>
                <span className="block text-[11px] text-white/40">
                  {categoryLabels[p.category]} · {p.location}
                </span>
              </span>

              {/* Thanh công suất */}
              <span className="block h-2.5 w-full overflow-hidden rounded-full bg-white/8">
                <span
                  data-bar
                  className="block h-full origin-left rounded-full"
                  style={{
                    width: `${widthOf(p.capacityKwp)}%`,
                    background:
                      p.status === "Đang thi công"
                        ? `repeating-linear-gradient(115deg, ${GOLD} 0 8px, ${GOLD}66 8px 16px)`
                        : `linear-gradient(90deg, ${GOLD}99, ${GOLD})`,
                  }}
                />
              </span>

              {/* Công suất */}
              <span className="text-left text-sm font-extrabold sm:text-right" style={{ color: GOLD }}>
                {p.capacity}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/35">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-6 rounded-full"
              style={{ background: `linear-gradient(90deg, ${GOLD}99, ${GOLD})` }}
            />
            Đã bàn giao
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-6 rounded-full"
              style={{
                background: `repeating-linear-gradient(115deg, ${GOLD} 0 8px, ${GOLD}66 8px 16px)`,
              }}
            />
            Đang thi công
          </span>
          <span className="italic">
            Độ dài thanh vẽ theo thang logarit để hệ vài kWp và hệ hàng MWp cùng
            hiển thị được trên một biểu đồ.
          </span>
        </p>
      </div>
    </section>
  );
}
