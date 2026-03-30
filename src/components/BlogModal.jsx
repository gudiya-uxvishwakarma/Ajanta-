import { useEffect } from "react";

const fullContent = {
  1: {
    author: "Ajanta Editorial",
    authorRole: "Watch Care Expert",
    content: [
      "Your Ajanta quartz watch is built to last — but like any precision instrument, it rewards a little care. Here's what you need to know to keep it running perfectly for years.",
      "**Battery Replacement:** Quartz watches run on a small battery that typically lasts 2–3 years. When you notice the second hand ticking in 2-second intervals instead of 1, that's your watch signaling a low battery. Replace it promptly — a dead battery left inside can leak and damage the movement.",
      "**Strap Cleaning:** Leather straps should be wiped with a dry cloth after wear. Avoid water exposure. Metal bracelets can be cleaned with a soft toothbrush and mild soapy water, then dried thoroughly.",
      "**Water Resistance:** Always check your watch's water resistance rating before exposing it to water. Even 'water resistant' watches should not be worn in hot showers or saunas — heat degrades the seals.",
      "**Storage:** Store your watch in a cool, dry place away from direct sunlight. A watch box or pouch prevents scratches and dust buildup.",
      "**Servicing:** Even quartz watches benefit from a professional service every 5–7 years. A watchmaker will clean the movement, replace worn gaskets, and ensure everything is running optimally.",
    ],
  },
  2: {
    author: "Ajanta Editorial",
    authorRole: "Style Consultant",
    content: [
      "A watch is the one accessory that speaks before you do. Choosing the right one for each occasion is an art — and we're here to make it easy.",
      "**Formal & Business:** For suits and formal wear, go with a slim dress watch. Clean dials, leather straps, and minimal complications are the hallmarks of boardroom elegance. The Ajanta AWC series in silver or gold tone fits perfectly.",
      "**Smart Casual:** This is where you have the most freedom. A stainless steel bracelet watch with a bold dial works beautifully with chinos, blazers, or even a well-fitted kurta.",
      "**Casual & Weekend:** Sporty designs with rubber or NATO straps are your best friends here. Bold colors, larger cases, and luminous hands add personality to your weekend look.",
      "**Traditional & Festive:** For ethnic wear, consider a gold-toned watch with a warm dial. It complements sherwanis and kurtas without overpowering the outfit.",
      "The golden rule: your watch should complement your outfit, not compete with it. When in doubt, a classic silver or black dial watch works with everything.",
    ],
  },
  3: {
    author: "Ajanta Editorial",
    authorRole: "Brand Historian",
    content: [
      "In 1971, a small workshop in Aurangabad, Maharashtra began assembling quartz watch movements. Few could have predicted that this modest beginning would grow into India's most trusted watch brand.",
      "**The Early Years:** Ajanta started by manufacturing clock movements, quickly earning a reputation for reliability and precision. The Indian market, hungry for affordable quality timepieces, embraced the brand wholeheartedly.",
      "**The Quartz Revolution:** When quartz technology transformed the global watch industry in the 1970s, Ajanta was at the forefront in India. The brand invested in modern manufacturing, bringing accurate, affordable watches to millions of Indian households.",
      "**Orpat Group:** Today, Ajanta is part of the Orpat Group — one of India's largest manufacturers of clocks and watches. The group produces over 150 million timepieces annually, making it a global force in affordable precision timekeeping.",
      "**50 Years Strong:** Five decades later, Ajanta watches are found in homes across India and exported to over 50 countries. The brand's commitment to quality, affordability, and Indian craftsmanship remains unchanged.",
      "From that small workshop to a global brand — Ajanta's story is a testament to what Indian manufacturing can achieve.",
    ],
  },
  4: {
    author: "Ajanta Editorial",
    authorRole: "Product Team",
    content: [
      "The AWC132 series represents a bold new chapter in Ajanta's design language — where classic watchmaking meets contemporary boldness.",
      "**Design Philosophy:** The AWC132 was designed for the modern Indian professional who refuses to choose between tradition and modernity. The case is crafted from 316L stainless steel, polished to a mirror finish with brushed side accents.",
      "**The Dial:** Available in midnight black, deep navy, and champagne gold, the dial features applied hour markers with luminous coating for low-light readability. The date window at 3 o'clock is framed cleanly without disrupting the dial's symmetry.",
      "**Movement:** Powered by a high-precision Japanese quartz movement, the AWC132 offers ±15 seconds per month accuracy — exceptional for its price point.",
      "**Strap Options:** The collection ships with both a stainless steel bracelet and a genuine leather strap, giving you two distinct looks in one box.",
      "The AWC132 series starts at ₹1,299 and is available exclusively on our website and select retail partners. Limited first-batch units are available — don't miss out.",
    ],
  },
  5: {
    author: "Ajanta Editorial",
    authorRole: "Gift Curator",
    content: [
      "Finding the perfect gift is hard. Finding a gift that's thoughtful, practical, and within budget? Even harder. That's where Ajanta watches come in.",
      "**Under ₹500 — The Everyday Classic:** The Ajanta AQ series offers clean, reliable quartz watches perfect for students and young professionals. Simple, elegant, and built to last.",
      "**₹500–₹1000 — The Style Statement:** Step up to metal case designs with date functions. These make excellent gifts for colleagues, relatives, and anyone who appreciates a well-made timepiece.",
      "**₹1000–₹2000 — The Premium Pick:** The AWC and AW series offer stainless steel cases, sapphire-coated glass, and refined dials. Perfect for birthdays, anniversaries, and festive occasions.",
      "**Above ₹2000 — The Luxury Gift:** Ajanta's premium collections feature genuine leather straps, multi-function dials, and gift-ready packaging that makes an impression before the box is even opened.",
      "Every Ajanta watch comes with a manufacturer's warranty and a certificate of authenticity. Gift-wrapping is available on all orders above ₹999.",
    ],
  },
  6: {
    author: "Ajanta Editorial",
    authorRole: "Technology Writer",
    content: [
      "Inside every Ajanta quartz watch beats a tiny crystal — and that crystal is the reason your watch keeps time with remarkable accuracy.",
      "**The Quartz Crystal:** When an electric current passes through a quartz crystal, it vibrates at a precise frequency — exactly 32,768 times per second. This consistency is what makes quartz watches so accurate.",
      "**The Circuit:** A tiny integrated circuit counts these vibrations and converts them into regular electrical pulses — one per second — which drive the stepping motor that moves the hands.",
      "**Why 32,768?** This specific frequency is used because it's a power of 2 (2¹⁵), making it easy for digital circuits to divide down to exactly 1 Hz using simple binary counters.",
      "**Accuracy:** A well-made quartz movement loses or gains only 15 seconds per month — that's about 3 minutes per year. Compare this to a mechanical watch, which can drift by several minutes per day.",
      "**Temperature Sensitivity:** Quartz crystals are slightly affected by temperature changes. High-end quartz movements use temperature-compensated oscillators (TCXO) to maintain accuracy across a wide temperature range.",
      "The quartz revolution democratized accurate timekeeping — and Ajanta has been at the heart of bringing that precision to every Indian home.",
    ],
  },
};

export default function BlogModal({ post, onClose }) {
  const data = fullContent[post.id] || {};
  const paragraphs = data.content || [];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const categoryColors = {
    "Watch Care": "bg-blue-600",
    "Style Guide": "bg-purple-600",
    "Brand Story": "bg-amber-600",
    "New Arrivals": "bg-[#cc0000]",
    "Gift Guide": "bg-emerald-600",
    "Technology": "bg-gray-700",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full md:max-w-3xl max-h-[92vh] md:max-h-[88vh] bg-white md:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative w-full h-[200px] md:h-[280px] flex-shrink-0">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category + Title overlay */}
          <div className="absolute bottom-0 left-0 p-6">
            <span className={`${categoryColors[post.category] || "bg-gray-700"} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
              {post.category}
            </span>
            <h2 className="text-white text-[18px] md:text-[24px] font-black mt-2 leading-tight max-w-xl">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6">

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-full bg-[#cc0000] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-900">{data.author || "Ajanta Editorial"}</p>
              <p className="text-[11px] text-gray-400">{data.authorRole || "Writer"}</p>
            </div>
            <div className="ml-auto flex items-center gap-3 text-[11px] text-gray-400">
              <span>{post.date}</span>
              <span className="text-gray-200">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-5">
            {paragraphs.map((para, i) => {
              // Bold heading support: **text**
              const parts = para.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="text-[14px] text-gray-700 leading-relaxed">
                  {parts.map((part, j) =>
                    j % 2 === 1
                      ? <span key={j} className="font-black text-gray-900">{part}</span>
                      : part
                  )}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
            {["Ajanta", "Watches", post.category].map(tag => (
              <span key={tag} className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                #{tag.replace(/\s/g, "")}
              </span>
            ))}
          </div>

          {/* Share Row */}
          <div className="flex items-center justify-between mt-6 mb-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">Share this article</p>
            <div className="flex gap-2">
              {["Twitter", "Facebook", "Copy Link"].map(s => (
                <button
                  key={s}
                  className="text-[11px] font-bold text-gray-600 bg-gray-100 hover:bg-[#cc0000] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
