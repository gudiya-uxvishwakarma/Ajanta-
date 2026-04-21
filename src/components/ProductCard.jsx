import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse tracking for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to cart!', {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        fontWeight: '600',
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: isWishlisted ? '💔' : '❤️',
      style: {
        borderRadius: '12px',
        background: isWishlisted 
          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
          : 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
        color: '#fff',
        fontWeight: '600',
      },
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: index * 0.1 + 0.3
      }
    }
  };

  return (
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
        y: -12,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer perspective-1000"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <AnimatePresence>
          {product.isNew && (
            <motion.span
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
            >
              NEW
            </motion.span>
          )}
          {product.discount && (
            <motion.span
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
            >
              -{product.discount}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Wishlist Button - Top Right */}
      <motion.button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          backgroundColor: isWishlisted ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      >
        <FiHeart 
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'text-white fill-current' : 'text-gray-700'
          }`} 
        />
      </motion.button>

      {/* Image Container with Parallax */}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            animate={isHovered ? "hover" : ""}
            loading="lazy"
          />
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transform: 'skewX(-20deg)' }}
          />
          
          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6 gap-3"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleAddToCart}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all shadow-lg border border-white/20"
                  title="Add to Cart"
                >
                  <FiShoppingCart className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all shadow-lg border border-white/20"
                  title="Quick View"
                >
                  <FiEye className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Product Info with Glass Effect */}
      <motion.div 
        className="p-6 relative"
        style={{ transformStyle: "preserve-3d", z: 10 }}
      >
        {/* Category Tag */}
        <motion.p 
          className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {product.category}
        </motion.p>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <motion.h3 
            className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all min-h-[3rem] text-lg"
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {product.name}
          </motion.h3>
        </Link>
        
        {/* Animated Rating */}
        <motion.div 
          className="flex items-center gap-1 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.6 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <FiStar
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
          <span className="text-xs text-gray-600 ml-2 font-medium">
            ({product.reviews || 0})
          </span>
        </motion.div>

        {/* Price Section with Animation */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7 }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              ₹{product.price?.toLocaleString()}
            </motion.span>
            {product.originalPrice && (
              <motion.span 
                className="text-sm text-gray-400 line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                ₹{product.originalPrice.toLocaleString()}
              </motion.span>
            )}
          </div>
          
          {/* Stock Status */}
          <motion.span 
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              product.inStock !== false
                ? 'text-emerald-700 bg-emerald-100 border border-emerald-200'
                : 'text-red-700 bg-red-100 border border-red-200'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: index * 0.1 + 0.9,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.05 }}
          >
            {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
          </motion.span>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
