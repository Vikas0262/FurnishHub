import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from './productData';

const ProductDetail = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p =>
      p.name.toLowerCase().replace(/\s+/g, '-') === title
    );
    setProduct(foundProduct);
  }, [title]);

  const handleAddToCart = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the same product with same color already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.color === selectedColor
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase its quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add new item
      const newItem = { ...product, quantity, color: selectedColor };
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (!product) {
    return <div className="text-center text-xl text-red-600 mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg z-50 flex items-center">
          <span>Please login to add products to your cart.</span>
          <button 
            onClick={() => setShowLoginPrompt(false)}
            className="ml-4 text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}
      {showLoginPrompt && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg z-50 flex items-center">
          <span>Please login to add products to your cart.</span>
          <button 
            onClick={() => setShowLoginPrompt(false)}
            className="ml-4 text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Item added to cart successfully!
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10 p-6 rounded-xl shadow-xl">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-lg border-2 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-3 text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">
            {product.description || 'No description available.'}
          </p>
          <p className="text-3xl font-semibold text-blue-700 mb-6">
            ${product.price.toLocaleString()}
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Choose Color</label>
            <div className="flex gap-3">
              {['Red', 'Blue', 'Green'].map(color => (
                <button
                  key={color}
                  title={color}
                  className={`w-10 h-10 rounded-full shadow-inner border-2 ${selectedColor === color ? 'border-black scale-110' : 'border-gray-300'
                    } transition-transform duration-200`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            {/* Quantity */}
            <div className="flex flex-col items-start mb-4 md:mb-0">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  className="text-lg font-bold bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  className="text-lg font-bold bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-64 bg-blue-600 text-white px-6 py-3 mt-0 md:mt-[30px] rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Add to Cart
            </button>
          </div>

          {/* More Details Button */}
          <button
            className="w-full py-3 border border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 