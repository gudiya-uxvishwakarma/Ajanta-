import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiZap, FiAward, FiTrendingUp, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const heroSlides = [
    {
      title: "Illuminate Your",
      highlight: "World",
      description: "Discover premium quality lighting solutions from Ajanta. Brighten your space with our innovative and energy-efficient products.",
      image: "/hm1.jpg",
      badge: "New Collection 2024"
    },
    {
      title: "Smart Lighting",
      highlight: "Solutions",
      description: "Experience the future of lighting with our smart, energy-efficient LED products designed for modern homes.",
      image: "/hm2.webp",
      badge: "Smart Technology"
    },
    {
      title: "Premium Quality",
      highlight: "Guaranteed",
      description: "Trust in Ajanta's legacy of excellence with products that combine durability, efficiency, and stunning design.",
      image: "/hm3.jpg",
      badge: "Quality Assured"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          style={{ y: y1 }}
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
        />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #000 2px, transparent 0)',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 py-20 md:py-32 relative z-10"
        style={{ opacity }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 z-10"
          >
            {/* Animated Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-3 w-fit backdrop-blur-sm border border-white/20"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ backgroundSize: '200% 200%' }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FiZap className="w-4 h-4" />
                </motion.div>
                {heroSlides[currentSlide].badge}
              </motion.span>
            </motion.div>

            {/* Dynamic Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                  {heroSlides[currentSlide].title}
                  <motion.span 
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    {heroSlides[currentSlide].highlight}
                  </motion.span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-medium"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <motion.button
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Shop Now</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    style={{ transform: 'skewX(-20deg)' }}
                  />
                </motion.button>
              </Link>
              
              <motion.button
                className="group bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-full font-bold border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-xl flex items-center gap-3"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: FiTrendingUp, value: "50+", label: "Products", color: "text-blue-600" },
                { icon: FiAward, value: "10K+", label: "Happy Customers", color: "text-purple-600" },
                { icon: "star", value: "4.8", label: "Rating", color: "text-yellow-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center md:text-left group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                    {stat.icon === "star" ? (
                      <svg className={`w-6 h-6 ${stat.color}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    )}
                    <motion.p 
                      className="text-3xl font-black text-gray-900"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden md:block"
          >
            <div className="relative h-[600px] perspective-1000">
              <AnimatePresence mode="wait" custom={1}>
                <motion.div
                  key={currentSlide}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 }
                  }}
                  className="absolute inset-0"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-full"
                  >
                    <div className="relative h-full">
                      <img
                        src={heroSlides[currentSlide].image}
                        alt="Hero Product"
                        className="rounded-3xl shadow-2xl w-full h-full object-cover"
                      />
                      
                      {/* Dynamic Glow Effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl -z-10"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Shimmer Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        style={{ transform: 'skewX(-20deg)' }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {heroSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            {/* Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
              className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FiAward className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Premium Quality</p>
                  <p className="text-sm text-gray-600">Certified Products</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8, type: "spring" }}
              className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(147, 51, 234, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiZap className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Energy Efficient</p>
                  <p className="text-sm text-gray-600">Save up to 80%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
