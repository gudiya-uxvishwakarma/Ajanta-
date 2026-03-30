import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { posts } from "../data/blogPosts";

const allCategories = ["Watch Care", "Style Guide", "Brand Story", "New Arrivals", "Gift Guide", "Technology"];
const allTags = ["Ajanta", "Watches", "Quartz", "Style", "Care", "India", "Gift", "Technology"];

const catColorMap = {
  "Watch Care": "bg-blue-600",
  "Style Guide": "bg-purple-600",
  "Brand Story": "bg-amber-600",
  "New Arrivals": "bg-[#cc0000]",
  "Gift Guide": "bg-emerald-600",
  "Technology": "bg-gray-700",
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Article not found.</p>
        <Link to="/Blog" className="text-[#cc0000] font-bold underline">← Back to Journal</Link>
      </div>
    );
  }

  const recentPosts = posts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <div className="w-full bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="w-full px-6 md:px-14 py-3 border-b border-gray-100 text-[12px] text-gray-400 flex items-center gap-2">
        <button onClick={() => navigate("/")} className="hover:text-[#cc0000] transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigate("/Blog")} className="hover:text-[#cc0000] transition-colors">Journal</button>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{post.title}</span>
      </div>

      {/* Main layout — no outer padding so image touches left edge */}
      <div className="w-full flex flex-col md:flex-row gap-0">

        {/* LEFT — main article */}
        <div className="flex-1 min-w-0">

          {/* Hero image — full width, no padding, no rounding */}
          <div className="w-300" style={{ height: "670px" }}>
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: "left center" }}
            />
          </div>

          {/* Article content with padding */}
          <div className="px-8 md:px-12 py-10">

            {/* Category badge */}
            <span className={`${catColorMap[post.category] || "bg-gray-700"} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-[28px] md:text-[38px] font-black text-gray-900 leading-tight mt-4 mb-4 uppercase">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-[13px] text-gray-400 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post.date}</span>
              </div>
              <span className="text-gray-200">|</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
              <span className="text-gray-200">|</span>
              <span>{post.author}</span>
            </div>

            {/* Article body */}
            <div className="space-y-6">
              {post.content.map((para, i) => {
                const parts = para.split(/\*\*(.*?)\*\*/g);

                // Mid-article blockquote
                if (i === Math.floor(post.content.length / 2)) {
                  return (
                    <div key={i}>
                      <blockquote className="border-l-4 border-[#cc0000] pl-6 my-8 italic text-gray-500 text-[17px] leading-relaxed bg-gray-50 py-4 pr-4 rounded-r-lg">
                        "{post.excerpt}"
                      </blockquote>
                      <p className="text-[16px] text-gray-700 leading-[2]">
                        {parts.map((part, j) =>
                          j % 2 === 1
                            ? <span key={j} className="font-black text-gray-900">{part}</span>
                            : part
                        )}
                      </p>
                    </div>
                  );
                }

                return (
                  <p key={i} className="text-[16px] text-gray-700 leading-[2]">
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
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {allTags.slice(0, 6).map((tag) => (
                <span key={tag} className="text-[12px] text-gray-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div className="w-full md:w-[740px] flex-shrink-0 flex flex-col gap-8 px-5 py-10 border-l border-gray-100">

          {/* Categories */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-[20px] font-black text-gray-900 uppercase tracking-widest">Categories</p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-3">
              {allCategories.map((cat) => {
                const count = posts.filter((p) => p.category === cat).length;
                const catPost = posts.find((p) => p.category === cat);
                return (
                  <button
                    key={cat}
                    onClick={() => navigate("/Blog")}
                    className="flex items-center gap-3 group text-left"
                  >
                    {catPost && (
                      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={catPost.img} alt={cat} className="w-full h-full object-cover" style={{ objectPosition: "left center" }} />
                      </div>
                    )}
                    <span className="flex-1 text-[13px] text-gray-600 group-hover:text-[#cc0000] transition-colors">{cat}</span>
                    <span className="text-gray-400 text-[12px]">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Recent Post</p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-4">
              {recentPosts.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.id}`} className="flex items-start gap-3 group">
                  <div className="w-[72px] h-[56px] rounded-lg overflow-hidden flex-shrink-0">
                    <img src={rp.img} alt={rp.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" style={{ objectPosition: "left center" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-gray-800 leading-snug line-clamp-2 group-hover:text-[#cc0000] transition-colors uppercase">
                      {rp.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{rp.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <p className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Tags</p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span key={tag} className="text-[12px] text-gray-600 border border-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Advertisement */}
          <div className="bg-[#0f0f0f] rounded-xl p-5 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Advertisement</p>
            <img src="/Ajanta logo.png" alt="Ajanta" className="h-10 mx-auto mb-3 object-contain" />
            <p className="text-white text-[12px] leading-relaxed mb-4">India's finest watches since 1971. Precision you can trust.</p>
            <Link to="/shop" className="inline-block bg-[#cc0000] text-white text-[11px] font-bold px-5 py-2 rounded hover:bg-[#aa0000] transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
