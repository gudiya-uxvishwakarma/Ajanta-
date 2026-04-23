import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, 
  FiClock, FiChevronRight, FiDownload, FiRefreshCw
} from 'react-icons/fi';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("ajanta_customer_email") || "");
  const [emailInput, setEmailInput] = useState("");

  const fetchOrders = async (customerEmail) => {
    if (!customerEmail) return;
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.getOrdersByEmail(customerEmail));
      const apiOrders = (response.data.orders || []).map(o => ({
        id: o.orderId,
        date: o.createdAt,
        status: o.status || "processing",
        total: o.totalAmount || 0,
        items: (o.items || []).map(item => ({
          id: item.productId,
          title: item.productName,
          image: item.image || "/hma1.png",
          price: item.price,
          qty: item.quantity
        })),
        deliveryDate: o.status === "delivered" ? o.updatedAt : null,
        estimatedDelivery: o.status === "shipped" ? null : null
      }));
      setOrders(apiOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrders(email);
    } else {
      setLoading(false);
    }
  }, [email]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      localStorage.setItem("ajanta_customer_email", emailInput.trim());
      setEmail(emailInput.trim());
    }
  };

  const filters = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      processing: {
        icon: FiClock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        label: 'Processing'
      },
      shipped: {
        icon: FiTruck,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        label: 'Shipped'
      },
      delivered: {
        icon: FiCheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-100',
        label: 'Delivered'
      },
      cancelled: {
        icon: FiXCircle,
        color: 'text-red-600',
        bg: 'bg-red-100',
        label: 'Cancelled'
      }
    };
    return configs[status];
  };

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link to="/account" className="text-[#cc0000] hover:underline mb-2 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Email prompt if no email */}
        {!email && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6 text-center">
            <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Enter your email to view orders</h3>
            <p className="text-gray-500 text-sm mb-4">Use the email you placed your order with</p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#cc0000]"
              />
              <button type="submit" className="bg-[#cc0000] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b30000]">
                View Orders
              </button>
            </form>
          </div>
        )}

        {/* Loading */}
        {loading && email && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cc0000] mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your orders...</p>
          </div>
        )}

        {/* Orders content */}
        {!loading && email && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Orders', count: orders.length },
                    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
                    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
                    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
                    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeFilter === filter.id ? 'bg-[#cc0000] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { localStorage.removeItem("ajanta_customer_email"); setEmail(""); setOrders([]); }}
                  className="text-xs text-gray-400 hover:text-[#cc0000] transition-colors"
                >
                  Change Email
                </button>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                              <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span>{statusConfig.label}</span>
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>Total: ₹{Number(order.total).toFixed(2)}</span>
                              {order.deliveryDate && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-600 font-medium">
                                    Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {order.status === 'shipped' && (
                              <button className="flex items-center space-x-2 px-4 py-2 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors">
                                <FiTruck className="w-4 h-4" />
                                <span>Track Order</span>
                              </button>
                            )}
                            {order.status === 'delivered' && (
                              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <FiRefreshCw className="w-4 h-4" />
                                <span>Return</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded-lg"
                                onError={e => { e.target.src = "/hma1.png"; }}
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                                <p className="text-sm font-bold text-gray-900 mt-1">{item.price}</p>
                              </div>
                              <Link
                                to={`/product/${item.id}`}
                                className="text-[#cc0000] hover:underline text-sm font-medium flex items-center space-x-1"
                              >
                                <span>View</span>
                                <FiChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-6">No orders placed with {email}</p>
                  <Link to="/shop" className="inline-block px-6 py-3 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
