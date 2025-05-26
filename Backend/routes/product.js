const express = require('express');
const multer = require('multer');
const router = express.Router();
const { 
  createProduct, 
  getProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct,
  adminGetProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminDeleteProduct
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Configure multer for file upload with memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Public routes
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

// Protected routes (require authentication)
router.route('/product/new').post(
  isAuthenticatedUser, 
  upload.single('image'), // 'image' is the field name in the form
  createProduct
);

// Admin product management routes
router.route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), adminGetProducts);

router.route('/admin/product/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), adminGetProduct)
  .put(
    isAuthenticatedUser, 
    authorizeRoles('admin'), 
    upload.single('image'), 
    adminUpdateProduct
  )
  .delete(isAuthenticatedUser, authorizeRoles('admin'), adminDeleteProduct);

// Regular user product routes
router.route('/product/:id')
  .put(isAuthenticatedUser, upload.single('image'), updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
