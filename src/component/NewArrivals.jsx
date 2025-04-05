import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Vintage Lantern',
    image: '/images/lantern.jpg',
    category: 'Lighting'
  },
  {
    id: 2,
    name: 'Modern Chair',
    image: '/images/chair.jpg',
    category: 'Furniture'
  },
  {
    id: 3,
    name: 'Tea Set Collection',
    image: '/images/tea-set.jpg',
    category: 'Dining'
  },
  {
    id: 4,
    name: 'Baroque Mirror',
    image: '/images/mirror.jpg',
    category: 'Decor'
  },
  {
    id: 5,
    name: 'Pink Glass Candlestick',
    image: '/images/candlestick.jpg',
    category: 'Decor'
  },
  {
    id: 6,
    name: 'Modern Vase',
    image: '/images/vase.jpg',
    category: 'Decor'
  }
];

const NewArrivals = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-neutral-50">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NEW ARRIVALS
          </motion.h2>
          <motion.div 
            className="w-24 h-0.5 bg-black mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                initial={{ y: 100 }}
                whileHover={{ y: 0 }}
              >
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default NewArrivals; 