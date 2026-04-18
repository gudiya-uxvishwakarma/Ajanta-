import { allProducts } from "../data/products";
import { posts } from "../data/blogPosts";

const stats = [
  { label: "Total Products", value: allProducts.length, color: "bg-blue-500" },
  { label: "Blog Posts", value: posts.length, color: "bg-purple-500" },
  { label: "Categories", value: [...new Set(allProducts.map(p => p.category))].length, color: "bg-amber-500" },
  { label: "In Stock", value: allProducts.filter(p => !p.soldOut).length, color: "bg-green-500" },
];

export default function Dashboard() {
  const categories = [...new Set(allProducts.map(p => p.category))];
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: allProducts.filter(p => p.category === cat).length,
  }));

  return (
    <div>
      <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-100 p-5 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${s.color} mb-3`} />
            <p className="text-2xl font-black text-[#1a1a1a]">{s.value}</p>
            <p className="text-[11px] text-gray-400 tracking-widest uppercase mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="bg-white border border-gray-100 shadow-sm p-6">
        <h2 className="text-[12px] font-black tracking-widest uppercase text-gray-500 mb-4">Products by Category</h2>
        <div className="flex flex-col gap-3">
          {categoryCounts.map(c => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-sm text-[#1a1a1a] w-40 truncate">{c.name}</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#cf2127] h-2 rounded-full"
                  style={{ width: `${(c.count / allProducts.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-6 text-right">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
