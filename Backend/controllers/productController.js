const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

// Admin: Get all products with filtering and pagination
const adminGetProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    
    // Add search filter
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Add category filter
    if (category) {
      query.category = category;
    }

    // Get products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'name email');

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      products
    });
  } catch (error) {
    console.error('Error in adminGetProducts:', error);
    next(new ErrorHandler('Error fetching products', 500));
  }
});

// Admin: Get single product by ID
const adminGetProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorHandler('Invalid product ID', 400));
    }

    const product = await Product.findById(req.params.id).populate('user', 'name email');
    
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error in adminGetProduct:', error);
    next(new ErrorHandler('Error fetching product', 500));
  }
});

// Admin: Update product
const adminUpdateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorHandler('Invalid product ID', 400));
    }

    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    // Prepare update data
    const updateData = { ...req.body };
    
    // Handle image upload if new image is provided
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (product.images && product.images.length > 0 && product.images[0].public_id) {
        await cloudinary.v2.uploader.destroy(product.images[0].public_id);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: 'furnishhub/products',
            width: 1500,
            crop: 'scale'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      updateData.images = [{
        public_id: result.public_id,
        url: result.secure_url
      }];
    }

    // Update product
    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error in adminUpdateProduct:', error);
    next(new ErrorHandler('Error updating product', 500));
  }
});

// Admin: Delete product
const adminDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorHandler('Invalid product ID', 400));
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    // Delete image from Cloudinary if exists
    if (product.images && product.images.length > 0 && product.images[0].public_id) {
      await cloudinary.v2.uploader.destroy(product.images[0].public_id);
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error in adminDeleteProduct:', error);
    next(new ErrorHandler('Error deleting product', 500));
  }
});

// Create new product   =>  /api/v1/product/new
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log('=== Starting Product Creation ===');
    console.log(`[${new Date().toISOString()}] Request received from user ID:`, req.userId);
    
    if (!req.userId) {
      console.error('[ERROR] No user ID found in request');
      return next(new ErrorHandler('User not authenticated', 401));
    }

    // Log request details
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Parse the form data
    const { name, price, description, category, stock, seller } = req.body;
    
    // Define allowed categories (must match the Product model)
    const allowedCategories = [
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
    
    // Validate required fields
    if (!name || !price || !description || !category || !stock || !seller) {
      console.error('[ERROR] Missing required fields');
      return next(new ErrorHandler('Please fill in all required fields', 400));
    }
    
    // Validate category
    if (!allowedCategories.includes(category)) {
      console.error(`[ERROR] Invalid category: ${category}`);
      return next(new ErrorHandler(`Invalid category. Allowed values are: ${allowedCategories.join(', ')}`, 400));
    }

    // Create product data object
    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      seller,
      user: req.userId
    };
    
    // Handle image upload if exists
    if (req.file) {
      console.log('Processing image upload...');
      console.log('Uploading file:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        buffer: !!req.file.buffer,
        path: req.file.path
      });
      
      try {
        // Check if we have the file buffer or path
        const uploadOptions = {
          folder: 'furnishhub/products',
          width: 1500,
          crop: 'scale'
        };

        let result;
        if (req.file.buffer) {
          // If we have the file buffer, upload it directly
          result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
              uploadOptions,
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(req.file.buffer);
          });
        } else if (req.file.path) {
          // If we have a file path, use that
          result = await cloudinary.v2.uploader.upload(req.file.path, uploadOptions);
        } else {
          throw new Error('No file data available for upload');
        }
        
        console.log('Cloudinary upload successful:', {
          public_id: result.public_id,
          url: result.secure_url,
          size: result.bytes ? `${(result.bytes / 1024).toFixed(2)} KB` : 'unknown'
        });
        
        productData.images = [{
          public_id: result.public_id,
          url: result.secure_url
        }];
        
      } catch (uploadError) {
        console.error('[ERROR] Failed to upload file:', {
          message: uploadError.message,
          stack: uploadError.stack,
          name: uploadError.name,
          http_code: uploadError.http_code
        });
        // Continue without image if upload fails
      }
    } else {
      console.log('No image file found in the request');
    }
    
    // Log product data before creation
    console.log('Creating product with data:', JSON.stringify({
      ...productData,
      images: productData.images ? 'Image attached' : 'No image',
    }, null, 2));
    
    // Create product
    const product = await Product.create(productData);
    
    console.log('Product created successfully:', {
      productId: product._id,
      name: product.name,
      price: product.price,
      images: product.images ? product.images.length : 0,
      createdAt: product.createdAt
    });
    
    console.log('=== Product Creation Completed Successfully ===');
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
    
  } catch (error) {
    console.error('[ERROR] Failed to create product:', {
      error: error.message,
      stack: error.stack,
      name: error.name
    });
    next(new ErrorHandler(error.message, 500));
  }
});

// Get all products   =>   /api/v1/products
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
});

// Get single product details   =>   /api/v1/product/:id
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});

// Update Product   =>   /api/v1/admin/product/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log('=== Starting Product Update ===');
    console.log(`[${new Date().toISOString()}] Updating product ID:`, req.params.id);
    
    let product = await Product.findById(req.params.id);

    if (!product) {
      console.error('[ERROR] Product not found');
      return next(new ErrorHandler('Product not found', 404));
    }

    // Parse the form data
    const { name, price, description, category, stock, seller } = req.body;
    
    // Update product data
    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      seller
    };

    // Handle image upload if exists
    if (req.file) {
      console.log('Processing image update...');
      
      try {
        // Delete old image from Cloudinary if exists
        if (product.images && product.images.length > 0) {
          await cloudinary.v2.uploader.destroy(product.images[0].public_id);
        }

        // Upload new image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
              folder: 'furnishhub/products',
              width: 1500,
              crop: 'scale'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file.buffer);
        });
        
        console.log('Cloudinary upload successful:', {
          public_id: result.public_id,
          url: result.secure_url
        });
        
        productData.images = [{
          public_id: result.public_id,
          url: result.secure_url
        }];
        
      } catch (uploadError) {
        console.error('[ERROR] Failed to update image:', uploadError);
        return next(new ErrorHandler('Failed to update product image', 500));
      }
    }

    // Update product
    product = await Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    console.log('Product updated successfully:', {
      productId: product._id,
      name: product.name
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
    
  } catch (error) {
    console.error('[ERROR] Failed to update product:', error);
    next(new ErrorHandler(error.message, 500));
  }
});

// Delete Product   =>   /api/v1/admin/product/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log('=== Starting Product Deletion ===');
    console.log(`[${new Date().toISOString()}] Deleting product ID:`, req.params.id);
    
    const product = await Product.findById(req.params.id);

    if (!product) {
      console.error('[ERROR] Product not found');
      return next(new ErrorHandler('Product not found', 404));
    }

    // Delete image from Cloudinary if exists
    if (product.images && product.images.length > 0) {
      try {
        await cloudinary.v2.uploader.destroy(product.images[0].public_id);
        console.log('Deleted image from Cloudinary:', product.images[0].public_id);
      } catch (error) {
        console.error('[ERROR] Failed to delete image from Cloudinary:', error);
        // Continue with product deletion even if image deletion fails
      }
    }

    // Use deleteOne() instead of remove()
    await Product.findByIdAndDelete(req.params.id);
    
    console.log('Product deleted successfully:', req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    console.error('[ERROR] Failed to delete product:', error);
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  // Regular user functions
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  
  // Admin functions
  adminGetProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminDeleteProduct
};
