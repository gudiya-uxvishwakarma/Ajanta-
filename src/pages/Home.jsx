import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../data/products";

const allRelated = [
  { img: "/image copy 15.png", title: "Ajanta Quartz Black Dial Silver Watch", price: "₹ 2,733.00", old_price: "₹ 4,795.00", tag: "SALE -43%" },
  { img: "/image copy 16.png", title: "Ajanta Quartz Silver Analog Watch", price: "₹ 2,733.00", old_price: "₹ 4,795.00", tag: "SALE -43%" },
  { img: "/image copy 17.png", title: "Ajanta Men's Green Dial Silicone Strap", price: "₹ 2,252.00", old_price: "₹ 3,500.00", tag: "SALE -35%" },
  { img: "/image copy 18.png", title: "Ajanta Classic Black Stainless Steel", price: "₹ 2,534.00", old_price: "₹ 2,695.00", tag: "SALE -5%" },
  { img: "/image copy 19.png", title: "Ajanta Men's Black Dial Tan Strap", price: "₹ 2,252.00", old_price: "₹ 3,500.00", tag: "SALE -35%" },
  { img: "/image copy 20.png", title: "Ajanta Grey Mesh Ultra-Slim Watch", price: "₹ 2,516.00", old_price: "₹ 3,500.00", tag: "SALE -28%" },
  { img: "/image copy 21.png", title: "Ajanta Noor Rose Gold Pearl Dial", price: "₹ 2,394.00", old_price: "₹ 3,800.00", tag: "SALE -37%" },
  { img: "/image copy 22.png", title: "Ajanta Noor Silver Bracelet Watch", price: "₹ 2,650.00", old_price: "₹ 4,200.00", tag: "SALE -37%" },
  { img: "/image copy 23.png", title: "Ajanta Rose Gold Square Dial Watch", price: "₹ 2,755.00", old_price: "₹ 4,500.00", tag: "SALE -39%" },
  { img: "/image copy 24.png", title: "Ajanta Noor Champagne Mesh Bracelet", price: "₹ 2,534.00", old_price: "₹ 3,900.00", tag: "SALE -35%" },
];

function ProductDrawer({ product, onClose }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product?.img);

  useEffect(() => {
    if (product) {
      setActiveImg(product.img);
      setQty(1);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;

  const related = allRelated.filter(r => r.img !== product.img).slice(0, 6);
  const thumbs = [product.img, product.hoverImg].filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[100]" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[560px] bg-white z-[101] flex flex-col shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <p className="text-[12px] font-bold tracking-widest uppercase text-gray-500">Product Details</p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-0 flex-1">
          {/* Top — image + details */}
          <div className="flex flex-col md:flex-row gap-0">
            {/* Images */}
            <div className="flex flex-col gap-2 p-4 md:w-[52%]">
              <div className="w-full aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden">
                <img src={activeImg} alt={product.title} className="w-full h-full object-cover object-top" />
              </div>
              {thumbs.length > 1 && (
                <div className="flex gap-2">
                  {thumbs.map((t, i) => (
                    <button key={i} onClick={() => setActiveImg(t)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === t ? "border-[#1a1a1a]" : "border-transparent"}`}>
                      <img src={t} alt="" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 p-5 md:p-6 flex-1">
              {product.tag && (
                <span className="bg-[#cc0000] text-white text-[10px] font-bold px-2.5 py-1 rounded w-fit tracking-wide">{product.tag}</span>
              )}
              <h2 className="text-[15px] font-bold text-[#1a1a1a] leading-snug">{product.title}</h2>

              <div className="flex items-center gap-3">
                <span className="text-[#cc0000] font-black text-[22px]">{product.price}</span>
                {product.old_price && <span className="text-gray-400 text-[14px] line-through">{product.old_price}</span>}
              </div>

              {/* Features */}
              <div className="flex flex-col gap-1.5 text-[12.5px] text-gray-500 border-t border-gray-100 pt-4">
                {[
                  "Quartz Movement — High Accuracy",
                  "Stainless Steel Case & Strap",
                  "Water Resistant up to 30m",
                  "Day & Date Display",
                  "1 Year Manufacturer Warranty",
                ].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-[#cc0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <span className="text-[12px] text-gray-500 font-medium">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold transition-colors">−</button>
                  <span className="w-10 text-center text-[14px] font-semibold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 text-lg font-bold transition-colors">+</button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                {product.soldOut ? (
                  <button disabled className="w-full bg-gray-300 text-gray-500 py-3.5 text-[11px] font-bold tracking-widest uppercase rounded-lg cursor-not-allowed">SOLD OUT</button>
                ) : (
                  <button className="w-full bg-[#1a1a1a] text-white py-3.5 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:bg-[#cc0000] transition-colors">ADD TO CART</button>
                )}
                <button className="w-full border border-gray-200 text-[#1a1a1a] py-3 text-[11px] font-bold tracking-widest uppercase rounded-lg hover:border-gray-400 transition-colors">VIEW FULL DETAILS</button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                {[["🚚", "Free Shipping"], ["↩️", "7 Day Returns"], ["🛡️", "1 Yr Warranty"]].map(([icon, label]) => (
                  <div key={label} className="flex flex-col items-center gap-0.5 flex-1">
                    <span className="text-[16px]">{icon}</span>
                    <span className="text-[10px] text-gray-400 text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t border-gray-100 px-5 py-6">
            <p className="text-[12px] font-bold tracking-widest uppercase text-gray-700 mb-4">You May Also Like</p>
            <div className="grid grid-cols-3 gap-3">
              {related.map((r, i) => (
                <div key={i} className="flex flex-col cursor-pointer group" onClick={() => { setActiveImg(r.img); setQty(1); }}>
                  <div className="w-full aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden mb-2">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <p className="text-[11px] text-gray-700 leading-snug line-clamp-2 mb-1">{r.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#cc0000] font-bold text-[12px]">{r.price}</span>
                    <span className="text-gray-400 text-[10px] line-through">{r.old_price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


const mensProducts = allProducts.filter(p => p.category === "Men's");
const noorProducts = allProducts.filter(p => p.category === "Noor");

function ProductCard({ card, onQuickShop }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col cursor-pointer text-left group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { navigate(`/product/${card.id}`); window.scrollTo(0, 0); }}
    >
      {/* Image Box */}
      <div className="relative w-full aspect-[3/4] bg-[#f5f4f2] overflow-hidden rounded-2xl mb-3 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        {/* Product images with crossfade */}
        <img
          src={card.img}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500"
          style={{ opacity: hovered ? 0 : 1, transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        <img
          src={card.hoverImg || card.img}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />

        {/* Subtle gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* Sale badge */}
        {card.tag && (
          <span className="absolute top-3 left-3 z-10 bg-[#cc0000] text-white text-[9.5px] font-bold px-2 py-1 rounded-full tracking-wide shadow">
            {card.tag}
          </span>
        )}

        {/* Sold out badge */}
        {card.soldOut && (
          <span className="absolute top-3 left-3 z-10 bg-gray-800/80 text-white text-[9.5px] font-bold px-2 py-1 rounded-full tracking-wide">
            SOLD OUT
          </span>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110"
          style={{ opacity: hovered || wishlisted ? 1 : 0 }}
          aria-label="Add to wishlist"
          onClick={(e) => { e.stopPropagation(); setWishlisted(w => !w); }}
        >
          <svg fill={wishlisted ? "#cc0000" : "none"} stroke={wishlisted ? "#cc0000" : "#555"} strokeWidth="1.8" viewBox="0 0 24 24" width="14" height="14">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick shop CTA */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <button
            className="w-full bg-[#1a1a1a]/90 backdrop-blur-sm text-white text-[10.5px] font-bold tracking-widest uppercase py-3 hover:bg-[#cc0000] transition-colors rounded-b-2xl"
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${card.id}`); window.scrollTo(0, 0); }}
          >
            {card.soldOut ? "VIEW DETAILS" : "QUICK SHOP"}
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col gap-1 px-0.5">
        {/* SKU */}
        {card.sku && (
          <p className="text-[10px] text-gray-400 tracking-wide uppercase">{card.sku}</p>
        )}

        {/* Title */}
        <p className="text-[12.5px] font-medium text-gray-800 leading-[1.45] line-clamp-2">{card.title}</p>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[#cc0000] font-bold text-[14px]">{card.price}</span>
          {card.old_price && (
            <span className="text-gray-400 text-[12px] line-through">{card.old_price}</span>
          )}
        </div>

        {/* Star rating (static decorative) */}
        <div className="flex items-center gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 ml-1">(4.0)</span>
        </div>
      </div>
    </div>
  );
}

const heroSlides = [
  {
    src: "/image copy 5.png",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "40px",
    heading: "Timeless Elegance",
    sub: "Crafted for those who value precision and style",
    btn: "SHOP NOW",
  },
  {
    src: "/image copy 6.png",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "40px",
    heading: "New Arrivals 2025",
    sub: "India's oldest timepiece brand since 1971",
    btn: "EXPLORE",
  },
  {
    src: "/image copy 7.png",
    objectFit: "cover",
    objectPosition: "top center",
    borderRadius: "40px",
    heading: "Built to Last",
    sub: "Premium quartz movement. Unmatched durability.",
    btn: "VIEW COLLECTION",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full" style={{ overflow: "hidden" }}>
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transform: i === current ? "translateX(0%)" : i < current ? "translateX(-100%)" : "translateX(100%)",
            transition: "transform 0.7s ease-in-out",
            borderRadius: slide.borderRadius,
            overflow: "hidden",
          }}
        >
          <img
            src={slide.src}
            alt={`Hero slide ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: slide.objectFit,
              objectPosition: slide.objectPosition,
              display: "block",
              borderRadius: slide.borderRadius,
              
            }}
          />
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)" }} />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))} 
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("mens");
  const [drawerProduct, setDrawerProduct] = useState(null);
  const navigate = useNavigate();
  const products = activeTab === "mens" ? mensProducts : noorProducts;

  const lifestyleCards = allProducts.filter(p => p.category === "Women's").slice(0, 5).map(p => ({
    img: p.img,
    title: p.title,
    price: p.price,
    product_thumb: p.img,
    id: p.id,
  }));

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero */}
      <section className="relative h-[75vh] md:h-[85vh] bg-white" style={{overflow: "hidden", borderRadius: "40px", margin: "0 16px"}}>
        <HeroSlider />
      </section>

      {/* Marquee */}
      <div className="w-full bg-[#111] py-5.5 overflow-hidden flex items-center shrink-0">
        <div className="whitespace-nowrap animate-[scroll_25s_linear_infinite] inline-flex items-center gap-12 font-semibold tracking-[0.05em] text-[13px]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-white inline-flex gap-12">
              <span>FREE 7 DAYS RETURN POLICY // ORDERS SHIPS WITHIN-<span className="text-[#facc15] font-bold">24HRS</span></span>
              <span>INDIA'S OLDEST TIMEPIECE BRAND SINCE 1971</span>
            </span>
          ))}
        </div>
      </div>

      {/* Lifestyle Cards */}
      <section className="w-full px-6 md:px-14 pt-16 md:pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {lifestyleCards.map((card, i) => (
            <div key={i} className="relative w-full overflow-hidden rounded-2xl group cursor-pointer bg-[#f2f2f2] shadow-md hover:shadow-2xl transition-all duration-300" style={{ height: "360px" }}>
              {/* Product image — fills full card, no gap */}
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              {/* Bottom info */}
              <div className="absolute bottom-0 w-full flex flex-col rounded-b-2xl overflow-hidden">
                <div className="px-3 pt-2 pb-2.5 flex items-start gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white/70 overflow-hidden bg-white shrink-0 shadow-md">
                    <img src={card.product_thumb} alt="thumb" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="text-white flex flex-col gap-0.5">
                    <p className="text-[10.5px] leading-snug font-medium line-clamp-2">{card.title}</p>
                    <p className="font-bold text-[13px] text-yellow-300">{card.price}</p>
                  </div>
                </div>
                <div className="w-full h-10 flex">
                  <button
                    className="flex-[4] bg-[#700000]/95 text-white font-semibold text-[11.5px] tracking-wide hover:bg-[#8b0000] transition-colors border-r border-[#4a0000]"
                    onClick={() => { navigate(`/product/${card.id}`); window.scrollTo(0,0); }}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="flex-1 bg-[#700000]/95 text-white flex items-center justify-center hover:bg-[#8b0000] transition-colors"
                    onClick={() => { navigate(`/product/${card.id}`); window.scrollTo(0,0); }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Tabs + Product Grid */}
      <section className="w-full px-0">
        {/* Tabs */}
        <div className="flex justify-center items-center gap-10 border-b border-gray-200 mt-10 mb-0 px-4">
          <button
            onClick={() => setActiveTab("mens")}
            className={`text-[15px] font-medium pb-3 px-1 border-b-2 transition-colors ${activeTab === "mens" ? "text-black border-black" : "text-gray-400 border-transparent hover:text-black"}`}
          >
            Men's Collection
          </button>
          <button
            onClick={() => setActiveTab("noor")}
            className={`text-[15px] font-normal pb-3 px-1 border-b-2 transition-colors ${activeTab === "noor" ? "text-black border-black" : "text-gray-400 border-transparent hover:text-black"}`}
          >
            Noor Collection
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 px-6 md:px-14 pt-8">
          {products.map((card, i) => (
            <ProductCard key={i} card={card} onQuickShop={setDrawerProduct} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          <span className="w-2 h-2 rounded-full bg-black" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        {/* All Products Button */}
        <div className="flex justify-center my-8">
          <button className="bg-black text-white hover:bg-gray-800 transition-colors py-3.5 px-10 text-[12px] font-bold tracking-[0.12em] uppercase">
            ALL PRODUCTS
          </button>
        </div>
      </section>

      {/* New Arrival Banner */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/image copy 3.png"
          alt="New Arrival Watch"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Minimal overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 gap-0">

          {/* Main heading */}
          

          {/* Subheading */}
          <p className="text-[13px] md:text-[15px] text-white/60 font-medium tracking-[0.25em] uppercase mb-5">
            Precision · Elegance · Legacy
          </p>

          {/* Description */}
          <p className="text-[15px] md:text-[18px] text-white/85 font-light mb-3 max-w-md leading-relaxed">
            Crafted for the modern gentleman who values timeless style over fleeting trends.
          </p>

          {/* Price teaser */}
          <p className="text-[13px] text-white/50 mb-8 tracking-wide">
            Starting at <span className="text-yellow-400 font-bold text-[16px]">₹ 2,252</span> &nbsp;·&nbsp; Free Shipping &nbsp;·&nbsp; 1 Yr Warranty
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => { navigate("/shop"); window.scrollTo(0, 0); }}
              className="bg-[#cc0000] text-white py-4 px-10 text-[11px] font-black tracking-[0.18em] uppercase hover:bg-[#aa0000] transition-all duration-300 shadow-2xl"
            >
              SHOP NEW ARRIVALS
            </button>
            <button
              onClick={() => { navigate("/mens"); window.scrollTo(0, 0); }}
              className="border border-white/50 text-white py-4 px-8 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
            >
              VIEW MEN'S COLLECTION
            </button>
          </div>

         
         
        </div>
      </section>

      {/* ALL COLLECTIONS */}
      <section className="w-full px-6 md:px-14 py-16">
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-tight text-[#1a1a1a] uppercase">All Collections</h2>
          <p className="text-gray-400 text-[13px] mt-1 tracking-wide">Luxury. Beauty. Elegance.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { img: "/image copy.png", name: "Noor Collection", items: 12 },
            { img: "/image copy 2.png", name: "Rose Gold Series", items: 8 },
            { img: "/image copy 3.png", name: "Alaia Collection", items: 10 },
            { img: "/image copy 4.png", name: "La Luna Collection", items: 9 },
          ].map((col, i) => (
            <div key={i} className="relative group cursor-pointer overflow-hidden">
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img src={col.img} alt={col.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="pt-3 pb-1 text-center">
                <p className="text-[13px] font-bold tracking-widest uppercase text-[#1a1a1a]">{col.name}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{col.items} Items</p>
                <div className="w-8 h-[2px] bg-[#cc0000] mx-auto mt-2 transition-all duration-300 group-hover:w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STACK YOUR TIME */}
      <section className="w-full bg-[#f6f3ee] py-20 overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-14 px-6">
          <p className="text-[#cc0000] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">Exclusive Collection</p>
          <h2 className="text-[28px] md:text-[42px] font-black text-[#1a1a1a] uppercase leading-tight">
            Stack Your Time —{" "}
            <span className="text-[#cc0000]">Define Your Style</span>
          </h2>
          <p className="text-gray-500 text-[13px] mt-4 max-w-xl mx-auto leading-relaxed">
            Thoughtfully curated Watch & Bracelet Sets — where elegance meets simplicity. Each piece feels effortless, feminine, and timeless.
          </p>
        </div>

        {/* Featured Hero — full-bleed left image + right content */}
        <div className="flex flex-col md:flex-row mb-16">
          {/* LEFT — Big Image, no padding, full height */}
          <div className="w-full md:w-[55%] relative" style={{ minHeight: "620px" }}>
            <img
              src="/image copy 21.png"
              alt="Stack Your Time Featured"
              className="absolute inset-0 w-full h-full object-contain object-center bg-[#f6f3ee]"
            />
            {/* right-edge fade into light panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f6f3ee] hidden md:block" />
            <span className="absolute top-6 left-6 bg-[#cc0000] text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg z-10">
              SALE -40%
            </span>
          </div>

          {/* RIGHT — Content panel */}
          <div className="w-full md:w-[45%] bg-[#f6f3ee] flex flex-col justify-center px-8 md:px-14 py-12 gap-6">
            <p className="text-[10px] text-gray-400 tracking-[0.25em] uppercase">AWC127ESL/1 · Watch & Bracelet Set</p>
            <h3 className="text-[22px] md:text-[28px] font-black text-[#1a1a1a] leading-snug">
              Ajanta Quartz Two Tone Women's Analog Watch
              <span className="text-gray-500 font-light text-[15px] block mt-2">
                Silver Dial · Premium Metal Bracelet · Square Design
              </span>
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-400 text-[11px] ml-1">4.0 · 38 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-[36px] font-black text-[#1a1a1a] leading-none">₹ 2,815</span>
              <span className="text-gray-400 text-[14px] line-through mb-1">₹ 4,700.00</span>
              <span className="text-[#cc0000] text-[12px] font-bold mb-1">Save ₹1,885</span>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2.5">
              {[
                "Quartz Movement — High Accuracy",
                "Two-Tone Premium Metal Bracelet",
                "Elegant Square Dial Design",
                "1 Year Manufacturer Warranty",
              ].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[12px] text-gray-600">
                  <svg className="w-3.5 h-3.5 text-[#cc0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 py-4 border-t border-gray-200">
              {[["🚚", "Free Shipping"], ["↩️", "7 Day Return"], ["🛡️", "1 Yr Warranty"]].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="text-[14px]">{icon}</span>
                  <span className="text-[10px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => { navigate("/product/13"); window.scrollTo(0, 0); }}
                className="flex-1 bg-[#cc0000] text-white py-3.5 text-[11px] font-black tracking-widest uppercase rounded-lg hover:bg-[#aa0000] transition-colors"
              >
                SHOP NOW
              </button>
              <button
                onClick={() => { navigate("/product/13"); window.scrollTo(0, 0); }}
                className="px-5 border border-gray-300 text-[#1a1a1a] rounded-lg hover:border-gray-500 transition-colors text-[11px] font-bold tracking-wide"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>

        {/* 5 product cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 md:px-14">
          {[
            { id: 14, img: "/image copy 22.png", hoverImg: "/image copy 23.png", name: "Rose Gold Black Dial Square Watch", sku: "AWC127ESL/2", price: "₹ 2,586.00", old: "₹ 4,700.00", tag: "SALE -45%" },
            { id: 15, img: "/image copy 23.png", hoverImg: "/image copy 24.png", name: "Blue Crystal Studded Bracelet Watch", sku: "AWC126ESL/1", price: "₹ 2,756.00", old: "₹ 4,700.00", tag: "SALE -41%" },
            { id: 16, img: "/image copy 24.png", hoverImg: "/image copy 25.png", name: "Green Dial Rose Gold Square Watch", sku: "AWC127ESL/3", price: "₹ 2,755.00", old: "₹ 4,700.00", tag: "SALE -41%" },
            { id: 17, img: "/image copy 25.png", hoverImg: "/image copy 26.png", name: "Silver Crystal Studded Bracelet Watch", sku: "AWC126ESL/2", price: "₹ 2,756.00", old: "₹ 4,700.00", tag: "SALE -41%" },
            { id: 18, img: "/image copy 26.png", hoverImg: "/image copy 25.png", name: "Brown Dial Square Bracelet Watch", sku: "AWC127FSL/4", price: "₹ 2,720.00", old: "₹ 4,700.00", tag: "SALE -42%" },
          ].map((p) => (
            <div
              key={p.id}
              className="flex flex-col cursor-pointer group"
              onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}
            >
              <div className="relative w-full aspect-[3/4] bg-[#f0ede8] overflow-hidden mb-3 rounded-xl border border-gray-100">
                <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500" />
                <img src={p.hoverImg} alt="" className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <span className="absolute top-2.5 left-2.5 bg-[#cc0000] text-white text-[9px] font-black px-2 py-1 rounded-full tracking-wide z-10">{p.tag}</span>
                <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase py-2.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  QUICK VIEW
                </div>
              </div>
              <p className="text-[9.5px] text-gray-400 tracking-widest uppercase mb-1">{p.sku}</p>
              <p className="text-[12px] font-semibold text-[#1a1a1a] leading-snug mb-2 line-clamp-2">{p.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#cc0000] font-black text-[13px]">{p.price}</span>
                <span className="text-gray-600 text-[11px] line-through">{p.old}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEAL DEALS */}
      <section className="w-full px-6 md:px-14 py-16">
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-tight text-[#1a1a1a] uppercase">Steal Deals</h2>
          <p className="text-gray-400 text-[13px] mt-1">Limited time offers — grab them before they're gone.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {[
            { img: "/image copy 17.png", name: "Ajanta Rose Gold Women's Quartz Watch With Green Dial, Roman Numerals & Stainless Steel Bracelet", sku: "AWC119ESL/8", price: "₹ 2,374.00", old: "₹ 4,500.00", tag: "SALE -47%" },
            { img: "/image copy 18.png", name: "Ajanta Quartz Green Dial Women's Rose-Gold Bracelet Watch With Crystal Accents", sku: "AWC121ESL/3", price: "₹ 2,347.00", old: "₹ 4,200.00", tag: "SALE -44%" },
            { img: "/image copy 19.png", name: "Ajanta Quartz Green Analog Women's Watch — Stylish Stainless Strap With Premium Roman Dial Design", sku: "AWC116ESL/6", price: "₹ 2,364.00", old: "₹ 4,200.00", tag: "SALE -43%" },
            { img: "/image copy 20.png", name: "Ajanta Quartz Rose Gold Women's Watch With Purple Dial & Matching Bracelet — Crystal Studded Analog Wrist Watch", sku: "AWC126ESL/4", price: "₹ 2,756.00", old: "₹ 4,700.00", tag: "SALE -41%" },
            { img: "/image copy 15.png", name: "Ajanta Black Dial Men's Day & Date Watch — Premium Stainless Steel Quartz Model", sku: "AWC502-1ISG/BLS/B/BL", price: "₹ 2,534.00", old: "₹ 2,695.00", tag: "SALE -5%" },
          ].map((p, i) => (
            <div key={i} className="flex flex-col cursor-pointer group">
              <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-3 rounded-lg">
                <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2 left-2 bg-white text-[#cc0000] text-[10px] font-bold px-2 py-0.5 border border-gray-100 z-10">{p.tag}</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-0.5">{p.sku}</p>
              <p className="text-[12px] font-medium text-gray-800 leading-snug mb-1.5 line-clamp-3">{p.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[11px] line-through">{p.old}</span>
                <span className="text-[#cc0000] font-bold text-[13px]">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Banner */}
      <section className="relative w-full h-[420px] overflow-hidden cursor-pointer group">
        <img src="/image copy 7.png" alt="Follow on Instagram" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="border border-white text-white text-[12px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-white hover:text-black transition-all duration-300">
            FOLLOW US ON INSTAGRAM
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Floating Chat */}
      <div className="fixed bottom-6 left-6 z-50">
        <button className="relative bg-black text-white rounded-xl py-2.5 px-4 font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform text-[15px]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          Chat
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">1</span>
        </button>
      </div>

      {/* Product Quick View Drawer */}
      <ProductDrawer product={drawerProduct} onClose={() => setDrawerProduct(null)} />

    </div>
  );
}
