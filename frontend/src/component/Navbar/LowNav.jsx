import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CiMenuFries } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MegaDropdown from "./MegaDropdown";

function LowNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const handleTrendingClick = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const trendingSection = document.getElementById('trending-section');
        if (trendingSection) {
          trendingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const trendingSection = document.getElementById('trending-section');
      if (trendingSection) {
        trendingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const moreMenuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <div className="py-2 mt-3 border-t border-gray-300 bg-white sticky-nav">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center flex-grow">
            <div className="col1 w-full sm:w-[30%] mb-4 sm:mb-0">
              <div
                className="inline-block"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Button className="!text-black gap-2 w-full sm:w-[85%]">
                  <CiMenuFries className="text-xl" />
                  <span className="font-bold text-[14px] pr-3">SHOP BY CATEGORIES</span>
                  <FaAngleDown className="text-xl font-semibold"/>     
                </Button>
                {showDropdown && <MegaDropdown />}
              </div>
            </div>
            <div className="col2 w-full sm:w-[75%]">
              <ul className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <li><Link to="/" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Home</Link></li>
                <li><Link to="/products" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Products</Link></li>
                <li>
                  <a 
                    href="#trending-section" 
                    onClick={handleTrendingClick}
                    className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors"
                  >
                    Trending Products
                  </a>
                </li>
                <li><Link to="/contact" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Contact</Link></li>
                {/* <li><Link to="/furniture" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Furniture</Link></li> */}
                <li className="relative">
                  <div
                    onMouseEnter={() => setShowMoreDropdown(true)}
                    onMouseLeave={() => setShowMoreDropdown(false)}
                    className="cursor-pointer"
                  >
                    <span className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors flex items-center gap-1">
                      More
                      {/* <FaAngleDown className="text-sm" /> */}
                    </span>
                    {showMoreDropdown && (
                      <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50 animate-fadeIn">
                        {moreMenuItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/admin">
              <Button variant="outlined" color="primary" className="!border-red-500 !text-red-500 hover:!bg-red-50">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LowNav;
