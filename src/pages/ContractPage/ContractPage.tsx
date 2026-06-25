import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendIcon from "@mui/icons-material/Send";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import { type ContactItem, contactForm, contactBreadcrumb, contactPageHeader, contactItems, contactMap } from "../../data/contractData";

// ─── Brand colors ─────────────────────────────────────────────
const GOLD = "#f5a623";
const NAVY = "#0d2137";

// ─── Env vars ─────────────────────────────────────────────────
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Icon map (info card) ─────────────────────────────────────
const infoIconMap: Record<ContactItem["icon"], React.ReactNode> = {
  location_on: <LocationOnIcon sx={{ fontSize: 20 }} />,
  phone:       <PhoneIcon sx={{ fontSize: 20 }} />,
  email:       <EmailIcon sx={{ fontSize: 20 }} />,
  facebook:    <FacebookIcon sx={{ fontSize: 20 }} />,
};

// ─── Types ────────────────────────────────────────────────────
type FormState = { name: string; phone: string; email: string; message: string };
type Status    = "idle" | "sending" | "success" | "error";

// ─── Reveal wrapper ───────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Field input class ────────────────────────────────────────
const fieldInput =
  "w-full bg-gray-50 border border-gray-200 text-[#0d2137] text-sm rounded-xl " +
  "py-3.5 pl-11 pr-4 placeholder:text-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] " +
  "transition-all duration-200";

// ─── MAIN ─────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm]         = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Vui lòng điền đầy đủ họ tên, email và nội dung.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      await emailjs.send(
        SERVICE_ID, TEMPLATE_ID,
        { from_name: form.name, from_phone: form.phone, from_email: form.email, message: form.message },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err: unknown) {
      const isEmailJSError = (e: unknown): e is { status?: number; text?: string } =>
        typeof e === "object" && e !== null && ("status" in e || "text" in e);
      const isQuota =
        (isEmailJSError(err) && err.status === 429) ||
        (isEmailJSError(err) && typeof err.text === "string" && err.text.toLowerCase().includes("quota"));
      setErrorMsg(isQuota ? contactForm.errorMsgQuota : contactForm.errorMsgDefault);
      setStatus("error");
    }
  };

  return (
    <div className="pt-[72px] relative bg-[#f3f4f6] min-h-screen">

      {/* ══ NAVY BAND (background) ══ */}
      <div className="absolute top-[72px] inset-x-0 h-[400px] sm:h-[440px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: NAVY, opacity: 0.92 }} />
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1 text-sm">
            {contactBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />}
                {i < contactBreadcrumb.length - 1 ? (
                  <Link to={crumb.to} className="text-white/60 hover:text-white no-underline transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Main grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ── LEFT: heading + info + map ── */}
            <div className="flex flex-col">
              {/* Heading (trên nền navy) */}
              <Reveal>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-0.5" style={{ backgroundColor: GOLD }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
                    {contactPageHeader.eyebrow}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                  {contactPageHeader.headline}
                </h1>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md">
                  {contactPageHeader.description}
                </p>
              </Reveal>

              {/* Info card */}
              <Reveal delay={120} className="mt-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 divide-y divide-gray-100">
                  {contactItems.map((item) => {
                    const body = (
                      <div className="flex items-start gap-4 px-5 py-4">
                        <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                          {infoIconMap[item.icon]}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[#0d2137] text-sm font-bold mb-0.5">{item.label}</div>
                          <div
                            className="text-sm font-semibold whitespace-pre-line leading-snug"
                            style={{ color: item.highlight ? GOLD : "#374151" }}
                          >
                            {item.value}
                          </div>
                          {item.sub && (
                            <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                          )}
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.id}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="block no-underline hover:bg-gray-50/60 transition-colors duration-200"
                      >
                        {body}
                      </a>
                    ) : (
                      <div key={item.id}>{body}</div>
                    );
                  })}
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={220} className="mt-5">
                <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg shadow-black/5">
                  <iframe
                    src={contactMap.embedSrc}
                    width="100%"
                    height="240"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={contactMap.label}
                  />
                  {/* Nút mở Google Maps */}
                  <a
                    href={contactMap.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-xs font-bold no-underline shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: NAVY }}
                  >
                    {contactMap.buttonLabel}
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: form card ── */}
            <Reveal delay={150}>
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-6 sm:p-8 lg:p-10">
                <h2 className="text-xl sm:text-2xl font-extrabold mb-1.5" style={{ color: NAVY }}>
                  {contactForm.title}
                </h2>
                <p className="text-gray-400 text-sm mb-6">{contactForm.subtitle}</p>

                {/* Success */}
                {status === "success" && (
                  <div className="mb-5 px-4 py-3.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 text-sm font-medium">
                    <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                    {contactForm.successMsg}
                  </div>
                )}

                {/* Error */}
                {status === "error" && (
                  <div className="mb-5 px-4 py-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
                    <ErrorOutlineIcon sx={{ fontSize: 20 }} />
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      {contactForm.fields.name.label} <span style={{ color: GOLD }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <PersonOutlineIcon sx={{ fontSize: 18 }} />
                      </span>
                      <input
                        type="text" name="name" value={form.name}
                        onChange={handleChange}
                        placeholder={contactForm.fields.name.placeholder}
                        className={fieldInput}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      {contactForm.fields.email.label} <span style={{ color: GOLD }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <MailOutlineIcon sx={{ fontSize: 18 }} />
                      </span>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange}
                        placeholder={contactForm.fields.email.placeholder}
                        className={fieldInput}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      {contactForm.fields.phone.label} <span style={{ color: GOLD }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <PhoneInTalkIcon sx={{ fontSize: 18 }} />
                      </span>
                      <input
                        type="tel" name="phone" value={form.phone}
                        onChange={handleChange}
                        placeholder={contactForm.fields.phone.placeholder}
                        className={fieldInput}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">
                      {contactForm.fields.message.label} <span style={{ color: GOLD }}>*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-gray-400">
                        <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                      </span>
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange} rows={5}
                        placeholder={contactForm.fields.message.placeholder}
                        className={`${fieldInput} resize-none`}
                      />
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <LockOutlinedIcon sx={{ fontSize: 15 }} />
                    {contactForm.securityNote}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200
                               bg-[#f5a623] hover:bg-[#e09410] active:bg-[#c97f0e]
                               disabled:opacity-60 disabled:cursor-not-allowed
                               text-white shadow-sm hover:shadow-[0_6px_20px_rgba(245,166,35,0.45)]"
                  >
                    <SendIcon sx={{ fontSize: 18 }} />
                    {status === "sending" ? contactForm.sendingLabel : contactForm.submitLabel}
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </section>
      </div>
    </div>
  );
}