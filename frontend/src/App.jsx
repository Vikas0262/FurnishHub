import "./App.css";
import React from 'react';
import { BrowserRouter as Router, useLocation, Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from './component/Footer.jsx';
import { AppRoutes, HIDE_HEADER_PATHS } from './routes';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';

const AppContent = () => {
  const location = useLocation();
  const shouldHideHeader = HIDE_HEADER_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail/:title" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
      {!shouldHideHeader && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
