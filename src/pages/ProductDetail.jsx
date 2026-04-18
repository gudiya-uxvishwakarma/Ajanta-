import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { MdLocalShipping, MdLock, MdVerifiedUser, MdReplay } from "react-icons/md";

const initialReviews = [
  { name: "Rahul Sharma", date: "08/05/2025", rating: 4, text: "Best gift! Look great, value for money, quality best." },
  { name: "Priya Mehta",  date: "07/31/2025", rating: 5, text: "Good. Nice product. Very elegant and stylish watch." },
  { name: "Anita Halder", date: "06/15/2025", rating: 4, text: "Beautiful watch. Loved the design and finish. Highly recommend." },
];

function Stars({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${size} ${i <= rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [hover, setHover] = useState(0);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    onSubmit({ ...form, rating: Number(form.rating), date: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }) });
    onClose();
  };
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-[14px] font-black text-[#1a1a1a] tracking-tight uppercase">Write a Review</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block">Your Name</label>
            <input name="name" value={form.name} onChange={handle} required placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1a1a1a] transition-colors" />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block">Rating</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <button type="button" key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setForm(f => ({ ...f, rating: i }))}>
                  <svg className={`w-7 h-7 transition-colors ${i <= (hover || form.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block">Your Review</label>
            <textarea name="text" value={form.text} onChange={handle} required rows={4} placeholder="Share your experience..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1a1a1a] transition-colors resize-none" />
          </div>
          <button type="submit" className="w-full bg-[#1a1a1a] text-white py-3 text-[11px] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-[#cc0000] transition-colors">
            Submit Review
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <p className="text-gray-400 text-sm tracking-widest uppercase">Product not found</p>
      <button onClick={() => navigate("/")} className="bg-[#1a1a1a] text-white px-8 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#cc0000] transition-colors rounded">Back to Home</button>
    </div>
  );

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const handleAddToCart = () => addToCart(product, qty);
  const handleBuyNow = () => { addToCart(product, qty); navigate("/checkout"); };

  const accordionItems = [
    { title: "Product Description", content: product.description },
    product.features?.length && { title: "Key Features", content: null, features: product.features },
    { title: "Shipping Information", content: "Free shipping on all orders above ₹999. Orders dispatched within 24 hours. Estimated delivery: 3–5 business days across India." },
    product.specs && { title: "Specifications", content: null, specs: product.specs },
    { title: "Care Guide", content: "Keep away from water and moisture. Store in a cool, dry place. Do not overcharge beyond recommended charging time." },
  ].filter(Boolean);

  return (
    <div className="w-full bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="w-full bg-[#fafafa] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-3 flex items-center gap-2 text-[11px] text-gray-400 tracking-wide">
          <button onClick={() => navigate("/")} className="hover:text-[#cc0000] transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate("/shop")} className="hover:text-[#cc0000] transition-colors">Shop</button>
          <span>/</span>
          <span className="text-gray-600 line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* LEFT — Image Gallery */}
        <motion.div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start"
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>

          {/* Main image */}
          <div className="relative w-full aspect-square bg-gradient-to-br from-[#f7f4f0] to-[#ede9e3] rounded-3xl overflow-hidden group cursor-zoom-in shadow-sm"
            onClick={() => setZoomed(true)}>
            <AnimatePresence mode="wait">
              <motion.img key={activeImg} src={product.images[activeImg]} alt={product.title}
                className="w-full h-full object-contain p-6"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }} />
            </AnimatePresence>
            {product.tag && (
              <div className="absolute top-4 left-4 bg-[#cc0000] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow">{product.tag}</div>
            )}
            {product.soldOut && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-3xl">
                <span className="text-[13px] font-black tracking-widest uppercase text-gray-400 border-2 border-gray-300 px-6 py-2 rounded-full">Sold Out</span>
              </div>
            )}
            {/* Arrows */}
            {product.images.length > 1 && (<>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + product.images.length) % product.images.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % product.images.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>)}
            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Click to zoom
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <motion.button key={i} onClick={() => setActiveImg(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className={`shrink-0 w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-[#f7f4f0] ${activeImg === i ? "border-[#1a1a1a] shadow-md" : "border-transparent hover:border-gray-300"}`}>
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </motion.button>
              ))}
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-4 gap-2 mt-1">
            {[
              { icon: <MdLocalShipping className="text-[#cf2127] text-2xl" />, label: "Free Shipping" },
              { icon: <MdLock className="text-[#cf2127] text-2xl" />, label: "Secure Pay" },
              { icon: <MdVerifiedUser className="text-[#cf2127] text-2xl" />, label: "1 Yr Warranty" },
              { icon: <MdReplay className="text-[#cf2127] text-2xl" />, label: "Easy Returns" },
            ].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 bg-[#fafafa] rounded-2xl py-3 px-2 text-center border border-gray-100">
                {b.icon}
                <span className="text-[9px] text-gray-500 font-semibold leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Product Info */}
        <motion.div className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}>

          <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#cc0000] border border-[#cc0000]/30 bg-[#cc0000]/5 px-3 py-1.5 rounded-full w-fit">
            Oreva Group — Trusted Since 1983
          </span>

          <div>
            <h1 className="text-[20px] md:text-[22px] font-black text-[#1a1a1a] leading-snug tracking-tight">{product.title}</h1>
            <p className="text-[11px] text-gray-400 mt-1.5 tracking-widest uppercase font-medium">SKU: {product.sku}</p>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-3">
            <Stars rating={Math.round(Number(avgRating))} />
            <span className="text-[13px] font-black text-[#1a1a1a]">{avgRating}</span>
            <span className="text-[11px] text-gray-400">· {reviews.length} reviews</span>
            <button onClick={() => setShowReviewModal(true)} className="ml-auto text-[11px] text-[#cc0000] font-bold hover:underline">Write a review</button>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-[30px] font-black text-[#1a1a1a] tracking-tight">{product.price}</span>
            {product.old_price && <span className="text-[16px] text-gray-400 line-through">{product.old_price}</span>}
            {product.tag && <span className="bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-200">{product.tag}</span>}
          </div>

          {/* Social proof */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[11px] text-[#cc0000] font-semibold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
              144+ people ordered this in the last 7 days
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span><strong className="text-gray-700">13</strong> customers viewing right now</span>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Category / colour */}
          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span>Category: <strong className="text-[#1a1a1a]">{product.category}</strong></span>
            {product.colour && <span>Colour: <strong className="text-[#1a1a1a]">{product.colour}</strong></span>}
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-3 bg-[#fafafa] border border-gray-100 rounded-2xl px-4 py-3">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            <div>
              <p className="text-[11px] font-semibold text-gray-700">Estimated Delivery</p>
              <p className="text-[11px] text-gray-400">3–5 business days · Free shipping</p>
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-bold text-gray-600 transition-colors">−</button>
              <span className="w-10 text-center text-[13px] font-bold text-[#1a1a1a]">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-bold text-gray-600 transition-colors">+</button>
            </div>
            <motion.button onClick={handleAddToCart} whileTap={{ scale: 0.97 }}
              className="flex-1 h-12 text-[12px] font-bold tracking-[0.15em] uppercase rounded-xl bg-[#1a1a1a] text-white hover:bg-[#cc0000] hover:shadow-lg hover:shadow-red-100 transition-all duration-300">
              Add to Cart
            </motion.button>
            <motion.button onClick={handleBuyNow} whileTap={{ scale: 0.97 }}
              className="flex-1 h-12 text-[12px] font-bold tracking-[0.15em] uppercase rounded-xl bg-[#cf2127] text-white hover:bg-[#a01a1f] transition-all duration-300 shadow-md shadow-red-100">
              Buy Now
            </motion.button>
          </div>

          {/* Wishlist */}
          <button onClick={() => toggleWishlist(product)} className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-[#cc0000] transition-colors w-fit">
            <svg className="w-4 h-4" fill={isWishlisted(product.id) ? "#cc0000" : "none"} stroke={isWishlisted(product.id) ? "#cc0000" : "currentColor"} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {isWishlisted(product.id) ? "Wishlisted" : "Add to Wishlist"}
          </button>

          <div className="h-px bg-gray-100" />

          {/* Accordion */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {accordionItems.map((item, i) => (
              <div key={i}>
                <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-700 hover:text-[#cc0000] transition-colors bg-white hover:bg-[#fafafa]">
                  {item.title}
                  <motion.svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: openAccordion === i ? 45 : 0 }} transition={{ duration: 0.25 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 bg-[#fafafa]">
                        {item.features ? (
                          <ul className="flex flex-col gap-2">
                            {item.features.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2 text-[12px] text-gray-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] mt-1.5 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        ) : item.specs ? (
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(item.specs).map(([k, v]) => (
                              <div key={k} className="flex gap-3 text-[12px]">
                                <span className="text-gray-400 capitalize w-40 shrink-0">{k.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-gray-700 font-medium">{v}</span>
                              </div>
                            ))}
                            {product.colour && <div className="flex gap-3 text-[12px]"><span className="text-gray-400 w-40 shrink-0">Colour</span><span className="text-gray-700 font-medium">{product.colour}</span></div>}
                          </div>
                        ) : (
                          <p className="text-[12px] text-gray-500 leading-relaxed">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Payment badges */}
          <div className="border border-gray-100 rounded-2xl p-4 text-center bg-[#fafafa]">
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-3">Guaranteed Safe Checkout</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["VISA", "Mastercard", "G Pay", "RuPay", "Paytm", "PhonePe", "UPI"].map(p => (
                <span key={p} className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm">{p}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <motion.div className="w-full bg-[#fafafa] border-t border-gray-100 mt-4"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-12">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-[20px] font-black text-[#1a1a1a] tracking-tight">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-2">
                <Stars rating={Math.round(Number(avgRating))} />
                <span className="text-[13px] font-black text-[#1a1a1a]">{avgRating}</span>
                <span className="text-[11px] text-gray-400">· {reviews.length} reviews</span>
              </div>
            </div>
            <button onClick={() => setShowReviewModal(true)}
              className="bg-[#1a1a1a] text-white px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-xl hover:bg-[#cc0000] transition-colors">
              Write a Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[13px] font-black shrink-0">{r.name[0]}</div>
                  <div>
                    <p className="text-[12px] font-bold text-[#1a1a1a]">{r.name}</p>
                    <p className="text-[10px] text-gray-400">{r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size="w-3.5 h-3.5" />
                <p className="text-[12px] text-gray-500 mt-2.5 leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Related Products */}
      {related.length > 0 && (
        <motion.div className="max-w-7xl mx-auto px-6 md:px-14 py-12"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-[18px] font-black text-[#1a1a1a] tracking-tight mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <motion.div key={p.id} onClick={() => navigate(`/product/${p.id}`)}
                className="group cursor-pointer bg-[#fafafa] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}>
                <div className="aspect-square bg-white flex items-center justify-center p-4 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#1a1a1a] line-clamp-2 leading-snug">{p.title}</p>
                  <p className="text-[12px] font-black text-[#cc0000] mt-1">{p.price || "—"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}>
            <motion.img src={product.images[activeImg]} alt={product.title}
              className="max-w-full max-h-full object-contain rounded-xl"
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} transition={{ duration: 0.3 }} />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewModal onClose={() => setShowReviewModal(false)} onSubmit={r => setReviews(prev => [r, ...prev])} />
        )}
      </AnimatePresence>
    </div>
  );
}
