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

  const wishlistItems = useSelector(state => state.wishlist.items);
  const cartItems = useSelector(state => state.cart.items);
  const isWishlisted = wishlistItems.some(item => item.id === card.id);
  const isInCart = cartItems.some(item => item.id === card.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Discount Badge */}
      {card.discount && (
        <div className="absolute top-3 right-3 z-10 bg-[#cc0000] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
          -{card.discount}%
        </div>
      )}

      {/* Product Image */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onClick={() => navigate(`/product/${card.id}`)}
      >
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Icon Actions - appear on hover */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isWishlisted ? 'bg-[#cc0000] text-white' : 'bg-white hover:bg-[#cc0000] hover:text-white text-gray-700'
            }`}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(card)); }}
          >
            <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Add to Cart - primary */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isInCart ? 'bg-green-600 text-white' : 'bg-[#cc0000] text-white hover:bg-[#a00000]'
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#cc0000] hover:text-white text-gray-700 transition-all"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{card.category}</span>
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
          onClick={() => navigate(`/product/${card.id}`)}
        >
          {card.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#cc0000]">{card.price || "₹999"}</span>
          {card.old_price && (
            <span className="text-sm text-gray-400 line-through">{card.old_price}</span>
          )}
        </div>
      </div>
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
