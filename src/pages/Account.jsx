import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUser, FiPackage, FiCreditCard, FiHeart, FiGift, 
  FiHeadphones, FiMapPin, FiEdit2, FiCamera, FiMail,
  FiPhone, FiCalendar, FiShield
} from 'react-icons/fi';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Guest User',
    email: 'guest@ajanta.com',
    phone: '+91 1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'Male'
  });

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: FiUser },
    { id: 'orders', label: 'My Orders', icon: FiPackage, link: '/orders' },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
    { id: 'wallet', label: 'My Wallet', icon: FiCreditCard, link: '/wallet' },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'vouchers', label: 'Vouchers', icon: FiGift, link: '/vouchers' },
    { id: 'support', label: 'Support', icon: FiHeadphones },
  ];

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-white text-[#cc0000] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <FiCamera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="mt-4 font-bold text-lg">{profileData.name}</h3>
                <p className="text-white/80 text-sm">{profileData.email}</p>
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
                        isActive
                          ? 'bg-red-50 text-[#cc0000]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
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
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiUser className="inline w-4 h-4 mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiMail className="inline w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiPhone className="inline w-4 h-4 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FiCalendar className="inline w-4 h-4 mr-2" />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] disabled:bg-gray-50 disabled:text-gray-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Security Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <FiShield className="w-5 h-5 mr-2" />
                      Security Settings
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors md:ml-4">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors">
                      <FiMapPin className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sample Address Card */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-[#cc0000] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Default
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-[#cc0000]">
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Home</h4>
                      <p className="text-sm text-gray-600">
                        123 Main Street, Apartment 4B<br />
                        Mumbai, Maharashtra 400001<br />
                        India<br />
                        Phone: +91 1234567890
                      </p>
                    </div>

                    {/* Add Address Card */}
                    <button className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#cc0000] hover:bg-red-50 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-[#cc0000]">
                      <FiMapPin className="w-8 h-8 mb-2" />
                      <span className="font-medium">Add New Address</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
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
