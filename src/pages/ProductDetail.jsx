import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../data/products";

const reviews = [
  { name: "Rahul Sharma", date: "08/05/2025", rating: 4, text: "Best gift! Look great, value for money, quality best." },
  { name: "Priya Mehta", date: "07/31/2025", rating: 5, text: "Good. Nice product. Very elegant and stylish watch." },
  { name: "Anita Halder", date: "06/15/2025", rating: 4, text: "Beautiful watch. Loved the design and finish. Highly recommend." },
];

function Stars({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${size} ${i <= rating ? "text-[#f59e0b]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const accordionItems = [
  { title: "PRODUCT DESCRIPTION", content: "Premium quartz analog watch crafted with precision engineering. Features a stylish dial design with high-quality strap material. Perfect for everyday wear and special occasions." },
  { title: "SHIPPING INFORMATION", content: "Free shipping on all orders above ₹999. Orders are dispatched within 24 hours. Estimated delivery: 3–5 business days across India." },
  { title: "PRODUCT SPECIFICATION", content: "Movement: Quartz | Case Material: Stainless Steel | Strap: Metal/Silicone | Water Resistance: 30m | Glass: Mineral Crystal | Warranty: 1 Year" },
  { title: "CARE GUIDE", content: "Avoid prolonged exposure to water. Clean with a soft dry cloth. Store in the provided box when not in use. Service recommended every 2 years." },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={() => navigate("/")} className="bg-[#1a1a1a] text-white px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#cc0000] transition-colors">BACK TO HOME</button>
      </div>
    );
  }

  const related = allProducts.filter(p => p.id !== product.id).slice(0, 5);
  const recentlyViewed = allProducts.filter(p => p.id !== product.id).slice(2, 8);
  const viewMore = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="w-full bg-white min-h-screen pb-24">

      {/* Breadcrumb */}
      <div className="w-full px-6 md:px-14 py-3 border-b border-gray-100 text-[12px] text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate("/")} className="hover:text-[#cc0000]">Home</button>
        <span>/</span>
        <button onClick={() => navigate("/shop")} className="hover:text-[#cc0000]">Shop</button>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.title}</span>
      </div>

      {/* Main Product Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-14 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

        {/* LEFT — Images */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-[#f0ede8] rounded-xl overflow-hidden">
            <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover object-top transition-all duration-500" />
            <button onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`shrink-0 w-[72px] h-[72px] rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#1a1a1a]" : "border-gray-200 hover:border-gray-400"}`}>
                <img src={img} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#1a1a1a] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 w-fit rounded">
            FROM THE MAKERS OF ICONIC BRAND AJANTA
          </div>
          <h1 className="text-[15px] md:text-[17px] font-bold text-[#1a1a1a] leading-snug">{product.title} | {product.sku}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[18px] font-black text-[#1a1a1a]">{product.price}</span>
            {product.old_price && <span className="text-gray-400 text-[13px] line-through">{product.old_price}</span>}
            {product.tag && <span className="bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.tag}</span>}
          </div>
          <div className="flex items-center gap-1.5 text-[#cc0000] text-[11px] font-semibold">
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            144+ People ordered this in last 7 days
          </div>
          <div className="flex items-center gap-2">
            <Stars rating={4} />
            <span className="text-[13px] text-gray-500">6 reviews</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f8f8f8] rounded-lg px-3 py-2 text-[11px] text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse shrink-0" />
            <span><strong>13</strong> customers are viewing this product</span>
          </div>
          <div className="flex items-start gap-2.5 border border-gray-200 rounded-lg px-3 py-2.5">
            <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            <div>
              <p className="text-[11px] font-semibold text-gray-700">Estimated delivery:</p>
              <p className="text-[11px] text-gray-500">Mar 30, 2026 – Apr 3, 2026</p>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-700 mb-2">Dial Color : <span className="font-normal">{product.category}</span></p>
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-[#1a1a1a] shadow-md" : "border-gray-200 hover:border-gray-400"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-9 flex items-center justify-center hover:bg-gray-100 text-base font-bold">−</button>
              <span className="w-10 text-center text-[13px] font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-8 h-9 flex items-center justify-center hover:bg-gray-100 text-base font-bold">+</button>
            </div>
            <button onClick={handleAddToCart}
              className={`flex-1 py-3.5 text-[12px] font-bold tracking-widest uppercase rounded-lg transition-all duration-300 ${added ? "bg-green-600 text-white" : "bg-[#1a1a1a] text-white hover:bg-[#cc0000]"}`}>
              {added ? "✓ ADDED TO CART" : "ADD TO CART"}
            </button>
          </div>
          <button onClick={() => navigate("/shop")}
            className="w-full border-2 border-[#1a1a1a] text-[#1a1a1a] py-3.5 text-[12px] font-bold tracking-widest uppercase rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-all duration-300">
            BUY NOW
          </button>
          <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-[#cc0000] transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            Add to Wishlist
          </button>
          <div>
            <p className="text-[13px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#cc0000]" /> 2 Limited Time Offers
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Get 10% OFF* on first order.", code: "WELCOME10" }, { label: "Get 5% OFF* on prepaid.", code: "PREPAID5" }].map(o => (
                <div key={o.code} className="border border-dashed border-gray-300 rounded-lg p-3">
                  <p className="text-[12px] text-gray-600 mb-1.5">{o.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">Code</span>
                    <span className="bg-gray-100 text-[#1a1a1a] text-[11px] font-bold px-2 py-0.5 rounded">{o.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#cc0000] text-white rounded-lg px-4 py-3">
            <p className="text-[12px] font-bold">EXCLUSIVE WEBSITE OFFER:</p>
            <p className="text-[12px] text-white/85">Get 1 Month Extra Warranty on every purchase!</p>
          </div>
          <div className="grid grid-cols-4 gap-2 py-3 border-t border-gray-100">
            {[{ icon: "🚚", label: "Free shipping" }, { icon: "🔒", label: "Secure payment" }, { icon: "🛡️", label: "12 Months Warranty" }, { icon: "↩️", label: "Easy Return" }].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-[14px]">{b.icon}</span>
                <span className="text-[9.5px] text-gray-500 leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100">
            {accordionItems.map((item, i) => (
              <div key={i} className="border-b border-gray-100">
                <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between py-3.5 text-[12px] font-bold tracking-widest text-gray-700 hover:text-[#cc0000] transition-colors">
                  {item.title}
                  <svg className={`w-4 h-4 transition-transform ${openAccordion === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {openAccordion === i && <p className="text-[13px] text-gray-500 leading-relaxed pb-4">{item.content}</p>}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            Your order is free delivery!
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-3">GUARANTEE SAFE CHECKOUT</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["VISA", "Mastercard", "G Pay", "RuPay", "Paytm", "PhonePe", "UPI"].map(p => (
                <span key={p} className="bg-gray-100 px-2 py-1 rounded text-[11px] font-bold text-gray-600">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-14 py-10 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-[16px] font-black text-[#1a1a1a]">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-1">
              <Stars rating={4} />
              <span className="text-[12px] font-bold text-[#1a1a1a]">4.3</span>
              <span className="text-[11px] text-gray-400">6 reviews</span>
            </div>
          </div>
          <button className="bg-[#1a1a1a] text-white px-4 py-2 text-[11px] font-bold tracking-wide rounded hover:bg-[#cc0000] transition-colors">Write a review</button>
        </div>
        <div className="flex flex-col gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[13px] font-bold shrink-0">{r.name[0]}</div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a1a1a]">{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.date}</p>
                </div>
              </div>
              <Stars rating={r.rating} size="w-3.5 h-3.5" />
              <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* You May Also Like */}
      <div className="w-full px-4 md:px-14 py-10 border-t border-gray-100">
        <h2 className="text-[16px] md:text-[18px] font-black text-[#1a1a1a] text-center uppercase tracking-tight mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {related.map(p => (
            <div key={p.id} className="flex flex-col cursor-pointer group" onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0,0); }}>
              <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] rounded-xl overflow-hidden mb-3">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                {p.tag && <span className="absolute top-2 left-2 bg-[#cc0000] text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">{p.tag}</span>}
              </div>
              <p className="text-[12px] font-medium text-gray-800 leading-snug mb-1 line-clamp-2">{p.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#cc0000] font-bold text-[13px]">{p.price}</span>
                <span className="text-gray-400 text-[11px] line-through">{p.old_price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="w-full px-4 md:px-14 py-10 border-t border-gray-100">
        <h2 className="text-[16px] md:text-[18px] font-black text-[#1a1a1a] text-center uppercase tracking-tight mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
          {recentlyViewed.map(p => (
            <div key={p.id} className="flex flex-col cursor-pointer group" onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0,0); }}>
              <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] rounded-xl overflow-hidden mb-2">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="text-[11px] font-medium text-gray-700 leading-snug mb-1 line-clamp-2">{p.title}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[#cc0000] font-bold text-[12px]">{p.price}</span>
                <span className="text-gray-400 text-[10px] line-through">{p.old_price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Watches */}
      <div className="w-full px-4 md:px-14 py-10 border-t border-gray-100">
        <h2 className="text-[16px] md:text-[18px] font-black text-[#1a1a1a] text-center uppercase tracking-tight mb-8">View More Watches</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {viewMore.map(p => (
            <div key={p.id} className="flex flex-col cursor-pointer group" onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0,0); }}>
              <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] rounded-xl overflow-hidden mb-3">
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                {p.tag && <span className="absolute top-2 left-2 bg-white text-[#cc0000] text-[10px] font-bold px-2 py-0.5 border border-gray-100 z-10">{p.tag}</span>}
                {p.soldOut && <span className="absolute top-2 right-2 bg-white text-gray-500 text-[10px] font-bold px-2 py-0.5 border border-gray-200 z-10">SOLD OUT</span>}
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
                  <button className="flex-1 bg-[#1a1a1a] text-white text-[10px] font-bold tracking-widest uppercase py-2.5 hover:bg-[#cc0000] transition-colors">QUICKSHOP</button>
                  {p.soldOut && <button className="flex-1 bg-white text-gray-600 text-[10px] font-bold tracking-widest uppercase py-2.5">SOLD OUT</button>}
                </div>
              </div>
              <p className="text-[12px] font-medium text-gray-800 leading-snug mb-1.5 line-clamp-2">{p.title}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#cc0000] font-bold text-[13px]">{p.price}</span>
                <span className="text-gray-400 text-[11px] line-through">{p.old_price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Add to Cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#cc0000] text-white flex items-center justify-center py-4 shadow-2xl cursor-pointer" onClick={handleAddToCart}>
        <span className="text-[14px] font-bold tracking-widest uppercase">
          {added ? "✓ ADDED TO CART" : `Add to Cart • ${product.price}`}
        </span>
      </div>

    </div>
  );
}
