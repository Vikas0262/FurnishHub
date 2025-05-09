import React from 'react';
import { motion } from 'framer-motion';

const rooms = [
  {
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3',
    description: 'Create a welcoming space for family and friends'
  },
  {
    name: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3',
    description: 'Design your perfect sleep sanctuary'
  },
  {
    name: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3',
    description: 'Modern solutions for your culinary space'
  },
  {
    name: 'Office',
    image: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3',
    description: 'Create a productive work environment'
  }
];

const ShopByRoom = () => {
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
            Shop by Room
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect furniture for every space in your home
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
            >
              {/* Room Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">{room.name}</h3>
                <p className="text-gray-200 mb-4">{room.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium 
                    hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Explore {room.name}
                  <span className="text-xl">→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByRoom;
