import { useSearchParams } from "react-router-dom";
import { allProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

const mensProducts = allProducts.filter(p => p.category === "Men's");

// For demo: Watches = all mens, Accessories = first 3, Gifts = last 3
const filterMap = {
  watches: mensProducts,
  accessories: mensProducts.slice(0, 3),
  gifts: mensProducts.slice(-3),
};

export default function Mens() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter"); // "watches" | "accessories" | "gifts" | null

  const products = filterMap[urlFilter] || mensProducts;

  const sectionTitle = urlFilter === "accessories"
    ? "Accessories"
    : urlFilter === "gifts"
    ? "Gifts"
    : "Watches";

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
        <img src="/image copy 5.png" alt="Men's Collection" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20">
          <p className="text-white/70 text-[12px] tracking-widest uppercase mb-2">Ajanta Quartz</p>
          <h1 className="text-white text-[36px] md:text-[52px] font-black tracking-tight leading-tight">
            Men's<br />{sectionTitle}
          </h1>
          <p className="text-white/80 text-[14px] mt-3 max-w-sm">Precision-crafted timepieces for the modern man.</p>
        </div>
      </div>
      <div className="w-full px-6 md:px-14 py-10">
        <div className="flex gap-8 mb-10 pb-8 border-b border-gray-100">
          {[[String(products.length), "Styles Available"], ["Free", "Shipping above ₹999"], ["7 Days", "Easy Returns"]].map(([val, label]) => (
            <div key={label} className="flex flex-col">
              <span className="text-[22px] font-black text-[#cc0000]">{val}</span>
              <span className="text-[12px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
