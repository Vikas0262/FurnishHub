import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { FaStar, FaHeart, FaShoppingCart, FaShare, FaCube } from 'react-icons/fa';

// Mock product data
const product = {
  id: 1,
  name: 'Modern Leather Sofa',
  price: 1299,
  description: 'Experience ultimate comfort with our premium leather sofa. Features deep seating, plush cushions, and a timeless design that complements any living space.',
  rating: 4.8,
  reviews: 124,
  colors: ['Stone Gray', 'Rich Brown', 'Classic Black'],
  materials: ['Premium Leather', 'Velvet Finish', 'Linen Blend'],
  sizes: ['2 Seater', '3 Seater', 'L-Shaped'],
  images: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3',
  ]
};

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showAR, setShowAR] = useState(false);

  const calculatePrice = () => {
    let basePrice = product.price;
    // Add price modifiers based on selections
    if (selectedSize === '3 Seater') basePrice *= 1.5;
    if (selectedSize === 'L-Shaped') basePrice *= 2;
    if (selectedMaterial === 'Premium Leather') basePrice *= 1.2;
    return (basePrice * quantity).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowAR(true)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 rounded-full 
                    shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
                >
                  <FaCube />
                  View in 3D
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-red-600' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-900 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-gray-600">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Material</h3>
                <div className="flex gap-3">
                  {product.materials.map(material => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors ${
                        selectedMaterial === material
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="text-3xl font-bold">${calculatePrice()}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-8 py-4 bg-red-600 text-white rounded-full font-semibold 
                    flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <FaShoppingCart />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-4 rounded-full border-2 border-gray-200 hover:border-gray-300"
                >
                  <FaHeart className="text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-4 rounded-full border-2 border-gray-200 hover:border-gray-300"
                >
                  <FaShare className="text-gray-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Viewer Modal */}
        {showAR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="relative w-full max-w-4xl aspect-square bg-gray-900 rounded-2xl overflow-hidden">
              <Canvas>
                <Suspense fallback={null}>
                  <Stage>
                    {/* Add your 3D model here */}
                    <mesh>
                      <boxGeometry />
                      <meshStandardMaterial color={selectedColor.toLowerCase()} />
                    </mesh>
                  </Stage>
                  <OrbitControls />
                </Suspense>
              </Canvas>
              <button
                onClick={() => setShowAR(false)}
                className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 