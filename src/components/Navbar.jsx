import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, updateQuantity } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { useAuth } from '../context/AuthContext';
import { 
  FiShoppingCart, FiHeart, FiMenu, FiX, FiSearch, FiUser, FiPhone, 
  FiMapPin, FiChevronDown, FiPackage, FiCreditCard, FiGift, 
  FiHeadphones, FiLogOut, FiTrash2, FiClock, FiZap,
  FiWind, FiSun, FiHome, FiWatch
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdRemove } from 'react-icons/md';
import { API_ENDPOINTS } from '../config/api';
import { useWebsiteSettings } from '../hooks/useWebsiteSettings';
import CategoryMegaMenu from './CategoryDrawer';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Redux selectors
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = useSelector(state => state.cart.totalQuantity);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const wishlistCount = useSelector(state => state.wishlist.totalCount);
  
  // Website settings from shared hook
  const { settings: websiteSettings } = useWebsiteSettings();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [buttonPositions, setButtonPositions] = useState({ cart: null, wishlist: null, account: null });
  const cartRef = useRef(null);
  const wishlistRef = useRef(null);
  const accountRef = useRef(null);
  const categoriesRef = useRef(null);
  const navbarRef = useRef(null);

  // Update document title when settings load
  useEffect(() => {
    if (websiteSettings.websiteTitle) {
      document.title = websiteSettings.websiteTitle;
    }
  }, [websiteSettings.websiteTitle]);

  // Update button positions when dropdowns open
  const updateButtonPosition = (ref, type) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setButtonPositions(prev => ({
        ...prev,
        [type]: {
          top: rect.bottom + 8, // Use viewport position instead of adding scrollY
          right: window.innerWidth - rect.right,
        }
      }));
    }
  };

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Set scrolled state based on scroll position with hysteresis
          if (currentScrollY > 80 && !isScrolled) {
            setIsScrolled(true);
          } else if (currentScrollY < 40 && isScrolled) {
            setIsScrolled(false);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsAccountOpen(false);
    setIsCategoriesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is inside any dropdown content (including portal-rendered ones)
      const isInsideDropdown = event.target.closest('.dropdown-content');
      
      if (!isInsideDropdown) {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
          setIsCartOpen(false);
        }
        if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
          setIsWishlistOpen(false);
        }
        if (accountRef.current && !accountRef.current.contains(event.target)) {
          setIsAccountOpen(false);
        }
        if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
          setIsCategoriesOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const [hoveredCategory, setHoveredCategory] = useState(0);

  const categories = [
    {
      name: 'Wall Clocks',
      icon: FiClock,
      subcategories: [
        {
          title: 'By Style',
          items: ['Analog Clocks', 'Digital Clocks', 'Decorative Clocks', 'Vintage Clocks', 'Modern Clocks', 'Minimalist']
        },
        {
          title: 'By Material',
          items: ['Wooden Clocks', 'Metal Clocks', 'Plastic Clocks', 'Glass Clocks']
        },
        {
          title: 'By Size',
          items: ['Small (6-10 inch)', 'Medium (10-14 inch)', 'Large (14+ inch)', 'Extra Large']
        }
      ]
    },
    {
      name: 'Table Clocks',
      icon: FiWatch,
      subcategories: [
        {
          title: 'By Type',
          items: ['Alarm Clocks', 'Desk Clocks', 'Travel Clocks', 'Smart Clocks', 'LED Clocks']
        },
        {
          title: 'By Features',
          items: ['Digital Display', 'Analog Display', 'Temperature Display', 'Calendar Display']
        },
        {
          title: 'Popular',
          items: ['Best Sellers', 'New Arrivals', 'Premium Collection']
        }
      ]
    },
    {
      name: 'LED Lights',
      icon: FiZap,
      subcategories: [
        {
          title: 'Indoor Lighting',
          items: ['Bulbs', 'Tube Lights', 'Panel Lights', 'Downlights', 'Ceiling Lights']
        },
        {
          title: 'Smart Lighting',
          items: ['Smart Bulbs', 'RGB Lights', 'Dimmable Lights', 'Voice Control']
        },
        {
          title: 'Emergency',
          items: ['Emergency Lights', 'Rechargeable Lights', 'Inverter Bulbs']
        }
      ]
    },
    {
      name: 'Fans',
      icon: FiWind,
      subcategories: [
        {
          title: 'By Type',
          items: ['Ceiling Fans', 'Table Fans', 'Wall Fans', 'Exhaust Fans', 'Pedestal Fans']
        },
        {
          title: 'By Features',
          items: ['BLDC Fans', 'Remote Control', 'Decorative Fans', 'High Speed Fans']
        },
        {
          title: 'By Room',
          items: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom']
        }
      ]
    },
    {
      name: 'Torches',
      icon: FiSun,
      subcategories: [
        {
          title: 'By Type',
          items: ['LED Torches', 'Rechargeable Torches', 'Emergency Lights', 'Lanterns', 'Headlamps']
        },
        {
          title: 'By Power',
          items: ['Battery Operated', 'USB Rechargeable', 'Solar Powered']
        },
        {
          title: 'By Use',
          items: ['Camping', 'Home Use', 'Professional', 'Tactical']
        }
      ]
    },
    {
      name: 'Home Decor',
      icon: FiHome,
      subcategories: [
        {
          title: 'Wall Decor',
          items: ['Photo Frames', 'Wall Art', 'Mirrors', 'Wall Shelves']
        },
        {
          title: 'Table Decor',
          items: ['Showpieces', 'Vases', 'Candle Holders', 'Figurines']
        },
        {
          title: 'Collections',
          items: ['Modern Collection', 'Traditional Collection', 'Vintage Collection']
        }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(String(item.price || "0").replace(/[^0-9.-]+/g, ''));
    return sum + (price * item.qty);
  }, 0);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Notification Bar - hides on scroll on all screens */}
      <div className={`bg-[#cc0000] transition-all duration-300 ease-in-out overflow-hidden ${isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-8 lg:h-10 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-center lg:justify-between h-full text-xs">
            <div className="flex items-center space-x-2 lg:space-x-6 text-white">
              <a href={`tel:${websiteSettings.contactPhone}`} className="hidden lg:flex items-center space-x-1 hover:text-white/80 transition-colors">
                <FiPhone className="w-3.5 h-3.5" />
                <span>{websiteSettings.contactPhone}</span>
              </a>
              <span className="hidden lg:inline text-white/40">|</span>
              <span className="flex items-center space-x-1">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                <span>Free Shipping on Orders Above <span className="font-bold">₹{websiteSettings.freeShippingThreshold}</span></span>
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-4 text-white">
              <a href={`mailto:${websiteSettings.contactEmail}`} className="flex items-center space-x-1 hover:text-white/80 transition-colors">
                <span>{websiteSettings.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    <nav className="bg-white shadow-sm">
      {/* Main Navbar - Logo Section (Desktop only, hides on scroll) */}
      <div 
        className={`bg-white border-b border-gray-200 transition-all duration-300 ease-in-out overflow-hidden hidden lg:block ${
          isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-20 opacity-100'
        }`}
        style={{ willChange: isScrolled ? 'auto' : 'height, opacity' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                  <img
                    src="/Ajanta logo.png"
                    alt={websiteSettings.websiteTitle}
                    className="h-12 w-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden text-2xl font-black text-[#1a1a1a]">{websiteSettings.websiteTitle}</span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                  <form onSubmit={handleSearch} className="w-full relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What can we help you find today?"
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-full px-4 bg-[#cc0000] text-white rounded-r-lg hover:bg-[#b30000] transition-colors"
                    >
                      <FiSearch className="w-5 h-5" />
                    </button>
                  </form>
                </div>

                {/* Desktop Icons */}
                <div className="hidden lg:flex items-center space-x-1">
              {/* Wishlist Dropdown */}
              <div className="relative" ref={wishlistRef}>
                <button
                  onClick={() => {
                    updateButtonPosition(wishlistRef, 'wishlist');
                    setIsWishlistOpen(!isWishlistOpen);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="relative">
                    <FiHeart className="w-5 h-5 text-gray-700 group-hover:text-[#cc0000] transition-colors" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#cc0000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#cc0000]">Wishlist</span>
                  <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isWishlistOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Wishlist Dropdown Portal */}
              {isWishlistOpen && buttonPositions.wishlist && createPortal(
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-content fixed w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                    style={{
                      top: `${buttonPositions.wishlist.top}px`,
                      right: `${buttonPositions.wishlist.right}px`,
                    }}
                  >
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-900">Your wishlist</h3>
                          <span className="text-sm text-gray-500">{wishlistCount} items</span>
                        </div>
                      </div>
                      
                      {wishlistItems.length > 0 ? (
                        <>
                          <div className="max-h-96 overflow-y-auto">
                            {wishlistItems.map((item) => (
                              <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                  <img src={item.images?.[0] || item.img} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                                    <p className="text-sm font-bold text-gray-900 mt-1">{item.price}</p>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(addToCart({ product: item, qty: 1 }));
                                        dispatch(toggleWishlist(item)); // Remove from wishlist
                                      }}
                                      className="text-[#cc0000] hover:text-[#b30000] p-1 hover:bg-red-50 rounded transition-colors"
                                      title="Add to Cart"
                                    >
                                      <FiShoppingCart className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(toggleWishlist(item));
                                      }}
                                      className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors"
                                      title="Remove from Wishlist"
                                    >
                                      <FiTrash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-gray-50">
                            <Link
                              to="/shop"
                              className="block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors"
                              onClick={() => setIsWishlistOpen(false)}
                            >
                              Continue Shopping
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Your wishlist is empty</p>
                          <Link
                            to="/shop"
                            className="inline-block mt-4 text-[#cc0000] font-semibold hover:underline"
                            onClick={() => setIsWishlistOpen(false)}
                          >
                            Start Shopping
                          </Link>
                        </div>
                      )}
                    </motion.div>
                </AnimatePresence>,
                document.body
              )}

              {/* Cart Dropdown */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => {
                    updateButtonPosition(cartRef, 'cart');
                    setIsCartOpen(!isCartOpen);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="relative">
                    <FiShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-[#cc0000] transition-colors" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#cc0000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#cc0000]">My Cart</div>
                  </div>
                  <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isCartOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Cart Dropdown Portal */}
              {isCartOpen && buttonPositions.cart && createPortal(
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-content fixed w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                    style={{
                      top: `${buttonPositions.cart.top}px`,
                      right: `${buttonPositions.cart.right}px`,
                    }}
                  >
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-900">Your shopping cart</h3>
                          <span className="text-sm text-gray-500">{cartCount} items</span>
                        </div>
                      </div>
                      
                      {cartItems.length > 0 ? (
                        <>
                          <div className="max-h-[200px] overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start space-x-4">
                                  <img src={item.images?.[0] || item.img} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate mb-2">{item.title}</h4>
                                    <p className="text-sm font-bold text-gray-900 mb-2">{item.price}</p>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (item.qty > 1) {
                                            dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
                                          } else {
                                            dispatch(updateQuantity({ id: item.id, qty: 0 }));
                                          }
                                        }}
                                        className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                      >
                                        <MdRemove className="text-gray-700" />
                                      </button>
                                      <span className="text-sm font-semibold text-gray-900 min-w-[24px] text-center">{item.qty}</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }));
                                        }}
                                        className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                      >
                                        <MdAdd className="text-gray-700" />
                                      </button>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      dispatch(removeFromCart(item.id));
                                    }}
                                    className="text-[#cc0000] hover:text-[#b30000] flex-shrink-0"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold text-green-600">
                                  {cartTotal >= 999 ? 'FREE' : '₹50.00'}
                                </span>
                              </div>
                              <div className="h-px bg-gray-200 my-2"></div>
                              <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-gray-900">
                                  ₹{(cartTotal + (cartTotal >= 999 ? 0 : 50)).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <Link
                              to="/checkout"
                              className="block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors"
                              onClick={() => setIsCartOpen(false)}
                            >
                              View Cart & Checkout
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Your cart is empty</p>
                          <Link
                            to="/shop"
                            className="inline-block mt-4 text-[#cc0000] font-semibold hover:underline"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Start Shopping
                          </Link>
                        </div>
                      )}
                    </motion.div>
                </AnimatePresence>,
                document.body
              )}

              {/* Account Dropdown */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => {
                    updateButtonPosition(accountRef, 'account');
                    setIsAccountOpen(!isAccountOpen);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <FiUser className="w-5 h-5 text-gray-700 group-hover:text-[#cc0000] transition-colors" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#cc0000]">Account</div>
                  </div>
                  <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isAccountOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Account Dropdown Portal */}
              {isAccountOpen && buttonPositions.account && createPortal(
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-content fixed w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                    style={{
                      top: `${buttonPositions.account.top}px`,
                      right: `${buttonPositions.account.right}px`,
                    }}
                  >
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#cc0000]/10 rounded-full flex items-center justify-center">
                            <FiUser className="w-6 h-6 text-[#cc0000]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user ? user.name : 'Guest'}</p>
                            <p className="text-xs text-gray-500">{user ? user.email : 'Not signed in'}</p>
                          </div>
                        </div>
                      </div>
                      
                      {user ? (
                        <>
                          <div className="p-2">
                            <Link to="/account" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                              <FiUser className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Account</span>
                            </Link>
                            <Link to="/orders" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                              <FiPackage className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Orders</span>
                            </Link>
                           {/* <Link to="/wallet" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                              <FiCreditCard className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Wallet</span>
                            </Link>
                            <Link to="/vouchers" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                              <FiGift className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">Vouchers</span>
                            </Link> */}
                          </div>
                          <div className="p-2 border-t border-gray-200">
                            <button onClick={() => { logout(); setIsAccountOpen(false); navigate('/'); }} className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                              <FiLogOut className="w-5 h-5 text-[#cc0000]" /><span className="text-sm font-medium text-[#cc0000]">Sign Out</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 space-y-2">
                          <Link to="/login" onClick={() => setIsAccountOpen(false)} className="block w-full text-center bg-[#cc0000] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#b30000] transition-colors">
                            Sign In
                          </Link>
                          <Link to="/register" onClick={() => setIsAccountOpen(false)} className="block w-full text-center border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                            Create Account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                </AnimatePresence>,
                document.body
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Section - Category Bar & Compact Nav */}
      <div 
        ref={navbarRef}
        className="bg-white transition-shadow duration-300"
        style={{ willChange: 'box-shadow' }}
      >
        {/* Mobile Sticky Bar - always visible on mobile */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 h-14 flex items-center justify-between">
            {/* Mobile Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/Ajanta logo.png"
                alt={websiteSettings.websiteTitle}
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-xl font-black text-[#1a1a1a]">{websiteSettings.websiteTitle}</span>
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiHeart className="w-5 h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#cc0000] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#cc0000] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiUser className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Compact Navbar - Shows when scrolled */}
        <div 
          className={`border-b border-gray-200 hidden lg:block transition-all duration-300 ease-in-out overflow-hidden ${
            isScrolled ? 'h-16 opacity-100' : 'h-0 opacity-0 pointer-events-none'
          }`}
          style={{ willChange: isScrolled ? 'height, opacity' : 'auto' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
                  {/* Compact Logo */}
                  <Link to="/" className="flex-shrink-0">
                    <img
                      src="/Ajanta logo.png"
                      alt={websiteSettings.websiteTitle}
                      className="h-8 w-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-xl font-black text-[#1a1a1a]">{websiteSettings.websiteTitle}</span>
                  </Link>

                  {/* Compact Search */}
                  <div className="flex-1 max-w-xl mx-8">
                    <form onSubmit={handleSearch} className="w-full relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-4 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all text-sm"
                      />
                      <button
                        type="submit"
                        className="absolute right-0 top-0 h-full px-4 bg-[#cc0000] text-white rounded-r-lg hover:bg-[#b30000] transition-colors"
                      >
                        <FiSearch className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Compact Icons */}
                  <div className="flex items-center space-x-1">
                    {/* Wishlist */}
                    <div className="relative" ref={wishlistRef}>
                      <button
                        onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                        className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FiHeart className="w-5 h-5 text-gray-700" />
                        {wishlistCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-[#cc0000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Cart */}
                    <div className="relative" ref={cartRef}>
                      <button
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FiShoppingCart className="w-5 h-5 text-gray-700" />
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-[#cc0000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </button>

                      {/* Cart Dropdown */}
                      <AnimatePresence>
                        {isCartOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="dropdown-content absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[300]"
                          >
                            <div className="p-4 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Your shopping cart</h3>
                                <span className="text-sm text-gray-500">{cartCount} items</span>
                              </div>
                            </div>
                            
                            {cartItems.length > 0 ? (
                              <>
                                <div className="max-h-[200px] overflow-y-auto">
                                  {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                      <div className="flex items-start space-x-4">
                                        <img src={item.images?.[0] || item.img} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-sm font-semibold text-gray-900 truncate mb-2">{item.title}</h4>
                                          <p className="text-sm font-bold text-gray-900 mb-2">{item.price}</p>
                                          {/* Quantity Controls */}
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (item.qty > 1) {
                                                  dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
                                                } else {
                                                  dispatch(updateQuantity({ id: item.id, qty: 0 }));
                                                }
                                              }}
                                              className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                            >
                                              <MdRemove className="text-gray-700" />
                                            </button>
                                            <span className="text-sm font-semibold text-gray-900 min-w-[24px] text-center">{item.qty}</span>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }));
                                              }}
                                              className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                            >
                                              <MdAdd className="text-gray-700" />
                                            </button>
                                          </div>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(removeFromCart(item.id));
                                          }}
                                          className="text-[#cc0000] hover:text-[#b30000] flex-shrink-0"
                                        >
                                          <FiTrash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                  <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-600">Subtotal</span>
                                      <span className="font-semibold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-600">Shipping</span>
                                      <span className="font-semibold text-green-600">
                                        {cartTotal >= 999 ? 'FREE' : '₹50.00'}
                                      </span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-2"></div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-base font-semibold text-gray-900">Total</span>
                                      <span className="text-xl font-bold text-gray-900">
                                        ₹{(cartTotal + (cartTotal >= 999 ? 0 : 50)).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                  <Link
                                    to="/checkout"
                                    className="block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors"
                                    onClick={() => setIsCartOpen(false)}
                                  >
                                    View Cart & Checkout
                                  </Link>
                                </div>
                              </>
                            ) : (
                              <div className="p-8 text-center">
                                <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Your cart is empty</p>
                                <Link
                                  to="/shop"
                                  className="inline-block mt-4 text-[#cc0000] font-semibold hover:underline"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  Start Shopping
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Account */}
                    <div className="relative" ref={accountRef}>
                      <button
                        onClick={() => setIsAccountOpen(!isAccountOpen)}
                        className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <FiUser className="w-5 h-5 text-gray-700" />
                      </button>

                      {/* Account Dropdown */}
                      <AnimatePresence>
                        {isAccountOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="dropdown-content absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[300]"
                          >
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-[#cc0000]/10 rounded-full flex items-center justify-center">
                                  <FiUser className="w-6 h-6 text-[#cc0000]" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{user ? user.name : 'Guest'}</p>
                                  <p className="text-xs text-gray-500">{user ? user.email : 'Not signed in'}</p>
                                </div>
                              </div>
                            </div>
                            
                            {user ? (
                              <>
                                <div className="p-2">
                                  <Link to="/account" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                                    <FiUser className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Account</span>
                                  </Link>
                                  <Link to="/orders" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                                    <FiPackage className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Orders</span>
                                  </Link>
                                {/*  <Link to="/wallet" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                                    <FiCreditCard className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Wallet</span>
                                  </Link>*/}
                                </div>
                                <div className="p-2 border-t border-gray-200">
                                  <button onClick={() => { logout(); setIsAccountOpen(false); navigate('/'); }} className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                                    <FiLogOut className="w-5 h-5 text-[#cc0000]" /><span className="text-sm font-medium text-[#cc0000]">Sign Out</span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="p-4 space-y-2">
                                <Link to="/login" onClick={() => setIsAccountOpen(false)} className="block w-full text-center bg-[#cc0000] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#b30000] transition-colors">
                                  Sign In
                                </Link>
                                <Link to="/register" onClick={() => setIsAccountOpen(false)} className="block w-full text-center border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                                  Create Account
                                </Link>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        {/* Category Bar - Always Visible */}
        <div className="border-b border-gray-200 hidden lg:block bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 h-12">
              {/* All Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => {
                    setIsCategoriesOpen(!isCategoriesOpen);
                  }}
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-[#cc0000] transition-colors"
                >
                  <FiMenu className="w-4 h-4" />
                  <span>All Categories</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dynamic Mega Menu */}
                <CategoryMegaMenu 
                  isOpen={isCategoriesOpen} 
                  onClose={() => setIsCategoriesOpen(false)}
                  isScrolled={isScrolled}
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-[#cc0000]' : 'text-gray-700 hover:text-[#cc0000]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/shop" className="text-sm font-medium text-[#cc0000] hover:text-[#b30000] transition-colors">
                Deal of the Day
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40"
              style={{ top: '56px' }}
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive(link.path) ? 'bg-[#cc0000] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Wishlist Dropdown */}
        <AnimatePresence>
          {isWishlistOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 max-h-[80vh] overflow-y-auto"
              style={{ top: '56px' }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">Wishlist</h3>
                  <span className="text-sm text-gray-500">{wishlistCount} items</span>
                </div>
                {wishlistItems.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img src={item.images?.[0] || item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">{item.price}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(addToCart({ product: item, qty: 1 }));
                              dispatch(toggleWishlist(item));
                            }}
                            className="p-2 text-[#cc0000] hover:bg-red-50 rounded"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(toggleWishlist(item));
                            }}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <Link
                      to="/shop"
                      className="block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors mt-3"
                      onClick={() => setIsWishlistOpen(false)}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                    <Link
                      to="/shop"
                      className="inline-block text-[#cc0000] font-semibold hover:underline"
                      onClick={() => setIsWishlistOpen(false)}
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Cart Dropdown */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 max-h-[80vh] overflow-y-auto"
              style={{ top: '56px' }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">Shopping Cart</h3>
                  <span className="text-sm text-gray-500">{cartCount} items</span>
                </div>
                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img src={item.images?.[0] || item.img} alt={item.title} className="w-16 h-16 object-cover rounded flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate mb-1">{item.title}</p>
                            <p className="text-sm font-bold text-gray-900 mb-2">{item.price}</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (item.qty > 1) {
                                    dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
                                  } else {
                                    dispatch(updateQuantity({ id: item.id, qty: 0 }));
                                  }
                                }}
                                className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 rounded-md transition-colors"
                              >
                                <MdRemove className="text-gray-700" />
                              </button>
                              <span className="text-sm font-semibold text-gray-900 min-w-[24px] text-center">{item.qty}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }));
                                }}
                                className="w-7 h-7 flex items-center justify-center bg-white hover:bg-gray-100 rounded-md transition-colors"
                              >
                                <MdAdd className="text-gray-700" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(removeFromCart(item.id));
                            }}
                            className="text-[#cc0000] hover:text-[#b30000] flex-shrink-0 p-2"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-semibold text-green-600">
                            {cartTotal >= 999 ? 'FREE' : '₹50.00'}
                          </span>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-semibold text-gray-900">Total</span>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{(cartTotal + (cartTotal >= 999 ? 0 : 50)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/checkout"
                      className="block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart & Checkout
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link
                      to="/shop"
                      className="inline-block text-[#cc0000] font-semibold hover:underline"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Account Dropdown */}
        <AnimatePresence>
          {isAccountOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 max-h-[80vh] overflow-y-auto"
              style={{ top: '56px' }}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-3">
                  <div className="w-12 h-12 bg-[#cc0000]/10 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-[#cc0000]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user ? user.name : 'Guest'}</p>
                    <p className="text-xs text-gray-500">{user ? user.email : 'Not signed in'}</p>
                  </div>
                </div>

                {user ? (
                  <div className="space-y-1">
                    <Link to="/account" className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                      <FiUser className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Account</span>
                    </Link>
                    <Link to="/orders" className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                      <FiPackage className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Orders</span>
                    </Link>
                    {/*<Link to="/wallet" className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                      <FiCreditCard className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">My Wallet</span>
                    </Link>
                    <Link to="/vouchers" className="flex items-center space-x-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsAccountOpen(false)}>
                      <FiGift className="w-5 h-5 text-gray-600" /><span className="text-sm font-medium text-gray-700">Vouchers</span>
                    </Link>*/}
                    <div className="h-px bg-gray-200 my-2"></div>
                    <button onClick={() => { logout(); setIsAccountOpen(false); navigate('/'); }} className="flex items-center space-x-3 px-3 py-3 hover:bg-red-50 rounded-lg transition-colors w-full text-left">
                      <FiLogOut className="w-5 h-5 text-[#cc0000]" /><span className="text-sm font-medium text-[#cc0000]">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Link to="/login" onClick={() => setIsAccountOpen(false)} className="block w-full text-center bg-[#cc0000] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#b30000] transition-colors">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsAccountOpen(false)} className="block w-full text-center border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
    </div>
  );
}
