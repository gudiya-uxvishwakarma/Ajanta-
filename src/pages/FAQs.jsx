import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    label: "Orders & Payment",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    faqs: [
      { q: "How do I place an order?", a: "Browse our shop, add items to your cart, and proceed to checkout. You can pay via UPI, credit/debit card, net banking, or popular wallets like Paytm and PhonePe." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order may already be in processing. Contact us immediately at support@ajantaquartz.com." },
      { q: "Is it safe to pay on your website?", a: "Yes. All transactions are secured with SSL encryption and processed through PCI-DSS compliant payment gateways. We never store your card details." },
      { q: "Will I receive an order confirmation?", a: "Yes, a confirmation email with your order details and invoice will be sent to your registered email address immediately after payment." },
      { q: "Can I use multiple vouchers on one order?", a: "Only one voucher or discount code can be applied per order. Vouchers cannot be combined with other ongoing promotions." },
    ],
  },
  {
    label: "Shipping & Delivery",
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    faqs: [
      { q: "How long does delivery take?", a: "Standard delivery takes 5–7 business days. Express delivery (2–3 days) is available in major metros. Same-day delivery is available in select Mumbai areas for orders placed before 12 PM." },
      { q: "Is there free shipping?", a: "Yes! Standard shipping is free on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹49 applies." },
      { q: "Do you ship outside India?", a: "Currently we ship only within India. International shipping is planned for the future." },
      { q: "How do I track my order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also use our Track Order page with your Order ID and email." },
      { q: "What if I'm not home during delivery?", a: "Our courier partner will attempt delivery up to 3 times. After that, the package is held at the nearest hub for 5 days before being returned to us." },
    ],
  },
  {
    label: "Returns & Warranty",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    faqs: [
      { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unused items in original packaging. Please contact us to initiate a return." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount is credited to your original payment method." },
      { q: "What warranty do Ajanta products carry?", a: "Most Ajanta products come with a 1-year manufacturer's warranty covering defects in materials and workmanship. Please refer to our Warranty Policy for full details." },
      { q: "My product arrived damaged. What do I do?", a: "Please take photos of the damaged item and packaging, then contact us within 48 hours of delivery at support@ajantaquartz.com. We'll arrange a replacement or refund promptly." },
    ],
  },
  {
    label: "Products & Account",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    faqs: [
      { q: "Are Ajanta products genuine?", a: "Yes, all products sold on ajantaquartz.com are 100% genuine and sourced directly from Ajanta Quartz Pvt. Ltd." },
      { q: "How do I create an account?", a: "Click 'Register' in the top navigation, fill in your details, and verify your email. An account lets you track orders, save addresses, and manage your wishlist." },
      { q: "I forgot my password. How do I reset it?", a: "Click 'Login', then 'Forgot Password'. Enter your registered email and we'll send you a reset link within a few minutes." },
      { q: "How do I contact customer support?", a: "You can reach us via email at support@ajantaquartz.com, by phone at +91 22 1234 5678, or through the Contact Us page. We respond within 24 hours." },
    ],
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`border-b border-red-100 last:border-b-0 cursor-pointer transition-all duration-300 ${open ? "bg-red-50" : "hover:bg-red-50/50"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-[#cc0000]/40 w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#cc0000]" : "text-gray-700"}`}>{faq.q}</span>
        </div>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${open ? "bg-[#cc0000]" : "bg-red-100"}`}>
          <svg className={`w-3 h-3 ${open ? "text-white" : "text-[#cc0000]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="text-sm text-gray-500 leading-relaxed pb-4" style={{ paddingLeft: "3.25rem", paddingRight: "1.25rem" }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hma6.jpg" alt="FAQs"
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
              <span className="text-[#cc0000] font-semibold">FAQs</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Help Center</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Frequently<br /><span className="text-[#cc0000]">Asked Questions</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Quick answers to the most common questions about orders, shipping, returns, and more.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STATS BAR */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "24h Response", sub: "Mon–Sat support" },
            { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "7-Day Returns", sub: "Hassle-free" },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "1 Year Warranty", sub: "All products" },
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Pan India", sub: "Free above ₹999" },
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

      {/* MAIN FAQ */}
      <section className="w-full px-6 md:px-16 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Support</p>
              <h2 className="text-3xl font-black text-gray-900">Browse by Topic</h2>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat, i) => (
                <button key={cat.label} onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${activeCategory === i ? "bg-[#cc0000] text-white shadow-lg shadow-red-900/20" : "bg-red-50 border border-red-100 text-gray-600 hover:bg-red-100 hover:text-[#cc0000]"}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
                {categories[activeCategory].faqs.map((faq, i) => (
                  <FaqItem key={faq.q} faq={faq} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Contact Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-32 overflow-hidden">
                <img src="/hma2.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/90 to-[#cc0000]/60" />
                <div className="absolute inset-0 flex flex-col justify-center px-5">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Still Need Help?</p>
                  <h3 className="text-white text-lg font-black">Talk to Us</h3>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <a href="mailto:support@ajantaquartz.com"
                  className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-xl hover:border-[#cc0000] transition-colors group">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-xs font-bold text-gray-700 group-hover:text-[#cc0000] transition-colors">support@ajantaquartz.com</p>
                  </div>
                </a>
                <a href="tel:+912212345678"
                  className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-xl hover:border-[#cc0000] transition-colors group">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#cc0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-xs font-bold text-gray-700 group-hover:text-[#cc0000] transition-colors">+91 22 1234 5678</p>
                  </div>
                </a>
                <Link to="/contact"
                  className="w-full text-center bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-[#a00000] transition-colors mt-1">
                  Send a Message
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Helpful Links</p>
              {[
                { label: "Track Your Order", to: "/track-order" },
                { label: "Return & Exchange", to: "/return-exchange" },
                { label: "Shipping Policy", to: "/shipping-policy" },
                { label: "Warranty Policy", to: "/warranty-policy" },
                { label: "Privacy Policy", to: "/privacy-policy" },
              ].map((l) => (
                <Link key={l.label} to={l.to}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group">
                  <span className="text-sm text-gray-600 group-hover:text-[#cc0000] transition-colors font-medium">{l.label}</span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#cc0000] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative w-full h-64 overflow-hidden">
        <img src="/hm4.jpg" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs font-black tracking-[4px] uppercase mb-3">Ajanta Quartz</p>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-5">Didn't Find Your Answer?</h2>
            <Link to="/contact" className="bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-[#a00000] transition-colors">
              Contact Our Support Team
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
