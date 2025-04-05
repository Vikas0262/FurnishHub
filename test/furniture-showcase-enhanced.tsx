import React, { useState, useRef, useEffect } from 'react';

// Beautiful Card Component that can be reused
const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const navigateToProductDetails = () => {
    // In a real application, this would use router navigation
    // For example: router.push(`/product/${product.id}`);
    console.log(`Navigating to product: ${product.title}`);
  };
  
  return (
    <div 
      onClick={navigateToProductDetails}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex-shrink-0 w-72 mx-3 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative overflow-hidden group">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* View Product Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/80 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
            View Details
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">{product.title}</h3>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{product.category}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3">By {product.designer}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-gray-900 font-bold text-xl">₹{product.price.toLocaleString()}</p>
          {product.discount && (
            <span className="text-green-600 text-sm font-medium">
              {product.discount}% off
            </span>
          )}
        </div>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Navigation Button Component
const NavButton = ({ direction, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none border border-gray-200 focus:ring-2 focus:ring-gray-300"
    >
      {direction === 'prev' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

// Section Title Component
const SectionTitle = ({ title }) => {
  const words = title.split(' ');
  
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-light tracking-wider">
        {words.map((word, index) => (
          <span key={index} className={`inline-block ${index !== 0 ? 'ml-3' : ''} tracking-widest`}>
            {word.split('').join(' ')}
          </span>
        ))}
      </h2>
      <div className="w-24 h-0.5 bg-gray-300 mx-auto mt-4 relative">
        <div className="absolute w-12 h-0.5 bg-gray-800 left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};

// Product Details Page (Demo Component)
const ProductDetailsPage = ({ product }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-gray-600">By {product.designer}</p>
          
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
            {product.discount && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {product.discount}% off
              </span>
            )}
          </div>
          
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-lg w-full md:w-auto transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const FurnitureShowcase = () => {
  const products = [
    {
      id: 1,
      image: "/api/placeholder/400/320",
      title: "Henley Bench",
      designer: "Magus Designs",
      price: 61300,
      category: "Bench",
      rating: 4,
      reviewCount: 12,
      discount: 15
    },
    {
      id: 2,
      image: "/api/placeholder/400/320",
      title: "Dori Bench",
      designer: "Project 810",
      price: 67850,
      category: "Bench",
      rating: 5,
      reviewCount: 8
    },
    {
      id: 3,
      image: "/api/placeholder/400/320",
      title: "Aimee Upholstered Bench",
      designer: "The Edit",
      price: 49000,
      category: "Bench",
      rating: 4,
      reviewCount: 6,
      discount: 10
    },
    {
      id: 4,
      image: "/api/placeholder/400/320",
      title: "Dot Square Planter Bench",
      designer: "Objectry",
      price: 24500,
      category: "Bench",
      rating: 3,
      reviewCount: 4
    },
    {
      id: 5,
      image: "/api/placeholder/400/320",
      title: "Teak Wood Bench",
      designer: "Studio Wood",
      price: 42000,
      category: "Bench",
      rating: 5,
      reviewCount: 15
    },
    {
      id: 6,
      image: "/api/placeholder/400/320",
      title: "Modern Rattan Bench",
      designer: "Arpan Design",
      price: 38500,
      category: "Bench",
      rating: 4,
      reviewCount: 9,
      discount: 5
    }
  ];

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Handle scroll position to determine which arrows to show
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Check initially
      handleScroll();
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SectionTitle title="SIMILAR PRODUCTS" />
      
      <div className="relative">
        <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-2 pointer-events-none">
          <div className={`transition-opacity duration-300 pointer-events-auto ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}>
            <NavButton direction="prev" onClick={scrollLeft} />
          </div>
          <div className={`transition-opacity duration-300 pointer-events-auto ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}>
            <NavButton direction="next" onClick={scrollRight} />
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-8 px-2 hide-scrollbar scroll-smooth gap-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-lg font-medium">
          VIEW ALL BENCHES
        </button>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FurnitureShowcase;
