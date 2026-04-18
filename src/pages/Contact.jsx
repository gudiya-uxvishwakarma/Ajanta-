import { useState } from "react";

const faqs = [
  { q: "How can I track my Ajanta order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also contact our support team with your order ID for real-time updates." },
  { q: "What is the return and exchange policy?", a: "We offer a hassle-free 7-day return and exchange policy. The product must be unused, in original packaging, and accompanied by the invoice. Reach out to us to initiate a return." },
  { q: "How do I claim my warranty?", a: "All Ajanta products come with a 1-year manufacturer warranty. To claim, contact us with your purchase proof and a description of the issue. We'll guide you through the process." },
  { q: "How long does delivery take?", a: "Orders are dispatched within 24 hours of placement. Standard delivery across India takes 3–5 business days. Express delivery options may be available at checkout." },
  { q: "Can I change or cancel my order after placing it?", a: "Orders can be modified or cancelled within 12 hours of placement. After dispatch, cancellations are not possible but you can initiate a return once delivered." },
  { q: "Do you ship internationally?", a: "Currently we ship across all major cities and towns in India. International shipping is not available at this time, but we're working on expanding our reach." },
];

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group border-b border-gray-100 last:border-b-0 cursor-pointer"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between gap-6 py-5">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-black text-gray-200 w-6 shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[14px] font-semibold text-[#1a1a1a] leading-snug group-hover:text-[#cc0000] transition-colors">{q}</span>
        </div>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-[#cc0000]" : "bg-gray-100 group-hover:bg-gray-200"}`}>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "text-white rotate-45" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}>
        <p className="text-[13px] text-gray-500 leading-relaxed pl-10">{a}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", subject: "Order Inquiry", msg: "" });

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      name: `${form.fname} ${form.lname}`.trim(),
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.msg,
      date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      read: false,
    };
    const existing = JSON.parse(localStorage.getItem("ajanta_contact_msgs") || "[]");
    localStorage.setItem("ajanta_contact_msgs", JSON.stringify([entry, ...existing]));
    setSubmitted(true);
  };

  const inputClass = (name) =>
    `w-full bg-white border-b-2 px-0 py-3 text-[14px] text-[#1a1a1a] placeholder-gray-300 focus:outline-none transition-colors duration-200 ${
      focused === name ? "border-[#cc0000]" : "border-gray-200"
    }`;

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative w-full h-[320px] md:h-[380px] overflow-hidden">
        <img
          src="/image copy 6.png"
          alt="Contact Ajanta"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />


        {/* Decorative red bar */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#cc0000]" />

        <div className="absolute inset-0 flex flex-col justify-end px-10 md:px-20 pb-16">
          <p className="text-[#cc0000] text-[10px] font-black tracking-[5px] uppercase mb-4">Ajanta Group · Support</p>
          <h1 className="text-white text-[52px] md:text-[80px] font-black tracking-tight leading-none mb-5 uppercase">
            Contact<br />
            <span className="text-white/30">Us</span>
          </h1>
          <div className="flex items-center gap-8 flex-wrap">
            <a href="mailto:support@ajantaquartz.com" className="flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors">
              <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@ajantaquartz.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-white/70 hover:text-white text-[13px] transition-colors">
              <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 98765 43210
            </a>
            <span className="flex items-center gap-2 text-white/70 text-[13px]">
              <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon–Sat, 10AM–6PM IST
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="w-full bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { num: "24h", label: "Response Time" },
            { num: "7-Day", label: "Easy Returns" },
            { num: "1 Year", label: "Warranty" },
            { num: "Pan India", label: "Delivery" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center py-2 px-4 text-center">
              <span className="text-[22px] md:text-[26px] font-black text-white leading-none">{num}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-[2px] mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="w-full px-6 md:px-16 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* LEFT — Info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[10px] text-[#cc0000] font-black tracking-[4px] uppercase mb-3">Get In Touch</p>
              <h2 className="text-[32px] md:text-[42px] font-black text-[#1a1a1a] leading-tight">
                We're here<br />whenever you need us.
              </h2>
              <div className="w-10 h-1 bg-[#cc0000] rounded-full mt-5 mb-6" />
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
                Whether it's a product question, order issue, warranty claim, or bulk inquiry — our team responds fast and resolves faster.
              </p>
            </div>

            {/* Contact rows */}
            <div className="flex flex-col gap-0 border border-gray-100 rounded-2xl overflow-hidden">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: "Email", value: "support@ajantaquartz.com", href: "mailto:support@ajantaquartz.com",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210",
                },
                {
                  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                  label: "Address", value: "Mumbai, Maharashtra, India", href: null,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  label: "Hours", value: "Mon–Sat, 10:00 AM – 6:00 PM IST", href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-5 px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[2px] font-bold">{label}</p>
                    {href ? (
                      <a href={href} className="text-[13px] font-semibold text-[#1a1a1a] group-hover:text-[#cc0000] transition-colors truncate block">{value}</a>
                    ) : (
                      <p className="text-[13px] font-semibold text-[#1a1a1a]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-56 group">
              <img src="/image copy 26.png" alt="Ajanta" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white text-[11px] font-black tracking-widest uppercase">Ajanta Manufacturing Pvt. Ltd.</p>
                <p className="text-white/60 text-[11px]">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 py-24 text-center border border-gray-100 rounded-3xl">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[20px] font-black text-[#1a1a1a] mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs">We'll get back to you within 24 hours.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-[11px] text-[#cc0000] font-black tracking-[3px] uppercase hover:underline">
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div>
                  <p className="text-[10px] text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Send a Message</p>
                  <h3 className="text-[26px] font-black text-[#1a1a1a]">We'd love to hear from you</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">First Name *</label>
                    <input type="text" required placeholder="Rahul"
                      value={form.fname} onChange={set("fname")}
                      className={inputClass("fname")}
                      onFocus={() => setFocused("fname")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Last Name *</label>
                    <input type="text" required placeholder="Sharma"
                      value={form.lname} onChange={set("lname")}
                      className={inputClass("lname")}
                      onFocus={() => setFocused("lname")} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Email Address *</label>
                  <input type="email" required placeholder="rahul@email.com"
                    value={form.email} onChange={set("email")}
                    className={inputClass("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210"
                    value={form.phone} onChange={set("phone")}
                    className={inputClass("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Subject</label>
                  <select
                    value={form.subject} onChange={set("subject")}
                    className={inputClass("subject")}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}>
                    <option>Order Inquiry</option>
                    <option>Return / Exchange</option>
                    <option>Product Question</option>
                    <option>Warranty Claim</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Message *</label>
                  <textarea required rows={4} placeholder="How can we help you?"
                    value={form.msg} onChange={set("msg")}
                    className={`${inputClass("msg")} resize-none`}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                </div>

                <button type="submit"
                  className="group relative w-full bg-[#1a1a1a] text-white py-4 rounded-xl text-[11px] font-black tracking-[4px] uppercase overflow-hidden transition-all duration-300 hover:bg-[#cc0000]">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>

                <p className="text-[11px] text-gray-300 text-center">We typically respond within 24 business hours.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#f8f8f8] px-6 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[10px] text-[#cc0000] font-black tracking-[4px] uppercase mb-3">Support</p>
              <h2 className="text-[30px] md:text-[40px] font-black text-[#1a1a1a] leading-tight">
                Frequently Asked<br />Questions
              </h2>
            </div>
            <p className="text-[13px] text-gray-400 max-w-xs leading-relaxed">
              Can't find your answer? Drop us a message and we'll get back to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            <div className="bg-white rounded-2xl px-6 py-2">
              {faqs.slice(0, 3).map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
            <div className="bg-white rounded-2xl px-6 py-2">
              {faqs.slice(3).map((faq, i) => (
                <FaqItem key={i + 3} q={faq.q} a={faq.a} index={i + 3} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="w-full">
        <div className="bg-[#111] px-8 md:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#cc0000] rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-[12px] font-bold">Ajanta Quartz Pvt. Ltd.</p>
              <p className="text-gray-500 text-[11px]">Mumbai, Maharashtra, India</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Ajanta+Quartz+Mumbai" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-[#cc0000] font-bold tracking-wide hover:underline">
            Open in Maps
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
        <iframe
          title="Ajanta Quartz Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
          width="100%" height="280"
          style={{ border: 0, display: "block" }}
          allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </div>
  );
}
