import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaRuler, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const features = [
  {
    icon: FaPalette,
    title: 'Choose Your Style',
    description: 'Select from hundreds of fabrics, colors, and finishes to match your interior'
  },
  {
    icon: FaRuler,
    title: 'Custom Dimensions',
    description: 'Specify exact measurements to fit your space perfectly'
  },
  {
    icon: FaBoxOpen,
    title: 'Modular Design',
    description: 'Mix and match components to create your perfect piece'
  }
];

const CustomizeFurniture = () => {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-red-500 font-medium mb-4 block"
            >
              CUSTOMIZE YOUR FURNITURE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Design Your Perfect Piece
            </motion.h2>
            <p className="text-gray-300 text-lg mb-8">
              Create furniture that perfectly matches your style and space. Our customization tool lets you visualize and modify every detail in real-time.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <feature.icon className="text-red-500 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors group"
            >
              Start Customizing
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Column - 3D Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
          >
            {/* Placeholder for 3D Model */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3"
                alt="Customizable Sofa"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-sm text-gray-400 block mb-2">Interactive 3D Preview</span>
                <h4 className="text-2xl font-bold">Modern Sofa Collection</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeFurniture;