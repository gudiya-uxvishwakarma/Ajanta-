import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/products";
import { addToCart, updateQuantity } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { MdLocalShipping, MdLock, MdVerifiedUser, MdReplay, MdTrendingUp, MdRemoveRedEye, MdStar, MdStarBorder, MdFavoriteBorder, MdFavorite, MdAdd, MdRemove, MdShoppingCart, MdFlashOn } from "react-icons/md";
import { FaTruck, FaShieldAlt, FaUndo, FaAward } from "react-icons/fa";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import SEOHead from "../components/SEOHead";

const initialReviews = [
  { name: "Rahul Sharma", date: "08/05/2025", rating: 4, text: "Best gift! Look great, value for money, quality best." },
  { name: "Priya Mehta",  date: "07/31/2025", rating: 5, text: "Good. Nice product. Very elegant and stylish watch." },
  { name: "Anita Halder", date: "06/15/2025", rating: 4, text: "Beautiful watch. Loved the design and finish. Highly recommend." },
];

function Stars({ rating, size = "w-5 h-5" }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        i <= rating ? (
          <MdStar key={i} className={`${size} text-amber-400`} />
        ) : (
          <MdStarBorder key={i} className={`${size} text-gray-300`} />
        )
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
  const dispatch = useDispatch();

  // Try static data first, then fetch from API
  const staticProduct = allProducts.find(p => p.id === Number(id));
  const [product, setProduct] = useState(staticProduct || null);
  const [loadingProduct, setLoadingProduct] = useState(!staticProduct);

  // Fetch from API if not found in static data
  useEffect(() => {
    if (staticProduct) return; // already have it

    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        const response = await axios.get(`${API_ENDPOINTS.publicProducts}`, {
          params: { search: id, limit: 1 }
        });
        // Try to find by _id
        const allRes = await axios.get(`https://ajantaworld.in/api/admin/getPublicProducts?limit=200`);
        const found = allRes.data.products?.find(p => p._id === id);
        if (found) {
          // Normalize API product to match ProductDetail expectations
          const specsObj = found.specs instanceof Map
            ? Object.fromEntries(found.specs)
            : (found.specs || {});

          setProduct({
            id: found._id,
            title: found.productname,
            sku: found.sku || found.hsn,
            price: `₹ ${found.price}`,
            old_price: found.old_price ? `₹ ${found.old_price}` : null,
            tag: found.tag || null,
            soldOut: found.soldOut || false,
            category: found.producttype,
            colour: found.colour || null,
            description: found.description || "",
            features: Array.isArray(found.features) ? found.features : [],
            specs: specsObj,
            images: found.images?.length
              ? found.images.map(img => `https://ajantaworld.in/product/${img}`)
              : [`https://ajantaworld.in/product/${found.Image1}`],
            img: `https://ajantaworld.in/product/${found.Image1}`,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id, staticProduct]);
  
  // Redux selectors
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showZoomPreview, setShowZoomPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if product is in cart
  const cartItem = cartItems.find(item => item.id === product?.id);
  const isInCart = !!cartItem;
  
  // Check if product is in wishlist
  const isWishlisted = wishlistItems.some(item => item.id === product?.id);

  if (loadingProduct) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#cc0000]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <p className="text-gray-400 text-sm tracking-widest uppercase">Product not found</p>
      <button onClick={() => navigate("/")} className="bg-[#1a1a1a] text-white px-8 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#cc0000] transition-colors rounded">Back to Home</button>
    </div>
  );

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, qty }));
  };
  
  const handleBuyNow = () => { 
    dispatch(addToCart({ product, qty })); 
    navigate("/checkout"); 
  };
  
  const handleIncreaseQty = () => {
    if (isInCart) {
      dispatch(updateQuantity({ id: product.id, qty: cartItem.qty + 1 }));
    }
  };
  
  const handleDecreaseQty = () => {
    if (isInCart && cartItem.qty > 1) {
      dispatch(updateQuantity({ id: product.id, qty: cartItem.qty - 1 }));
    } else if (isInCart && cartItem.qty === 1) {
      dispatch(updateQuantity({ id: product.id, qty: 0 })); // This will remove from cart
    }
  };
  
  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Store mouse position as percentage
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    setMousePosition({ x: xPercent, y: yPercent });
  };

  const accordionItems = [
    { title: "Product Description", content: product.description },
    product.features?.length && { title: "Key Features", content: null, features: product.features },
    { title: "Shipping Information", content: "Free shipping on all orders above ₹999. Orders dispatched within 24 hours. Estimated delivery: 3–5 business days across India." },
    product.specs && { title: "Specifications", content: null, specs: product.specs },
    { title: "Care Guide", content: "Keep away from water and moisture. Store in a cool, dry place. Do not overcharge beyond recommended charging time." },
  ].filter(Boolean);

  return (
    <div className="w-full bg-white min-h-screen">
      <SEOHead
        title={`${product.title} | Ajanta Associates`}
        description={product.description
          ? `${product.description.replace(/<[^>]+>/g, '').slice(0, 150)}…`
          : `Buy ${product.title} online at Ajanta Associates, Bangalore. Best price, fast delivery across India.`}
        keywords={`${product.title}, ${product.category}, Ajanta ${product.category}, buy ${product.category} Bangalore`}
        canonical={`https://ajantaworld.in/product/${product.id}`}
        image={product.img}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "image": product.img,
          "description": product.description?.replace(/<[^>]+>/g, '') || product.title,
          "sku": product.sku,
          "brand": { "@type": "Brand", "name": "Ajanta" },
          "offers": {
            "@type": "Offer",
            "url": `https://ajantaworld.in/product/${product.id}`,
            "priceCurrency": "INR",
            "price": String(product.price || "").replace(/[^\d.]/g, '') || "0",
            "availability": product.soldOut
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "Ajanta Associates" }
          }
        }}
      />

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
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 relative">

        {/* LEFT — Image Gallery */}
        <motion.div className="lg:sticky lg:top-6 lg:self-start relative"
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
          
          {/* Zoom Preview Panel - Flipkart Style */}
          <AnimatePresence>
            {showZoomPreview && (
              <motion.div 
                className="hidden lg:block absolute left-[calc(100%+2rem)] top-0 w-[550px] h-[550px] bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-hidden pointer-events-none"
                style={{ zIndex: 100 }}
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${product.images[activeImg]})`,
                      backgroundSize: '250%',
                      backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  2.5× ZOOM
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex gap-4">
            {/* Thumbnails - Vertical */}
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 w-[70px]">
                {product.images.map((img, i) => (
                  <motion.button key={i} onClick={() => setActiveImg(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`w-[70px] h-[70px] rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white flex-shrink-0 ${activeImg === i ? "border-[#cc0000] shadow-md ring-2 ring-[#cc0000]/20" : "border-gray-200 hover:border-gray-300"}`}>
                    <img src={img} alt="" className="w-full h-full object-contain p-1.5" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Main image container with zoom */}
            <div className="flex-1">
              <div 
                className="relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-crosshair"
                onMouseMove={handleImageMouseMove}
                onMouseEnter={() => setShowZoomPreview(true)}
                onMouseLeave={() => setShowZoomPreview(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImg} 
                    src={product.images[activeImg]} 
                    alt={product.title}
                    className="w-full h-full object-contain select-none pointer-events-none"
                    style={{ padding: '24px' }}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    draggable={false}
                  />
                </AnimatePresence>
                
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-[#cc0000] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg z-10">{product.tag}</div>
                )}
                
                {product.soldOut && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl z-10">
                    <span className="text-[13px] font-black tracking-widest uppercase text-gray-400 border-2 border-gray-300 px-6 py-2 rounded-full bg-white">Sold Out</span>
                  </div>
                )}

                {/* Zoom Lens Overlay */}
                {showZoomPreview && (
                  <div 
                    className="absolute w-[100px] h-[100px] border-2 border-[#cc0000] pointer-events-none z-20 bg-white/10"
                    style={{
                      left: `${mousePosition.x}%`,
                      top: `${mousePosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 0 9999px rgba(0,0,0,0.3)'
                    }}
                  />
                )}

                {/* Zoom indicator badge */}
                {showZoomPreview && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    HOVER TO ZOOM
                  </div>
                )}
              </div>

              {/* Trust badges below image */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { icon: <MdLocalShipping className="text-[#cc0000] text-lg" />, label: "Free Ship" },
                  { icon: <MdLock className="text-[#cc0000] text-lg" />, label: "Secure" },
                  { icon: <MdVerifiedUser className="text-[#cc0000] text-lg" />, label: "Warranty" },
                  { icon: <MdReplay className="text-[#cc0000] text-lg" />, label: "Returns" },
                ].map(b => (
                  <div key={b.label} className="flex flex-col items-center gap-1 bg-[#fafafa] rounded-lg py-2.5 px-2 text-center border border-gray-100">
                    {b.icon}
                    <span className="text-[8px] text-gray-600 font-semibold leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Product Info */}
        <motion.div className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}>

          <div className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.15em] uppercase">
            <span className="text-[#cc0000] bg-[#cc0000]/10 px-4 py-2 rounded-full border border-[#cc0000]/30 flex items-center gap-2">
              <FaAward className="text-[14px]" />
              Oreva Group
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 font-bold">Since 1983</span>
          </div>

          <div>
            <h1 className="text-[28px] md:text-[36px] font-black text-[#1a1a1a] leading-[1.2] tracking-tight mb-3">{product.title}</h1>
            <p className="text-[13px] text-gray-500 tracking-wider font-semibold uppercase">SKU: <span className="text-gray-700 font-bold">{product.sku}</span></p>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Stars rating={Math.round(Number(avgRating))} size="w-5 h-5" />
              <span className="text-[16px] font-black text-[#1a1a1a]">{avgRating}</span>
            </div>
            <span className="text-[13px] text-gray-400 font-medium">({reviews.length} reviews)</span>
            <button onClick={() => setShowReviewModal(true)} className="ml-auto text-[12px] text-[#cc0000] font-bold hover:underline tracking-wide">
              Write Review
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[44px] md:text-[52px] font-black text-[#1a1a1a] tracking-tight leading-none">{product.price}</span>
            {product.old_price && (
              <>
                <span className="text-[26px] text-gray-400 line-through font-bold">{product.old_price}</span>
                {product.tag && (
                  <span className="bg-green-50 text-green-700 text-[15px] font-black px-4 py-2.5 rounded-full border-2 border-green-200 tracking-wide flex items-center gap-2">
                    <MdFlashOn className="text-[20px]" />
                    {product.tag}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Social proof */}
          <div className="flex flex-col gap-3.5 bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-[14px] text-[#cc0000] font-bold">
              <MdTrendingUp className="text-[22px] flex-shrink-0" />
              <span className="leading-snug">144+ people ordered this in the last 7 days</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] text-gray-700 font-semibold">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="leading-snug"><strong className="text-gray-900 font-black">13</strong> customers viewing right now</span>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Category / colour */}
          <div className="flex items-center gap-6 text-[15px] text-gray-600 font-medium">
            <span className="flex items-center gap-2">
              <span className="text-gray-500 font-normal">Category:</span>
              <strong className="text-[#1a1a1a] font-bold">{product.category}</strong>
            </span>
            {product.colour && (
              <span className="flex items-center gap-2">
                <span className="text-gray-500 font-normal">Colour:</span>
                <strong className="text-[#1a1a1a] font-bold">{product.colour}</strong>
              </span>
            )}
          </div>

          {/* Delivery */}
          <div className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
            <FaTruck className="text-[28px] text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[16px] font-black text-gray-900 mb-1">Estimated Delivery</p>
              <p className="text-[14px] text-gray-700 font-medium leading-relaxed">3–5 business days · Free shipping on orders above ₹999</p>
            </div>
          </div>

          {/* Action Buttons - All in One Row */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            {/* Add to Cart Button - Shows quantity controls when in cart */}
            {isInCart ? (
              <motion.div 
                className="h-[50px] rounded-xl bg-[#1a1a1a] text-white flex items-center justify-between px-2 shadow-sm"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <button onClick={handleDecreaseQty} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors">
                  <MdRemove className="text-[18px]" />
                </button>
                <span className="text-[16px] font-black">{cartItem.qty}</span>
                <button onClick={handleIncreaseQty} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors">
                  <MdAdd className="text-[18px]" />
                </button>
              </motion.div>
            ) : (
              <motion.button onClick={handleAddToCart} whileTap={{ scale: 0.97 }}
                className="h-[50px] text-[12px] font-bold tracking-wide uppercase rounded-xl bg-[#1a1a1a] text-white hover:bg-[#333] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md">
                <MdShoppingCart className="text-[18px]" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Cart</span>
              </motion.button>
            )}

            {/* Buy Now Button */}
            <motion.button onClick={handleBuyNow} whileTap={{ scale: 0.97 }}
              className="h-[50px] text-[12px] font-bold tracking-wide uppercase rounded-xl bg-[#cc0000] text-white hover:bg-[#b30000] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md">
              <MdFlashOn className="text-[18px]" />
              <span className="hidden sm:inline">Buy Now</span>
              <span className="sm:hidden">Buy</span>
            </motion.button>

            {/* Wishlist Button */}
            <motion.button onClick={handleToggleWishlist} whileTap={{ scale: 0.97 }}
              className="h-[50px] text-[12px] font-bold tracking-wide uppercase rounded-xl border border-gray-300 text-gray-700 hover:text-[#cc0000] hover:border-[#cc0000] hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-1.5">
              {isWishlisted ? (
                <MdFavorite className="text-[20px] text-[#cc0000]" />
              ) : (
                <MdFavoriteBorder className="text-[20px]" />
              )}
              <span className="hidden sm:inline">{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
            </motion.button>
          </div>

          <div className="h-px bg-gray-200 my-2" />

          {/* Accordion */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-200">
            {accordionItems.map((item, i) => (
              <div key={i}>
                <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-[12px] font-bold tracking-[0.12em] uppercase text-gray-700 hover:text-[#cc0000] transition-colors bg-white hover:bg-gray-50">
                  {item.title}
                  <motion.svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: openAccordion === i ? 45 : 0 }} transition={{ duration: 0.25 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="px-6 pb-5 pt-2 bg-gray-50">
                        {item.features ? (
                          <ul className="flex flex-col gap-3">
                            {item.features.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-3 text-[13px] text-gray-700 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] mt-2 shrink-0" />
                                <span className="font-medium">{f}</span>
                              </li>
                            ))}
                          </ul>
                        ) : item.specs ? (
                          <div className="grid grid-cols-1 gap-3">
                            {Object.entries(item.specs).map(([k, v]) => (
                              <div key={k} className="flex gap-4 text-[13px]">
                                <span className="text-gray-500 capitalize w-44 shrink-0 font-medium">{k.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-gray-800 font-semibold">{v}</span>
                              </div>
                            ))}
                            {product.colour && <div className="flex gap-4 text-[13px]"><span className="text-gray-500 w-44 shrink-0 font-medium">Colour</span><span className="text-gray-800 font-semibold">{product.colour}</span></div>}
                          </div>
                        ) : item.title === "Product Description" ? (
                          <div
                            className="text-[13px] text-gray-700 leading-relaxed font-medium prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        ) : (
                          <p className="text-[13px] text-gray-700 leading-relaxed font-medium">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Payment badges */}
          <div className="border border-gray-200 rounded-2xl p-5 text-center bg-gray-50">
            <p className="text-[11px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">Guaranteed Safe Checkout</p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              {["VISA", "Mastercard", "G Pay", "RuPay", "Paytm", "PhonePe", "UPI"].map(p => (
                <span key={p} className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-600">{p}</span>
              ))}
            </div>
          </div>
        </motion.div>

        </div>
      </div>

      {/* Reviews */}
      <motion.div className="w-full bg-gray-50 border-t border-gray-200 mt-4"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-12">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-[22px] font-black text-[#1a1a1a] tracking-tight mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-3 mt-2">
                <Stars rating={Math.round(Number(avgRating))} />
                <span className="text-[14px] font-black text-[#1a1a1a]">{avgRating}</span>
                <span className="text-[12px] text-gray-500 font-medium">· {reviews.length} reviews</span>
              </div>
            </div>
            <button onClick={() => setShowReviewModal(true)}
              className="bg-[#1a1a1a] text-white px-6 py-3 text-[12px] font-bold tracking-[0.12em] uppercase rounded-xl hover:bg-[#cc0000] transition-colors">
              Write a Review
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[14px] font-black shrink-0">{r.name[0]}</div>
                  <div>
                    <p className="text-[13px] font-bold text-[#1a1a1a]">{r.name}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size="w-4 h-4" />
                <p className="text-[13px] text-gray-700 mt-3 leading-relaxed font-medium">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Related Products */}
      {related.length > 0 && (
        <motion.div className="max-w-7xl mx-auto px-6 md:px-14 py-12"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-[20px] font-black text-[#1a1a1a] tracking-tight mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <motion.div key={p.id} onClick={() => navigate(`/product/${p.id}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#cc0000]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}>
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-[12px] font-bold text-[#1a1a1a] line-clamp-2 leading-snug mb-2">{p.title}</p>
                  <p className="text-[14px] font-black text-[#cc0000]">{p.price || "—"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewModal onClose={() => setShowReviewModal(false)} onSubmit={r => setReviews(prev => [r, ...prev])} />
        )}
      </AnimatePresence>
    </div>
  );
}
