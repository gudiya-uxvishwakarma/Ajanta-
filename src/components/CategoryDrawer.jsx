import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { FiChevronDown } from 'react-icons/fi';

// This component replaces the static categories in the mega menu with dynamic ones from the database
export default function CategoryMegaMenu({ isOpen, onClose, isScrolled }) {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(0);

  // Fetch products and extract categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.publicProducts, {
          params: { limit: 1000 }
        });
        const products = response.data.products || [];
        setAllProducts(products);
        
        // Extract unique categories with product counts
        const categoryMap = new Map();
        
        products.forEach(product => {
          const categoryName = product.producttype || product.ProductType || 'Uncategorized';
          
          if (categoryMap.has(categoryName)) {
            const existing = categoryMap.get(categoryName);
            existing.count += 1;
          } else {
            categoryMap.set(categoryName, {
              name: categoryName,
              count: 1,
              slug: categoryName.toLowerCase().replace(/\s+/g, '-')
            });
          }
        });

        // Convert to array and sort by count (most products first)
        const categoriesArray = Array.from(categoryMap.values())
          .sort((a, b) => b.count - a.count);
        
        setCategories(categoriesArray);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Get products for the currently hovered category
  const getCategoryProducts = (categoryName) => {
    return allProducts
      .filter(p => (p.producttype || p.ProductType) === categoryName)
      .slice(0, 6); // Show max 6 products
  };

  const currentCategoryProducts = categories[hoveredCategory] 
    ? getCategoryProducts(categories[hoveredCategory].name)
    : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[250]"
            style={{ top: isScrolled ? '4rem' : '8rem' }}
            onClick={onClose}
          />
          
          {/* Mega Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full bg-white shadow-2xl z-[260]"
            style={{ width: '1000px', left: '0' }}
          >
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cc0000]"></div>
              </div>
            ) : (
              <div className="flex">
                {/* Left Sidebar - Main Categories */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 max-h-[500px] overflow-y-auto">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setHoveredCategory(index)}
                      onClick={() => {
                        setHoveredCategory(index);
                      }}
                      className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 border-l-4 ${
                        hoveredCategory === index
                          ? 'bg-white border-[#cc0000] text-[#cc0000]'
                          : 'border-transparent text-gray-700 hover:bg-white hover:text-[#cc0000]'
                      }`}
                    >
                      <span className="font-medium text-sm">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                          {category.count}
                        </span>
                        <FiChevronDown className="w-4 h-4 -rotate-90" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Content - Products Grid */}
                <div className="flex-1 p-6 max-h-[500px] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Category Title */}
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {categories[hoveredCategory]?.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {categories[hoveredCategory]?.count} products available
                        </p>
                      </div>

                      {/* Products Grid */}
                      {currentCategoryProducts.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {currentCategoryProducts.map((product, index) => (
                            <Link
                              key={product._id || index}
                              to={`/product/${product._id}`}
                              onClick={onClose}
                              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#cc0000] hover:shadow-md transition-all"
                            >
                              <div className="relative w-full h-24 bg-gray-100 overflow-hidden">
                                <img
                                  src={product.Image1 ? `https://ajantaworld.in/product/${product.Image1}` : '/hm1.jpg'}
                                  alt={product.productname || 'Product'}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.src = '/hm1.jpg';
                                  }}
                                />
                                {product.discount > 0 && (
                                  <div className="absolute top-1.5 right-1.5 bg-[#cc0000] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    -{product.discount}%
                                  </div>
                                )}
                              </div>
                              <div className="p-2">
                                <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 mb-1.5 group-hover:text-[#cc0000] transition-colors min-h-[2rem]">
                                  {product.productname || 'Product'}
                                </h3>
                                <div className="flex items-center gap-1.5">
                                  {product.price && (
                                    <span className="text-sm font-bold text-[#cc0000]">
                                      ₹{Math.round(product.price)}
                                    </span>
                                  )}
                                  {product.MRP && product.MRP !== product.price && (
                                    <span className="text-[10px] text-gray-400 line-through">
                                      ₹{Math.round(product.MRP)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No products available in this category</p>
                        </div>
                      )}

                      {/* View All Link */}
                      <div className="pt-4 border-t border-gray-200">
                        <Link
                          to={`/shop?category=${encodeURIComponent(categories[hoveredCategory]?.name)}`}
                          className="inline-flex items-center gap-2 text-[#cc0000] font-semibold hover:gap-3 transition-all"
                          onClick={onClose}
                        >
                          <span>View All {categories[hoveredCategory]?.name}</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
