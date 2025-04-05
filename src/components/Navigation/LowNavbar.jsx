import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaStore, FaPalette, FaCube, FaFire } from 'react-icons/fa';

const LowNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/shop', icon: <FaStore />, label: 'Shop' },
    { path: '/customize', icon: <FaPalette />, label: 'Customize' },
    { path: '/virtual-showroom', icon: <FaCube />, label: 'Virtual View' },
    { path: '/trending', icon: <FaFire />, label: 'Trending' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky bottom-0 left-0 right-0 z-50 lg:relative lg:bottom-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center lg:justify-center lg:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 transition-colors ${
                location.pathname === item.path
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default LowNavbar; 