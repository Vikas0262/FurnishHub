import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaShoppingCart, FaFire, FaClock } from 'react-icons/fa';

const trendingProducts = [
  {
    id: 1,
    name: 'Modern Leather Sofa',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3',
    category: 'Living Room',
    rating: 4.8,
    reviews: 124,
    sales: 89,
    isNew: true,
    type: 'best-seller'
  },
  {
    id: 2,
    name: 'Minimalist Dining Table',
    price: 899,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3',
    category: 'Dining Room',
    rating: 4.6,
    reviews: 98,
    sales: 76,
    isNew: true,
    type: 'new-arrival'
  },
  // Add more products...
];

const Trending = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'best-sellers', 'new-arrivals'

  const filteredProducts = trendingProducts.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'best-sellers') return product.type === 'best-seller';
    if (activeTab === 'new-arrivals') return product.type === 'new-arrival';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Stats */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Trending Now</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaFire className="text-red-600 text-xl" />
                <h3 className="font-semibold">Best Sellers</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">247</p>
              <p className="text-sm text-gray-600">Products sold this week</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="text-red-600 text-xl" />
                <h3 className="font-semibold">New Arrivals</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">35</p>
              <p className="text-sm text-gray-600">New items this month</p>
            </div>
            {/* Add more stat cards as needed */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Trending
          </button>
          <button
            onClick={() => setActiveTab('best-sellers')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'best-sellers'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => setActiveTab('new-arrivals')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'new-arrivals'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            New Arrivals
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    New Arrival
                  </span>
                )}
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <FaHeart className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                    <FaShoppingCart className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-900 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-gray-600">{product.sales} sold</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending; 