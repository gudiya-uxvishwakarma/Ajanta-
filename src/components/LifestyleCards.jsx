import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function StarRating({ rating = 4 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function LifestyleCard({ card }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  return (
    <div
      className="relative w-full overflow-hidden group cursor-pointer bg-[#f2f2f2] shadow-md hover:shadow-2xl transition-all duration-300"
      style={{ height: "280px" }}
      onClick={() => { navigate(`/product/${card.id}`); }}
    >
      {/* Wishlist button */}
      <button
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow"
        onClick={(e) => { e.stopPropagation(); toggleWishlist(card); }}
        aria-label="Wishlist"
      >
        <svg className={`w-3.5 h-3.5 ${isWishlisted(card.id) ? "text-[#cc0000] fill-[#cc0000]" : "text-gray-500"}`} fill={isWishlisted(card.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Bottom info */}
      <div className="absolute bottom-0 w-full flex flex-col overflow-hidden">
        <div className="px-3 pt-2 pb-1.5 flex flex-col gap-0.5">
          <div className="text-white flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="text-[10px] leading-snug font-medium line-clamp-2">{card.title}</p>
            <div className="flex items-center gap-1.5">
              <StarRating rating={4} />
              <span className="text-white/60 text-[9px]">(24)</span>
            </div>
            <p className="font-bold text-[12px] text-yellow-300">{card.price || "Contact for Price"}</p>
          </div>
        </div>
        {/* Action buttons */}
        <div className="w-full h-9 flex">
          <button
            className="flex-1 bg-[#700000]/95 text-white font-semibold text-[10.5px] tracking-wide hover:bg-[#cc0000] transition-colors border-r border-[#4a0000]"
            onClick={(e) => { e.stopPropagation(); addToCart(card); }}
          >
            Add To Cart
          </button>
          <button
            className="flex-1 bg-[#700000]/95 text-white flex items-center justify-center hover:bg-[#cc0000] transition-colors text-[10.5px] font-semibold tracking-wide"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); }}
            aria-label="View Details"
          >
            View Details
          </button>
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
