import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const API_URL = `${import.meta.env.VITE_BACKEND_URL}api/v1`;
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/product/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the same product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase its quantity
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add new item
      const newItem = { ...product, quantity };
      cartItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
    
    // Show success message
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Back to Products
        </button>
      </div>
    );
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
        <div className="md:flex gap-8 w-full">
          <div className="md:w-1/2">
            {product.images && product.images.length > 0 ? (
              <>
                <img
                  src={product.images[selectedImageIndex || 0].url}
                  alt={product.name}
                  className="w-full h-[450px] object-cover rounded-lg border-2 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
                />
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`${product.name} - ${idx + 1}`}
                        className={`w-16 h-16 object-cover rounded border-2 cursor-pointer hover:border-red-500 transition-all duration-200 ${
                          selectedImageIndex === idx ? 'border-red-500' : 'border-gray-300'
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-[450px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-red-600 mt-2">₹{product.price.toLocaleString()}</p>
            <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              {product.description || 'No description available.'}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
              {/* Quantity */}
              <div className="flex flex-col items-start mb-4 md:mb-0">
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {product.stock} available
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full md:w-64 py-3 px-4 rounded-lg font-semibold text-white transition duration-300 flex items-center justify-center ${
                  product.stock > 0 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;