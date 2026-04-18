import { useState } from "react";
import { posts as initialPosts } from "../data/blogPosts";

const EMPTY = { title: "", category: "", excerpt: "", author: "", authorRole: "", date: "", readTime: "", img: "" };

export default function BlogPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const handleSave = () => {
    if (isNew) {
      setPosts(prev => [...prev, { ...editing, id: Date.now(), content: [], relatedIds: [] }]);
    } else {
      setPosts(prev => prev.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this post?")) setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (editing) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-[11px] text-gray-400 hover:text-[#cf2127] tracking-widest uppercase">← Back</button>
          <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">{isNew ? "Add Post" : "Edit Post"}</h1>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {[
            ["Title", "title"],
            ["Category", "category"],
            ["Author", "author"],
            ["Author Role", "authorRole"],
            ["Date", "date"],
            ["Read Time", "readTime"],
            ["Image URL", "img"],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">{label}</label>
              <input
                type="text"
                value={editing[key] || ""}
                onChange={e => setEditing(p => ({ ...p, [key]: e.target.value }))}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">Excerpt</label>
            <textarea            
              rows={3}                                                                                                    
              value={editing.excerpt || ""}                  
              onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127] resize-none"
            />                                     
          </div>
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button onClick={handleSave} className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-[#a01a1f] transition-colors">Save</button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} className="border border-gray-200 text-[11px] font-black tracking-widest uppercase px-6 py-3 hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight">Blog Posts <span className="text-gray-400 font-normal text-base">({posts.length})</span></h1>
        <button onClick={() => { setEditing({ ...EMPTY }); setIsNew(true); }} className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase px-5 py-2.5 hover:bg-[#a01a1f] transition-colors">
          + Add Post
        </button>
      </div>
      <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Title</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Category</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Author</th>
              <th className="text-left text-[10px] font-black tracking-widest uppercase text-gray-400 px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>                                      
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-[#1a1a1a] max-w-[260px] truncate">{p.title}</td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-gray-500">{p.author}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.date}</td>
                <td className="px-4 py-3 flex gap-3 justify-end">
                  <button onClick={() => setEditing({ ...p })} className="text-[11px] text-[#cf2127] font-bold hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-[11px] text-gray-400 font-bold hover:text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
