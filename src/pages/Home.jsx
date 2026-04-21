import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/products";
import FeaturesSection from "../components/FeaturesSection";
import heroVideo from "../assets/198866-908874705.mp4";
import heroVideo2 from "../assets/6500-192502235.mp4";
import heroVideo3 from "../assets/43613-436237593.mp4";
import slide1 from "../assets/cor1.jpg";
import slide2 from "../assets/cor2.jpg";
import slide3 from "../assets/cor3.jpg";
import catTorch   from "../assets/handtorch.jpg";
import catClock   from "../assets/cl1.png";
import catLed     from "../assets/led.jpg";
import catFans    from "../assets/fans.jpg";
import catEmLight from "../assets/hm1.jpg";
import catHeater  from "../assets/hma7.jpg";
import catIron    from "../assets/hma14.jpg";
import catKettle  from "../assets/hma9.jfif";
import catKitchen from "../assets/hma11.jpg";
import catMosq    from "../assets/hma6.jpg";

const CATEGORY_CONFIG = {
  "Hand Torch":               { filter: "hand-torch",        img: catTorch,   sub: "Powerful & Portable"    },
  "Clock":                    { filter: "clock",             img: catClock,   sub: "Precision Timekeeping"  },
  "Emergency Light":          { filter: "emergency-light",   img: catEmLight, sub: "Always Ready"           },
  "Home Appliance":           { filter: "home-appliance",    img: catFans,    sub: "Built for Everyday"     },
  "LED":                      { filter: "led",               img: catLed,     sub: "Bright & Efficient"     },
  "Room Heater":              { filter: "room-heater",       img: catHeater,  sub: "Stay Warm"              },
  "Iron":                     { filter: "iron",              img: catIron,    sub: "Smooth & Precise"       },
  "Electric Kettle":          { filter: "electric-kettle",   img: catKettle,  sub: "Quick Boil"             },
  "Kitchen Appliance":        { filter: "kitchen-appliance", img: catKitchen, sub: "Cook Smarter"           },
  "Electric Mosquito Racket": { filter: "mosquito-racket",   img: catMosq,    sub: "Protect Your Home"      },
};

const dynamicCategories = [...new Set(allProducts.map(p => p.category))]
  .filter(c => CATEGORY_CONFIG[c])
  .map(c => ({
    label: c,
    sub:   CATEGORY_CONFIG[c].sub,
    to:    `/shop?filter=${CATEGORY_CONFIG[c].filter}`,
    img:   CATEGORY_CONFIG[c].img,
    count: allProducts.filter(p => p.category === c).length,
  }));


const heroSlides = [
  {
    src: slide1,
    objectFit: "cover",
    objectPosition: "top center",
    eyebrow: "New Arrival",
    heading: "Light Up Every\nMoment",
    sub: "India's most trusted torches & emergency lights — built for every home, every outage.",
    btn: "SHOP NOW",
    btn2: "VIEW OFFERS",
    badge: "Free Shipping above ₹999",
  },
  {
    src: slide2,
    objectFit: "cover",
    objectPosition: "top center",
    eyebrow: "Trusted Since 1983",
    heading: "Never Be Left\nin the Dark",
    sub: "Oreva's precision-engineered lighting solutions — high brightness, long backup, zero compromise.",
    btn: "EXPLORE RANGE",
    btn2: "BEST SELLERS",
    badge: "1 Year Warranty",
  },
  {
    src: slide3,
    objectFit: "cover",
    objectPosition: "top center",
    eyebrow: "Emergency Ready",
    heading: "Built for Every\nEmergency",
    sub: "SMD LED technology. 12–20 hour backup. Durable design that lasts for years.",
    btn: "VIEW COLLECTION",
    btn2: "KNOW MORE",
    badge: "144+ Orders This Week",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev2, setPrev2] = useState(null);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const goTo = (next) => {
    setPrev2(current);
    setCurrent(next);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo((current + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [current, paused]);

  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => goTo((current + 1) % heroSlides.length);

  const handleNavClick = (path) => {
    setPaused(true);
    window.location.href = path;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            transform: i === current ? "translateX(0%)" : i < current ? "translateX(-100%)" : "translateX(100%)",
            zIndex: i === current ? 2 : 1,
          }}
        >
          {/* Image with subtle zoom */}
          <img
            src={slide.src}
            alt={`Hero slide ${i + 1}`}
            className={`w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-out ${i === current ? "scale-110" : "scale-100"}`}
          />

          {/* Multi-layer overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />

          {/* Content — left aligned */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-10">
            <AnimatePresence mode="wait">
              {i === current && (
                <motion.div key={`content-${i}`} className="flex flex-col items-start max-w-xl"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

                  {/* Eyebrow */}
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="w-6 h-px bg-[#cc0000]" />
                    <span className="text-[#cc0000] text-[11px] font-black tracking-[0.3em] uppercase">{slide.eyebrow}</span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h1
                    className="text-white text-[32px] md:text-[52px] font-black leading-[1.1] tracking-tight drop-shadow-xl mb-4"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {slide.heading}
                  </motion.h1>

                  {/* Sub */}
                  <motion.p
                    className="text-white/75 text-sm md:text-base leading-relaxed mb-6 max-w-sm"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {slide.sub}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    className="flex items-center gap-3 flex-wrap"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="h-10" />{/* spacer — buttons rendered outside AnimatePresence */}
                  </motion.div>

                  {/* Badge */}
                  <motion.div
                    className="mt-6 flex items-center gap-2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white/60 text-[11px] font-semibold tracking-wide">{slide.badge}</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Slide counter — top right */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
        <span className="text-white font-black text-[13px]">0{current + 1}</span>
        <span className="w-8 h-px bg-white/30" />
        <span className="text-white/40 text-[11px]">0{heroSlides.length}</span>
      </div>

      {/* Persistent CTA buttons — never unmount, no delay */}
      <div className="absolute bottom-20 left-8 md:left-20 z-20 flex items-center gap-3 flex-wrap">
        <button
          onPointerDown={() => handleNavClick("/shop")}
          className="bg-[#cc0000] hover:bg-[#a00000] text-white text-[11px] font-black tracking-[0.2em] uppercase px-7 py-3 rounded-full transition-all duration-300 shadow-lg shadow-red-900/30 hover:scale-105 cursor-pointer"
        >
          {heroSlides[current].btn}
        </button>
        <button
          onPointerDown={() => handleNavClick("/shop")}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-[11px] font-black tracking-[0.2em] uppercase px-7 py-3 rounded-full border border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          {heroSlides[current].btn2}
        </button>
      </div>

      {/* Arrow buttons — vertical on right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button onClick={prev} aria-label="Previous slide"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200 backdrop-blur-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button onClick={next} aria-label="Next slide"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200 backdrop-blur-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Progress bars — bottom */}
      <div className="absolute bottom-6 left-8 md:left-20 z-20 flex gap-2 items-center">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="relative h-[3px] rounded-full overflow-hidden bg-white/20 transition-all duration-300"
            style={{ width: i === current ? 40 : 20 }}>
            {i === current && (
              <motion.div className="absolute inset-y-0 left-0 bg-[#cc0000] rounded-full"
                initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} key={current} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "Ajanta torches have been our go-to for years. Incredibly reliable during power cuts — the whole family trusts them.",
    name: "Ramesh Patel",
    role: "Homeowner · Ahmedabad",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    stars: 5,
    quote: "The emergency light we bought lasted through a 6-hour outage without a flicker. Outstanding build quality.",
    name: "Sunita Mehta",
    role: "Shop Owner · Surat",
    avatar: "https://i.pravatar.cc/80?img=47",
  },
  {
    stars: 4,
    quote: "Ajanta clocks are a staple in our office. Precise, stylish, and built to last. Trusted since 1983 for a reason.",
    name: "Arjun Sharma",
    role: "Office Manager · Mumbai",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section className="relative w-full py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0f1923 0%, #1a2535 60%, #0f1923 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(ellipse, #cf2127 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Glassmorphism card */}
        <div className="w-full rounded-2xl px-8 py-10 flex flex-col items-center text-center"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Stars */}
          <motion.div
            key={`stars-${active}`}
            className="flex gap-1.5 mb-7"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.svg
                key={i}
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill={i < t.stars ? "#f59e0b" : "none"}
                stroke={i < t.stars ? "#f59e0b" : "#4b5563"}
                strokeWidth={1.5}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </motion.div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`quote-${active}`}
              className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              "{t.quote}"
            </motion.blockquote>
          </AnimatePresence>

          {/* Divider */}
          <motion.div
            className="w-10 h-px bg-[#cf2127] mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Name / role */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`name-${active}`}
              className="text-white/40 text-[11px] font-bold tracking-[0.25em] uppercase mb-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {t.name} · {t.role}
            </motion.p>
          </AnimatePresence>

          {/* Avatar switcher */}
          <div className="flex items-center mb-6">
            {TESTIMONIALS.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="relative"
                style={{ zIndex: i === active ? 10 : 5 - i, marginLeft: i === 0 ? 0 : -12 }}
                animate={{ scale: i === active ? 1.18 : 0.88, opacity: i === active ? 1 : 0.5 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover"
                  style={{ border: i === active ? "2.5px solid #cf2127" : "2px solid rgba(255,255,255,0.15)" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className="h-1 rounded-full bg-white/20 overflow-hidden"
                animate={{ width: i === active ? 28 : 8 }}
                transition={{ duration: 0.35 }}
              >
                {i === active && (
                  <motion.div
                    className="h-full bg-[#cf2127]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero — no scroll animation, it's the first thing visible */}
      <section className="relative h-[60vh] md:h-[75vh] bg-white" style={{overflow: "hidden", borderRadius: "0px", margin: "0"}}>
        <HeroSlider />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Feature Banner */}
      <motion.section
        className="w-full flex h-[340px] md:h-[400px] overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Panel 1 */}
        <motion.div
          className="relative w-[25%] overflow-hidden group cursor-pointer"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover="hover"
        >
          <motion.video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/image copy 5.png"
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <source src={heroVideo} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4"
            variants={{ hover: { y: 0, opacity: 1 } }}
            initial={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Ajanta Lighting</p>
          </motion.div>
        </motion.div>

        {/* Panel 2 */}
        <motion.div
          className="relative w-[35%] overflow-hidden border-l border-white/20 group cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          whileHover="hover"
        >
          <motion.video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <source src={heroVideo2} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <motion.div
            className="absolute bottom-5 left-5"
            variants={{ hover: { y: -8 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-white text-[11px] font-bold tracking-widest uppercase">AJANTA QUARTZ</p>
            <p className="text-white/70 text-[10px] tracking-wide">Trusted Since 1983</p>
            <motion.div
              className="mt-2 h-[2px] bg-[#cf2127]"
              variants={{ hover: { width: 64 } }}
              initial={{ width: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Panel 3 */}
        <motion.div
          className="relative flex-1 overflow-hidden border-l border-white/20 group cursor-pointer"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          whileHover="hover"
        >
          <motion.video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <source src={heroVideo3} type="video/mp4" />
          </motion.video>
          <motion.div
            className="absolute inset-0 bg-black/40"
            variants={{ hover: { backgroundColor: "rgba(0,0,0,0.52)" } }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
            <motion.p
              className="text-white/70 text-[10px] font-bold tracking-[0.25em] uppercase mb-1"
              variants={{ hover: { y: 0, opacity: 1 } }}
              initial={{ y: 10, opacity: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              New Collection
            </motion.p>
            <motion.h2
              className="text-white text-[22px] md:text-[28px] font-black leading-tight mb-4"
              variants={{ hover: { y: -4, letterSpacing: "0.02em" } }}
              transition={{ duration: 0.4 }}
            >
              Precision<br />By Nature
            </motion.h2>
            <motion.div
              className="flex gap-3"
              variants={{ hover: { y: 0, opacity: 1 } }}
              initial={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <button
                onClick={() => navigate("/shop?filter=hand-torch")}
                className="bg-white text-[#1a1a1a] text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-[#cf2127] hover:text-white transition-colors duration-300"
              >
                SHOP TORCHES
              </button>
              <button
                onClick={() => navigate("/shop?filter=clock")}
                className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border border-white/40 hover:bg-white/40 transition-colors duration-300"
              >
                SHOP CLOCKS
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Category Cards */}
      <motion.section
        className="w-full px-6 md:px-14 py-16 bg-[#f9f9f9]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#cf2127] mb-2">Explore</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] tracking-tight">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {dynamicCategories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => navigate(cat.to)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-[240px] md:h-[300px]"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-[#cf2127] transition-all duration-500 ease-out" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/60 text-[9px] font-bold tracking-[0.25em] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {cat.sub}
                </p>
                <h3 className="text-white text-[13px] md:text-[15px] font-black tracking-wide leading-tight">{cat.label}</h3>
                <p className="text-white/40 text-[10px] mt-0.5">{cat.count} products</p>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white bg-[#cf2127] px-3 py-1 rounded-full">Shop Now</span>
                  <span className="text-white text-sm">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Testimonials />
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Floating Chat */}
      <div className="fixed bottom-6 left-6 z-50">
        <button className="relative bg-black text-white rounded-xl py-2.5 px-4 font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform text-[15px]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">1</span>
        </button>
      </div>

    </div>
  );
}
