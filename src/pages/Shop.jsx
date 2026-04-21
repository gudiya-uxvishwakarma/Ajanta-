import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { allProducts } from "../data/products";
import { LifestyleCard } from "../components/LifestyleCards";

const categories = [
  { name: "All Categories", value: "All", count: 0 },
  { name: "Hand Torch", value: "Hand Torch", count: 0 },
  { name: "Emergency Light", value: "Emergency Light", count: 0 },
  { name: "Clock", value: "Clock", count: 0 },
  { name: "Clock Accessory", value: "Clock Accessory", count: 0 },
  { name: "Alarm Clock", value: "Alarm Clock", count: 0 },
  { name: "Calculator", value: "Calculator", count: 0 },
  { name: "LED", value: "LED", count: 0 },
  { name: "Home Appliance", value: "Home Appliance", count: 0 },
  { name: "Electric Mosquito Racket", value: "Electric Mosquito Racket", count: 0 },
  { name: "Room Heater", value: "Room Heater", count: 0 },
  { name: "Iron", value: "Iron", count: 0 },
  { name: "Electric Kettle", value: "Electric Kettle", count: 0 },
  { name: "Kitchen Appliance", value: "Kitchen Appliance", count: 0 },
];

const sortOptions = [
  { label: "Default Sorting", value: "Featured" },
  { label: "Price: Low to High", value: "Price: Low to High" },
  { label: "Price: High to Low", value: "Price: High to Low" },
  { label: "Newest First", value: "Newest" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter") || null;
  const urlSearch = searchParams.get("search") || null;
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Calculate category counts
  useEffect(() => {
    categories.forEach(cat => {
      if (cat.value === "All") {
        cat.count = allProducts.length;
      } else {
        cat.count = allProducts.filter(p => p.category === cat.value).length;
      }
    });
  }, []);

  useEffect(() => {
    setActiveCategory("All");
    setActiveFilters([]);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [urlFilter]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, priceRange, selectedRatings]);

  // Update active filters when category changes
  useEffect(() => {
    const filters = [];
    if (activeCategory !== "All") {
      filters.push({ type: "category", label: activeCategory, value: activeCategory });
    }
    if (urlSearch) {
      filters.push({ type: "search", label: `Search: "${urlSearch}"`, value: urlSearch });
    }
    if (priceRange[0] > 0 || priceRange[1] < 10000) {
      filters.push({ type: "price", label: `₹${priceRange[0]} - ₹${priceRange[1]}`, value: priceRange });
    }
    if (selectedRatings.length > 0) {
      filters.push({ type: "rating", label: `${selectedRatings.length} rating${selectedRatings.length > 1 ? 's' : ''}`, value: selectedRatings });
    }
    setActiveFilters(filters);
  }, [activeCategory, urlSearch, priceRange, selectedRatings]);

  const urlCategoryMap = {
    "hand-torch":        ["Hand Torch"],
    "emergency-light":   ["Emergency Light"],
    "clock":             ["Clock", "Clock Accessory"],
    "alarm-clock":       ["Alarm Clock"],
    "calculator":        ["Calculator"],
    "led":               ["LED"],
    "home-appliance":    ["Home Appliance"],
    "mosquito-racket":   ["Electric Mosquito Racket"],
    "room-heater":       ["Room Heater"],
    "iron":              ["Iron"],
    "electric-kettle":   ["Electric Kettle"],
    "kitchen-appliance": ["Kitchen Appliance"],
  };

  let filtered = allProducts;

  // URL search query
  if (urlSearch) {
    const q = urlSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.sku || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  }

  // URL filter
  if (urlFilter && urlCategoryMap[urlFilter]) {
    filtered = filtered.filter(p => urlCategoryMap[urlFilter].includes(p.category));
  }

  // Active category pill (if still shown)
  if (activeCategory !== "All") {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Price range filter
  filtered = filtered.filter(p => {
    const price = parseInt((p.price || "0").replace(/[^\d]/g, ""));
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Rating filter
  if (selectedRatings.length > 0) {
    filtered = filtered.filter(p => {
      const rating = p.rating || 4; // default rating
      return selectedRatings.includes(rating);
    });
  }

  // Sort
  if (sortBy === "Price: Low to High") {
    filtered = [...filtered].sort((a, b) => parseInt((a.price || "0").replace(/[^\d]/g, "")) - parseInt((b.price || "0").replace(/[^\d]/g, "")));
  } else if (sortBy === "Price: High to Low") {
    filtered = [...filtered].sort((a, b) => parseInt((b.price || "0").replace(/[^\d]/g, "")) - parseInt((a.price || "0").replace(/[^\d]/g, "")));
  } else if (sortBy === "Newest") {
    filtered = [...filtered].reverse();
  }

  const removeFilter = (filter) => {
    if (filter.type === "category") {
      setActiveCategory("All");
    } else if (filter.type === "price") {
      setPriceRange([0, 10000]);
    } else if (filter.type === "rating") {
      setSelectedRatings([]);
    }
  };

  const clearAllFilters = () => {
    setActiveCategory("All");
    setCategorySearch("");
    setPriceRange([0, 10000]);
    setSelectedRatings([]);
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const visibleCategories = showMoreCategories ? filteredCategories : filteredCategories.slice(0, 5);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageTitle = urlSearch ? `Search: "${urlSearch}"`
    : urlFilter === "hand-torch"        ? "Hand Torches"
    : urlFilter === "emergency-light"   ? "Emergency Lights"
    : urlFilter === "clock"             ? "Clocks"
    : urlFilter === "alarm-clock"       ? "Alarm Clocks"
    : urlFilter === "calculator"        ? "Calculators"
    : urlFilter === "led"               ? "LED Lighting"
    : urlFilter === "home-appliance"    ? "Home Appliances"
    : urlFilter === "mosquito-racket"   ? "Electric Mosquito Rackets"
    : urlFilter === "room-heater"       ? "Room Heaters"
    : urlFilter === "iron"              ? "Irons"
    : urlFilter === "electric-kettle"   ? "Electric Kettles"
    : urlFilter === "kitchen-appliance" ? "Kitchen Appliances"
    : "All Products";

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="w-full bg-[#fafafa] border-b border-gray-200 py-12 px-6 md:px-14 relative overflow-hidden">
        {/* Decorative curved lines - left top */}
        <div className="absolute top-0 left-0 w-80 h-32 opacity-20">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M 0,20 Q 100,10 150,40 T 300,30" stroke="#cc0000" strokeWidth="1" fill="none" />
            <path d="M 0,40 Q 80,25 130,55 T 280,45" stroke="#cc0000" strokeWidth="0.8" fill="none" />
            <path d="M 0,60 Q 60,45 110,70 T 260,60" stroke="#cc0000" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
        
        {/* Decorative curved lines - right top */}
        <div className="absolute top-0 right-0 w-80 h-32 opacity-20 transform scale-x-[-1]">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M 0,20 Q 100,10 150,40 T 300,30" stroke="#cc0000" strokeWidth="1" fill="none" />
            <path d="M 0,40 Q 80,25 130,55 T 280,45" stroke="#cc0000" strokeWidth="0.8" fill="none" />
            <path d="M 0,60 Q 60,45 110,70 T 260,60" stroke="#cc0000" strokeWidth="0.6" fill="none" />
          </svg>
        </div>

        {/* Decorative curved lines - left bottom */}
        <div className="absolute bottom-0 left-0 w-80 h-32 opacity-20 transform scale-y-[-1]">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M 0,20 Q 100,10 150,40 T 300,30" stroke="#cc0000" strokeWidth="1" fill="none" />
            <path d="M 0,40 Q 80,25 130,55 T 280,45" stroke="#cc0000" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
        
        {/* Decorative curved lines - right bottom */}
        <div className="absolute bottom-0 right-0 w-80 h-32 opacity-20 transform scale-x-[-1] scale-y-[-1]">
          <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M 0,20 Q 100,10 150,40 T 300,30" stroke="#cc0000" strokeWidth="1" fill="none" />
            <path d="M 0,40 Q 80,25 130,55 T 280,45" stroke="#cc0000" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm mb-4">
            <Link to="/" className="flex items-center gap-1.5 text-gray-500 hover:text-[#cc0000] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#cc0000] font-medium">Shop Page</span>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">Shop Page</h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-14 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden flex-shrink-0`}>
            <div className="bg-white rounded-lg p-5 sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto border border-gray-200">
              {/* Categories Section */}
              <div className="mb-5 pb-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">Categories</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden text-gray-500 hover:text-[#cc0000] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Category Search */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#cc0000] transition-colors"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category List */}
                <div className="space-y-1">
                  {visibleCategories.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center justify-between p-2 rounded cursor-pointer transition-colors hover:bg-gray-50 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={activeCategory === cat.value}
                          onChange={() => setActiveCategory(cat.value)}
                          className="w-4 h-4 text-[#cc0000] border-gray-300 rounded focus:ring-[#cc0000] cursor-pointer accent-[#cc0000]"
                        />
                        <span className={`text-sm ${activeCategory === cat.value ? 'font-semibold text-[#cc0000]' : 'text-gray-700'}`}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>

                {/* Show More Button */}
                {filteredCategories.length > 5 && (
                  <button
                    onClick={() => setShowMoreCategories(!showMoreCategories)}
                    className="w-full mt-3 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-900 transition-colors"
                  >
                    {showMoreCategories ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="mb-5 pb-5 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">₹{priceRange[0]}</span>
                    <span className="text-gray-600">₹{priceRange[1]}</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-[#cc0000]"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-[#cc0000]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#cc0000]"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#cc0000]"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-2">
                <h3 className="text-base font-bold text-gray-900 mb-3">Customer Rating</h3>
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center justify-between p-2 rounded cursor-pointer transition-colors hover:bg-gray-50 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => toggleRating(rating)}
                          className="w-4 h-4 text-[#cc0000] border-gray-300 rounded focus:ring-[#cc0000] cursor-pointer accent-[#cc0000]"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className={`text-sm ml-1 ${selectedRatings.includes(rating) ? 'font-semibold text-[#cc0000]' : 'text-gray-600'}`}>
                            & up
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-5">
              {/* Top Row: Results count, view toggle, sort */}
              <div className="flex items-center justify-between mb-4 bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center gap-3">
                  {!sidebarOpen && (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-[#cc0000] text-white rounded hover:bg-[#a00000] transition-colors text-sm font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Filters
                    </button>
                  )}
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(endIndex, filtered.length)}</span> of <span className="font-bold text-gray-900">{filtered.length}</span> results
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-[#cc0000]' : 'text-gray-600 hover:text-gray-900'}`}
                      aria-label="Grid view"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-[#cc0000]' : 'text-gray-600 hover:text-gray-900'}`}
                      aria-label="List view"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 text-sm text-gray-700 px-3 py-2 pr-8 rounded focus:outline-none focus:border-[#cc0000] cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        {sortOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Items per page */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(parseInt(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="appearance-none bg-white border border-gray-300 text-sm text-gray-700 px-3 py-2 pr-8 rounded focus:outline-none focus:border-[#cc0000] cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                      <option value="48">48</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap bg-gray-50 p-3 rounded border border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">Filter:</span>
                  {activeFilters.map((filter, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-white text-sm text-gray-700 rounded border border-gray-300"
                    >
                      {filter.label}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="hover:text-[#cc0000] transition-colors"
                        aria-label="Remove filter"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#cc0000] hover:text-[#a00000] font-semibold flex items-center gap-1"
                  >
                    Clear All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {currentProducts.map((p) => (
                <LifestyleCard key={p.id} card={p} />
              ))}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded border border-gray-200">
                {/* Page info */}
                <div className="text-sm text-gray-600">
                  Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded border transition-colors ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#cc0000]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] px-3 py-2 rounded border transition-colors ${
                            currentPage === page
                              ? 'bg-[#cc0000] text-white border-[#cc0000] font-semibold'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#cc0000]'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded border transition-colors ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#cc0000]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Quick jump */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#cc0000] text-center"
                  />
                </div>
              </div>
            )}

            {/* No Results */}
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded border border-gray-200">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#cc0000] text-white font-semibold rounded hover:bg-[#a00000] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
