import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const options = [
  { name: "Standard Delivery", time: "5–7 Business Days", cost: "₹49", free: "Free above ₹999", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", coverage: "27,000+ pin codes across India" },
  { name: "Express Delivery", time: "2–3 Business Days", cost: "₹99", free: null, icon: "M13 10V3L4 14h7v7l9-11h-7z", coverage: "Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune" },
  { name: "Same-Day Delivery", time: "Same Day (order before 12 PM)", cost: "₹149", free: null, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", coverage: "Select areas in Mumbai only" },
];

const faqs = [
  { q: "When will my order be dispatched?", a: "Orders placed before 2:00 PM IST on business days are dispatched the same day. Orders placed after 2:00 PM or on weekends/holidays are dispatched the next business day." },
  { q: "Do you ship internationally?", a: "Currently we ship only within India. International shipping is coming soon — stay tuned!" },
  { q: "What if my order is delayed?", a: "Delays can occasionally occur due to weather, public holidays, or high demand. If your order is more than 2 days past the expected date, please contact our support team." },
  { q: "Can I change my delivery address after placing an order?", a: "Address changes can be made within 2 hours of placing the order. After that, the order may already be in processing. Contact us immediately at support@ajantaquartz.com." },
  { q: "How do I track my shipment?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also use our Track Order page with your Order ID and email." },
  { q: "What happens if I'm not home during delivery?", a: "Our courier partner will attempt delivery up to 3 times. After that, the package is held at the nearest hub for 5 days before being returned to us." },
];

export default function ShippingPolicy() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hm2.webp" alt="Shipping Policy"
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
              <span className="text-[#cc0000] font-semibold">Shipping Policy</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Customer Care</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Shipping<br /><span className="text-[#cc0000]">Policy</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Fast, reliable delivery across India. Everything you need to know.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FREE SHIPPING BANNER */}
      <section className="w-full bg-[#cc0000]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-white font-black text-sm tracking-wide">FREE Standard Shipping on all orders above ₹999 — No coupon needed, applied automatically at checkout.</p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Pan India", sub: "27,000+ pin codes" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Same-Day Dispatch", sub: "Orders before 2 PM" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure Packaging", sub: "Damage-free delivery" },
            { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", label: "Live Tracking", sub: "SMS & email updates" },
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

      {/* DELIVERY OPTIONS */}
      <section className="w-full px-6 md:px-16 py-14 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Options</p>
            <h2 className="text-3xl font-black text-gray-900">Delivery Options</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt, i) => (
              <motion.div key={opt.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-red-200 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#cc0000]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} />
                  </svg>
                </div>
                <h3 className="font-black text-gray-800 text-lg mb-1">{opt.name}</h3>
                <p className="text-[#cc0000] font-bold text-sm mb-1">{opt.time}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-800 font-black text-xl">{opt.cost}</span>
                  {opt.free && <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">{opt.free}</span>}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-50 pt-3">{opt.coverage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + IMAGE */}
      <section className="w-full px-6 md:px-16 py-14 bg-red-50/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Support</p>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
              {faqs.map((faq, i) => (
                <div key={i} className={`px-5 py-4 ${i !== faqs.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <p className="font-black text-gray-800 text-sm mb-1.5">{faq.q}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3 h-72 rounded-2xl overflow-hidden">
              <div className="row-span-2 overflow-hidden">
                <motion.img src="/hm3.jpg" alt="" className="w-full h-full object-cover object-top" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma5.jpg" alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="overflow-hidden">
                <motion.img src="/hma6.jpg" alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a0000] to-[#cc0000] rounded-2xl p-6 text-white">
              <h3 className="font-black text-lg mb-2">Questions About Delivery?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">Our team is available Mon–Sat, 10 AM–6 PM IST.</p>
              <div className="flex gap-3 flex-wrap">
                <Link to="/track-order" className="bg-white text-[#cc0000] text-xs font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors">
                  Track Order
                </Link>
                <Link to="/contact" className="bg-white/10 border border-white/30 text-white text-xs font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
