const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load environment variables
// dotenv.config({ path: '../config/config.env' });

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vikasv6543:vikas123@cluster0.2yacmfv.mongodb.net/");
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
  },
  {
    "name": "Jaheim Inlay Dining Table",
    "price": 227700,
    "description": "An elegant dining table with inlay design.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/j/a/jaheim_inlay_coffee_table_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Ares Coffee Table",
    "price": 131500,
    "description": "A sleek and modern coffee table.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/a/r/ares_coffee_table_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Thea Bar Table",
    "price": 98800,
    "description": "A contemporary bar table.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/t/h/thea_bar_table_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Sanctum Art Cabinet",
    "price": 96300,
    "description": "A sophisticated art cabinet.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/s/a/sanctum_art_cabinet_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Orion Bar Chair",
    "price": 0,
    "description": "A stylish bar chair.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/o/r/orion_bar_chair_700_x_700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Nzete Coffee Table",
    "price": 115000,
    "description": "A stunning coffee table with unique design.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/n/z/nzete_coffee_table_700x700_1.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Citron Curved Sofa",
    "price": 246000,
    "description": "A luxurious curved sofa in lime color.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/c/i/citron_curved_sofa_lime_700x700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Makasi Bar Cabinet",
    "price": 330000,
    "description": "A premium bar cabinet with a unique design.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/m/a/makasi_bar_cabinet_700x700.jpg"
      }
    ],
    "category": "Home",
    "seller": "The Edit",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Sake Cabinet",
    "price": 0,
    "description": "A sleek and functional cabinet.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/s/a/sake_cabinet_700x700_ms2_1.jpg"
      }
    ],
    "category": "Home",
    "seller": "THOT X RHEA",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Noir Baroque Accent Chair",
    "price": 55000,
    "description": "An elegant baroque-style accent chair.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/n/o/noir_baroque_accent_chair_700x700_1.jpg"
      }
    ],
    "category": "Home",
    "seller": "Mayur Arts",
    "stock": 10,
    "numOfReviews": 0,
    "reviews": []
  },
  {
    "name": "Saga Media Unit",
    "price": 0,
    "description": "A sleek media unit for modern living spaces.",
    "ratings": 0,
    "images": [
      {
        "public_id": "",
        "url": "https://thot-media.thehouseofthings.com/media/catalog/product/cache/23805d0b5733a0fa8b043eb92f9a261d/s/a/saga_media_unit_700x700up.jpg"
      }
    ],
    "category": "Home",
    "seller": "THOT X RHEA",
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
