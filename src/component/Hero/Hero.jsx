import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCube, FaPlay } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1687180497716-5872969e5125?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Modern Living Room Collection',
    subtitle: 'Discover comfort and style',
    accent: 'NEW ARRIVAL'
  },
  {
    image: 'https://images.unsplash.com/photo-1608661090231-880eef793f5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Scandinavian Bedroom',
    subtitle: 'Minimalist design for peaceful rest',
    accent: 'TRENDING'
  },
  {
    image: 'https://images.unsplash.com/photo-1680503146454-0fe569cef4eb?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Luxury Dining Sets',
    subtitle: 'Elegance for your dining space',
    accent: 'POPULAR'
  }
];

export const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return [ref, controls];
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: { opacity: 0, scale: 1.2 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium mb-6"
          >
            {heroSlides[currentSlide].accent}
          </motion.span>

          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {heroSlides[currentSlide].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold flex items-center gap-2 
                hover:bg-gray-100 transition-colors group shadow-lg"
            >
              Shop Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold 
                flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <FaCube />
              View in 3D
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold flex items-center gap-2 
                hover:bg-red-700 transition-colors"
            >
              <FaPlay />
              Watch Video
            </motion.button>
            </div>

          {/* Slide Navigation */}
          <div className="mt-12 flex items-center gap-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-16 h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-red-600 w-24' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 right-12 grid grid-cols-3 gap-8 bg-white/10 backdrop-blur-md 
          rounded-2xl p-8 border border-white/20">
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '500+', label: 'Premium Products' },
            { number: '50+', label: '3D Models' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <picture>
                <source srcSet="https://www.youtube.com/embed/your-video-id?autoplay=1&enablejsapi=1" type="video/mp4" />
                <source srcSet="https://www.youtube.com/embed/your-video-id?autoplay=1&enablejsapi=1" type="video/webm" />
                <img src="https://img.youtube.com/vi/your-video-id/hqdefault.jpg" alt="Product Video" />
              </picture>
      <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
      >
                ✕
      </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
