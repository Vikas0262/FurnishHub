import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaAward, FaCube, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: FaAward,
    title: 'Premium Quality',
    description: 'Handcrafted furniture made with the finest materials and attention to detail'
  },
  {
    icon: FaCube,
    title: '3D Preview',
    description: 'Visualize furniture in your space before making a purchase'
  },
  {
    icon: FaTruck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to your doorstep'
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Expert assistance available around the clock'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-600 font-medium mb-4 block"
          >
            WHY CHOOSE US
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            The FurniVerse Difference
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of quality, innovation, and customer service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-6 relative inline-block">
                {/* Background Circle */}
                <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center
                  group-hover:bg-red-600 transition-colors duration-300">
                  <feature.icon className="text-3xl text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-red-600 scale-0 group-hover:scale-110 
                  opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

