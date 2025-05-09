import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3',
    likes: '2.5k',
    comments: '120'
  },
  {
    url: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3',
    likes: '1.8k',
    comments: '95'
  },
  {
    url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3',
    likes: '3.2k',
    comments: '150'
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3',
    likes: '2.1k',
    comments: '88'
  },
  {
    url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3',
    likes: '4.5k',
    comments: '200'
  },
  {
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3',
    likes: '1.9k',
    comments: '102'
  }
];

const InstagramGallery = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-pink-600 font-medium mb-4"
          >
            <FaInstagram className="text-xl" />
            <span>@FURNIVERSE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Get Inspired
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow us on Instagram for daily inspiration and stunning interior designs
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={image.url}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <FaInstagram className="text-4xl text-white mb-4" />
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1">
                    ❤️ {image.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    💬 {image.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
              text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            <FaInstagram className="text-xl" />
            Follow Us on Instagram
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery; 