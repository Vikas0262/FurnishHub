import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Create new product
export const createProduct = async (productData, token) => {
  const formData = new FormData();
  
  // Append all product data to formData
  Object.keys(productData).forEach(key => {
    if (key === 'image' && productData[key]) {
      formData.append('image', productData[key]);
    } else if (productData[key] !== null && productData[key] !== undefined) {
      formData.append(key, productData[key]);
    }
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  };

  console.log('Sending product data:', Object.fromEntries(formData.entries()));
  
  const response = await axios.post(`${API_URL}/product/new`, formData, config);
  return response.data;
};

// Get all products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData, token) => {
  const formData = new FormData();
  
  // Append all product data to formData
  Object.keys(productData).forEach(key => {
    if (key === 'image' && productData[key]) {
      formData.append('image', productData[key]);
    } else if (productData[key] !== null && productData[key] !== undefined) {
      formData.append(key, productData[key]);
    }
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  };

  console.log('Updating product with data:', Object.fromEntries(formData.entries()));
  
  const response = await axios.put(`${API_URL}/product/${id}`, formData, config);
  return response.data;
};

// Delete product
export const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    withCredentials: true
  };

  const response = await axios.delete(`${API_URL}/product/${id}`, config);
  return response.data;
};

// Get product details
export const getProductDetails = async (id) => {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
};