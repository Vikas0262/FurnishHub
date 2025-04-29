import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    review: 'The quality of furniture from FurniVerse is exceptional. Their 3D preview feature made it so easy to visualize how pieces would look in my clients\' homes.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Home Owner',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    review: 'Outstanding customer service and the delivery was right on schedule. The sofa I purchased exceeded my expectations in terms of comfort and style.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Architect',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    review: 'As an architect, I appreciate the attention to detail in their furniture. The customization options are fantastic and my clients love the results.',
    rating: 5
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-600 font-medium mb-4 block"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read genuine reviews from our satisfied customers
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg relative group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8">
                <FaQuoteRight className="text-4xl text-gray-100 group-hover:text-red-100 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 mb-6 relative z-10">
                "{review.review}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-gray-500 text-sm">{review.role}</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-100 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors inline-flex items-center gap-2"
          >
            View More Reviews
            <span className="text-xl">→</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 