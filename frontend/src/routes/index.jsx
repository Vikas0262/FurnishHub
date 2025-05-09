import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Auth/Login/Login.jsx";
import Forget from "../Pages/Auth/Forget/Forget.jsx";
import Register from "../Pages/Auth/Register/Register.jsx";
import Products from "../Pages/Product/Products.jsx";
import ProductDetail from "../Pages/Product/ProductDetail.jsx";
import AdminLogin from "../Pages/Admin/AdminLogin.jsx";
import AdminDashboard from "../Pages/Admin/AdminDashboard.jsx";
import Contact from '../Pages/Contact';
import Cart from '../Pages/Cart';
import Payment from '../Pages/Payment';
import OrderConfirmation from '../Pages/OrderConfirmation';
import ProtectedRoute from '../component/ProtectedRoute.jsx';

// List of paths where header should be hidden
export const HIDE_HEADER_PATHS = [
  '/login',
  '/register',
  '/forget',
  '/admin',
  '/order-confirmation'
];

// Public routes that don't require authentication
const publicRoutes = [
  { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: '/products', element: <ProtectedRoute><Products /></ProtectedRoute> },
  { path: '/product-detail/:title', element: <ProtectedRoute><ProductDetail /></ProtectedRoute> },
  { path: '/contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
  { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
  { path: '/payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
  { path: '/order-confirmation', element: <ProtectedRoute><OrderConfirmation /></ProtectedRoute> }
];

// Authentication routes
const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forget', element: <Forget /> }
];

// Admin routes
const adminRoutes = [
  { path: '/admin', element: <AdminLogin /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> }
];

// Combine all routes
const allRoutes = [
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes
];

export const AppRoutes = () => {
  return (
    <Routes>
      {allRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}; 