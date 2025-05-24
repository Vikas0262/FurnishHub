import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiUser, FiLogOut, FiUser as UserIcon } from "react-icons/fi";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 5,
    border: `2px solid white`,
    padding: "0 4px",
  },
}));

function MidNav({ setIsMobileMenuOpen, isMobileMenuOpen }) {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get user info from token
  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded); // Debug log
      // Try different possible name fields in the token
      const userName = decoded.name || decoded.username || decoded.email?.split('@')[0] || 'User';
      return {
        name: userName,
        firstLetter: userName.charAt(0).toUpperCase()
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const user = getUserInfo();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItemCount(cartItems.length);
  };

  useEffect(() => {
    // Initial count
    updateCartCount();

    // Listen for storage changes (for changes from other tabs)
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom event (for changes in the same tab)
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <div className="container flex flex-wrap items-center justify-between mid-navbar ">
      <div className="col1 w-full sm:w-[20%] flex items-center justify-between">
        <div className="text-[2rem] font-semibold">
          Furnish<span className="font-bold text-red-600">Hub</span>
        </div>
        <button 
          className="sm:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
      
      <div className="col2 w-full sm:w-[50%] mt-4 sm:mt-0">
        <div className="search-box w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for Products"
            className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
          />
          <button className="pr-4">
            <FiSearch className="text-[18px]" />
          </button>
        </div>
      </div>

      <div className="col3 w-full sm:w-[30%] mt-4 sm:mt-0">
        <ul className="flex items-center justify-end w-full gap-3">
          <li className="relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold hover:bg-purple-200 transition-colors"
                  aria-label="User profile"
                >
                  {user.firstLetter}
                </button>
                {isDropdownOpen && (
                  <div className="fixed sm:absolute top-[70px] right-4 sm:right-0 sm:mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-[1000]">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">View and manage your profile</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserIcon className="mr-3 text-gray-500" size={18} />
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="mr-3" size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="link transition text-[15px] font-[500]"
                >
                  Login
                </Link>{" "}
                | &nbsp;
                <Link
                  to="/register"
                  className="link transition text-[15px] font-[500]"
                >
                  Signup
                </Link>
              </>
            )}
          </li>
          <li>
            <Tooltip title="Cart">
              <IconButton 
                aria-label="cart"
                onClick={() => navigate('/cart')}
                className="cursor-pointer"
              >
                <StyledBadge badgeContent={cartItemCount} color="secondary">
                  <MdOutlineShoppingCart className="text-2xl" />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Wish">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <FaRegHeart />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MidNav;
