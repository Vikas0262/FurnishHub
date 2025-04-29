import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulated success - in real app, you'd call an API
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 font-medium mb-4 block"
          >
            NEWSLETTER
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-white"
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <p className="text-gray-300 mb-8">
            Stay updated with our latest collections, interior design tips, and exclusive offers
          </p>

          {/* Subscribe Form */}
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white 
                placeholder:text-gray-400 focus:outline-none focus:border-red-500 pr-36"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="absolute right-2 top-2 px-6 py-2 bg-red-600 text-white rounded-full font-medium 
                hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              Subscribe
              <FaPaperPlane className="text-sm" />
            </motion.button>
          </form>

          {/* Success Message */}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 mt-4"
            >
              Thank you for subscribing! 🎉
            </motion.p>
          )}

          {/* Privacy Notice */}
          <p className="text-gray-400 text-sm mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              'Exclusive Discounts',
              'Interior Design Tips',
              'New Collection Updates'
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-300"
              >
                ✨ {feature}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 