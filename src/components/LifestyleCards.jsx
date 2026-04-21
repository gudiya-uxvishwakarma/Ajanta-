import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";

function StarRating({ rating = 4 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function LifestyleCard({ card }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux selectors
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === card.id);

  return (
    <div
      className="relative w-full overflow-hidden group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500"
      style={{ height: "380px" }}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Discount Badge */}
        {card.discount && (
          <div className="absolute top-3 left-3 z-10 bg-[#cc0000] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
            {card.discount}% OFF
          </div>
        )}

        {/* Wishlist button */}
        <button
          className={`absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg ${
            isWishlisted 
              ? 'bg-[#cc0000] text-white scale-110' 
              : 'bg-white/95 text-gray-600 hover:bg-[#cc0000] hover:text-white hover:scale-110'
          }`}
          onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(card)); }}
          aria-label="Wishlist"
        >
          <svg 
            className="w-5 h-5 transition-transform duration-300" 
            fill={isWishlisted ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Product Image */}
        <img
          src={card.img}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onClick={() => { navigate(`/product/${card.id}`); }}
        />

        {/* Gradient overlay - enhanced */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
            className="bg-white text-gray-900 font-bold text-sm px-6 py-3 rounded-lg shadow-xl hover:bg-[#cc0000] hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Quick View
          </button>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 w-full flex flex-col">
          {/* Info Section */}
          <div className="px-4 pt-4 pb-3 flex flex-col gap-2 transform transition-transform duration-300 group-hover:-translate-y-1">
            {/* Category Badge */}
            <span className="text-[10px] font-bold tracking-wider uppercase text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded inline-block self-start">
              {card.category || "Ajanta"}
            </span>

            {/* Product Title */}
            <h3 className="text-white text-sm font-bold line-clamp-2 leading-tight group-hover:text-yellow-300 transition-colors duration-300">
              {card.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={card.rating || 4} />
              <span className="text-white/80 text-xs font-medium">(24)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-yellow-300 text-xl font-black">
                {card.price || "₹999"}
              </span>
              {card.originalPrice && (
                <span className="text-white/50 text-sm line-through">
                  {card.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex">
            <button
              className="flex-1 bg-[#cc0000] text-white font-bold text-xs tracking-wide py-3.5 hover:bg-[#a00000] transition-all duration-300 border-r border-[#a00000] flex items-center justify-center gap-2 group/btn"
              onClick={(e) => { e.stopPropagation(); dispatch(addToCart({ product: card, qty: 1 })); }}
            >
              <svg className="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add To Cart
            </button>
            <button
              className="flex-1 bg-[#cc0000] text-white font-bold text-xs tracking-wide py-3.5 hover:bg-[#a00000] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
              aria-label="View Details"
            >
              <svg className="w-4 h-4 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
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
