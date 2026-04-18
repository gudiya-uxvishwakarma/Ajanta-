import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { allProducts } from "../data/products";
import { LifestyleCard } from "../components/LifestyleCards";

const categories = ["All", "Hand Torch", "Emergency Light", "Clock", "Clock Accessory", "Alarm Clock", "Calculator", "LED", "Home Appliance", "Electric Mosquito Racket", "Room Heater", "Iron", "Electric Kettle", "Kitchen Appliance"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter") || null;
  const urlSearch = searchParams.get("search") || null;
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  useEffect(() => {
    setActiveCategory("All");
  }, [urlFilter]);

  const urlCategoryMap = {
    "hand-torch":        ["Hand Torch"],
    "emergency-light":   ["Emergency Light"],
    "clock":             ["Clock", "Clock Accessory"],
    "alarm-clock":       ["Alarm Clock"],
    "calculator":        ["Calculator"],
    "led":               ["LED"],
    "home-appliance":    ["Home Appliance"],
    "mosquito-racket":   ["Electric Mosquito Racket"],
    "room-heater":       ["Room Heater"],
    "iron":              ["Iron"],
    "electric-kettle":   ["Electric Kettle"],
    "kitchen-appliance": ["Kitchen Appliance"],
  };

  let filtered = allProducts;

  // URL search query
  if (urlSearch) {
    const q = urlSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.sku || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  }

  // URL filter
  if (urlFilter && urlCategoryMap[urlFilter]) {
    filtered = filtered.filter(p => urlCategoryMap[urlFilter].includes(p.category));
  }

  // Active category pill (if still shown)
  if (activeCategory !== "All") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Sort
  if (sortBy === "Price: Low to High") {
    filtered = [...filtered].sort((a, b) => parseInt((a.price || "0").replace(/[^\d]/g, "")) - parseInt((b.price || "0").replace(/[^\d]/g, "")));
  } else if (sortBy === "Price: High to Low") {
    filtered = [...filtered].sort((a, b) => parseInt((b.price || "0").replace(/[^\d]/g, "")) - parseInt((a.price || "0").replace(/[^\d]/g, "")));
  }

  const pageTitle = urlSearch ? `Search: "${urlSearch}"`
    : urlFilter === "hand-torch"        ? "Hand Torches"
    : urlFilter === "emergency-light"   ? "Emergency Lights"
    : urlFilter === "clock"             ? "Clocks"
    : urlFilter === "alarm-clock"       ? "Alarm Clocks"
    : urlFilter === "calculator"        ? "Calculators"
    : urlFilter === "led"               ? "LED Lighting"
    : urlFilter === "home-appliance"    ? "Home Appliances"
    : urlFilter === "mosquito-racket"   ? "Electric Mosquito Rackets"
    : urlFilter === "room-heater"       ? "Room Heaters"
    : urlFilter === "iron"              ? "Irons"
    : urlFilter === "electric-kettle"   ? "Electric Kettles"
    : urlFilter === "kitchen-appliance" ? "Kitchen Appliances"
    : "All Products";

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full bg-[#f8f8f8] border-b border-gray-200 py-10 px-6 md:px-14 text-center">
        <p className="text-[12px] text-gray-400 tracking-widest uppercase mb-1">Oreva Group</p>
        <h1 className="text-[32px] md:text-[42px] font-black text-[#1a1a1a] tracking-tight">{pageTitle}</h1>
        <p className="text-gray-500 text-[14px] mt-2">Trusted lighting solutions for every home</p>
      </div>

      <div className="w-full px-6 md:px-14 py-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-8 pb-5 border-b border-gray-100">
          {/* Category pills - hidden, filtering handled via URL */}

          {/* Right: count + sort */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
              <span className="text-[#1a1a1a] font-bold">{filtered.length}</span> products
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-[11px] font-semibold text-gray-600 pl-3 pr-8 py-1.5 rounded-full focus:outline-none focus:border-[#cf2127] cursor-pointer hover:border-gray-400 transition-colors"
              >
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-10">
          {filtered.map(p => <LifestyleCard key={p.id} card={p} />)}
        </div>
      </div>
    </div>
  );
}
