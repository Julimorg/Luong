import FlashOnIcon from "@mui/icons-material/FlashOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { footerData } from "../data/dashBoardData";


const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FacebookIcon sx={{ fontSize: 20 }} />,
  youtube: <YouTubeIcon sx={{ fontSize: 20 }} />,
  linkedin: <LinkedInIcon sx={{ fontSize: 20 }} />,
};

export default function Footer() {
  return (
    <footer className="bg-[#1c2f5c] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand column — takes 2 cols on lg */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 no-underline mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#f5a623]">
                <FlashOnIcon sx={{ fontSize: 18, color: "#fff" }} />
              </span>
              <span className="font-extrabold text-xl tracking-widest text-white">
                {footerData.brand.name}
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              {footerData.brand.tagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {footerData.socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-[#f5a623] hover:border-[#f5a623] hover:text-white transition-all duration-200 no-underline"
                >
                  {socialIconMap[s]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerData.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/55 hover:text-[#f5a623] text-sm no-underline transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {footerData.contact.title}
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-white/55 text-sm leading-snug">
                <LocationOnIcon sx={{ fontSize: 17, color: "#f5a623", mt: "1px", flexShrink: 0 }} />
                {footerData.contact.address}
              </li>
              <li>
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#f5a623] text-sm no-underline transition-colors duration-200"
                >
                  <PhoneIcon sx={{ fontSize: 17, color: "#f5a623", flexShrink: 0 }} />
                  {footerData.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex gap-2.5 text-white/55 hover:text-[#f5a623] text-sm no-underline transition-colors duration-200"
                >
                  <EmailIcon sx={{ fontSize: 17, color: "#f5a623", flexShrink: 0 }} />
                  {footerData.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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