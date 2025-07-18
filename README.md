﻿# FurnishHub - Modern E-commerce Furniture Store

## 🛋️ Overview
FurnishHub is a full-stack e-commerce platform specializing in modern furniture and home decor. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a seamless shopping experience with features like product browsing, user authentication, admin dashboard, and more.

## ✨ Features

### Frontend
- **User Authentication**: Secure login/register system with JWT
- **Product Browsing**: Filter and search through furniture collections
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Secure payment integration
- **User Profile**: Order history and account management
- **Responsive Design**: Works on all device sizes
- **Interactive UI/UX**: Modern animations and transitions

### Backend
- **RESTful API**: Well-structured API endpoints
- **User Management**: Authentication & authorization
- **Product Management**: CRUD operations for products
- **Order Processing**: Handle orders and payments
- **File Upload**: Image management with Cloudinary
- **Security**: Protected routes, input validation, rate limiting

### Admin Panel
- **Dashboard**: Overview of store metrics
- **Product Management**: Add/edit/delete products
- **Order Management**: View and update order status
- **User Management**: View and manage users
- **Category Management**: Organize products by categories

## 🚀 Tech Stack

### Frontend
- React.js
- React Router
- Redux (State Management)
- Tailwind CSS (Styling)
- Axios (HTTP Client)
- React Icons
- Framer Motion (Animations)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Multer (File Uploads)
- Cloudinary (Image Storage)
- Nodemailer (Email Notifications)

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Backend Setup
1. Navigate to the backend directory:
   `ash
   cd backend
   `
2. Install dependencies:
   `ash
   npm install
   `
3. Create a .env file in the backend directory with the following variables:
   `env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   `
4. Start the backend server:
   `ash
   npm start
   `

### Frontend Setup
1. Navigate to the frontend directory:
   `ash
   cd frontend
   `
2. Install dependencies:
   `ash
   npm install
   `
3. Create a .env file in the frontend directory with the following variables:
   `env
   VITE_BACKEND_URL=http://localhost:5000/api/
   `
4. Start the development server:
   `ash
   npm run dev
   `

## 🌟 Project Structure

`
FurnishHub/
├── backend/               # Backend server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Server entry point
│
├── frontend/            # Frontend React app
│   ├── public/           # Static files
│   └── src/
│       ├── assets/      # Images, fonts, etc.
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── redux/        # State management
│       ├── App.jsx       # Main App component
│       └── main.jsx      # Entry point
│
└── README.md            # Project documentation
`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made by [Vikas Vishwakarma] | [GitHub Profile](https://github.com/vikas0262)
