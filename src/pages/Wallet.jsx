import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCreditCard, FiPlus, FiArrowUpRight, FiArrowDownLeft,
  FiDollarSign, FiGift, FiShoppingCart, FiRefreshCw
} from 'react-icons/fi';

export default function Wallet() {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const walletBalance = 1250.50;

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 500,
      description: 'Added to wallet',
      date: '2024-04-21',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 1299,
      description: 'Order #ORD-2024-001',
      date: '2024-04-20',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 200,
      description: 'Cashback from order',
      date: '2024-04-18',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      amount: 1000,
      description: 'Added to wallet',
      date: '2024-04-15',
      status: 'completed'
    },
    {
      id: 5,
      type: 'debit',
      amount: 799,
      description: 'Order #ORD-2024-002',
      date: '2024-04-14',
      status: 'completed'
    },
    {
      id: 6,
      type: 'credit',
      amount: 150,
      description: 'Referral bonus',
      date: '2024-04-10',
      status: 'completed'
    }
  ];

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    if (amount) {
      // Add money logic here
      setShowAddMoney(false);
      setAmount('');
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
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your wallet balance and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-[#cc0000] to-[#b30000] rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <FiCreditCard className="w-6 h-6" />
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold">₹{walletBalance.toFixed(2)}</p>
                <p className="text-white/80 text-sm mt-1">Available Balance</p>
              </div>
              <button
                onClick={() => setShowAddMoney(true)}
                className="w-full bg-white text-[#cc0000] py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Add Money</span>
              </button>
            </motion.div>

            {/* Quick Stats */}
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiArrowDownLeft className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Credits</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FiArrowUpRight className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Debits</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Features */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Wallet Benefits</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <FiGift className="w-4 h-4 text-[#cc0000] mt-0.5 flex-shrink-0" />
                  <span>Get 2% cashback on every purchase</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FiShoppingCart className="w-4 h-4 text-[#cc0000] mt-0.5 flex-shrink-0" />
                  <span>Faster checkout with wallet payment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FiDollarSign className="w-4 h-4 text-[#cc0000] mt-0.5 flex-shrink-0" />
                  <span>Exclusive wallet-only deals</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <FiArrowDownLeft className={`w-6 h-6 ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          ) : (
                            <FiArrowUpRight className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                        </p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add Money to Wallet</h3>
                <button
                  onClick={() => setShowAddMoney(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc0000] text-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Add</p>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 border border-gray-300 rounded-lg hover:border-[#cc0000] hover:bg-red-50 transition-colors font-semibold text-gray-700"
                    >
                      ₹{quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddMoney}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full bg-[#cc0000] text-white py-3 rounded-lg font-semibold hover:bg-[#b30000] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add ₹{amount || '0.00'} to Wallet
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
