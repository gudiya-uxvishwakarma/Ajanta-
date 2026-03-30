import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ p }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${p.id}`)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-[#f2f0ed] overflow-hidden rounded-xl mb-3">

        {/* Main Image */}
        <img
          src={p.img}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
          style={{ opacity: hovered ? 0 : 1, transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* Hover Image */}
        <img
          src={p.hoverImg}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(1.04)" }}
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {p.tag && (
            <span className="bg-[#cc0000] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
              {p.tag}
            </span>
          )}
          {p.soldOut && (
            <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          aria-label="Add to wishlist"
          onClick={e => { e.stopPropagation(); setWishlisted(w => !w); }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          } ${wishlisted ? "bg-[#cc0000]" : "bg-white hover:bg-gray-50"}`}
        >
          <svg
            fill={wishlisted ? "white" : "none"}
            stroke={wishlisted ? "white" : "#333"}
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick View overlay strip */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <button
            onClick={e => { e.stopPropagation(); navigate(`/product/${p.id}`); }}
            className={`w-full py-3 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-200 ${
              p.soldOut
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1a1a1a] text-white hover:bg-[#cc0000]"
            }`}
          >
            {p.soldOut ? "SOLD OUT" : "QUICK VIEW"}
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col gap-1 px-0.5">
        {/* SKU */}
        <p className="text-[10px] text-gray-400 tracking-wide font-medium">{p.sku}</p>

        {/* Product Name */}
        <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug line-clamp-2 group-hover:text-[#cc0000] transition-colors duration-200">
          {p.title || p.name}
        </p>

        {/* Rating stars (static) */}
        <div className="flex items-center gap-1 mt-0.5">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={`w-3 h-3 ${i <= 4 ? "text-[#f59e0b]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">(6)</span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[15px] font-black text-[#1a1a1a]">{p.price}</span>
          {p.old_price && (
            <span className="text-[12px] text-gray-400 line-through">{p.old_price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
