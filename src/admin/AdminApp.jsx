import { useState } from "react";
import { Routes, Route, NavLink, useNavigate, Navigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Products from "./Products";
import BlogPosts from "./BlogPosts";
import Orders from "./Orders";
import ContactMessages from "./ContactMessages";
import HeroSlides from "./HeroSlides";
import HomeSections from "./HomeSections";

const NAV = [
  { path: "/admin", label: "Dashboard", icon: "▦", end: true },
  { path: "/admin/products", label: "Products", icon: "◈" },
  { path: "/admin/hero-slides", label: "Hero Slides", icon: "⊞" },
  { path: "/admin/home-sections", label: "Home Sections", icon: "▤" },
  { path: "/admin/blog", label: "Blog Posts", icon: "✎" },
  { path: "/admin/orders", label: "Orders", icon: "◎" },
  { path: "/admin/messages", label: "Messages", icon: "✉" },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("ajanta_admin") === "true");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!authed) return <AdminLogin onLogin={() => { setAuthed(true); navigate("/admin"); }} />;

  const handleLogout = () => {
    localStorage.removeItem("ajanta_admin");
      setAuthed(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-[#1a1a1a] flex flex-col h-screen transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10 shrink-0">
          <div className="w-7 h-7 bg-[#cf2127] rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-black">A</span>
          </div>
          <span className="text-white text-[12px] font-black tracking-widest uppercase">Admin</span>
        </div>

        {/* Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {NAV.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-left w-full transition-colors text-sm ${
                  isActive ? "bg-[#cf2127] text-white font-bold" : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="text-base leading-none">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer — always visible */}
        <div className="shrink-0 px-3 py-4 border-t border-white/10">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-white text-sm transition-colors w-full">
            <span>↗</span> View Site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-white/40 hover:text-white text-sm transition-colors w-full">
            <span>⏻</span> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile
       */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(v => !v)} className="lg:hidden text-gray-500 hover:text-[#cf2127]">
            ☰
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/hero-slides" element={<HeroSlides />} />
            <Route path="/home-sections" element={<HomeSections />} />
            <Route path="/blog" element={<BlogPosts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/messages" element={<ContactMessages />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
