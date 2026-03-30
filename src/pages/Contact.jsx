import { useState } from "react";

const contactCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Our Address",
    value: "Ajanta Quartz Pvt. Ltd.",
    sub: "Mumbai, Maharashtra, India",
    action: null,
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: "support@ajantaquartz.com",
    sub: "We reply within 24 hours",
    action: "mailto:support@ajantaquartz.com",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 10AM – 6PM IST",
    action: "tel:+919876543210",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Support Hours",
    value: "Mon – Sat",
    sub: "10:00 AM – 6:00 PM IST",
    action: null,
  },
];

const faqs = [
  { q: "How can I track my Ajanta order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also contact our support team with your order ID for real-time updates." },
  { q: "What is the return and exchange policy?", a: "We offer a hassle-free 7-day return and exchange policy. The product must be unused, in original packaging, and accompanied by the invoice. Reach out to us to initiate a return." },
  { q: "How do I claim my warranty?", a: "All Ajanta watches come with a 1-year manufacturer warranty. To claim, contact us with your purchase proof and a description of the issue. We'll guide you through the process." },
  { q: "How long does delivery take?", a: "Orders are dispatched within 24 hours of placement. Standard delivery across India takes 3–5 business days. Express delivery options may be available at checkout." },
  { q: "Can I change or cancel my order after placing it?", a: "Orders can be modified or cancelled within 12 hours of placement. After dispatch, cancellations are not possible but you can initiate a return once delivered." },
  { q: "Do you ship internationally?", a: "Currently we ship across all major cities and towns in India. International shipping is not available at this time, but we're working on expanding our reach." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 cursor-pointer ${open ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center justify-between gap-6 px-8 py-7">
        <span className="text-[20px] md:text-[22px] font-semibold text-[#1a1a1a] leading-snug">{q}</span>
        <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-gray-800 rotate-45" : "bg-[#1a1a1a]"}`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </div>
      {open && (
        <p className="px-8 pb-7 text-[19px] text-gray-600 leading-relaxed border-t border-gray-200 pt-5">{a}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f7f7f7] min-h-screen">

      {/* HERO BANNER */}
      <section className="relative w-full h-[380px] md:h-[460px] overflow-hidden">
        <img src="/image copy 6.png" alt="Contact Ajanta" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-[48px] md:text-[68px] font-black tracking-tight leading-none mb-4 uppercase">Contact Us</h1>
          <p className="text-white/70 text-[18px] max-w-md leading-relaxed">
            Reach out for orders, returns, warranty claims, or anything else — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="w-full px-6 md:px-14 -mt-12 relative z-10 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {contactCards.map(({ icon, label, value, sub, action }) => (
            <div key={label} className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-8 flex flex-col items-center text-center gap-4 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-16 h-16 bg-[#0f0f0f] rounded-2xl flex items-center justify-center text-[#cc0000] shrink-0">
                {icon}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[18px] text-[#cf2127] uppercase tracking-widest font-bold">{label}</p>
                {action ? (
                  <a href={action} className="text-[18px] font-black text-[#1a1a1a] hover:text-[#cc0000] transition-colors leading-snug break-all">{value}</a>
                ) : (
                  <p className="text-[18px] font-black text-[#1a1a1a] leading-snug">{value}</p>
                )}
                <p className="text-[18px] text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE LEFT + FORM RIGHT — full bleed, no side padding */}
      <section className="w-full pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "900px" }}>

          {/* LEFT — image flush to left edge */}
          <div className="relative w-full" style={{ minHeight: "900px" }}>
            <img
              src="/image copy 26.png"
              alt="Ajanta Contact"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* RIGHT — form flush to right edge, white bg */}
          <div className="bg-white px-12 md:px-20 py-16 flex flex-col justify-center">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[24px] font-black text-[#1a1a1a]">Message Sent!</h3>
                <p className="text-gray-500 text-[20px] leading-relaxed max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-[18px] text-[#cc0000] font-bold tracking-widest uppercase hover:underline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="mb-1">
                  <h3 className="text-[26px] font-black text-[#1a1a1a]">Send a Message</h3>
                  <p className="text-gray-400 text-[18px] mt-1">Fill out the form and we'll get back to you shortly.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">First Name</label>
                    <input type="text" required placeholder="Rahul"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-8 py-3.5 text-[20px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#cc0000] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Last Name</label>
                    <input type="text" required placeholder="Sharma"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-[20px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#cc0000] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input type="email" required placeholder="rahul@email.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-[20px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#cc0000] transition-colors" />
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-[20px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#cc0000] transition-colors" />
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-[20px] text-gray-700 focus:outline-none focus:border-[#cc0000] transition-colors">
                    <option>Order Inquiry</option>
                    <option>Return / Exchange</option>
                    <option>Product Question</option>
                    <option>Warranty Claim</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Message</label>
                  <textarea required rows={4} placeholder="How can we help you?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-[20px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#cc0000] transition-colors resize-none" />
                </div>

                <button type="submit"
                  className="w-full bg-[#3d0000] text-white py-3.5 rounded-lg text-[18px] font-black tracking-widest uppercase hover:bg-[#cc0000] transition-colors shadow-md mt-1">
                  Send Message
                </button>

                
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full px-4 md:px-10 py-10 bg-white">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-black text-[#1a1a1a] mb-10">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE MAP — full width */}
      <section className="w-full">
        <div className="bg-gray-300 px-8 md:px-14 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#cc0000] rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-[18px] font-bold">Ajanta Quartz Pvt. Ltd.</p>
              <p className="text-gray-800 text-[16px]">Mumbai, Maharashtra, India</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Ajanta+Quartz+Mumbai" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] text-[#cc0000] font-bold tracking-wide hover:underline">
            Open in Google Maps
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
        <iframe
          title="Ajanta Quartz Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

    </div>
  );
}

