import { useSearchParams } from "react-router-dom";
import { allProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

const womensProducts = allProducts.filter(p => p.category === "Women's" || p.category === "Noor");

const filterMap = {
  watches: womensProducts,
  noor: allProducts.filter(p => p.category === "Noor"),
  gifts: womensProducts.slice(0, 4),
};

export default function Womens() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter");

  const products = filterMap[urlFilter] || womensProducts;

  const sectionTitle = urlFilter === "noor"
    ? "Noor Collection"
    : urlFilter === "gifts"
    ? "Gifts"
    : "Watches";

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
        <img src="/image copy 2.png" alt="Women's Collection" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20">
          <p className="text-white/70 text-[12px] tracking-widest uppercase mb-2">Ajanta Quartz</p>
          <h1 className="text-white text-[36px] md:text-[52px] font-black tracking-tight leading-tight">
            Women's<br />{sectionTitle}
          </h1>
          <p className="text-white/80 text-[14px] mt-3 max-w-sm">Elegantly crafted timepieces for the modern woman.</p>
        </div>
      </div>

      <div className="w-full px-6 md:px-14 py-10">
        {/* Stats bar */}
        <div className="flex gap-8 mb-10 pb-8 border-b border-gray-100">
          {[[String(products.length), "Styles Available"], ["Free", "Shipping above ₹999"], ["7 Days", "Easy Returns"]].map(([val, label]) => (
            <div key={label} className="flex flex-col">
              <span className="text-[22px] font-black text-[#cc0000]">{val}</span>
              <span className="text-[12px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
