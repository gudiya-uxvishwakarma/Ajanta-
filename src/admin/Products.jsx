import { useState } from "react";
import { allProducts } from "../data/products";

const EMPTY = {
  title: "", sku: "", price: "", category: "", colour: "",
  description: "", soldOut: false, tag: "", img: "",
};

const PER_PAGE = 10;

export default function Products() {
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [page, setPage] = useState(1);

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchCat = catFilter === "All" || p.category === catFilter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleCat = (val) => { setCatFilter(val); setPage(1); };

  const handleSave = () => {
    if (isNew) {
      setProducts(prev => [...prev, { ...editing, id: Date.now() }]);
    } else {
      setProducts(prev => prev.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this product?");
    if (ok) setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setEditing(null); setIsNew(false); }}
            className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase"
          >
            ← Back
          </button>
          <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">
            {isNew ? "Add Product" : "Edit Product"}
          </h1>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {[
            ["Title", "title"],
            ["SKU", "sku"],
            ["Price (e.g. ₹ 735)", "price"],
            ["Category", "category"],
            ["Colour", "colour"],
            ["Tag", "tag"],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">
                {label}
              </label>
              <input
                type="text"
                value={editing[key] || ""}
                onChange={e => setEditing(p => ({ ...p, [key]: e.target.value }))}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
              />
            </div>
          ))}

          {/* Image upload */}
          {[["Product Image", "img"]].map(([label, key]) => (
            <div key={key}>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">{label}</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="border border-gray-200 px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-gray-600 hover:border-[#cf2127] hover:text-[#cf2127] transition-colors">
                  Choose Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setEditing(p => ({ ...p, [key]: URL.createObjectURL(file) }));
                  }}
                />
              </label>
              {editing[key] && (
                <img src={editing[key]} alt={label} className="mt-2 w-20 h-20 object-contain border border-gray-100 rounded bg-gray-50 p-1" />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={editing.description || ""}
              onChange={e => setEditing(p => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127] resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="soldOut"
              checked={editing.soldOut || false}
              onChange={e => setEditing(p => ({ ...p, soldOut: e.target.checked }))}
              className="accent-[#cf2127]"
            />
            <label htmlFor="soldOut" className="text-sm text-gray-600">Sold Out</label>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-[#a01a1f] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">
          Products <span className="text-gray-400 font-normal text-base">({filtered.length})</span>
        </h1>
        <button
          onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }}
          className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by title or SKU..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127] w-64"
        />
        <select
          value={catFilter}
          onChange={e => handleCat(e.target.value)}
          className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127] bg-white"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Product</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">SKU</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Category</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Price</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {paginated.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-[#1a1a1a] max-w-[220px] truncate">{p.title}</td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{p.sku}</td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-gray-700">{p.price || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full ${p.soldOut ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                    {p.soldOut ? "Sold Out" : "In Stock"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3 justify-end">
                  <button onClick={() => setViewing(p)} className="text-gray-400 hover:text-[#cf2127] transition-colors" title="View">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button onClick={() => setEditing({ ...p })} className="text-[11px] text-[#cf2127] font-bold hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-[11px] text-gray-400 font-bold hover:text-red-500">Delete</button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>

              {/* Page window: first, ellipsis, current±1, ellipsis, last */}
              {(() => {
                const pages = [];
                const addPage = (n) => pages.push({ type: "page", n });
                const addDots = () => pages.push({ type: "dots" });

                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) addPage(i);
                } else {
                  addPage(1);
                  if (page > 3) addDots();
                  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) addPage(i);
                  if (page < totalPages - 2) addDots();
                  addPage(totalPages);
                }

                return pages.map((item, i) =>
                  item.type === "dots" ? (
                    <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">…</span>
                  ) : (
                    <button
                      key={item.n}
                      onClick={() => setPage(item.n)}
                      className={`w-8 h-8 text-xs rounded transition-colors ${
                        item.n === page ? "bg-[#cf2127] text-white font-bold" : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {item.n}
                    </button>
                  )
                );
              })()}

              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
      {/* View Modal */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setViewing(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
              {viewing.img
                ? <img src={viewing.img} alt={viewing.title} className="w-full h-full object-contain p-4" />
                : <span className="text-gray-300 text-sm">No image</span>
              }
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-black text-[#1a1a1a] leading-tight">{viewing.title}</h2>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{viewing.sku}</p>
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full flex-shrink-0 ${viewing.soldOut ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                  {viewing.soldOut ? "Sold Out" : "In Stock"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-4">
                {[
                  ["Price",    viewing.price],
                  ["Category", viewing.category],
                  ["Colour",   viewing.colour],
                  ["Tag",      viewing.tag],
                ].map(([label, val]) => val ? (
                  <div key={label}>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</p>
                    <p className="text-[#1a1a1a] font-medium mt-0.5">{val}</p>
                  </div>
                ) : null)}
              </div>

              {viewing.description && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{viewing.description}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => { setViewing(null); setEditing({ ...viewing }); }}
                  className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setViewing(null)}
                  className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
