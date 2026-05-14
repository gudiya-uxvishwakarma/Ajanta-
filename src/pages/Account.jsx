import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { 
  FiUser, FiPackage, FiCreditCard, FiHeart, FiGift, 
  FiHeadphones, FiMapPin, FiEdit2, FiCamera, FiMail,
  FiPhone, FiCalendar, FiShield, FiLogOut, FiShoppingCart, FiTrash2
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import SEOHead from '../components/SEOHead';

const API_BASE = 'https://ajantaworld.in/api/user';

export default function Account() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.mobile || '',
  });
  
  // Load saved addresses from localStorage
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ajanta_addresses') || '[]');
    } catch {
      return [];
    }
  });

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.mobile || user.phone || '',
      });
    }
  }, [user]);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <FiUser className="w-16 h-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-900">Sign in to view your account</h2>
        <p className="text-gray-500 text-sm">You need to be logged in to access this page</p>
        <div className="flex gap-3">
          <Link to="/login" className="px-6 py-3 bg-[#cc0000] text-white rounded-xl font-bold text-sm hover:bg-[#b30000] transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: FiUser },
    { id: 'orders', label: 'My Orders', icon: FiPackage, link: '/orders' },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
    // { id: 'wallet', label: 'My Wallet', icon: FiCreditCard, link: '/wallet' },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    // { id: 'vouchers', label: 'Vouchers', icon: FiGift, link: '/vouchers' },
    { id: 'support', label: 'Support', icon: FiHeadphones },
  ];

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      await axios.post(`${API_BASE}/editcustomer`, {
        adminId: user._id,
        name: profileData.name,
        mobile: profileData.phone,
        email: profileData.email,
      });
      updateUser({ name: profileData.name, email: profileData.email, mobile: profileData.phone });
      setSaveMsg('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setSaveMsg('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEOHead title="My Account" noIndex={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Profile Summary */}
              <div className="p-6 bg-gradient-to-br from-[#cc0000] to-[#b30000] text-white">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FiUser className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-lg">{user.name}</h3>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>

              {/* Menu Items */}
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  if (item.link) {
                    return (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive ? 'bg-red-50 text-[#cc0000]' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#cc0000] hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors disabled:opacity-60">
                          {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </div>

                  {saveMsg && (
                    <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${saveMsg.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                      {saveMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiUser className="inline w-4 h-4 mr-2" />Full Name
                      </label>
                      <input type="text" name="name" value={profileData.name} onChange={handleInputChange} disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiMail className="inline w-4 h-4 mr-2" />Email Address
                      </label>
                      <input type="email" name="email" value={profileData.email} onChange={handleInputChange} disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiPhone className="inline w-4 h-4 mr-2" />Phone Number
                      </label>
                      <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600" />
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FiShield className="w-5 h-5 mr-2" />Security Settings
                    </h3>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <Link
                      to="/checkout"
                      className="flex items-center space-x-2 px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
                    >
                      <FiMapPin className="w-4 h-4" />
                      <span>Add New Address</span>
                    </Link>
                  </div>

                  {savedAddresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedAddresses.map((addr, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#cc0000] transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              {addr.label || 'Address'}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  const updated = savedAddresses.filter((_, i) => i !== idx);
                                  setSavedAddresses(updated);
                                  localStorage.setItem('ajanta_addresses', JSON.stringify(updated));
                                }}
                                className="text-gray-600 hover:text-[#cc0000]"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {addr.address}<br />
                            {addr.city}, {addr.state} {addr.pincode}<br />
                            India
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No saved addresses yet</p>
                      <Link
                        to="/checkout"
                        className="inline-block px-6 py-3 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
                      >
                        Add Your First Address
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="relative mb-3">
                            <img 
                              src={item.images?.[0] || item.img} 
                              alt={item.title} 
                              className="w-full h-48 object-cover rounded-lg bg-gray-100"
                            />
                            <button
                              onClick={() => dispatch(toggleWishlist(item))}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4 text-[#cc0000]" />
                            </button>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{item.title}</h3>
                          <p className="text-[#cc0000] font-bold text-lg mb-3">{item.price}</p>
                          <button
                            onClick={() => {
                              dispatch(addToCart({ product: item, qty: 1 }));
                              dispatch(toggleWishlist(item));
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-[#cc0000] text-white py-2.5 rounded-lg hover:bg-[#b30000] transition-colors text-sm font-semibold"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                      <Link
                        to="/shop"
                        className="inline-block px-6 py-3 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'support' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Support</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      to="/contact"
                      className="p-6 border border-gray-200 rounded-lg hover:border-[#cc0000] hover:shadow-md transition-all"
                    >
                      <FiHeadphones className="w-8 h-8 text-[#cc0000] mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
                      <p className="text-sm text-gray-600">Get in touch with our support team</p>
                    </Link>

                    <div className="p-6 border border-gray-200 rounded-lg hover:border-[#cc0000] hover:shadow-md transition-all cursor-pointer">
                      <FiPackage className="w-8 h-8 text-[#cc0000] mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Track Order</h3>
                      <p className="text-sm text-gray-600">Check your order status</p>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg hover:border-[#cc0000] hover:shadow-md transition-all cursor-pointer">
                      <FiShield className="w-8 h-8 text-[#cc0000] mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Return Policy</h3>
                      <p className="text-sm text-gray-600">Learn about our return process</p>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg hover:border-[#cc0000] hover:shadow-md transition-all cursor-pointer">
                      <FiGift className="w-8 h-8 text-[#cc0000] mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Warranty Info</h3>
                      <p className="text-sm text-gray-600">Check product warranty details</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
