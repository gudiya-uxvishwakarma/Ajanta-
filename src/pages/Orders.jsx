import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, 
  FiClock, FiChevronRight, FiDownload, FiRefreshCw
} from 'react-icons/fi';

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-04-15',
      status: 'delivered',
      total: 2499,
      items: [
        {
          id: 1,
          title: 'Ajanta Digital Wall Clock',
          image: '/hma1.png',
          price: '₹1,299',
          qty: 1
        },
        {
          id: 2,
          title: 'LED Bulb 9W',
          image: '/hma2.jpg',
          price: '₹599',
          qty: 2
        }
      ],
      deliveryDate: '2024-04-18'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-04-20',
      status: 'shipped',
      total: 1899,
      items: [
        {
          id: 3,
          title: 'Ceiling Fan 48 inch',
          image: '/hma3.webp',
          price: '₹1,899',
          qty: 1
        }
      ],
      estimatedDelivery: '2024-04-25'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-04-21',
      status: 'processing',
      total: 799,
      items: [
        {
          id: 4,
          title: 'LED Torch Rechargeable',
          image: '/handtorches.webp',
          price: '₹799',
          qty: 1
        }
      ]
    },
    {
      id: 'ORD-2024-004',
      date: '2024-03-10',
      status: 'cancelled',
      total: 1299,
      items: [
        {
          id: 5,
          title: 'Table Clock Digital',
          image: '/hma4.jpg',
          price: '₹1,299',
          qty: 1
        }
      ]
    }
  ];

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

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#cc0000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
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
                          <span>Total: ₹{order.total.toFixed(2)}</span>
                          {order.deliveryDate && (
                            <>
                              <span>•</span>
                              <span className="text-green-600 font-medium">
                                Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                              </span>
                            </>
                          )}
                          {order.estimatedDelivery && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600 font-medium">
                                Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.status === 'delivered' && (
                          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <FiDownload className="w-4 h-4" />
                            <span>Invoice</span>
                          </button>
                        )}
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
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-20 h-20 object-cover rounded-lg"
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
                            <span>View Product</span>
                            <FiChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  {order.status === 'delivered' && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <button className="text-[#cc0000] hover:underline text-sm font-medium">
                        Write a Review
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet</p>
              <Link
                to="/shop"
                className="inline-block px-6 py-3 bg-[#cc0000] text-white rounded-lg hover:bg-[#b30000] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
