const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/User');
const catchAsyncErrors = require('./catchAsyncErrors.js');

// Check if user is authenticated
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log('Auth Middleware - Headers:', req.headers);
  
  let token;
  
  // Get token from header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token from Authorization header:', token);
  } else if (req.cookies.token) {
    token = req.cookies.token;
    console.log('Token from cookies:', token);
  }

  if (!token) {
    console.error('No token found in request');
    return next(new ErrorHandler('Please log in to access this resource', 401));
  }

  try {
    // Verify token
    console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret is set' : 'Secret is NOT set');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    // Check if we have a valid user ID in the token
    const userId = decoded.id || decoded.userId || decoded._id;
    console.log('Extracted user ID:', userId);
    
    if (!userId) {
      console.error('No user ID found in token');
      return next(new ErrorHandler('Invalid token format', 401));
    }
    
    // Get user from database and attach to request
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler('User not found', 401));
    }
    
    // Set user and user ID to request object
    req.user = user;
    req.userId = userId;
    console.log('Set req.user and req.userId');
    
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
});

// Authorize user roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('User not authenticated', 401));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles
};
