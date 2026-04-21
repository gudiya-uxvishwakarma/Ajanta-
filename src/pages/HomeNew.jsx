import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/products";
// eslint-disable-next-line no-unused-vars
import slide1 from "../assets/cor1.jpg";
// eslint-disable-next-line no-unused-vars
import slide2 from "../assets/cor2.jpg";
// eslint-disable-next-line no-unused-vars
import slide3 from "../assets/cor3.jpg";

// Hero Slider Component
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const navigate = useNavigate();

  const slides = [
    {
      img: "https://pngimg.com/d/clock_PNG6606.png",
      badge: "EXTRA 20% OFF",
      subtitle: "Wall Clocks Collection",
      title: "Premium Wall Clocks",
      description: "Discover elegant wall clocks that add style to your home. Quality craftsmanship at the best prices.",
      cta: "SHOP NOW",
      bgColor: "bg-gradient-to-br from-red-50 via-orange-50 to-amber-50",
      imagePosition: "right"
    },
    {
      img: "https://pngimg.com/d/clock_PNG6598.png",
      badge: "NEW ARRIVALS",
      subtitle: "Table Clocks Collection",
      title: "Stylish Table Clocks",
      description: "Explore our newest table clock designs. Perfect for your desk, bedside, or any tabletop.",
      cta: "SHOP NOW",
      bgColor: "bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50",
      imagePosition: "left"
    },
    {
      img: "https://pngimg.com/d/clock_PNG6593.png",
      badge: "BEST SELLERS",
      subtitle: "Designer Wall Clocks",
      title: "Modern Wall Clocks",
      description: "Transform your space with our designer wall clocks. Contemporary designs for modern homes.",
      cta: "SHOP NOW",
      bgColor: "bg-gradient-to-br from-red-50 via-pink-50 to-rose-50",
      imagePosition: "right"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Preload images
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.img;
      img.onload = () => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`relative ${slides[current].bgColor}`}
        >
          {/* Premium Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-10 w-64 h-64 bg-[#cc0000]/10 rounded-full blur-3xl"
            ></motion.div>
            
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"
            ></motion.div>
            
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -80, 0],
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
              className="absolute top-1/2 right-1/4 w-72 h-72 bg-amber-200/15 rounded-full blur-3xl"
            ></motion.div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 max-w-screen-2xl relative z-10">
            <div className={`grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center min-h-[320px] md:min-h-[360px] lg:min-h-[400px] py-6 sm:py-8 md:py-10 lg:py-12 ${
              slides[current].imagePosition === "left" ? "lg:flex-row-reverse" : ""
            }`}>
              {/* Content */}
              <div className={`relative z-10 ${
                slides[current].imagePosition === "left" ? "order-2 lg:order-2" : "order-2 lg:order-1"
              }`}>
                {/* Badge - Slide in from left with bounce */}
                <motion.div
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.1, 
                    duration: 0.7, 
                    ease: [0.34, 1.56, 0.64, 1],
                    type: "spring",
                    stiffness: 100
                  }}
                  className="mb-2 md:mb-3"
                >
                  <motion.span 
                    className="inline-block bg-[#cc0000] text-white text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.15em] px-3 sm:px-4 py-1.5 sm:py-2 uppercase rounded shadow-md"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(204, 0, 0, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {slides[current].badge}
                  </motion.span>
                </motion.div>
                
                {/* Subtitle - Fade in with letter spacing animation */}
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.1em" }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[11px] sm:text-xs md:text-sm text-gray-600 font-bold uppercase tracking-wider mb-2 md:mb-3"
                >
                  {slides[current].subtitle}
                </motion.p>
                
                {/* Title - Split word animation with stagger */}
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 md:mb-4 lg:mb-5 text-[#1a1a1a] leading-[1.1] tracking-tight overflow-hidden"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {slides[current].title.split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block mr-2 md:mr-3"
                      style={{ transformOrigin: 'bottom' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                
                {/* Description - Slide up with blur effect */}
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 md:mb-5 lg:mb-6 leading-relaxed max-w-lg font-medium"
                >
                  {slides[current].description}
                </motion.p>
                
                {/* CTA Button - Scale in with rotation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.9, 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1],
                    type: "spring",
                    stiffness: 120
                  }}
                >
                  <motion.button
                    onClick={() => navigate("/shop")}
                    className="bg-[#cc0000] text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-bold tracking-wide uppercase hover:bg-[#b30000] transition-all duration-300 shadow-lg rounded inline-flex items-center gap-2 group relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(204, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">{slides[current].cta}</span>
                    <motion.svg 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.button>
                </motion.div>
              </div>

              {/* Image */}
              <div className={`relative flex items-center justify-center ${
                slides[current].imagePosition === "left" ? "order-1 lg:order-1" : "order-1 lg:order-2"
              }`}>
                <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px] mx-auto h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] flex items-center justify-center">
                  {/* Animated Gradient Background */}
                  <motion.div 
                    animate={{ 
                      scale: [0.85, 1, 0.85],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-[#cc0000]/10 via-white/80 to-transparent rounded-full blur-3xl"
                  ></motion.div>
                  
                  {/* Subtle Pulse Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-[#cc0000]/20 rounded-full blur-2xl"
                  ></motion.div>
                  
                  {/* Loading Skeleton */}
                  <AnimatePresence>
                    {!imageLoaded[current] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 flex items-center justify-center z-5"
                      >
                        <div className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-[140px] sm:h-[160px] md:h-[200px] lg:h-[240px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-full"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Product Image - Fixed Height with Smooth Float */}
                  <motion.div 
                    className="relative z-10 flex items-center justify-center w-full h-full"
                    animate={{ 
                      y: imageLoaded[current] ? [0, -8, 0] : 0
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.img
                      key={`img-${current}`}
                      src={slides[current].img}
                      alt={slides[current].title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: imageLoaded[current] ? 1 : 0, 
                        scale: imageLoaded[current] ? 1 : 0.9
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="w-auto h-full max-w-[140px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain"
                      style={{
                        filter: 'drop-shadow(0 15px 35px rgba(204, 0, 0, 0.15)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))'
                      }}
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [current]: true }))}
                    />
                  </motion.div>
                  
                  {/* Smooth Rotating Ring - Contained */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 25, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-2 border border-[#cc0000]/15 rounded-full pointer-events-none"
                  ></motion.div>
                  
                  {/* Counter Rotating Ring - Contained */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-4 border border-[#cc0000]/10 rounded-full pointer-events-none"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Leaf/Shape Elements */}
          <div className="absolute top-10 left-10 opacity-10">
            <svg className="w-20 h-20 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.09 4.56c-.7-1.03-1.5-1.99-2.4-2.85 0 0-1.66 4.7-7.37 4.7-1.06 0-2.05-.16-2.97-.44.04.4.09.8.16 1.19 1.15.34 2.37.52 3.64.52 5.7 0 9.08-3.47 9.08-3.47-.04.12-.08.23-.14.35zm-4.04 8.44c.74 0 1.46-.09 2.15-.25-.17.38-.36.75-.58 1.1-.65.14-1.33.22-2.03.22-3.77 0-6.84-2.02-6.84-4.5 0-.35.05-.69.14-1.02-1.06.91-1.7 2.23-1.7 3.68 0 3.04 3.88 5.5 8.66 5.5 3.77 0 6.84-2.02 6.84-4.5 0-1.45-.64-2.77-1.7-3.68.09.33.14.67.14 1.02 0 2.48-3.07 4.5-6.84 4.5z"/>
            </svg>
          </div>
          
          <div className="absolute bottom-10 right-10 opacity-10">
            <svg className="w-24 h-24 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current 
                ? "bg-[#cc0000] w-8 h-2" 
                : "bg-gray-400 hover:bg-gray-600 w-2 h-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Live Countdown Timer Component with React Icons
function DealCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (24 hours from now for demo, you can set any future date)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" }
  ];

  return (
    <div className="mb-6">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 font-semibold flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-[#cc0000]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        Offer Ends In
      </p>
      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: 0.6 + i * 0.1
            }}
            className="text-center bg-[#cc0000] text-white py-3 rounded-lg shadow-md relative overflow-hidden"
          >
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
            <div className="relative">
              <motion.div
                key={item.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl font-black mb-0.5"
              >
                {String(item.value).padStart(2, '0')}
              </motion.div>
              <div className="text-[8px] md:text-[9px] font-bold tracking-wider opacity-90">
                {item.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Promotional Banner Component with Premium Animations
function PromoBanner({ image, badge, title, subtitle, link, size = "normal" }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate(link)}
      className={`relative overflow-hidden cursor-pointer group rounded-2xl shadow-lg transition-all duration-500 bg-gray-900 w-full ${
        size === "large" ? "h-[350px] md:h-[450px]" : "h-[170px] md:h-[220px]"
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(204, 0, 0, 0.25)',
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      {/* Image with Parallax Zoom */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{
          scale: isHovered ? 1.15 : 1
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            filter: isHovered ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.8) contrast(1)',
            transition: 'filter 0.6s ease'
          }}
        />
      </motion.div>
      
      {/* Dynamic Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Animated Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(204, 0, 0, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0, 0.5, 0.3] : 0
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Corner Accent Lines */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#cc0000] rounded-tl-2xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'backOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#cc0000] rounded-br-2xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'backOut', delay: 0.1 }}
      />
      
      {/* Content with Stagger Animation */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-white z-10">
        {badge && (
          <motion.div 
            className="mb-1.5"
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <motion.span 
              className="inline-block text-[9px] md:text-[10px] font-extrabold tracking-[0.2em] uppercase bg-[#cc0000] px-2.5 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {badge}
            </motion.span>
          </motion.div>
        )}
        {subtitle && (
          <motion.p 
            className="text-[10px] md:text-xs font-bold mb-1 uppercase tracking-wider text-gray-300"
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h3 
          className={`font-black mb-2 md:mb-3 uppercase tracking-tight leading-tight transition-colors duration-300 ${
            size === "large" ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg lg:text-xl"
          }`}
          style={{ 
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            color: isHovered ? '#cc0000' : '#ffffff'
          }}
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {title}
        </motion.h3>
        
        {/* Animated Button with Icon */}
        <motion.div 
          className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase overflow-hidden"
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.span 
            className="border-b-2 pb-0.5 transition-colors duration-300"
            style={{
              borderColor: isHovered ? '#cc0000' : '#ffffff'
            }}
          >
            SHOP NOW
          </motion.span>
          <motion.svg 
            className="w-3 h-3 md:w-3.5 md:h-3.5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{
              x: isHovered ? [0, 5, 0] : 0
            }}
            transition={{
              duration: 0.8,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </div>
      
      {/* Diagonal Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent"
        style={{
          transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
          width: '200%',
          height: '200%'
        }}
        animate={{
          x: isHovered ? ['0%', '100%'] : '0%',
          y: isHovered ? ['0%', '100%'] : '0%'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
      />
    </motion.div>
  );
}

// Premium Product Card - Icon-Based Design
function ProductCard({ product, showCountdown = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState({ days: 499, hours: 16, mins: 59, secs: 18 });
  
  // Redux selectors
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);

  useEffect(() => {
    if (!showCountdown) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showCountdown]);

  const discount = product.old_price 
    ? Math.round(((parseInt(product.old_price.replace(/[^\d]/g, "")) - parseInt(product.price.replace(/[^\d]/g, ""))) / parseInt(product.old_price.replace(/[^\d]/g, ""))) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Countdown Timer */}
      {showCountdown && (
        <div className="absolute top-3 left-3 right-3 z-10 bg-[#cc0000] px-3 py-1.5 rounded-lg">
          <div className="flex justify-center gap-3 text-white text-xs font-semibold">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.mins}m</span>
            <span>{timeLeft.secs}s</span>
          </div>
        </div>
      )}

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-[#cc0000] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Icon Actions - Bottom Horizontal Line */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
        >
          {/* Wishlist Icon */}
          <motion.button 
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isWishlisted ? 'bg-[#cc0000] text-white' : 'bg-white hover:bg-[#cc0000] hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Add to Cart Icon - Larger, Primary */}
          <motion.button 
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isInCart ? 'bg-green-600 text-white' : 'bg-[#cc0000] text-white hover:bg-[#b30000]'
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (isInCart) {
                dispatch(removeFromCart(product.id));
              } else {
                dispatch(addToCart({ product, qty: 1 }));
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </motion.button>
          
          {/* Quick View Icon */}
          <motion.button 
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#cc0000] hover:text-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">4.5</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 
          className="font-semibold text-sm text-gray-900 mb-3 line-clamp-2 hover:text-[#cc0000] transition-colors cursor-pointer leading-snug min-h-[2.5rem]"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.title}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#cc0000]">{product.price}</span>
          {product.old_price && (
            <span className="text-sm text-gray-400 line-through">{product.old_price}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Feature Icon Component
function FeatureIcon({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="flex flex-col items-center text-center p-6 group bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="w-16 h-16 mb-4 flex items-center justify-center text-white bg-[#cf2127] rounded-xl group-hover:scale-105 transition-transform shadow-md">
        {icon}
      </div>
      <h3 className="font-black text-gray-900 mb-2 uppercase tracking-wide text-sm">
        {title}
      </h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function HomeNew() {
  const navigate = useNavigate();
  const featuredProducts = allProducts.slice(0, 8);
  const dealProduct = allProducts[0];

  return (
    <div className="w-full bg-white">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Promotional Banners Grid - Unique Masonry Layout */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#cc0000] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#cc0000] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Section Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.p 
              className="text-xs text-[#cc0000] font-bold tracking-[0.2em] uppercase mb-2"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 0.8 }}
            >
              SHOP BY CATEGORY
            </motion.p>
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#1a1a1a]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore Collections
            </motion.h2>
            <motion.div 
              className="w-16 h-1 bg-[#cc0000] mx-auto mt-3 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>
          </motion.div>

          {/* Unique Asymmetric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {/* Wall Clocks - Hero (3x3 on large) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3 lg:row-span-2">
              <PromoBanner
                image="/hm1.jpg"
                badge="SALE UP TO 30% OFF"
                title="Wall Clocks"
                subtitle="Premium Collection"
                link="/shop?filter=wall-clock"
                size="large"
              />
            </div>
            
            {/* Table Clocks (3x1 on large) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <PromoBanner
                image="/hm2.webp"
                badge="NEW ARRIVALS"
                title="Table Clocks"
                subtitle="Elegant Designs"
                link="/shop?filter=table-clock"
              />
            </div>

            {/* Hand Torches (1.5x1) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <PromoBanner
                image="/handtorches.webp"
                badge="FROM ₹300"
                title="Hand Torches"
                subtitle="Portable"
                link="/shop?filter=hand-torch"
              />
            </div>

            {/* LED Lights (1.5x1) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <PromoBanner
                image="/hm5.webp"
                badge="₹230"
                title="LED Lights"
                subtitle="Emergency"
                link="/shop?filter=led-light"
              />
            </div>

            {/* Designer Clocks (2x1) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <PromoBanner
                image="/hm3.jpg"
                badge="TRENDING"
                title="Designer Clocks"
                subtitle="Modern Style"
                link="/shop?filter=designer"
              />
            </div>

            {/* Classic Clocks (2x1) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <PromoBanner
                image="/hm4.jpg"
                badge="BEST SELLER"
                title="Classic Clocks"
                subtitle="Timeless Beauty"
                link="/shop?filter=classic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs text-[#cf2127] font-bold tracking-[0.2em] uppercase mb-3">
              FEATURED PRODUCTS
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
              Best Seller
            </h2>
            <div className="w-16 h-1 bg-[#cf2127] mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showCountdown={index === 0 || index === 4}
              />
            ))}
          </div>

          <div className="text-center mt-14">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/shop")}
              className="bg-gray-900 text-white px-12 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#cf2127] transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
            >
              LOAD MORE PRODUCTS
            </motion.button>
          </div>
        </div>
      </section>

      {/* Deal of the Day - Redesigned to match UI */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Animated Background Effects matching Hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-64 h-64 bg-[#cc0000]/10 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header - Matching Other Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.p 
              className="text-xs text-[#cc0000] font-bold tracking-[0.2em] uppercase mb-3"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 0.8 }}
            >
              LIMITED TIME OFFER
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Deals of the Day
            </motion.h2>
            <motion.div 
              className="w-16 h-1 bg-[#cc0000] mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </motion.div>

          {/* Redesigned Deal Card with Better Proportions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Product Image Section */}
                <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-8 md:p-12 flex items-center justify-center overflow-hidden">
                  {/* Subtle Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#cc0000]/5 to-orange-300/5" />
                  
                  {/* Product Image */}
                  <motion.div
                    className="relative z-10 w-full max-w-sm"
                    animate={{ 
                      y: [-6, 6, -6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src={dealProduct.img}
                      alt={dealProduct.title}
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  
                  {/* Discount Badge */}
                  {dealProduct.old_price && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                      className="absolute top-6 right-6 bg-[#cc0000] text-white px-4 py-3 rounded-xl shadow-lg"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-black leading-none">40%</div>
                        <div className="text-[9px] font-bold tracking-wider">OFF</div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Category */}
                    <span className="inline-block text-[10px] text-[#cc0000] uppercase tracking-[0.2em] font-bold bg-red-50 px-3 py-1.5 rounded-full mb-3">
                      {dealProduct.category}
                    </span>
                    
                    {/* Product Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight text-gray-900">
                      {dealProduct.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl md:text-4xl font-black text-[#cc0000]">
                        {dealProduct.price}
                      </span>
                      {dealProduct.old_price && (
                        <div className="flex flex-col">
                          <span className="text-lg text-gray-300 line-through font-bold">
                            {dealProduct.old_price}
                          </span>
                          <span className="text-[10px] text-green-600 font-bold">Save 40%</span>
                        </div>
                      )}
                    </div>

                    {/* Countdown Timer */}
                    <DealCountdown />

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/product/${dealProduct.id}`)}
                      className="w-full bg-[#cc0000] text-white px-8 py-4 text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#b30000] transition-all duration-300 shadow-lg hover:shadow-xl rounded-full flex items-center justify-center gap-2 group"
                    >
                      <span>VIEW DETAILS</span>
                      <motion.svg 
                        className="w-4 h-4"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.button>
                    
                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-900">Free Shipping</div>
                          <div className="text-[9px] text-gray-500">On all orders</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-900">1 Year Warranty</div>
                          <div className="text-[9px] text-gray-500">Quality assured</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureIcon
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              }
              title="Free Delivery"
              description="For all orders above ₹999"
            />
            <FeatureIcon
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Secure Payments"
              description="Confidence on all your devices"
            />
            <FeatureIcon
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
              title="Top-notch Support"
              description="support@ajantaquartz.com"
            />
            <FeatureIcon
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              title="180 Days Return"
              description="Easy return policy"
            />
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <img
                  src={`/image copy ${i + 5}.png`}
                  alt={`Brand ${i}`}
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

