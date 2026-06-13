import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { contactForm, contactBreadcrumb, contactPageHeader, contactItems, contactMap } from "../../data/contractData";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── Env vars ─────────────────────────────────────────────────
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Icon map ─────────────────────────────────────────────────
const infoIconMap: Record<string, React.ReactNode> = {
  location_on: <LocationOnIcon sx={{ fontSize: 20 }} />,
  phone:       <PhoneIcon sx={{ fontSize: 20 }} />,
  email:       <EmailIcon sx={{ fontSize: 20 }} />,
  schedule:    <ScheduleIcon sx={{ fontSize: 20 }} />,
};

// ─── Types ────────────────────────────────────────────────────
type FormState = { name: string; phone: string; email: string; message: string };
type Status    = "idle" | "sending" | "success" | "error";

// ─── Shared input class ───────────────────────────────────────
const inputCls =
  "w-full bg-gray-50 border border-gray-200 text-[#0d2137] text-sm rounded-xl " +
  "px-4 py-3.5 placeholder:text-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] " +
  "transition-all duration-200";

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

// ─── MAIN ─────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm]       = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus]   = useState<Status>("idle");
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
    <div className="pt-[72px] bg-[#f3f4f6] min-h-screen">

      {/* ══════════════ BREADCRUMB ══════════════ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm">
            {contactBreadcrumb.map((crumb, i) => (
              <span key={crumb.to} className="flex items-center gap-1">
                {i > 0 && <NavigateNextIcon sx={{ fontSize: 16, color: "#9ca3af" }} />}
                {i < contactBreadcrumb.length - 1 ? (
                  <Link to={crumb.to} className="text-gray-500 hover:text-[#f5a623] no-underline transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0d2137] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── LEFT: info + map ── */}
            <Reveal>
              {/* Page title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1c2f5c] mb-2 leading-tight">
                {contactPageHeader.headline}
              </h1>
              <p className="text-gray-500 text-base mb-8">{contactPageHeader.description}</p>

              {/* Contact items */}
              <div className="flex flex-col gap-5 mb-8">
                {contactItems.map((item, i) => (
                  <Reveal key={item.id} delay={i * 80}>
                    <div className="flex items-start gap-4">
                      {/* Icon circle */}
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f5a623]/10 text-[#f5a623] flex items-center justify-center">
                        {infoIconMap[item.icon]}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#0d2137] text-sm font-medium no-underline hover:text-[#f5a623] transition-colors duration-200 whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[#0d2137] text-sm font-medium whitespace-pre-line">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Google Map embed */}
              <Reveal delay={320}>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    src={contactMap.embedSrc}
                    width="100%"
                    height="240"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Solartech Map"
                  />
                  {/* Map label */}
                  <div className="px-4 py-3 bg-white flex items-start gap-3">
                    <LocationOnIcon sx={{ fontSize: 18, color: "#f5a623", mt: "1px", flexShrink: 0 }} />
                    <div>
                      <div className="text-[#0d2137] text-sm font-bold">{contactMap.label}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{contactMap.address}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Reveal>

            {/* ── RIGHT: form ── */}
            <Reveal delay={150}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-7 sm:p-8">
                <h2 className="text-xl font-bold text-[#0d2137] mb-6">
                  {contactForm.title}
                </h2>

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
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      {contactForm.fields.name.label}{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange}
                      placeholder={contactForm.fields.name.placeholder}
                      className={inputCls}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      {contactForm.fields.email.label}{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange}
                      placeholder={contactForm.fields.email.placeholder}
                      className={inputCls}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      {contactForm.fields.phone.label}
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange}
                      placeholder={contactForm.fields.phone.placeholder}
                      className={inputCls}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      {contactForm.fields.message.label}{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} rows={5}
                      placeholder={contactForm.fields.message.placeholder}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200
                               bg-[#f5a623] hover:bg-[#e09410] active:bg-[#c97f0e]
                               disabled:opacity-60 disabled:cursor-not-allowed
                               text-white shadow-sm hover:shadow-[0_4px_16px_rgba(245,166,35,0.4)]"
                  >
                    {status === "sending" ? contactForm.sendingLabel : contactForm.submitLabel}
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}