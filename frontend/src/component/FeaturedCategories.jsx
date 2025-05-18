import React from 'react';
import { motion } from 'framer-motion';
import { FaCouch, FaUtensils, FaBed, FaChair, FaLightbulb, FaHome } from 'react-icons/fa';

import img1 from '../assets/featured/img1.jpg'
import img2 from '../assets/featured/img2.jpg'
import img3 from '../assets/featured/img3.jpg'
import img4 from '../assets/featured/img4.jpg'
import img5 from '../assets/featured/img5.jpg'
import img6 from '../assets/featured/img6.jpg'

const categories = [
  {
    icon: FaCouch,
    name: 'Sofa Sets',
    description: 'Luxurious and comfortable sofas',
    image: img1,
    color: 'bg-rose-100'
  },
  {
    icon: FaUtensils,
    name: 'Dining Sets',
    description: 'Elegant dining furniture',
    image: img2,
    color: 'bg-blue-100'
  },
  {
    icon: FaBed,
    name: 'Bedroom',
    description: 'Complete bedroom solutions',
    image: img3,
    color: 'bg-purple-100'
  },
  {
    icon: FaChair,
    name: 'Office',
    description: 'Professional office furniture',
    image: img4,
    color: 'bg-green-100'
  },
  {
    icon: FaLightbulb,
    name: 'Lighting',
    description: 'Modern lighting solutions',
    image: img5,
    color: 'bg-yellow-100'
  },
  {
    icon: FaHome,
    name: 'Decor',
    description: 'Beautiful home accessories',
    image: img6,
    color: 'bg-orange-100'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Featured Categories
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of furniture categories designed to suit every room and style preference
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[300px]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading={index <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index <= 2 ? "high" : "low"}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <div>
                    <category.icon className="text-4xl mb-4 text-white" />
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {category.name}
                    </h3>
                    <p className="text-gray-200">
                      {category.description}
                    </p>
                  </div>
                  
                  <button className="self-start mt-4 px-6 py-2 bg-white text-gray-900 rounded-full font-medium 
                    hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                    Explore More
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 