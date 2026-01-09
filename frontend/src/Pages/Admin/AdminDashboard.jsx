import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Animation components are imported but not used in this file
import { 
  FaBox, FaUsers, FaShoppingCart, FaChartLine, 
  FaTachometerAlt, FaList, FaPlus, FaCog, FaSignOutAlt,
  FaEdit, FaTrash, FaBars, FaTimes
} from 'react-icons/fa';
import { getProducts, deleteProduct } from '../../services/productService';
import ProductForm from './ProductForm.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.products || []);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        
        await deleteProduct(productId, token);
        setProducts(products.filter(product => product._id !== productId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    console.log('Editing product:', product);
    
    // Ensure we have a valid product object
    if (!product || !product._id) {
      console.error('Invalid product data:', product);
      setError('Invalid product data');
      return;
    }
    
    // Set the form to be visible first
    setShowProductForm(true);
    
    // Then update the product data
    setEditingProduct({
      _id: product._id,
      name: product.name || '',
      price: product.price || 0,
      description: product.description || '',
      category: product.category || 'Electronics',
      stock: product.stock || 0,
      seller: product.seller || '',
      images: product.images || []
    });
    
    console.log('Edit form should now be visible');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const stats = [
    { name: 'Total Products', value: products.length, icon: FaBox, color: 'bg-blue-500' },
    { name: 'Total Users', value: '1.4k', icon: FaUsers, color: 'bg-green-500' },
    { name: 'Total Orders', value: '90', icon: FaShoppingCart, color: 'bg-purple-500' },
    { name: 'Revenue', value: '$12.5k', icon: FaChartLine, color: 'bg-red-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden bg-gray-900 text-white p-2 flex justify-between items-center fixed w-full z-20">
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <FaBox className="h-6 w-6 text-red-500" />
            <span className="text-xl font-extrabold">Admin</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className={`bg-gray-900 text-white w-56 space-y-4 py-4 px-2 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-10 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center space-x-2 px-3 mt-6 md:mt-2">
          <FaBox className="h-8 w-8 text-red-500 hidden md:block" />
          <span className="text-2xl font-extrabold hidden md:block">Admin</span>
        </div>
        
        <nav className="mt-6 md:mt-2 space-y-1">
          <NavItem 
            icon={FaTachometerAlt} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => {
              setActiveTab('dashboard');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
          <NavItem 
            icon={FaBox} 
            text="Products" 
            active={activeTab === 'products'} 
            onClick={() => {
              setActiveTab('products');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
          <NavItem 
            icon={FaUsers} 
            text="Users" 
            active={activeTab === 'users'} 
            onClick={() => {
              setActiveTab('users');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
          <NavItem 
            icon={FaShoppingCart} 
            text="Orders" 
            active={activeTab === 'orders'} 
            onClick={() => {
              setActiveTab('orders');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
          <NavItem 
            icon={FaChartLine} 
            text="Analytics" 
            active={activeTab === 'analytics'} 
            onClick={() => {
              setActiveTab('analytics');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
          <NavItem 
            icon={FaCog} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => {
              setActiveTab('settings');
              if (isMobile) setIsSidebarOpen(false);
            }} 
          />
        </nav>
        
        <div className="absolute bottom-0 w-full left-0 p-2">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 rounded-md hover:text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto md:ml-56 pt-14 md:pt-0">
        <div className="flex justify-between items-center p-4 md:p-6 pb-2 md:pb-4 sticky top-0 bg-gray-100 z-10">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'products' && 'Products'}
            {activeTab === 'users' && 'Users'}
            {activeTab === 'orders' && 'Orders'}
            {activeTab === 'analytics' && 'Analytics'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          {activeTab === 'products' && (
            <button
              onClick={handleAddProduct}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mx-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow overflow-hidden mx-8 flex flex-col flex-1">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {error}
              </div>
            )}
            <div className="overflow-x-auto overflow-y-auto flex-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {product.images?.[0]?.url ? (
                                <img 
                                  className="h-10 w-10 rounded-full object-cover" 
                                  src={product.images[0].url} 
                                  alt={product.name} 
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <FaBox className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.seller}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price?.toFixed(2) || '0.00'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} in stock
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                            title="Edit product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="flex items-center justify-center h-96 mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-6">
                  <FaUsers className="text-blue-500" size={48} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Users Management</h2>
              <p className="text-gray-600 text-lg mb-4">
                Advanced user management features and analytics coming soon
              </p>
              <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <span className="font-semibold">🚀 Coming Soon</span>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="flex items-center justify-center h-96 mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 rounded-full p-6">
                  <FaShoppingCart className="text-purple-500" size={48} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Orders Management</h2>
              <p className="text-gray-600 text-lg mb-4">
                Order tracking, status updates, and fulfillment management coming soon
              </p>
              <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <span className="font-semibold">🚀 Coming Soon</span>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="flex items-center justify-center h-96 mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-6">
                  <FaChartLine className="text-green-500" size={48} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Analytics & Reports</h2>
              <p className="text-gray-600 text-lg mb-4">
                Detailed sales analytics, charts, trends, and comprehensive business reports coming soon
              </p>
              <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <span className="font-semibold">🚀 Coming Soon</span>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex items-center justify-center h-96 mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-orange-100 rounded-full p-6">
                  <FaCog className="text-orange-500" size={48} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Settings & Configuration</h2>
              <p className="text-gray-600 text-lg mb-4">
                Admin settings, system configuration, and preferences management coming soon
              </p>
              <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                <span className="font-semibold">🚀 Coming Soon</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow rounded-lg p-3 md:p-4">
            <ProductForm
              productToEdit={editingProduct}
              onClose={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              onProductAdded={handleProductUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon: Icon, text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-6 py-3 mt-1 ${active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    >
      {React.createElement(Icon, { className: "mr-3" })}
      {text}
    </button>
  );
};

export default AdminDashboard;
