// import { useNavigate } from "react-router-dom";
// import { posts, categoryColors } from "../data/blogPosts";

// export default function Blog() {
//   const navigate = useNavigate();

//   const BlogCard = ({ post }) => (
//     <div
//       onClick={() => navigate(`/blog/${post.id}`)}
//       className="cursor-pointer group flex flex-col bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-xl"
//     >
//       {/* Image */}
//       <div className="relative w-full aspect-[16/10] overflow-hidden">
//         <img
//           src={post.img}
//           alt={post.title}
//           className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
//         />
//         {/* Dark overlay on hover */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
//         {/* Category badge */}
//         <span className={`absolute top-4 left-4 ${categoryColors[post.category]} text-white text-[9px] font-black px-3 py-1 uppercase tracking-[0.15em]`}>
//           {post.category}
//         </span>
//         {/* Read time */}
//         <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 tracking-wide">
//           {post.readTime}
//         </span>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col flex-1 px-5 pt-5 pb-6">
//         {/* Date */}
//         <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-semibold mb-3">{post.date}</p>

//         {/* Title */}
//         <h3 className="text-[15px] font-black text-[#1a1a1a] leading-snug line-clamp-2 mb-3 group-hover:text-[#cc0000] transition-colors duration-200">
//           {post.title}
//         </h3>

//         {/* Divider */}
//         <div className="w-8 h-[2px] bg-[#cc0000] mb-3 transition-all duration-300 group-hover:w-14" />

//         {/* Excerpt */}
//         <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
//           {post.excerpt}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 bg-[#1a1a1a] flex items-center justify-center">
//               <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-[11px] font-semibold text-[#1a1a1a] leading-none">{post.author}</span>
//               <span className="text-[10px] text-gray-400 mt-0.5">{post.authorRole}</span>
//             </div>
//           </div>
//           <span className="text-[10px] font-black text-[#cc0000] tracking-[0.15em] uppercase group-hover:tracking-[0.25em] transition-all duration-300">
//             Read →
//           </span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full bg-white min-h-screen">

//       {/* HERO BANNER */}
//       <section className="relative w-full h-[620px] md:h-[780px] overflow-hidden">
//         <img
//           src="/image copy 2.png"
//           alt="The Journal"
//           className="w-full h-full object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black/45" />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <span className="text-[#cc0000] text-[11px] font-bold tracking-[0.4em] uppercase mb-3">Ajanta Quartz</span>
//           <h1 className="text-white text-[44px] md:text-[68px] font-black tracking-tight leading-none uppercase mb-4">
//             The Journal
//           </h1>
//           <p className="text-white/70 text-[13px] md:text-[15px] max-w-md leading-relaxed">
//             Stories, style guides & watch news from India's finest watchmaker since 1971
//           </p>
//           <div className="w-12 h-[2px] bg-[#cc0000] mt-5" />
//         </div>
//       </section>

//       <div className="w-full px-6 md:px-14 py-14">

//         {/* First 3 cards */}
//         <p className="text-[11px] text-gray-400 tracking-[0.25em] uppercase font-semibold mb-7">Latest Articles</p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {posts.slice(0, 3).map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>

//         {/* Newsletter Banner */}
//         <div className="my-12 -mx-6 md:-mx-14 bg-[#9b0a2e] py-16 px-6 flex flex-col items-center text-center">
//           <h2 className="text-white text-[26px] md:text-[32px] font-bold mb-3">
//             Stay Updated with Ajanta
//           </h2>
//           <p className="text-white/75 text-[14px] max-w-lg leading-relaxed mb-8">
//             Subscribe to our newsletter for the latest watch trends, care tips, exclusive offers,
//             and behind-the-scenes stories from our workshop.
//           </p>
//           <div className="flex items-center gap-3 w-full max-w-lg">
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="flex-1 px-5 py-3 text-[13px] bg-white rounded-md focus:outline-none"
//             />
//             <button className="bg-white text-[#9b0a2e] font-bold px-6 py-3 text-[13px] rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap">
//               Subscribe Now
//             </button>
//           </div>
//           <p className="text-white/50 text-[11px] mt-4">Join 10,000+ watch lovers who receive our monthly newsletter</p>
//         </div>

//         {/* Last 3 cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {posts.slice(3).map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>

//         {/* Have a Story to Share */}
//         <div className="mt-16 mb-4 flex flex-col items-center text-center py-14 px-6 bg-[#faf8f5] -mx-6 md:-mx-14">
//           <h2 className="text-[#9b0a2e] text-[26px] md:text-[32px] font-bold mb-3">
//             Have a Story to Share?
//           </h2>
//           <p className="text-gray-600 text-[14px] max-w-md leading-relaxed mb-8">
//             We'd love to hear about your watch experiences, family heirlooms, or design ideas.
//             Get in touch with our editorial team.
//           </p>
//           <div className="flex items-center gap-3">
//             <a href="/contact" className="bg-[#9b0a2e] text-white text-[13px] font-semibold px-6 py-2.5 hover:bg-[#7a0824] transition-colors">
//               Contact Editorial Team
//             </a>
//             <a href="/shop" className="border border-[#9b0a2e] text-[#9b0a2e] text-[13px] font-semibold px-6 py-2.5 hover:bg-[#9b0a2e] hover:text-white transition-colors">
//               Browse Collection
//             </a>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
