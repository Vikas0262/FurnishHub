import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample products data (replace with your actual products)
const products = [
  {
    "name": "Nico Cladded Console",
    "price": 220300,
    "description": "A stylish console table with a cladded design.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/n/i/nico_cladded_console_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  }
];

// Function to import products
const importProducts = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log('Starting product import...');
    
    // Get the admin user ID from environment variables or use a default one
    const adminUserId = '681e32be047612a143759ee9';
    
    if (adminUserId === 'YOUR_ADMIN_USER_ID') {
      console.error('Please set the ADMIN_USER_ID in your environment variables');
      process.exit(1);
    }

    // Add user ID to each product
    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUserId,
      createdAt: new Date()
    }));

    // Insert all products
    const result = await Product.insertMany(productsWithUser);
    
    console.log(`Successfully imported ${result.length} products`);
    console.log('Products imported successfully!');
    
    // Close the database connection
    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

// Execute the import
importProducts();
