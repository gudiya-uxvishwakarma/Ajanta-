import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  { num: "01", title: "Initiate Request", desc: "Contact us via email or phone within 7 days of delivery with your order ID and reason for return.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { num: "02", title: "Get Approval", desc: "Our team reviews your request and sends a return authorization within 24–48 hours.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { num: "03", title: "Ship the Item", desc: "Pack the item securely in its original packaging and ship it to our warehouse using the provided address.", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
  { num: "04", title: "Refund / Exchange", desc: "Once received and inspected, your refund is processed or the replacement item is dispatched within 5–7 days.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const covered = [
  { ok: true, text: "Items returned within 7 days of delivery" },
  { ok: true, text: "Unused items in original packaging with tags" },
  { ok: true, text: "Manufacturing defects or wrong items received" },
  { ok: true, text: "Damaged items reported within 48 hours of delivery" },
  { ok: false, text: "Items damaged due to misuse or negligence" },
  { ok: false, text: "Items without original packaging or invoice" },
  { ok: false, text: "Clearance / sale items (marked non-returnable)" },
  { ok: false, text: "Items returned after the 7-day window" },
];

export default function ReturnExchange() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hm3.jpg" alt="Return & Exchange"
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
              <span className="text-[#cc0000] font-semibold">Return & Exchange</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Customer Care</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Return &<br /><span className="text-[#cc0000]">Exchange</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              We want you to love your purchase. If something isn't right, we'll make it right.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS BAR */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "7-Day Returns", sub: "From delivery date" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Easy Exchange", sub: "Same or different model" },
            { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Full Refund", sub: "5–7 business days" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "No Questions", sub: "Hassle-free process" },
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

      {/* HOW IT WORKS */}
      <section className="w-full px-6 md:px-16 py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Simple Process</p>
            <h2 className="text-3xl font-black text-gray-900">How Returns Work</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-md transition-all duration-300">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gray-200 z-10" />
                )}
                <div className="w-12 h-12 bg-[#cc0000] rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-[#cc0000]/40 tracking-[0.2em] uppercase">{step.num}</span>
                <h3 className="font-black text-gray-800 text-base mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S COVERED + IMAGE */}
      <section className="w-full px-6 md:px-16 py-14 bg-red-50/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Policy Details</p>
            <h2 className="text-3xl font-black text-gray-900 mb-6">What's Covered</h2>
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
              {covered.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i !== covered.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.ok ? "bg-green-100" : "bg-red-100"}`}>
                    <svg className={`w-3.5 h-3.5 ${item.ok ? "text-green-600" : "text-red-500"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.ok ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-[13px] flex-1">{item.text}</p>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${item.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    {item.ok ? "Eligible" : "Not Eligible"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3 h-72 rounded-2xl overflow-hidden">
              <div className="row-span-2 overflow-hidden">
                <motion.img src="/hma2.jpg" alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma3.webp" alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma4.jpg" alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0000] to-[#cc0000] rounded-2xl p-6 text-white">
              <h3 className="font-black text-lg mb-2">Ready to Start a Return?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">Reach out to our support team and we'll guide you through every step.</p>
              <Link to="/contact" className="inline-block bg-white text-[#cc0000] text-xs font-black tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-red-50 transition-colors">
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative w-full h-64 overflow-hidden">
        <img src="/hm4.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs font-black tracking-[4px] uppercase mb-3">Ajanta Quartz</p>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-5">Your Satisfaction, Guaranteed</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-[#a00000] transition-colors">
                Continue Shopping
              </Link>
              <Link to="/contact" className="bg-white/10 border border-white/30 text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
