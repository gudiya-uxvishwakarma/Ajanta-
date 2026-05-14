import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "01",
    title: "Information We Collect",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    items: [
      { label: "Personal Information", text: "When you create an account, place an order, or contact us, we collect your full name, email address, phone number, shipping and billing address, and payment details (processed securely via third-party gateways — we never store card numbers)." },
      { label: "Location Data", text: "IMPORTANT: If you use our mobile application, we collect precise location data (GPS coordinates including latitude and longitude) when you actively use location-based features such as store locator, delivery tracking, or service area verification. Location data is collected in the FOREGROUND only when you use these features — we DO NOT collect location in the background. You can control location permissions through your device settings. Denying location access may limit certain app features." },
      { label: "Usage Data", text: "We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, time spent on pages, referring URLs, and device information." },
      { label: "Cookies & Tracking", text: "We use cookies and similar technologies to remember your preferences, keep items in your cart, and understand how visitors use our site. You can control cookie settings through your browser." },
    ],
  },
  {
    id: "02",
    title: "How We Use Your Information",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    items: [
      { label: "Order Processing", text: "To process and fulfill your orders, send order confirmations, shipping updates, and handle returns or exchanges." },
      { label: "Account Management", text: "To create and manage your account, provide customer support, and send important account-related notifications." },
      { label: "Marketing & Communications", text: "With your consent, to send promotional emails, product updates, and special offers. You can unsubscribe at any time via the link in any email." },
      { label: "Improvement & Analytics", text: "To analyze usage patterns, improve our website, personalize your experience, and develop new features and products." },
    ],
  },
  {
    id: "03",
    title: "Sharing Your Information",
    icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
    items: [
      { label: "Service Providers", text: "We share data with trusted third-party vendors who assist us — including payment processors (Razorpay, PayU), shipping partners, and analytics providers. These parties are contractually obligated to keep your information confidential." },
      { label: "Legal Requirements", text: "We may disclose your information if required by law, court order, or governmental authority, or to protect the rights, property, or safety of Ajanta Quartz, our customers, or others." },
      { label: "No Sale of Data", text: "We do not sell, trade, or rent your personal information to third parties for their marketing purposes." },
    ],
  },
  {
    id: "04",
    title: "Data Security",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    items: [
      { label: "Security Measures", text: "We implement industry-standard security measures including SSL/TLS encryption, secure servers, and regular security audits to protect your personal information from unauthorized access, alteration, or disclosure." },
      { label: "Payment Security", text: "All payment transactions are encrypted and processed through PCI-DSS compliant payment gateways. We do not store your complete payment card information on our servers." },
    ],
  },
  {
    id: "05",
    title: "Your Rights & Choices",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    items: [
      { label: "Access & Correction", text: "You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us." },
      { label: "Data Deletion", text: "You may request deletion of your personal data. We will comply unless we are required to retain it for legal or legitimate business purposes." },
      { label: "Opt-Out", text: "You can opt out of marketing communications at any time by clicking 'Unsubscribe' in any email or by contacting our support team." },
    ],
  },
  {
    id: "06",
    title: "Children's Privacy & Policy Updates",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    items: [
      { label: "Age Restriction", text: "Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately." },
      { label: "Policy Updates", text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated effective date, and where appropriate, by sending you an email notification." },
    ],
  },
];

function SectionItem({ section, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${open ? "border-red-200 shadow-md" : "border-gray-100 hover:border-red-100"}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-5 px-6 py-5 text-left transition-colors duration-300 ${open ? "bg-red-50" : "bg-white hover:bg-red-50/40"}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${open ? "bg-[#cc0000]" : "bg-red-50 border border-red-100"}`}>
          <svg className={`w-5 h-5 ${open ? "text-white" : "text-[#cc0000]"}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
          </svg>
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-black text-[#cc0000]/50 tracking-[0.2em] uppercase">{section.id}</span>
          <p className={`font-black text-base leading-tight transition-colors ${open ? "text-[#cc0000]" : "text-gray-800"}`}>{section.title}</p>
        </div>
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
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden bg-white">
            <div className="px-6 py-5 flex flex-col gap-5 border-t border-red-100">
              {section.items.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cc0000] mt-2 shrink-0" />
                  <div>
                    <p className="font-black text-gray-800 text-sm mb-1">{item.label}</p>
                    <p className="text-gray-500 text-[13px] leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-white min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-72 md:h-[420px] overflow-hidden">
        <motion.img src="/hm4.jpg" alt="Privacy Policy"
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
              <span className="text-[#cc0000] font-semibold">Privacy Policy</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 bg-[#cc0000] rounded-full" />
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase">Legal</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[0.95] mb-4">
              Privacy<br /><span className="text-[#cc0000]">Policy</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-500 text-sm font-medium">Effective Date: January 1, 2025</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SSL Secured", sub: "256-bit encryption" },
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Data Protected", sub: "No data sold" },
            { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "PCI Compliant", sub: "Secure payments" },
            { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Your Rights", sub: "Full data control" },
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

      {/* MAIN CONTENT */}
      <section className="w-full px-6 md:px-16 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Sections */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
              <p className="text-xs text-[#cc0000] font-black tracking-[4px] uppercase mb-2">Our Commitment</p>
              <h2 className="text-3xl font-black text-gray-900">How We Handle Your Data</h2>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-lg">
                Ajanta Quartz Pvt. Ltd. is committed to protecting your personal information. This policy applies to our website and all related services.
              </p>
            </motion.div>
            {sections.map((section, i) => (
              <SectionItem key={section.id} section={section} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Quick Nav */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm sticky top-6">
              <div className="relative h-32 overflow-hidden">
                <img src="/hma1.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000]/90 to-[#cc0000]/60" />
                <div className="absolute inset-0 flex flex-col justify-center px-5">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Quick Navigation</p>
                  <h3 className="text-white text-lg font-black">Policy Sections</h3>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1">
                {sections.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group">
                    <span className="text-[10px] font-black text-[#cc0000]/40 w-6">{s.id}</span>
                    <span className="text-sm text-gray-600 group-hover:text-[#cc0000] transition-colors font-medium">{s.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a0000] to-[#cc0000] rounded-2xl p-6 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-black text-lg mb-2">Privacy Questions?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">Our team is happy to help with any data-related requests or concerns.</p>
              <Link to="/contact" className="block text-center bg-white text-[#cc0000] text-xs font-black tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-red-50 transition-colors">
                Contact Us
              </Link>
            </motion.div>

            {/* Related Links */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Related Policies</p>
              {[
                { label: "Terms & Conditions", to: "/terms-conditions" },
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
      <section className="relative w-full h-64 md:h-80 overflow-hidden">
        <img src="/hm3.jpg" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-xs font-black tracking-[4px] uppercase mb-3">Ajanta Quartz</p>
            <h2 className="text-white text-3xl md:text-4xl font-black mb-5">Your Trust Is Our Priority</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="bg-[#cc0000] text-white text-xs font-black tracking-[0.2em] uppercase px-8 py-3 rounded-full hover:bg-[#a00000] transition-colors">
                Shop Now
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
