import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

// Beautiful gradient combinations
const gradients = [
  'from-purple-600/90 via-pink-600/80 to-red-600/90',
  'from-blue-600/90 via-cyan-600/80 to-teal-600/90',
  'from-orange-600/90 via-red-600/80 to-pink-600/90',
  'from-green-600/90 via-emerald-600/80 to-cyan-600/90',
  'from-indigo-600/90 via-purple-600/80 to-pink-600/90',
];

export default function CategoryCard({ category, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Mouse tracking for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.3,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.15 + 0.5
      }
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay: index * 0.2
      }
    }
  };

  return (
    <Link to={`/shop?category=${category.slug}`} className="block">
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          scale: 1.05,
          z: 50,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer perspective-1000"
      >
        {/* Animated Background with Parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ transformStyle: "preserve-3d", z: -10 }}
        >
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.15 : 1.1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Dynamic Gradient Overlay */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} mix-blend-multiply`}
            variants={overlayVariants}
            animate={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            style={{ transform: 'skewX(-20deg)' }}
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              variants={floatingVariants}
              animate="animate"
              transition={{
                delay: i * 0.3,
                duration: 3 + i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Glassmorphism Content Container */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-8"
          style={{ transformStyle: "preserve-3d", z: 10 }}
        >
          <motion.div
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl"
            variants={contentVariants}
            animate={{
              y: isHovered ? -10 : 0,
              backdropFilter: isHovered ? 'blur(20px)' : 'blur(15px)',
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Title with Gradient Text */}
            <motion.h3 
              className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {category.name}
            </motion.h3>
            
            {/* Description with Typewriter Effect */}
            <motion.p 
              className="text-white/90 mb-6 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {category.description}
            </motion.p>
            
            {/* Animated CTA Button */}
            <motion.div 
              className="flex items-center gap-3 text-white font-semibold"
              animate={{
                x: isHovered ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm tracking-wide">Explore Collection</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
                animate={{
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Product Count Badge */}
        <motion.div 
          className="absolute top-6 right-6 backdrop-blur-xl bg-white/20 border border-white/30 px-4 py-2 rounded-full"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
          }}
          transition={{ 
            delay: index * 0.15 + 0.7,
            duration: 0.6,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
          }}
        >
          <span className="text-xs font-bold text-white tracking-wide">
            {category.productCount} Items
          </span>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner Accent */}
        <motion.div
          className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-br-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            delay: index * 0.15 + 0.8,
            duration: 0.5,
            type: "spring"
          }}
        />
      </motion.div>
    </Link>
  );
}
