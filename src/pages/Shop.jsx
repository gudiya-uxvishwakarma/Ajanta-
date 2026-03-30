import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { allProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

// New Arrivals: last 6 products (highest ids), Best Sellers: first 6
const newArrivalIds = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 6).map(p => p.id);
const bestSellerIds = [1, 3, 5, 7, 9, 11];

const categories = ["All", "Men's", "Women's", "Noor"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter"); // "new-arrivals" | "best-sellers" | null
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  // Apply URL filter first, then category filter
  let filtered = allProducts;
  if (urlFilter === "new-arrivals") {
    filtered = allProducts.filter(p => newArrivalIds.includes(p.id));
  } else if (urlFilter === "best-sellers") {
    filtered = allProducts.filter(p => bestSellerIds.includes(p.id));
  }

  if (activeCategory !== "All") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  const pageTitle = urlFilter === "new-arrivals"
    ? "New Arrivals"
    : urlFilter === "best-sellers"
    ? "Best Sellers"
    : "All Products";

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full bg-[#f8f8f8] border-b border-gray-200 py-10 px-6 md:px-14 text-center">
        <p className="text-[12px] text-gray-400 tracking-widest uppercase mb-1">Ajanta Quartz</p>
        <h1 className="text-[32px] md:text-[42px] font-black text-[#1a1a1a] tracking-tight">{pageTitle}</h1>
        <p className="text-gray-500 text-[14px] mt-2">India's finest timepieces since 1971</p>
      </div>

      <div className="w-full px-6 md:px-14 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-[12px] font-semibold tracking-wide rounded-full border transition-all ${activeCategory === cat ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-500">{filtered.length} products</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-300 text-[12px] px-3 py-1.5 rounded focus:outline-none focus:border-gray-500">
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
