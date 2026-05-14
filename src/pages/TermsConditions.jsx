import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  { id: "01", title: "Acceptance of Terms", content: "By accessing or using the Ajanta Quartz website (ajantaquartz.com), you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site." },
  { id: "02", title: "Use of the Website", content: "You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable local, national, or international laws; to transmit unsolicited advertising material; to impersonate any person or entity; or to engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website." },
  { id: "03", title: "Product Information & Pricing", content: "We strive to ensure all product descriptions, images, and prices are accurate. However, errors may occasionally occur. We reserve the right to correct any errors and to cancel orders placed at incorrect prices. Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise." },
  { id: "04", title: "Orders & Payment", content: "By placing an order, you confirm that you are at least 18 years old and that all information provided is accurate. We reserve the right to refuse or cancel any order at our discretion. Payment must be completed at the time of purchase. We accept major credit/debit cards, UPI, net banking, and popular wallets." },
  { id: "05", title: "Shipping & Delivery", content: "Delivery timelines are estimates and not guaranteed. Ajanta Quartz is not liable for delays caused by courier partners, natural events, or circumstances beyond our control. Risk of loss and title for items pass to you upon delivery. Please refer to our Shipping Policy for full details." },
  { id: "06", title: "Returns & Refunds", content: "Returns and refunds are governed by our Return & Exchange Policy. Items must be returned in their original condition and packaging within the specified window. We reserve the right to refuse returns that do not meet our policy criteria." },
  { id: "07", title: "Intellectual Property", content: "All content on this website — including text, graphics, logos, images, and software — is the property of Ajanta Quartz Pvt. Ltd. and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission." },
  { id: "08", title: "Limitation of Liability", content: "To the fullest extent permitted by law, Ajanta Quartz shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or products purchased. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim." },
  { id: "09", title: "Privacy", content: "Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information." },
  { id: "10", title: "Governing Law & Changes", content: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra. We reserve the right to modify these Terms at any time — continued use of the website constitutes acceptance of the updated Terms." },
];

function TermSection({ section, index }) {
  const [open, setOpen] = useState(index < 3);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open ? "border-red-200 shadow-md" : "border-gray-100 hover:border-red-100"}`}>
      <button onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-5 px-6 py-5 text-left transition-colors duration-300 ${open ? "bg-red-50" : "bg-white hover:bg-red-50/40"}`}>
        <span className={`text-[11px] font-black tracking-[0.2em] w-8 shrink-0 ${open ? "text-[#cc0000]" : "text-gray-300"}`}>{section.id}</span>
        <p className={`font-black text-base flex-1 leading-tight transition-colors ${open ? "text-[#cc0000]" : "text-gray-800"}`}>{section.title}</p>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? "bg-[#cc0000]" : "bg-red-100"}`}>
          <svg className={`w-3.5 h-3.5 ${open ? "text-white" : "text-[#cc0000]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white">
            <p className="text-gray-500 text-[13px] leading-relaxed px-6 py-5 border-t border-red-100">{section.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TermsConditions() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hma14.jpg" alt="Terms & Conditions"
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
              <span className="text-[#cc0000] font-semibold">Terms & Conditions</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Legal</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Terms &<br /><span className="text-[#cc0000]">Conditions</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-500 text-sm font-medium">Effective Date: January 1, 2025</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* INTRO BANNER */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-5">
            <div className="w-11 h-11 bg-[#cc0000] rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-gray-800 text-sm mb-1">Please Read Carefully</p>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-3xl">
                These Terms & Conditions govern your use of the Ajanta Quartz website and the purchase of products from us. By using our website, you accept these terms in full. These terms apply to all visitors, users, and customers of <span className="font-semibold text-gray-700">ajantaquartz.com</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="w-full px-6 md:px-16 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sections */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Full Terms</p>
              <h2 className="text-3xl font-black text-gray-900">All Sections</h2>
            </motion.div>
            {sections.map((section, i) => (
              <TermSection key={section.id} section={section} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm sticky top-6">
              <div className="relative h-32 overflow-hidden">
                <img src="/hma1.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/90 to-[#cc0000]/60" />
                <div className="absolute inset-0 flex flex-col justify-center px-5">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Quick Navigation</p>
                  <h3 className="text-white text-lg font-black">Jump to Section</h3>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1">
                {sections.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group">
                    <span className="text-[10px] font-black text-[#cc0000]/40 w-6">{s.id}</span>
                    <span className="text-xs text-gray-600 group-hover:text-[#cc0000] transition-colors font-medium">{s.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a0000] to-[#cc0000] rounded-2xl p-6 text-white">
              <h3 className="font-black text-lg mb-2">Have Questions?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">We're happy to clarify anything about our terms.</p>
              <Link to="/contact" className="block text-center bg-white text-[#cc0000] text-xs font-black tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-red-50 transition-colors">
                Contact Us
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Related Policies</p>
              {[
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Return & Exchange", to: "/return-exchange" },
                { label: "Shipping Policy", to: "/shipping-policy" },
                { label: "Warranty Policy", to: "/warranty-policy" },
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
        <img src="/hm5.webp" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs font-black tracking-[4px] uppercase mb-3">Ajanta Quartz</p>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-5">Shop with Confidence</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-[#a00000] transition-colors">
                Shop Now
              </Link>
              <Link to="/privacy-policy" className="bg-white/10 border border-white/30 text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
