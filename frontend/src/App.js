import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop/Shop';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Customize from './Pages/Customize/Customize';
import VirtualShowroom from './Pages/VirtualShowroom/VirtualShowroom';
import Trending from './Pages/Trending/Trending';
import LowNavbar from './components/Navigation/LowNavbar';
import { FaStore, FaPalette, FaCube, FaFire } from 'react-icons/fa';

function App() {
  const navItems = [
    { path: '/shop', icon: <FaStore />, label: 'Shop' },
    { path: '/customize', icon: <FaPalette />, label: 'Customize' },
    { path: '/virtual-showroom', icon: <FaCube />, label: 'Virtual View' },
    { path: '/trending', icon: <FaFire />, label: 'Trending' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/virtual-showroom" element={<VirtualShowroom />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
        <LowNavbar />
      </div>
    </Router>
  );
}

export default App; 