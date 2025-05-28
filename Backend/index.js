import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ErrorHandler from './utils/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // Allow all origins
  },
  credentials: true
}));

app.options('*', cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI )
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/uploadRoute.js';
import productRoutes from './routes/product.js';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', uploadRoutes);
app.use('/api/v1', productRoutes);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 