import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const products = [
  {
    id: 1,
    name: 'Modern Leather Sofa',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3',
    rating: 4.8,
    reviews: 124,
    discount: '15% OFF',
    color: 'Brown'
  },
  {
    id: 2,
    name: 'Minimalist Coffee Table',
    price: 399,
    image: 'https://images.unsplash.com/photo-1571422065917-030a0f0e6350?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.5,
    reviews: 89,
    discount: '20% OFF',
    color: 'Black'
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 599,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3',
    rating: 4.9,
    reviews: 156,
    discount: 'NEW',
    color: 'Gray'
  },
  {
    id: 4,
    name: 'Luxury Bed Frame',
    price: 899,
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
    rating: 4.7,
    reviews: 98,
    discount: '10% OFF',
    color: 'White'
  },
  {
    id: 5,
    name: 'Designer Dining Set',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3',
    rating: 4.6,
    reviews: 75,
    discount: 'TRENDING',
    color: 'Walnut'
  }
];

const TrendingProducts = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = (product) => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Get existing cart items
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = existingCartItems.findIndex(
      item => item.id === product.id && item.color === product.color
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add new item
      existingCartItems.push({
        ...product,
        quantity: 1
      });
    }

    // Save updated cart
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    // Show success message
    setSuccessMessage(`${product.name} added to cart!`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (
    <section id="trending-section" className="py-20">
      <div className="container mx-auto px-4">
        {/* Login Prompt */}
        {showLoginPrompt && (
          <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 flex items-center">
            <span className="mr-2">Please login to add products to your cart.</span>
            <button 
              onClick={() => setShowLoginPrompt(false)}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              ×
            </button>
          </div>
        )}
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-600 font-medium mb-4 block"
          >
            TRENDING NOW
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Best Selling Products
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular furniture pieces loved by customers worldwide
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Products Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="!pb-14"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group"
              >
                {/* Product Image */}
                <div className="relative h-[300px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Discount Tag */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}
                  </div>
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <FaHeart className="text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaShoppingCart className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar />
                      <span className="text-gray-900 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingProducts; 