import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaRuler, FaChair, FaCheck } from 'react-icons/fa';

const customizationOptions = {
  styles: ['Modern', 'Traditional', 'Contemporary', 'Industrial', 'Scandinavian'],
  materials: ['Premium Leather', 'Velvet', 'Linen', 'Wood', 'Metal'],
  dimensions: {
    width: { min: 60, max: 240, step: 10 },
    depth: { min: 60, max: 120, step: 10 },
    height: { min: 40, max: 100, step: 5 },
  },
};

const Customize = () => {
  const [selectedStyle, setSelectedStyle] = useState(customizationOptions.styles[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(customizationOptions.materials[0]);
  const [dimensions, setDimensions] = useState({
    width: 120,
    depth: 80,
    height: 60,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Customize Your Furniture</h1>
            <p className="text-gray-600">Create your perfect piece with our interactive customization tool</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="aspect-square rounded-xl bg-gray-100 mb-6">
                {/* 3D Preview will go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  3D Preview Coming Soon
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-semibold">Current Selection</h3>
                  <p className="text-sm text-gray-600">{selectedStyle} style in {selectedMaterial}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700"
                >
                  Save Design
                </motion.button>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-8">
              {/* Style Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaChair className="text-red-600" />
                  Choose Style
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {customizationOptions.styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedStyle === style
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {style}
                      {selectedStyle === style && (
                        <FaCheck className="inline ml-2 text-red-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaPalette className="text-red-600" />
                  Select Material
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {customizationOptions.materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedMaterial === material
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {material}
                      {selectedMaterial === material && (
                        <FaCheck className="inline ml-2 text-red-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaRuler className="text-red-600" />
                  Set Dimensions (cm)
                </h3>
                <div className="space-y-4">
                  {Object.entries(dimensions).map(([dimension, value]) => (
                    <div key={dimension}>
                      <div className="flex justify-between mb-2">
                        <label className="text-gray-600 capitalize">{dimension}</label>
                        <span className="font-medium">{value} cm</span>
                      </div>
                      <input
                        type="range"
                        min={customizationOptions.dimensions[dimension].min}
                        max={customizationOptions.dimensions[dimension].max}
                        step={customizationOptions.dimensions[dimension].step}
                        value={value}
                        onChange={(e) =>
                          setDimensions((prev) => ({
                            ...prev,
                            [dimension]: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-600 
                          [&::-webkit-slider-thumb]:rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize; 