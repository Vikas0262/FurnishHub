import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth/Login/Login.jsx";
import Forget from "./Pages/Auth/Forget/Forget.jsx";
import Register from "./Pages/Auth/Register/Register.jsx";
import Products from "./Pages/Products.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import Header from "./component/Header/Header.jsx";
import ProductDetail from './Pages/Admin/ProductDetail';
import Contact from './Pages/Contact';
import Footer from './component/Footer/Footer.jsx';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/register', '/forget', '/admin'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeader && <Header />}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
