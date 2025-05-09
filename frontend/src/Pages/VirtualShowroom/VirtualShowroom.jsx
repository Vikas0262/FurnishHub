import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { FaCube, FaMobileAlt, FaVrCardboard, FaInfoCircle } from 'react-icons/fa';

const showroomItems = [
  {
    id: 1,
    name: 'Modern Leather Sofa',
    category: 'Living Room',
    description: 'Elegant and comfortable leather sofa with modern design',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Dining Table Set',
    category: 'Dining Room',
    description: 'Contemporary dining set with 6 chairs',
    thumbnail: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3',
  },
  // Add more items as needed
];

const VirtualShowroom = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'ar'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Virtual Showroom</h1>
          <p className="text-gray-600">Experience our furniture in 3D and AR</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Item List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Available Items</h2>
              <div className="space-y-3">
                {showroomItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full p-4 rounded-xl border-2 transition-colors ${
                      selectedItem?.id === item.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="text-left">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - 3D/AR Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* View Mode Selector */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                    ${viewMode === '3d' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FaCube />
                  3D View
                </button>
                <button
                  onClick={() => setViewMode('ar')}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                    ${viewMode === 'ar' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <FaVrCardboard />
                  AR View
                </button>
              </div>

              {/* Viewer Container */}
              <div className="aspect-[4/3] rounded-xl bg-gray-100 mb-6">
                {selectedItem ? (
                  viewMode === '3d' ? (
                    <Canvas>
                      <Suspense fallback={null}>
                        <Stage>
                          {/* Add your 3D model here */}
                          <mesh>
                            <boxGeometry />
                            <meshStandardMaterial color="gray" />
                          </mesh>
                        </Stage>
                        <OrbitControls />
                      </Suspense>
                    </Canvas>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                      <FaMobileAlt className="text-4xl mb-4" />
                      <p className="text-center">
                        Scan with your mobile device<br />to view in AR
                      </p>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <FaInfoCircle className="text-4xl mb-4" />
                    <p>Select an item to view in 3D or AR</p>
                  </div>
                )}
              </div>

              {/* Item Details */}
              {selectedItem && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualShowroom; 