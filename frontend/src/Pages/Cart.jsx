import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage or a state management library
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
    calculateTotal(items);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    // Dispatch custom event to update cart count in the navbar
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };

  const handleItemClick = (item) => {
    navigate(`/product-detail/${item.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleCouponApply = () => {
    // Example coupon codes: WELCOME10, SUMMER20, FURNISH30
    const validCoupons = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'FURNISH30': 30
    };

    if (validCoupons[couponCode]) {
      const discount = (totalAmount * validCoupons[couponCode]) / 100;
      setDiscountAmount(discount);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscountAmount(0);
    }
  };

  const handlePayment = () => {
    navigate('/payment', { 
      state: { 
        items: cartItems,
        subtotal: totalAmount,
        discount: discountAmount,
        total: totalAmount - discountAmount
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shopping Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div 
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors duration-300">{item.name}</h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800">${item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right Column - Coupon and Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Coupon Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {couponError && (
                      <p className="text-red-500 text-sm mt-1">{couponError}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleCouponApply}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalAmount.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">
                      ${(totalAmount - discountAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 