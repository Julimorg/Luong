import { useState } from "react";
import emailjs from "@emailjs/browser";
import { contactInfo } from "../data/data";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", email: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Vui lòng điền đầy đủ họ tên, email và nội dung.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_phone: form.phone,
          from_email: form.email,
          message:    form.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      const isEmailJSError = (e: unknown): e is { status?: number; text?: string } =>
        typeof e === "object" && e !== null && ("status" in e || "text" in e);

      const isQuota =
        (isEmailJSError(err) && err.status === 429) ||
        (isEmailJSError(err) && typeof err.text === "string" && err.text.toLowerCase().includes("quota"));
      setErrorMsg(
        isQuota
          ? "Hệ thống đang bận, vui lòng liên hệ trực tiếp qua điện thoại."
          : "Gửi thất bại. Vui lòng thử lại sau."
      );
      setStatus("error");
    }
  };

  const input =
    "w-full bg-gray-50 border border-gray-200 text-[#0a1628] text-sm rounded-xl px-4 py-3.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e8a020]/30 focus:border-[#e8a020] transition";

  const contactItems = [
    { icon: "📍", label: "Địa chỉ",      value: contactInfo.address },
    { icon: "📞", label: "Điện thoại",    value: contactInfo.phone },
    { icon: "✉️", label: "Email",         value: contactInfo.email },
    { icon: "🕐", label: "Giờ làm việc", value: contactInfo.workingHours },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#e8a020]" />
              <span className="text-[#e8a020] text-xs font-bold uppercase tracking-[0.2em]">
                Liên hệ
              </span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-[#0a1628] tracking-tight mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Bắt Đầu Dự Án<br className="hidden sm:block" /> Của Bạn
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Hãy để chúng tôi lắng nghe nhu cầu của bạn và đề xuất giải pháp phù hợp nhất.
            </p>
            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center text-base flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[#0a1628] text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-8">
            <h3
              className="text-xl font-bold text-[#0a1628] mb-6"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Gửi Tin Nhắn
            </h3>

            {status === "success" && (
              <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                ✅ Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ bạn sớm.
              </div>
            )}

            {status === "error" && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                ❌ {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="Nguyễn Văn A"
                    className={input}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Số điện thoại
                  </label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="0909 xxx xxx"
                    className={input}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="email@example.com"
                  className={input}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Nội dung <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange} rows={4}
                  placeholder="Mô tả nhu cầu của bạn..."
                  className={`${input} resize-none`}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="w-full py-4 bg-[#0a1628] hover:bg-[#0d2040] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm tracking-wide"
              >
                {status === "sending" ? "Đang gửi..." : "Gửi Yêu Cầu"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}