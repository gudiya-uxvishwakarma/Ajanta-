import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const trackSteps = [
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Order Placed", time: "Apr 28, 9:12 AM" },
  { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12", label: "Packed", time: "Apr 28, 2:45 PM" },
  { icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", label: "Shipped", time: "Apr 29, 8:00 AM" },
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Delivered", time: "Expected Apr 30" },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const inputClass = (name) =>
    `w-full px-4 py-3 text-sm text-gray-800 bg-white border rounded-lg focus:outline-none transition-all duration-200 placeholder-gray-300 ${
      focused === name ? "border-[#cc0000] ring-2 ring-[#cc0000]/10" : "border-gray-200 hover:border-red-200"
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim() && email.trim()) setSubmitted(true);
  };

  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hm1.jpg" alt="Track Order"
          className="w-full h-full object-cover object-center"
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
              <span className="text-[#cc0000] font-semibold">Track Order</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Customer Care</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Track Your<br /><span className="text-[#cc0000]">Order</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Real-time updates on your shipment, right at your fingertips.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS BAR */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Pan India", sub: "27,000+ pin codes" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Fast Dispatch", sub: "Same day before 2 PM" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure Packaging", sub: "Damage-free delivery" },
            { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "24h Support", sub: "Mon–Sat, 10AM–6PM" },
          ].map(({ icon, label, sub }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-black text-sm leading-none">{label}</p>
                <p className="text-gray-500 text-xs mt-1">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAIN */}
      <section className="w-full px-6 md:px-16 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form / Result */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
            <div className="relative h-36 overflow-hidden">
              <img src="/hma5.jpg" alt="" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/90 to-[#cc0000]/50" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Real-Time Tracking</p>
                <h3 className="text-white text-2xl font-black">Where is my order?</h3>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Order ID *</label>
                    <input type="text" required placeholder="e.g. AJQ-20250001" value={orderId}
                      onChange={e => setOrderId(e.target.value)}
                      className={inputClass("orderId")}
                      onFocus={() => setFocused("orderId")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input type="email" required placeholder="you@example.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={inputClass("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#cc0000] text-white py-3.5 rounded-lg text-sm font-bold tracking-wide hover:bg-[#a00000] transition-colors flex items-center justify-center gap-2 group">
                    Track My Order
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                  <p className="text-xs text-gray-400 text-center">Your Order ID is in your confirmation email.</p>
                </motion.form>
              ) : (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
                  <div className="flex items-center gap-3 mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm">Order Found: <span className="text-[#cc0000]">{orderId}</span></p>
                      <p className="text-gray-500 text-xs mt-0.5">Last updated: Today, 10:30 AM</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-col gap-0">
                    {trackSteps.map((step, i) => (
                      <div key={step.label} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 z-10 ${i <= 2 ? "bg-[#cc0000] border-[#cc0000]" : "bg-white border-gray-200"}`}>
                            <svg className={`w-4 h-4 ${i <= 2 ? "text-white" : "text-gray-300"}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                            </svg>
                          </div>
                          {i < trackSteps.length - 1 && (
                            <div className={`w-0.5 h-10 ${i < 2 ? "bg-[#cc0000]" : "bg-gray-100"}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`font-black text-sm ${i <= 2 ? "text-gray-800" : "text-gray-300"}`}>{step.label}</p>
                          <p className={`text-xs mt-0.5 ${i <= 2 ? "text-gray-400" : "text-gray-200"}`}>{step.time}</p>
                          {i === 2 && (
                            <span className="inline-block mt-1.5 text-[10px] font-black bg-[#cc0000] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">Current Status</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => { setSubmitted(false); setOrderId(""); setEmail(""); }}
                    className="mt-2 text-sm text-[#cc0000] font-bold hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Track another order
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-6">
            <div>
              <p className="text-xs text-[#cc0000] font-black tracking-widest uppercase mb-2">Delivery Info</p>
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-3">Fast & Reliable<br />Delivery Across India</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We partner with India's top logistics providers to ensure your Ajanta products reach you safely and on time.
              </p>
            </div>

            {/* Image mosaic */}
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-56 rounded-2xl overflow-hidden">
              <div className="col-span-2 row-span-2 overflow-hidden">
                <motion.img src="/hm2.webp" alt="Delivery" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma4.jpg" alt="" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma6.jpg" alt="" className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            {/* Delivery timeline cards */}
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Standard Delivery", time: "5–7 Business Days", cost: "Free above ₹999", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
                { label: "Express Delivery", time: "2–3 Business Days", cost: "₹99 — Major metros", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-red-100 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-gray-800 text-sm">{d.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{d.time}</p>
                  </div>
                  <span className="text-xs font-bold text-[#cc0000] bg-red-50 px-3 py-1 rounded-full">{d.cost}</span>
                </div>
              ))}
            </div>

            {/* Help card */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-9 h-9 bg-[#cc0000] rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-black text-gray-800 text-sm mb-1">Can't find your order?</p>
                <p className="text-gray-500 text-xs leading-relaxed">Your Order ID is in your confirmation email. Still need help?{" "}
                  <Link to="/contact" className="text-[#cc0000] font-bold hover:underline">Contact our support team</Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative w-full h-64 md:h-72 overflow-hidden">
        <img src="/hm5.webp" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs font-black tracking-[4px] uppercase mb-3">Need Help?</p>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-5">We're Here for You</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-[#a00000] transition-colors">
                Contact Support
              </Link>
              <Link to="/shipping-policy" className="bg-white/10 border border-white/30 text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
                Shipping Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
