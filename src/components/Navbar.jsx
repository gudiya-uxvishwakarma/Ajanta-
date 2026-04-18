import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const mainLinks = [
  {
    label: "PRODUCTS", to: "/shop",
    dropdown: [
      { label: "All Products", to: "/shop" },
      { label: "Hand Torches", to: "/shop?filter=hand-torch" },
      { label: "Emergency Lights", to: "/shop?filter=emergency-light" },
      { label: "Clocks", to: "/shop?filter=clock" },
      { label: "Alarm Clocks", to: "/shop?filter=alarm-clock" },
      { label: "Calculators", to: "/shop?filter=calculator" },
      { label: "LED Lighting", to: "/shop?filter=led" },
      { label: "Home Appliances", to: "/shop?filter=home-appliance" },
      { label: "Electric Mosquito Rackets", to: "/shop?filter=mosquito-racket" },
      { label: "Room Heaters", to: "/shop?filter=room-heater" },
      { label: "Irons", to: "/shop?filter=iron" },
      { label: "Electric Kettles", to: "/shop?filter=electric-kettle" },
      { label: "Kitchen Appliances", to: "/shop?filter=kitchen-appliance" },
    ]
  },
  {
    label: "LIGHTING", to: "/shop?filter=led",
    dropdown: [
      { label: "Hand Torches", to: "/shop?filter=hand-torch" },
      { label: "Emergency Lights", to: "/shop?filter=emergency-light" },
      { label: "LED Lamps", to: "/shop?filter=led" },
      { label: "LED Tubelights", to: "/shop?filter=led" },
      { label: "LED Down / Panel Lights", to: "/shop?filter=led" },
      { label: "LED Flood Lights", to: "/shop?filter=led" },
      { label: "LED Street Lights", to: "/shop?filter=led" },
    ]
  },
  {
    label: "CLOCKS", to: "/shop?filter=clock",
    dropdown: [
      { label: "Simple Clocks", to: "/shop?filter=clock" },
      { label: "Digital OLC Clocks", to: "/shop?filter=clock" },
      { label: "Digital ODC Clocks", to: "/shop?filter=clock" },
      { label: "Picture Dial Clocks", to: "/shop?filter=clock" },
      { label: "Alarm Clocks", to: "/shop?filter=alarm-clock" },
      { label: "Calculators", to: "/shop?filter=calculator" },
    ]
  },
  {
    label: "HOME APPLIANCES", to: "/shop?filter=home-appliance",
    dropdown: [
      { label: "Ceiling Fans", to: "/shop?filter=home-appliance" },
      { label: "Ventilation Fans", to: "/shop?filter=home-appliance" },
      { label: "Exhaust Fans", to: "/shop?filter=home-appliance" },
      { label: "Table Fans", to: "/shop?filter=home-appliance" },
      { label: "Wall Mounting Fans", to: "/shop?filter=home-appliance" },
      { label: "Pedestal Fans", to: "/shop?filter=home-appliance" },
      { label: "Electric Mosquito Rackets", to: "/shop?filter=mosquito-racket" },
      { label: "Room Heaters", to: "/shop?filter=room-heater" },
      { label: "Irons", to: "/shop?filter=iron" },
      { label: "Electric Kettles", to: "/shop?filter=electric-kettle" },
      { label: "Hand Blenders & Mixers", to: "/shop?filter=kitchen-appliance" },
    ]
  },
];

const secondaryLinks = [
  { label: "About Brand", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ajanta_user")) || null; } catch { return null; }
  });
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const accountMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, cart, removeFromCart, updateQty, wishlistCount, wishlist, toggleWishlist } = useCart();

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === "login") {
      const stored = JSON.parse(localStorage.getItem("ajanta_user"));
      if (stored && stored.email === authForm.email && stored.password === authForm.password) {
        setLoggedInUser(stored);
        setAuthOpen(false);
        setAuthForm({ name: "", email: "", password: "", confirm: "" });
      } else {
        alert("Invalid email or password.");
      }
    } else {
      if (authForm.password !== authForm.confirm) { alert("Passwords do not match."); return; }
      const user = { name: authForm.name, email: authForm.email, password: authForm.password };
      localStorage.setItem("ajanta_user", JSON.stringify(user));
      setLoggedInUser(user);
      setAuthOpen(false);
      setAuthForm({ name: "", email: "", password: "", confirm: "" });
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("ajanta_user");
  };



  const currentFull = location.pathname + location.search;
  const isActive = (to) => currentFull === to || decodeURIComponent(currentFull) === decodeURIComponent(to);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      <nav className="w-full bg-[#cf2127] border-b border-[#cf2127] shadow-sm">
        <div className="w-full px-6 lg:px-10 flex items-center h-[56px]">

          {/* Logo — left */}
          <Link to="/" className="flex-shrink-0 mr-10">
            <img src="/Ajanta logo.png" alt="Ajanta Logo" className="h-[44px] object-contain" />
          </Link>

          {/* Main nav — center */}
          <ul className="hidden lg:flex items-center flex-1 gap-1 h-full">
            {mainLinks.map((link) => (
              <li
                key={link.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.to}
                  className={`flex items-center gap-1 px-3 h-full text-[12px] font-semibold tracking-[0.1em] uppercase border-b-2 transition-all
                    ${isActive(link.to) ? "border-white text-white" : "border-transparent text-white hover:text-white/80"}`}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.dropdown && activeDropdown === link.label && (
                  <ul className="absolute top-full left-0 w-[200px] bg-white border border-gray-100 shadow-lg z-50 py-2">
                    {link.dropdown.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-5 py-2.5 text-[12px] text-gray-600 hover:bg-gray-50 hover:text-[#cf2127] transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Right side — secondary links + icons */}
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            {secondaryLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-[12px] font-medium tracking-wide transition-colors ${isActive(link.to) ? "text-white" : "text-white hover:text-white/80"}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Search"
            >
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Account */}
            {loggedInUser ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setAccountMenuOpen(v => !v)}
                  className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors"
                  aria-label="Account"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-[11px] font-semibold max-w-[70px] truncate">{loggedInUser.name}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[160px] bg-white shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-[12px] font-semibold text-gray-700 truncate mt-0.5">{loggedInUser.name}</p>
                    </div>
                    <button
                      onClick={() => { handleLogout(); setAccountMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-[12px] text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => { setAuthMode("login"); setAuthOpen(true); }} className="text-white hover:text-white/80 transition-colors" aria-label="Account">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            )}

            {/* Wishlist */}
            <button onClick={() => setWishlistOpen(true)} className="relative text-white hover:text-white/80 transition-colors" aria-label="Wishlist">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-white text-[#cf2127] text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative text-white hover:text-white/80 transition-colors" aria-label="Cart">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-white text-[#cf2127] text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-4 ml-auto text-white">
            <button onClick={() => setCartOpen(true)} className="relative" aria-label="Cart">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#cf2127] text-white text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar — drops below navbar */}
        {searchOpen && (
          <div className="w-full bg-[#b01c21] px-6 lg:px-10 py-3 border-t border-white/10">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 max-w-xl mx-auto">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-white/10 border border-white/30 text-white placeholder-white/50 text-[13px] px-4 py-2 outline-none focus:bg-white/20 transition-all"
              />
              <button type="submit" className="bg-white text-[#cf2127] px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors">
                Search
              </button>
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-white/60 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            {[...mainLinks, ...secondaryLinks].map((link) => (
              <div key={link.label} className="border-b border-gray-50">
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-4 text-[13px] font-semibold tracking-wide ${isActive(link.to) ? "text-[#cf2127]" : "text-gray-700 hover:text-[#cf2127]"}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </nav>



      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-[13px] font-black uppercase tracking-widest">Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 text-[13px] mt-10">Your cart is empty</p>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img src={item.img} alt={item.title} className="w-16 h-16 object-cover bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-2">{item.title}</p>
                    <p className="text-[12px] text-[#cf2127] font-bold mt-0.5">{item.price}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50">−</button>
                      <span className="text-[12px] font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex justify-between text-[13px] font-bold mb-3">
                  <span>Total</span>
                  <span>₹{cart.reduce((s, i) => s + (parseInt((i.price || "0").replace(/[^\d]/g, "")) * i.qty), 0).toLocaleString("en-IN")}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); navigate("/checkout"); }}
                  className="w-full bg-[#cf2127] text-white py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#a01a1f] transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setWishlistOpen(false)} />
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-[13px] font-black uppercase tracking-widest">Wishlist ({wishlistCount})</h2>
              <button onClick={() => setWishlistOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {wishlist.length === 0 ? (
                <p className="text-center text-gray-400 text-[13px] mt-10">Your wishlist is empty</p>
              ) : wishlist.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img src={item.img} alt={item.title} className="w-16 h-16 object-cover bg-gray-100 shrink-0 cursor-pointer" onClick={() => { navigate(`/product/${item.id}`); setWishlistOpen(false); }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1a1a1a] line-clamp-2 cursor-pointer hover:text-[#cf2127]" onClick={() => { navigate(`/product/${item.id}`); setWishlistOpen(false); }}>{item.title}</p>
                    <p className="text-[12px] text-[#cf2127] font-bold mt-0.5">{item.price}</p>
                  </div>
                  <button onClick={() => toggleWishlist(item)} className="text-gray-300 hover:text-red-500 transition-colors mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAuthOpen(false)} />
          <div className="relative bg-white w-full max-w-[380px] shadow-2xl z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex gap-0">
                <button
                  onClick={() => setAuthMode("login")}
                  className={`text-[13px] font-bold tracking-widest uppercase px-4 py-1.5 transition-colors ${authMode === "login" ? "bg-[#cf2127] text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`text-[13px] font-bold tracking-widest uppercase px-4 py-1.5 transition-colors ${authMode === "signup" ? "bg-[#cf2127] text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  Sign Up
                </button>
              </div>
              <button onClick={() => setAuthOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="px-6 py-6 flex flex-col gap-4">
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authForm.name}
                    onChange={e => setAuthForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full border border-gray-200 px-3 py-2.5 text-[13px] outline-none focus:border-[#cf2127] transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={authForm.email}
                  onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 px-3 py-2.5 text-[13px] outline-none focus:border-[#cf2127] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={authForm.password}
                  onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 px-3 py-2.5 text-[13px] outline-none focus:border-[#cf2127] transition-colors"
                />
              </div>
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={authForm.confirm}
                    onChange={e => setAuthForm(f => ({ ...f, confirm: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 px-3 py-2.5 text-[13px] outline-none focus:border-[#cf2127] transition-colors"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#cf2127] text-white py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-[#a01a1f] transition-colors mt-1"
              >
                {authMode === "login" ? "Login" : "Create Account"}
              </button>
              <p className="text-center text-[12px] text-gray-400">
                {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-[#cf2127] font-semibold hover:underline">
                  {authMode === "login" ? "Sign Up" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
