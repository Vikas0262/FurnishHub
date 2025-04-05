import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NewArrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "Modern Sofa",
      price: "$999",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3",
      category: "Living Room"
    },
    {
      id: 2,
      name: "Dining Table",
      price: "$799",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3",
      category: "Dining"
    },
    {
      id: 3,
      name: "Bed Frame",
      price: "$1299",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3",
      category: "Bedroom"
    },
    {
      id: 4,
      name: "Office Chair",
      price: "$299",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3",
      category: "Office"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">New Arrivals</h2>
            <p className="text-gray-600">Discover our latest furniture collection</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
              aria-label="Previous slide"
            >
              <FaArrowLeft className="text-gray-600 text-lg" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
              aria-label="Next slide"
            >
              <FaArrowRight className="text-gray-600 text-lg" />
            </button>
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${
                index === 0 ? 'h-[500px]' : 'h-[300px]'
              }`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-sm font-medium text-gray-800 shadow-sm">
                  {product.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-white">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
                      {product.category}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">{product.name}</h3>
                      <p className="text-2xl font-bold text-white">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-600 w-6' : 'bg-gray-300 w-2.5'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals; 