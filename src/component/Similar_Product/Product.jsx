import React from 'react'

function Product() {
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
}

export default Product