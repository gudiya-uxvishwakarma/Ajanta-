import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { name: "Clocks & Watches", period: "1 Year", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", img: "/cl1.png" },
  { name: "Hand Torches", period: "1 Year", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", img: "/handtorches.webp" },
  { name: "Emergency Lights", period: "1 Year", icon: "M13 10V3L4 14h7v7l9-11h-7z", img: "/hm1.jpg" },
  { name: "Home Appliances", period: "1 Year", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", img: "/hma7.jpg" },
  { name: "LED Products", period: "1 Year", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", img: "/hm2.webp" },
  { name: "Kitchen Appliances", period: "1 Year", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", img: "/hma11.jpg" },
];

const coverageItems = [
  { covered: true, text: "Manufacturing defects in materials or workmanship" },
  { covered: true, text: "Mechanical or electrical failures under normal use" },
  { covered: true, text: "Battery defects within 6 months (rechargeable products)" },
  { covered: true, text: "Component failures not caused by external damage" },
  { covered: false, text: "Physical damage, drops, or accidental breakage" },
  { covered: false, text: "Water damage beyond the product's rated protection" },
  { covered: false, text: "Damage from unauthorized repairs or modifications" },
  { covered: false, text: "Normal wear and tear over time" },
];

const claimSteps = [
  "Keep your purchase invoice — it serves as your warranty proof.",
  "Contact us at support@ajantaquartz.com or call +91 22 1234 5678 with your order details and a description of the issue.",
  "Our team will assess the defect and guide you on whether a repair, replacement, or refund applies.",
  "Ship the product to our service center (address provided by our team). Warranty claim shipping is covered by Ajanta.",
];

export default function WarrantyPolicy() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hma7.jpg" alt="Warranty Policy"
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
              <span className="text-[#cc0000] font-semibold">Warranty Policy</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Customer Care</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Warranty<br /><span className="text-[#cc0000]">Policy</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Every Ajanta product is backed by our quality guarantee. Here's what's covered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS BAR */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "1 Year Warranty", sub: "On all products" },
            { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Free Repair", sub: "Covered defects" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Replacement", sub: "If repair not possible" },
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Free Shipping", sub: "For warranty claims" },
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

      {/* PRODUCT CATEGORIES */}
      <section className="w-full px-6 md:px-16 py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Coverage</p>
            <h2 className="text-3xl font-black text-gray-900">Warranty by Product Category</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="relative h-32 overflow-hidden bg-gray-50">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-white text-[10px] font-black bg-[#cc0000] px-2 py-0.5 rounded-full">{cat.period}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-black text-gray-800 text-xs leading-tight">{cat.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE TABLE + CLAIM PROCESS */}
      <section className="w-full px-6 md:px-16 py-14 bg-red-50/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Coverage */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Details</p>
            <h2 className="text-3xl font-black text-gray-900 mb-6">What's Covered</h2>
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
              {coverageItems.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i !== coverageItems.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.covered ? "bg-green-100" : "bg-red-100"}`}>
                    <svg className={`w-3.5 h-3.5 ${item.covered ? "text-green-600" : "text-red-500"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.covered ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-[13px] flex-1">{item.text}</p>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${item.covered ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    {item.covered ? "Covered" : "Not Covered"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Claim Process */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-6">
            <div>
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Process</p>
              <h2 className="text-3xl font-black text-gray-900 mb-6">How to Claim Warranty</h2>
            </div>
            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm flex flex-col gap-5">
              {claimSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#cc0000] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-gray-600 text-[13px] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-[#1a0000] to-[#cc0000] rounded-2xl p-6 text-white">
              <h3 className="font-black text-lg mb-2">Need to Claim Warranty?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">Our support team is ready to help you through the process.</p>
              <div className="flex gap-3">
                <Link to="/contact" className="bg-white text-[#cc0000] text-xs font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors">
                  Contact Us
                </Link>
                <a href="mailto:support@ajantaquartz.com" className="bg-white/10 border border-white/30 text-white text-xs font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
