import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { motion } from "framer-motion";

function StarRating({ rating = 4 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function LifestyleCard({ card }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const wishlistItems = useSelector(state => state.wishlist.items);
  const cartItems = useSelector(state => state.cart.items);
  const isWishlisted = wishlistItems.some(item => item.id === card.id);
  const isInCart = cartItems.some(item => item.id === card.id);

  const discount = card.old_price 
    ? Math.round(((parseInt(card.old_price.replace(/[^\d]/g, "")) - parseInt(card.price.replace(/[^\d]/g, ""))) / parseInt(card.old_price.replace(/[^\d]/g, ""))) * 100)
    : card.discount || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer"
      style={{
        boxShadow: isHovered 
          ? '0 20px 40px -12px rgba(204, 0, 0, 0.15), 0 0 0 1px rgba(204, 0, 0, 0.1)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-out'
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <motion.div 
          className="absolute top-3 right-3 z-10 bg-[#cc0000] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          -{discount}%
        </motion.div>
      )}

      {/* Product Image */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50"
        onClick={() => navigate(`/product/${card.id}`)}
      >
        <motion.img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Shimmer Effect on Hover - Desktop only */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent hidden lg:block"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transform: 'skewX(-20deg)' }}
        />

        {/* Icon Actions - Always visible on mobile */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:hidden"
          initial={{ opacity: 1, y: 0 }}
        >
          {/* Wishlist */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${
              isWishlisted ? 'bg-[#cc0000] text-white' : 'bg-white/90 hover:bg-[#cc0000] hover:text-white text-gray-700'
            }`}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(card)); }}
          >
            <svg className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Add to Cart - primary */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${
              isInCart ? 'bg-green-600 text-white' : 'bg-[#cc0000] text-white hover:bg-[#b30000]'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              isInCart
                ? dispatch(removeFromCart(card.id))
                : dispatch(addToCart({ product: card, qty: 1 }));
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </motion.button>

          {/* Quick View */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#cc0000] hover:text-white text-gray-700 transition-all"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Icon Actions - Desktop only with hover */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${
              isWishlisted ? 'bg-[#cc0000] text-white' : 'bg-white/90 hover:bg-[#cc0000] hover:text-white text-gray-700'
            }`}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(card)); }}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Add to Cart - primary */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all ${
              isInCart ? 'bg-green-600 text-white' : 'bg-[#cc0000] text-white hover:bg-[#b30000]'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              isInCart
                ? dispatch(removeFromCart(card.id))
                : dispatch(addToCart({ product: card, qty: 1 }));
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </motion.button>

          {/* Quick View */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#cc0000] hover:text-white text-gray-700 transition-all"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
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
          <motion.span 
            className="text-xs text-gray-500 uppercase tracking-wide"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {card.category}
          </motion.span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">4.5</span>
          </div>
        </div>

        {/* Title */}
        <motion.h3
          className="font-semibold text-sm text-gray-900 mb-3 line-clamp-2 transition-colors cursor-pointer leading-snug min-h-[2.5rem]"
          onClick={() => navigate(`/product/${card.id}`)}
          animate={{ 
            color: isHovered ? '#cc0000' : '#111827'
          }}
          transition={{ duration: 0.3 }}
        >
          {card.title}
        </motion.h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-xl font-bold text-[#cc0000]"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {card.price || "₹999"}
          </motion.span>
          {card.old_price && (
            <span className="text-sm text-gray-400 line-through">{card.old_price}</span>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        animate={{
          background: isHovered 
            ? 'radial-gradient(circle at 50% 0%, rgba(204, 0, 0, 0.05) 0%, transparent 70%)'
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function LifestyleCards({ cards }) {
  return (
    <section className="w-full px-6 md:px-14 pt-16 md:pt-20 pb-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <LifestyleCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
