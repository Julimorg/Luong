import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { footerData, socialLinks } from "../data/dashBoardData";
import { ZaloIcon } from "./icons/SocialIcons";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FacebookIcon sx={{ fontSize: 20 }} />,
  zalo: <ZaloIcon />,
};

// ─── Logo dạng chữ — ảnh tĩnh, đứng riêng phía trên ─────────────────
const LOGO_SRC = "/logo/logo_text_white.png";
// File PNG thường có khoảng trong suốt thừa bên trái/trên (baked-in padding),
// khiến chữ trong ảnh không thẳng hàng với các đoạn text khác dù layout code đã đúng.
// Chỉnh 2 số dưới đây (số âm = kéo ảnh sang trái/lên) cho tới khi khớp mắt.
const LOGO_OFFSET_X = -22; // px
const LOGO_OFFSET_Y = -6; // px

// ─── Cột giữa "VỀ VIETHUNGSOLAR" — 4 link điều hướng nội bộ ───────────
// Link mạng xã hội — Zalo mở thẳng theo số hotline trong footerData.
const socialHref: Record<string, string> = {
  facebook: socialLinks.facebook,
  zalo: socialLinks.zalo,
};

const aboutLinks = [
  { label: "Dự án", to: "/du-an" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  { label: "Giải pháp", to: "/giai-phap" },
];

export default function Footer() {
  return (
    <footer className="bg-[#121b45] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">

        {/* ── Logo — đứng riêng 1 hàng phía trên ── */}
        <img
          src={LOGO_SRC}
          alt="VIETHUNG Solar Energy"
          className="h-16 sm:h-20 w-auto object-contain block mb-6"
          style={{ marginLeft: LOGO_OFFSET_X, marginTop: LOGO_OFFSET_Y }}
        />

        {/* ── 3 cột: Brand (trái) | Về VIETHUNGSOLAR (giữa) | Liên hệ (phải) ──
             Bố cục tự nhiên: mỗi cột chỉ xếp nội dung theo dòng, khoảng cách cố định
             nhỏ gọn — KHÔNG ép các cột cao bằng nhau, tránh bị giãn cách quá rộng. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Trái: tagline -> icon social, khoảng cách gọn gàng như bản gốc */}
          <div>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              {footerData.brand.tagline}
            </p>
            <div className="flex items-center gap-3">
              {footerData.socials.map((s) => (
                <a
                  key={s}
                  href={socialHref[s] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#fbae17] transition-all duration-200 no-underline overflow-hidden"
                >
                  {socialIconMap[s]}
                </a>
              ))}
            </div>
          </div>

          {/* Giữa: VỀ VIETHUNGSOLAR — dịch sang phải một chút cho cân với 2 cột còn lại */}
          <div className="md:pl-10 lg:pl-16">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Về VIETHUNGSOLAR
            </h4>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/55 hover:text-[#fbae17] text-sm no-underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Phải: LIÊN HỆ — khoảng cách gọn gàng như bản gốc */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {footerData.contact.title}
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-white/55 text-sm leading-snug">
                <LocationOnIcon sx={{ fontSize: 17, color: "#fbae17", mt: "1px", flexShrink: 0 }} />
                {footerData.contact.address}
              </li>
              <li>
                <a
                  href={`tel:${footerData.contact.phone.replace(/\s/g, "")}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#fbae17] text-sm no-underline transition-colors duration-200"
                >
                  <PhoneIcon sx={{ fontSize: 17, color: "#fbae17", flexShrink: 0 }} />
                  {footerData.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#fbae17] text-sm no-underline transition-colors duration-200"
                >
                  <EmailIcon sx={{ fontSize: 17, color: "#fbae17", flexShrink: 0 }} />
                  {footerData.contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">{footerData.copyright}</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs no-underline transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs no-underline transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}