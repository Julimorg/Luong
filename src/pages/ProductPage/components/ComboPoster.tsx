import { products } from "../../../data/productData";
import type { ComboItem } from "../../../data/comboData";
import { GOLD, NAVY } from "../../../themes/brand";


/**
 * Poster combo được dựng hoàn toàn bằng CSS từ dữ liệu trong comboData.ts.
 * Mọi kích thước chữ dùng đơn vị `cqw` (container query width) nên poster
 * co giãn đúng tỉ lệ ở mọi bề rộng slide — từ điện thoại tới màn hình lớn.
 * Khi combo có sẵn `poster` (ảnh thiết kế), component này không được dùng tới.
 */
export function ComboPoster({ combo, compact = false }: { combo: ComboItem; compact?: boolean }) {
  // Slide hẹp (điện thoại) -> phóng to chữ theo tỉ lệ để vẫn đọc được.
  const f = (n: number) => `${(n * (compact ? 1.18 : 1)).toFixed(2)}cqw`;
  // Mảng sáng bên phải thu hẹp lại trên slide hẹp để chữ không bị đè lên thiết bị.
  const panelW = compact ? 42 : 52;

  const deviceImages = combo.devices
    .map((d) => products.find((p) => p.id === d.productId))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const panel = deviceImages.find((p) => p.category === "tam-pin");
  const gear = deviceImages.filter((p) => p.category !== "tam-pin").slice(0, 2);

  const targetParts = combo.targetAccent
    ? combo.target.split(combo.targetAccent)
    : [combo.target];

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      style={{ containerType: "inline-size", backgroundColor: NAVY }}
    >
      {/* Nền: ánh sáng chéo + lưới mờ cho chiều sâu */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 30%, rgba(255,255,255,0.16) 0%, rgba(16,28,61,0) 60%), linear-gradient(115deg, #0b1130 0%, #1b2a63 55%, #0d1938 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)",
          backgroundSize: "6cqw 6cqw",
          maskImage: "linear-gradient(90deg, transparent 35%, #000 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 35%, #000 100%)",
        }}
      />

      {/* ─── Mảng sáng chéo bên phải — nền đặt ảnh thiết bị ─── */}
      <div
        className="absolute inset-y-0 right-0"
        style={{
          width: `${panelW}%`,
          background: "linear-gradient(160deg, #ffffff 0%, #eef1f7 60%, #dfe5ee 100%)",
          clipPath: "polygon(26% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0"
        style={{
          width: `${panelW + 1.4}%`,
          backgroundColor: GOLD,
          clipPath: "polygon(26% 0, 27.4% 0, 1.4% 100%, 0 100%)",
        }}
      />

      {/* ─── Ảnh thiết bị ─── */}
      <div className="absolute inset-y-0 right-0" style={{ width: `${panelW}%` }}>
        {panel && (
          <img
            src={panel.image}
            alt=""
            aria-hidden
            className="absolute bottom-[16%] w-auto max-w-none object-contain"
            // multiply: ảnh tấm pin có nền trắng -> hoà vào mảng sáng thay vì lộ khung trắng
            style={{
              right: compact ? "2%" : "4%",
              height: compact ? "50%" : "62%",
              mixBlendMode: "multiply",
            }}
            draggable={false}
          />
        )}
        {gear.map((g, i) => (
          <img
            key={g.id}
            src={g.image}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute bottom-[14%] w-auto object-contain"
            style={{
              right: compact ? (i === 0 ? "22%" : "2%") : i === 0 ? "38%" : "12%",
              height: compact ? (i === 0 ? "30%" : "23%") : i === 0 ? "44%" : "32%",
              filter: "drop-shadow(0 1.2cqw 1.8cqw rgba(18,27,69,0.3))",
              zIndex: 2 - i,
            }}
          />
        ))}
      </div>

      {/* ─── Nội dung chữ bên trái ─── */}
      <div
        className="relative z-10 flex h-full flex-col justify-center"
        style={{ padding: compact ? "4cqw 3.2cqw 11cqw 3.2cqw" : "5cqw 3.6cqw 9cqw 3.6cqw", width: compact ? "56%" : "56%" }}
      >
        {/* Ribbon tiêu đề */}
        <div className="flex w-fit items-stretch" style={{ marginBottom: "2.4cqw" }}>
          <span style={{ width: "0.7cqw", backgroundColor: GOLD }} />
          <span
            className="font-extrabold uppercase tracking-tight text-white"
            style={{
              fontSize: f(3.7),
              lineHeight: 1.1,
              padding: "1cqw 2cqw",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            {combo.title}
          </span>
          {/* Đuôi mũi tên vàng của ribbon */}
          <span
            style={{
              width: "3.4cqw",
              background: GOLD,
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />
        </div>

        {!compact && (
          <p className="italic text-white/65" style={{ fontSize: f(1.95), marginBottom: f(2.2) }}>
            {combo.subtitle}
          </p>
        )}

        <p
          className="font-black uppercase"
          style={{
            fontSize: f(5),
            lineHeight: 1.15,
            color: combo.brandColor,
            letterSpacing: "-0.02em",
          }}
        >
          {combo.brand}
        </p>

        <div className="flex items-end" style={{ gap: "1.6cqw", marginTop: "0.8cqw" }}>
          <span
            className="font-extrabold uppercase leading-[0.95] text-white"
            style={{ fontSize: f(3.9) }}
          >
            Đồng bộ
            {!compact && <br />}
            {compact ? " bảo hành" : "Bảo hành"}
          </span>
          <span
            className="font-black leading-[0.8]"
            style={{ fontSize: f(8.2), color: GOLD }}
          >
            {combo.warrantyYears}
          </span>
          <span
            className="font-extrabold"
            style={{ fontSize: f(2.5), color: GOLD, paddingBottom: "0.8cqw" }}
          >
            Năm
          </span>
        </div>

        <p
          className="flex items-center font-bold uppercase text-white/85"
          style={{ fontSize: f(1.9), gap: "0.9cqw", marginTop: f(1.5) }}
        >
          <span style={{ width: "0.35cqw", height: "2.4cqw", backgroundColor: GOLD }} />
          {combo.warrantyNote}
        </p>

        {/* Danh sách thiết bị — ẩn trên slide hẹp, đã có bảng chi tiết bên dưới carousel */}
        <div style={{ marginTop: "2.6cqw", display: compact ? "none" : undefined }}>
          <p
            className="flex items-center font-bold uppercase text-white/80"
            style={{ fontSize: f(1.8), gap: "0.8cqw", marginBottom: "0.9cqw" }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: "0.7cqw", height: "0.7cqw", backgroundColor: GOLD }}
            />
            Combo thiết bị
          </p>
          <ul className="flex flex-col" style={{ gap: "0.5cqw", paddingLeft: "1.6cqw" }}>
            {combo.devices.map((d) => (
              <li key={d.role + d.label} className="text-white/70" style={{ fontSize: f(1.85) }}>
                {d.role}{" "}
                <span className="font-bold" style={{ color: combo.brandColor }}>
                  {d.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── Thanh chân poster ─── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between"
        style={{
          height: "7.4cqw",
          padding: "0 3.6cqw",
          backgroundColor: "#0b1130",
          borderTop: `0.25cqw solid ${GOLD}`,
        }}
      >
        <p
          className="font-bold uppercase text-white/85"
          style={{ fontSize: f(1.75), letterSpacing: "0.01em" }}
        >
          {targetParts[0]}
          {combo.targetAccent && (
            <span style={{ color: GOLD }}>{combo.targetAccent}</span>
          )}
          {targetParts[1]}
        </p>
        <img
          src="/logo/logo_text_white.png"
          alt="VIETHUNGSOLAR"
          draggable={false}
          className="w-auto object-contain opacity-90"
          style={{ height: "3.6cqw" }}
        />
      </div>
    </div>
  );
}
