import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop All", to: "/shop" },
  { label: "Men's Collection", to: "/mens" },
  { label: "Women's Collection", to: "/womens" },
  { label: "About Brand", to: "/about" },
  { label: "Blog", to: "/Blog" },
  { label: "Contact Us", to: "/contact" },
];

const careLinks = [
  "Track Your Order", "Return & Exchange", "Warranty Policy",
  "Shipping Policy", "Privacy Policy", "Terms & Conditions", "FAQs"
];

const contactInfo = [
  { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Address", text: "Ajanta Quartz Pvt. Ltd., Mumbai, Maharashtra, India" },
  { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", text: "support@ajantaquartz.com" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Phone", text: "+91 98765 43210" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Hours", text: "Mon – Sat, 10:00 AM – 6:00 PM IST" },
];

const socials = [
  { label: "Facebook", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "Instagram", d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
  { label: "YouTube", d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
  { label: "Twitter", d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
];

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#cc0000] to-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-300 to-[#cc0000] rounded-full blur-3xl"></div>
      </div>

      {/* Main Grid */}
      <div className="relative max-w-10xl mx-auto px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-6 items-start">
          <img src="/Ajanta logo.png" alt="Ajanta" className="h-16 w-auto object-contain" />
          <p className="text-gray-600 text-[14px] leading-[1.9] max-w-xs text-left">
            India's oldest timepiece brand since 1971. Over five decades of crafting precision watches that blend elegance with reliability.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <a key={s.label} href="#" aria-label={s.label}
                className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#cc0000] hover:border-[#cc0000] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#cc0000]/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {[{ icon: "🚚", label: "Free Shipping" }, { icon: "↩", label: "7 Day Returns" }, { icon: "✓", label: "1 Yr Warranty" }].map(b => (
              <div key={b.label} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 hover:bg-red-100 hover:border-[#cc0000]/30 transition-all duration-300">
                <span className="text-[14px]">{b.icon}</span>
                <span className="text-[14px] text-gray-700 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */} 
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#cc0000] pb-4 border-b-2 border-[#cc0000]/20">Quick Links</p>
          {quickLinks.map(l => (
            <Link key={l.label} to={l.to}
              className="text-gray-600 text-[14px] hover:text-[#cc0000] transition-all duration-200 flex items-center gap-2 group py-2 hover:translate-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              {l.label}
            </Link>
          ))}
        </div>

        {/* Customer Care */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#cc0000] pb-4 border-b-2 border-[#cc0000]/20">Customer Care</p>
          {careLinks.map(l => (
            <a key={l} href="#"
              className="text-gray-600 text-[14px] hover:text-[#cc0000] transition-all duration-200 flex items-center gap-2 group py-2 hover:translate-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              {l}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#cc0000] pb-4 border-b-2 border-[#cc0000]/20">Get In Touch</p>
          <div className="flex flex-col gap-6">
            {contactInfo.map(c => (
              <div key={c.label} className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-red-50 border border-red-100 group-hover:bg-[#cc0000] group-hover:border-[#cc0000] transition-all duration-300">
                  <svg className="w-5 h-5 text-[#cc0000] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1">{c.label}</p>
                  <p className="text-gray-700 text-[11px] leading-snug">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">Secure Payments</p>
            <div className="flex flex-wrap gap-2">
              {["VISA", "Mastercard", "G Pay", "RuPay", "Paytm", "PhonePe", "UPI"].map(p => (
                <span key={p} className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-lg hover:border-[#cc0000] hover:bg-red-50 hover:text-[#cc0000] hover:shadow-md transition-all duration-300">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative w-full border-t-2 border-gray-200 bg-[#cc0000]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[14px] text-white/90">© 2025 Ajanta Quartz Pvt. Ltd. All rights reserved.</p>
          <p className="text-[14px] text-white/80 tracking-wide font-medium">India's Oldest Timepiece Brand Since 1971</p>
        </div>
      </div>

    </footer>
  );
}

