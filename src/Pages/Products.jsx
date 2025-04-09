import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Products = () => {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: 'Syltherine', price: 2500000, image: 'https://via.placeholder.com/300x300?text=Syltherine', category: 'Sofa' },
    { id: 2, name: 'Leviosa', price: 2500000, image: 'https://via.placeholder.com/300x300?text=Leviosa', category: 'Chair' },
    { id: 3, name: 'Lolito', price: 7000000, image: 'https://via.placeholder.com/300x300?text=Lolito', category: 'Sofa' },
    { id: 4, name: 'Respira', price: 500000, image: 'https://via.placeholder.com/300x300?text=Respira', category: 'Table' },
  ];

  return (
    <main className="pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-500 mb-12">Discover our collection of beautiful furniture</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart functionality here
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products; 