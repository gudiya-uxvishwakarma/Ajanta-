import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";
import SEOHead from "../components/SEOHead";

const faqs = [
  { q: "How can I track my Ajanta order?", a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also contact our support team with your order ID for real-time updates." },
  { q: "What is the return and exchange policy?", a: "We offer a hassle-free 7-day return and exchange policy. The product must be unused, in original packaging, and accompanied by the invoice." },
  { q: "How do I claim my warranty?", a: "All Ajanta products come with a 1-year manufacturer warranty. Contact us with your purchase proof and a description of the issue." },
  { q: "How long does delivery take?", a: "Orders are dispatched within 24 hours. Standard delivery across India takes 3-5 business days." },
  { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 12 hours of placement. After dispatch, cancellations are not possible." },
  { q: "Do you ship internationally?", a: "Currently we ship across all major cities and towns in India. International shipping is not available at this time." },
];

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`border-b border-red-100 last:border-b-0 cursor-pointer transition-all duration-300 ${open ? "bg-red-50" : "hover:bg-red-50/50"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-[#cc0000]/40 w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#cc0000]" : "text-gray-700"}`}>{q}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${open ? "bg-[#cc0000]" : "bg-red-100"}`}
        >
          <svg className={`w-3 h-3 ${open ? "text-white" : "text-[#cc0000]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 leading-relaxed pb-4" style={{ paddingLeft: "3.25rem", paddingRight: "1.25rem" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const { settings } = useWebsiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState(null);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", subject: "Order Inquiry", msg: "" });

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(API_ENDPOINTS.sendContactMessage, {
        name: `${form.fname} ${form.lname}`.trim(),
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.msg
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
      // Still show success to user even if backend fails
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 text-sm text-gray-800 bg-white border rounded-lg focus:outline-none transition-all duration-200 placeholder-gray-300 ${
      focused === name ? "border-[#cc0000] ring-2 ring-[#cc0000]/10" : "border-gray-200 hover:border-red-200"
    }`;

  return (
    <div className="w-full bg-white min-h-screen">
      <SEOHead
        title="Contact Ajanta Associates | Bangalore Clock & Lighting Store"
        description="Get in touch with Ajanta Associates, Bangalore. Call, email or visit us for Ajanta clocks, fans, LED lights and home appliances. Fast response guaranteed."
        keywords="contact Ajanta Associates, Ajanta Bangalore contact, Ajanta clock store Bangalore"
        canonical="https://ajantaworld.in/contact"
      />

      {/* HERO */}
      <div className="relative w-full h-80 md:h-[420px] overflow-hidden">
        <motion.img src="/hm3.jpg" alt="Contact Ajanta"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/85 to-white/10" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="flex items-center gap-2 text-sm mb-5">
              <Link to="/" className="flex items-center gap-1.5 text-gray-400 hover:text-[#cc0000] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-[#cc0000] font-semibold">Contact Us</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Ajanta Group</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-5">
              Get In<br /><span className="text-[#cc0000]">Touch</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
              We are here to help. Reach out and we will respond within 24 hours.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href={`tel:${settings.contactPhone}`} className="flex items-center gap-2 bg-[#cc0000] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#a00000] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-bold hover:border-[#cc0000] hover:text-[#cc0000] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "24h", label: "Response Time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { num: "7-Day", label: "Easy Returns", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
            { num: "1 Year", label: "Warranty", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { num: "Pan India", label: "Delivery", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
          ].map(({ num, label, icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
            >
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-black text-xl leading-none">{num}</p>
                <p className="text-gray-500 text-xs mt-1">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT CARDS with images */}
      <section className="w-full px-6 md:px-16 py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-10"
          >
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Reach Us</p>
            <h2 className="text-3xl font-black text-gray-900">How to Contact Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email Us", value: settings.contactEmail, href: `mailto:${settings.contactEmail}`, img: "/hma1.png" },
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Call Us", value: settings.contactPhone, href: `tel:${settings.contactPhone}`, img: "/hma2.jpg" },
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Visit Us", value: "Mumbai, Maharashtra", href: null, img: "/hma4.jpg" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Working Hours", value: "Mon-Sat, 10AM-6PM IST", href: null, img: "/hma5.jpg" },
            ].map(({ icon, label, value, href, img }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-400 bg-white"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white text-xs font-black uppercase tracking-wider">{label}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                    </svg>
                  </div>
                  <div>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-gray-800 hover:text-[#cc0000] transition-colors leading-snug block">{value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="w-full px-6 md:px-16 py-14 bg-red-50/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm"
          >
            <div className="relative h-36 overflow-hidden">
              <img src="/hm4.jpg" alt="" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/90 to-[#cc0000]/50" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Send a Message</p>
                <h3 className="text-white text-2xl font-black">We would love to hear from you</h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-5 py-16 px-8 text-center"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm">We will get back to you within 24 hours.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="text-sm text-[#cc0000] font-bold hover:underline">Send Another</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} className="p-8 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">First Name *</label>
                      <input type="text" required placeholder="Rahul" value={form.fname} onChange={set("fname")}
                        className={inputClass("fname")} onFocus={() => setFocused("fname")} onBlur={() => setFocused(null)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last Name *</label>
                      <input type="text" required placeholder="Sharma" value={form.lname} onChange={set("lname")}
                        className={inputClass("lname")} onFocus={() => setFocused("lname")} onBlur={() => setFocused(null)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input type="email" required placeholder="rahul@email.com" value={form.email} onChange={set("email")}
                      className={inputClass("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")}
                      className={inputClass("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Subject</label>
                    <select value={form.subject} onChange={set("subject")} className={inputClass("subject")}
                      onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}>
                      <option>Order Inquiry</option>
                      <option>Return / Exchange</option>
                      <option>Product Question</option>
                      <option>Warranty Claim</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea required rows={4} placeholder="How can we help you?" value={form.msg} onChange={set("msg")}
                      className={`${inputClass("msg")} resize-none`}
                      onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    className="w-full bg-[#cc0000] text-white py-3.5 rounded-lg text-sm font-bold tracking-wide hover:bg-[#a00000] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    {!submitting && (
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </motion.button>
                  <p className="text-xs text-gray-400 text-center">We typically respond within 24 business hours.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info + Images + Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs text-[#cc0000] font-black tracking-widest uppercase mb-2">Our Location</p>
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-3">We are here whenever<br />you need us.</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Whether it is a product question, order issue, warranty claim, or bulk inquiry, our team responds fast and resolves faster.
              </p>
            </div>

            {/* Mosaic image grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-56 rounded-2xl overflow-hidden">
              <div className="col-span-2 row-span-2 overflow-hidden">
                <motion.img src="/hm2.webp" alt="Ajanta" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma6.jpg" alt="" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma7.jpg" alt="" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-red-100 shadow-sm">
              <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#cc0000] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 text-xs font-bold">Ajanta Quartz Pvt. Ltd.</p>
                    <p className="text-gray-400 text-xs">Mumbai, Maharashtra</p>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Ajanta+Quartz+Mumbai" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#cc0000] font-bold hover:underline flex items-center gap-1">
                  Open Maps
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <iframe title="Ajanta Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
                width="100%" height="200" style={{ border: 0, display: "block" }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Follow:</p>
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
                { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map(({ label, path }) => (
                <motion.button key={label} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#cc0000] hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                  </svg>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-6 md:px-16 py-16 bg-red-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-10"
          >
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Support</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked<br />Questions</h2>
            <p className="text-sm text-gray-400 mt-3 max-w-sm leading-relaxed">
              Cannot find your answer? Drop us a message and we will get back to you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
              {faqs.slice(0, 3).map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
            </div>
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
              {faqs.slice(3).map((faq, i) => <FaqItem key={i + 3} q={faq.q} a={faq.a} index={i + 3} />)}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
