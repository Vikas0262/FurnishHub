import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';

const ProductForm = ({ onClose, onProductAdded, productToEdit }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: 'Electronics',
    stock: 0,
    seller: '',
    images: []
  });

  // Initialize form with product data if in edit mode
  useEffect(() => {
    if (productToEdit) {
      console.log('Setting product data:', productToEdit);
      setProductData({
        name: productToEdit.name || '',
        price: productToEdit.price || 0,
        description: productToEdit.description || '',
        category: productToEdit.category || 'Electronics',
        stock: productToEdit.stock || 0,
        seller: productToEdit.seller || '',
        images: productToEdit.images || []
      });
    } else {
      // Reset form for new product
      setProductData({
        name: '',
        price: 0,
        description: '',
        category: 'Electronics',
        stock: 0,
        seller: '',
        images: []
      });
    }
  }, [productToEdit]);
  
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
    const { name, value } = e.target;
    console.log(`Field changed - ${name}:`, value);
    setProductData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      console.log('Submitting form data:', productData);
      
      if (productToEdit) {
        // Update existing product
        console.log('Updating product:', productToEdit._id);
        await updateProduct(productToEdit._id, productData, token);
      } else {
        // Create new product
        console.log('Creating new product');
        await createProduct(productData, token);
      }
      
      onProductAdded();
      onClose();
    } catch (err) {
      const errorMessage = productToEdit 
        ? 'Failed to update product' 
        : 'Failed to create product';
      setError(err.response?.data?.message || errorMessage);
      console.error('Error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {productToEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller</label>
              <input
                type="text"
                name="seller"
                value={productData.seller}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows="3"
                value={productData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading 
                  ? (productToEdit ? 'Updating...' : 'Adding...') 
                  : (productToEdit ? 'Update Product' : 'Add Product')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
