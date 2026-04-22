import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiGift, FiCopy, FiCheck, FiClock, FiTag,
  FiShoppingCart, FiPercent
} from 'react-icons/fi';

export default function Vouchers() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState('available');

  const vouchers = [
    {
      id: 1,
      code: 'WELCOME50',
      title: 'Welcome Offer',
      description: 'Get ₹50 off on your first order',
      discount: '₹50 OFF',
      minOrder: 500,
      validUntil: '2024-05-31',
      status: 'available',
      type: 'flat'
    },
    {
      id: 2,
      code: 'SAVE20',
      title: '20% Off on Clocks',
      description: 'Get 20% discount on all wall and table clocks',
      discount: '20% OFF',
      minOrder: 1000,
      validUntil: '2024-04-30',
      status: 'available',
      type: 'percentage'
    },
    {
      id: 3,
      code: 'FREESHIP',
      title: 'Free Shipping',
      description: 'Free shipping on orders above ₹999',
      discount: 'FREE SHIP',
      minOrder: 999,
      validUntil: '2024-06-30',
      status: 'available',
      type: 'shipping'
    },
    {
      id: 4,
      code: 'FLASH100',
      title: 'Flash Sale',
      description: 'Get ₹100 off on orders above ₹2000',
      discount: '₹100 OFF',
      minOrder: 2000,
      validUntil: '2024-04-25',
      status: 'available',
      type: 'flat'
    },
    {
      id: 5,
      code: 'USED2024',
      title: 'New Year Special',
      description: 'Get 15% off on all products',
      discount: '15% OFF',
      minOrder: 800,
      validUntil: '2024-03-31',
      status: 'used',
      type: 'percentage',
      usedOn: '2024-03-15'
    },
    {
      id: 6,
      code: 'EXPIRED10',
      title: 'Summer Sale',
      description: 'Get 10% off on all fans',
      discount: '10% OFF',
      minOrder: 1500,
      validUntil: '2024-03-20',
      status: 'expired',
      type: 'percentage'
    }
  ];

  const giftCards = [
    {
      id: 1,
      amount: 500,
      code: 'GIFT-ABC123',
      balance: 500,
      validUntil: '2025-04-21',
      status: 'active'
    },
    {
      id: 2,
      amount: 1000,
      code: 'GIFT-XYZ789',
      balance: 350,
      validUntil: '2025-06-15',
      status: 'active'
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredVouchers = vouchers.filter(v => {
    if (activeTab === 'available') return v.status === 'available';
    if (activeTab === 'used') return v.status === 'used';
    if (activeTab === 'expired') return v.status === 'expired';
    return true;
  });

  const getVoucherIcon = (type) => {
    switch (type) {
      case 'percentage':
        return FiPercent;
      case 'shipping':
        return FiShoppingCart;
      default:
        return FiTag;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link to="/account" className="text-[#cc0000] hover:underline mb-2 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Vouchers & Gift Cards</h1>
          <p className="text-gray-600 mt-2">Save more with exclusive vouchers and gift cards</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'available'
                  ? 'bg-[#cc0000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available ({vouchers.filter(v => v.status === 'available').length})
            </button>
            <button
              onClick={() => setActiveTab('used')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'used'
                  ? 'bg-[#cc0000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Used ({vouchers.filter(v => v.status === 'used').length})
            </button>
            <button
              onClick={() => setActiveTab('expired')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'expired'
                  ? 'bg-[#cc0000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expired ({vouchers.filter(v => v.status === 'expired').length})
            </button>
            <button
              onClick={() => setActiveTab('giftcards')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'giftcards'
                  ? 'bg-[#cc0000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gift Cards ({giftCards.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab !== 'giftcards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVouchers.map((voucher) => {
              const VoucherIcon = getVoucherIcon(voucher.type);
              const isExpired = voucher.status === 'expired';
              const isUsed = voucher.status === 'used';

              return (
                <motion.div
                  key={voucher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                    isExpired || isUsed ? 'opacity-60' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isExpired || isUsed ? 'bg-gray-100' : 'bg-red-100'
                        }`}>
                          <VoucherIcon className={`w-6 h-6 ${
                            isExpired || isUsed ? 'text-gray-400' : 'text-[#cc0000]'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{voucher.title}</h3>
                          <p className="text-sm text-gray-600">{voucher.description}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isExpired ? 'bg-gray-100 text-gray-600' :
                        isUsed ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {voucher.discount}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Voucher Code</p>
                          <p className="text-lg font-bold text-gray-900 font-mono">{voucher.code}</p>
                        </div>
                        <button
                          onClick={() => handleCopyCode(voucher.code)}
                          disabled={isExpired || isUsed}
                          className={`p-2 rounded-lg transition-colors ${
                            isExpired || isUsed
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-[#cc0000] text-white hover:bg-[#b30000]'
                          }`}
                        >
                          {copiedCode === voucher.code ? (
                            <FiCheck className="w-5 h-5" />
                          ) : (
                            <FiCopy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FiShoppingCart className="w-4 h-4" />
                        <span>Min. order: ₹{voucher.minOrder}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiClock className="w-4 h-4" />
                        <span>Valid until: {new Date(voucher.validUntil).toLocaleDateString()}</span>
                      </div>
                      {isUsed && voucher.usedOn && (
                        <div className="flex items-center space-x-2 text-blue-600">
                          <FiCheck className="w-4 h-4" />
                          <span>Used on: {new Date(voucher.usedOn).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {!isExpired && !isUsed && (
                      <Link
                        to="/shop"
                        className="mt-4 block w-full bg-[#cc0000] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors"
                      >
                        Shop Now
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Gift Cards */}
            {giftCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#cc0000] to-[#b30000] rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 text-white">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Ajanta Gift Card</h3>
                      <p className="text-white/80">Card Code: {card.code}</p>
                    </div>
                    <FiGift className="w-8 h-8" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-white/80 text-sm mb-1">Original Amount</p>
                      <p className="text-2xl font-bold">₹{card.amount}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-white/80 text-sm mb-1">Current Balance</p>
                      <p className="text-2xl font-bold">₹{card.balance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Valid until: {new Date(card.validUntil).toLocaleDateString()}</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-semibold">
                      {card.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <Link
                    to="/shop"
                    className="block w-full bg-white text-[#cc0000] text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Use Gift Card
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Add Gift Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FiGift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Have a Gift Card?</h3>
              <p className="text-gray-600 mb-6">Enter your gift card code to add it to your account</p>
              <div className="max-w-md mx-auto flex gap-2">
                <input
                  type="text"
                  placeholder="Enter gift card code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000]"
                />
                <button className="px-6 py-3 bg-[#cc0000] text-white rounded-lg font-semibold hover:bg-[#b30000] transition-colors">
                  Add Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
