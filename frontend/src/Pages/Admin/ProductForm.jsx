import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onClose, onProductAdded, productToEdit }) => {
  const navigate = useNavigate();
  const isEditMode = !!productToEdit;
  
  // Initialize form with product data if in edit mode
  useEffect(() => {
    console.log('ProductForm - productToEdit:', productToEdit);
    if (isEditMode && productToEdit) {
      setProductData({
        name: productToEdit.name || '',
        price: productToEdit.price || 0,
        description: productToEdit.description || '',
        category: productToEdit.category || 'Electronics',
        stock: productToEdit.stock || 0,
        seller: productToEdit.seller || '',
        image: null
      });
      
      if (productToEdit.images && productToEdit.images.length > 0) {
        setImagePreview(productToEdit.images[0].url);
      }
    } else {
      // Reset form for new product
      setProductData({
        name: '',
        price: 0,
        description: '',
        category: 'Electronics',
        stock: 0,
        seller: '',
        image: null
      });
      setImagePreview('');
    }
  }, [productToEdit]);
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: 'Electronics',
    stock: 0,
    seller: '',
    image: null
  });
  
  const [imagePreview, setImagePreview] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image') {
      const file = files[0];
      setProductData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'stock' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting form data:', productData);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', Number(productData.price));
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('stock', Number(productData.stock));
      formData.append('seller', productData.seller);
      if (productData.image) {
        formData.append('image', productData.image);
      }
      
      console.log('Form data prepared:', Object.fromEntries(formData.entries()));
      
      if (isEditMode && productToEdit?._id) {
        console.log('Updating product:', productToEdit._id);
        await updateProduct(productToEdit._id, formData, token);
      } else {
        console.log('Creating new product');
        await createProduct(formData, token);
      }
      
      onProductAdded();
      onClose();
    } catch (err) {
      const errorMessage = isEditMode ? 'Failed to update product' : 'Failed to create product';
      setError(err.response?.data?.message || errorMessage);
      console.error('Error saving product:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        await deleteProduct(productToEdit._id, token);
        if (onClose) onClose();
        if (onProductAdded) onProductAdded();
        navigate('/admin/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
        console.error('Error deleting product:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="flex items-center gap-1">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50 rounded-full hover:bg-red-50"
                  title="Delete Product"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                disabled={loading}
                title="Close"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mb-3 p-2 text-sm bg-red-50 text-red-600 rounded border border-red-100">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="overflow-y-auto flex-1 -mx-3 px-3 py-1" style={{ maxHeight: 'calc(90vh - 120px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-1">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seller <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="seller"
                  value={productData.seller}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer bg-white py-1.5 px-2.5 border border-gray-300 rounded shadow-sm text-xs leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500">
                    Choose File
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="sr-only"
                      required
                    />
                  </label>
                  <span className="ml-2 text-xs text-gray-500 truncate max-w-[180px]">
                    {productData.image ? productData.image.name : 'No file chosen'}
                  </span>
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows="2"
                  value={productData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
            
            </div>
            <div className="border-t border-gray-200 px-4 py-3 flex justify-end space-x-2 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-1.5 text-xs border border-transparent rounded shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;