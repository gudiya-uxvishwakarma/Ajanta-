// API Configuration for Ajanta Website

export const API_BASE_URL = 'http://192.168.1.27:4000/api/admin';
export const IMAGE_BASE_URL = 'http://192.168.1.27:4000'; // For serving images

// Admin ID - Get this from your admin panel localStorage
// To find it: Open admin panel → F12 → Console → Type: JSON.parse(localStorage.getItem("sub-admin"))._id
export const ADMIN_ID = '6756e0e0e0e0e0e0e0e0e0e0'; // Replace with your actual admin ID

// API Endpoints
export const API_ENDPOINTS = {
  // Public endpoints (no admin ID required) - Use these for customer website
  publicHeroBanners: `${API_BASE_URL}/getPublicHeroBanners`,
  publicCategoryBanners: `${API_BASE_URL}/getPublicCategoryBanners`,
  publicFeaturedProducts: `${API_BASE_URL}/getPublicFeaturedProducts`,
  publicWebsiteSettings: `${API_BASE_URL}/getPublicWebsiteSettings`,
  
  // Admin endpoints (require admin ID) - Use these for admin panel
  heroBanners: `${API_BASE_URL}/getHeroBanners/${ADMIN_ID}`,
  categoryBanners: `${API_BASE_URL}/getCategoryBanners/${ADMIN_ID}`,
  featuredProducts: `${API_BASE_URL}/getFeaturedProducts/${ADMIN_ID}`,
  products: `${API_BASE_URL}/Getproductlist/${ADMIN_ID}`,
  websiteSettings: `${API_BASE_URL}/getWebsiteSettings/${ADMIN_ID}`,
  
  // Image upload
  uploadBannerImage: `${API_BASE_URL}/uploadBannerImage`,
  
  // Public products (shop page)
  publicProducts: `${API_BASE_URL}/getPublicProducts`,

  // Contact & Orders
  sendContactMessage: `${API_BASE_URL}/sendContactMessage`,
  createWebsiteOrder: `${API_BASE_URL}/createWebsiteOrder`,
  getOrdersByEmail: (email) => `${API_BASE_URL}/getOrdersByEmail/${email}`,
};

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL or base64, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  // Otherwise, prepend the base URL
  return `${IMAGE_BASE_URL}${imagePath}`;
};

export default {
  API_BASE_URL,
  IMAGE_BASE_URL,
  ADMIN_ID,
  API_ENDPOINTS,
  getImageUrl
};
