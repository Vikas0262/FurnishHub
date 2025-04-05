import React from 'react';
import { motion } from 'framer-motion';
import { FaCouch, FaUtensils, FaBed, FaChair, FaLightbulb, FaHome } from 'react-icons/fa';

const categories = [
  {
    icon: FaCouch,
    name: 'Sofa Sets',
    description: 'Luxurious and comfortable sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3',
    color: 'bg-rose-100'
  },
  {
    icon: FaUtensils,
    name: 'Dining Sets',
    description: 'Elegant dining furniture',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3',
    color: 'bg-blue-100'
  },
  {
    icon: FaBed,
    name: 'Bedroom',
    description: 'Complete bedroom solutions',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
    color: 'bg-purple-100'
  },
  {
    icon: FaChair,
    name: 'Office',
    description: 'Professional office furniture',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
    color: 'bg-green-100'
  },
  {
    icon: FaLightbulb,
    name: 'Lighting',
    description: 'Modern lighting solutions',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
    color: 'bg-yellow-100'
  },
  {
    icon: FaHome,
    name: 'Decor',
    description: 'Beautiful home accessories',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3',
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
              <div className={`relative overflow-hidden rounded-2xl ${category.color} p-6 transition-all duration-300 h-[300px]`}>
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <category.icon className="text-4xl mb-4 text-gray-800 group-hover:text-white transition-colors" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-white transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-200 transition-colors">
                      {category.description}
                    </p>
                  </div>
                  
                  <button className="self-start mt-4 px-6 py-2 bg-white/90 text-gray-900 rounded-full font-medium 
                    group-hover:bg-white transition-all duration-300 flex items-center gap-2">
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