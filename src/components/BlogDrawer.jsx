import { useEffect } from "react";
import { posts, categoryColors } from "../data/blogPosts";

export default function BlogDrawer({ post, onClose }) {
  const paragraphs = post?.content || [];
  const related = posts.filter((p) => post.relatedIds?.includes(p.id)).slice(0, 3);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full bg-white rounded-t-3xl flex flex-col"
        style={{ maxHeight: "92vh", animation: "slideUp 0.35s cubic-bezier(0.32,0.72,0,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle + close */}
        <div className="flex items-center justify-center pt-3 pb-2 flex-shrink-0 relative">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
          <button
            onClick={onClose}
            className="absolute right-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">

          {/* Image left + Details right */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-2 pb-8">

            {/* LEFT: image */}
            <div className="w-full md:w-[40%] flex-shrink-0">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover object-top" />
                <span className={`absolute top-3 left-3 ${categoryColors[post.category] || "bg-gray-700"} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest`}>
                  {post.category}
                </span>
              </div>
            </div>

            {/* RIGHT: details */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Type / Category */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Type</p>
                <span className={`${categoryColors[post.category] || "bg-gray-700"} text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Title</p>
                <h2 className="text-[20px] md:text-[26px] font-black text-gray-900 leading-tight">
                  {post.title}
                </h2>
              </div>

              {/* Date + Read time */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Published</p>
                  <p className="text-[13px] font-semibold text-gray-800">{post.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Read Time</p>
                  <p className="text-[13px] font-semibold text-gray-800">{post.readTime}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Author</p>
                  <p className="text-[13px] font-semibold text-gray-800">{post.author}</p>
                </div>
              </div>

              {/* Description / excerpt */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Description</p>
                <p className="text-[13.5px] text-gray-600 leading-relaxed">{post.excerpt}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Full article content */}
              <div className="space-y-3">
                {paragraphs.map((para, i) => {
                  const parts = para.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={i} className="text-[13px] text-gray-600 leading-relaxed">
                      {parts.map((part, j) =>
                        j % 2 === 1
                          ? <span key={j} className="font-black text-gray-900">{part}</span>
                          : part
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {["Ajanta", "Watches", post.category].map((tag) => (
                  <span key={tag} className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    #{tag.replace(/\s/g, "")}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="border-t border-gray-100 pt-7">
              <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase font-semibold mb-5">Related Articles</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rp) => (
                  <div
                    key={rp.id}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl">
                      <img src={rp.img} alt={rp.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      <span className={`absolute top-2 left-2 ${categoryColors[rp.category]} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest`}>
                        {rp.category}
                      </span>
                    </div>
                    <div className="px-3 pt-3 pb-4">
                      <h4 className="text-[13px] font-black text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-[#cc0000] transition-colors">
                        {rp.title}
                      </h4>
                      <p className="text-[11px] text-gray-400">{rp.date} · {rp.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
