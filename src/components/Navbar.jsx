import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "HOME", to: "/" },
  {
    label: "SHOP", to: "/shop",
    dropdown: [
      { label: "Steal Deal", to: "/shop" },
      { label: "Stack Your Time", to: "/shop?filter=new-arrivals" },
      { label: "Men's Collection", to: "/shop?filter=best-sellers" },
       { label: "Women's Collection", to: "/shop?filter=best-sellers" },
    ]
  },
  {
    label: "MEN'S", to: "/mens",
    dropdown: [
      { label: "Watches", to: "/mens?filter=watches" },
      { label: "Accessories", to: "/mens?filter=accessories" },
       { label: "Best Sellers", to: "/mens?filter=accessories" },
      { label: "Gifts", to: "/mens?filter=gifts" },
    ]
  },
  {
    label: "WOMEN'S", to: "/womens",
    dropdown: [
      { label: "Watches", to: "/womens?filter=watches" },
      { label: "Noor Collection", to: "/womens?filter=noor" },
      { label: "Gifts", to: "/womens?filter=gifts" },
    ]
  },
  { label: "ABOUT BRAND", to: "/about" },
  { label: "CONTACT", to: "/contact" },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full flex flex-col z-50">
      {/* Promo Bar */}
      <div className="bg-[#7a0000] text-white text-[13px] py-2.5 flex items-center justify-center gap-3">
        <button className="text-white/70 hover:text-white" aria-label="Previous">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="tracking-wide">
          Use code <strong> WELCOME10</strong> on your first purchase.
        </span>
        <button className="text-white/70 hover:text-white" aria-label="Next">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 28 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? "fixed top-0 shadow-md z-50" : "relative"}`}>
        <div className="w-full px-6 lg:px-10 flex items-center h-[90px]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start leading-none mr-8">
            <img src="/Ajanta logo.png" alt="Ajanta Logo" className="h-[48px] object-contain" />
          </Link>

          {/* Nav Links - centered */}
          <ul className="hidden lg:flex items-center justify-center flex-1 gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li
                  key={link.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-1 text-[20px] font-semibold tracking-[0.08em] h-full border-b-2 transition-colors uppercase
                      ${isActive ? "text-[#cc0000] border-[#cc0000]" : "text-[#222] border-transparent hover:text-[#cc0000]"}`}
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <ul className="absolute top-full left-0 w-[190px] bg-white border border-gray-100 shadow-lg z-50 py-2">
                      {link.dropdown.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-5 py-2.5 text-[20px] text-gray-700 hover:bg-gray-50 hover:text-[#cc0000] transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-5 text-[#222] ml-auto">
            {/* Search */}
            <button className="hover:text-[#cc0000] transition-colors" aria-label="Search">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {/* Account */}
            <button className="hidden md:block hover:text-[#cc0000] transition-colors" aria-label="Account">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {/* Wishlist */}
            <button className="hidden md:flex relative hover:text-[#cc0000] transition-colors" aria-label="Wishlist">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="absolute -top-[5px] -right-[6px] bg-[#333] text-white text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">0</span>
            </button>
            {/* Cart */}
            <button className="relative hover:text-[#cc0000] transition-colors" aria-label="Cart">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-[5px] -right-[6px] bg-[#333] text-white text-[9px] w-[15px] h-[15px] rounded-full flex items-center justify-center font-bold">0</span>
            </button>

            {/* Mobile Hamburger */}
            <button className="lg:hidden ml-1 hover:text-[#cc0000]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-gray-50">
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-4 text-[13px] font-semibold tracking-wide hover:text-[#cc0000] ${location.pathname === link.to ? "text-[#cc0000]" : "text-[#222]"}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </nav>

      {isScrolled && <div className="h-[90px] w-full" />}
    </header>
  );
}
