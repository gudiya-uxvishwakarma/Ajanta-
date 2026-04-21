import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi';

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'On orders over ₹999',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure transactions',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    color: 'from-orange-500 to-red-500'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
