import React from "react";
import Button from "@mui/material/Button";
import { CiMenuFries } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

function LowNav() {
  return (
    <div className="py-2 mt-3 border-t border-gray-300 bg-white sticky-nav">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center flex-grow">
            <div className="col1 w-full sm:w-[30%] mb-4 sm:mb-0">
              <Button className="!text-black gap-2 w-full sm:w-[85%]">
                <CiMenuFries className="text-xl" />
                <span className="font-bold text-[14px] pr-3">SHOP BY CATEGORIES</span>
                <FaAngleDown className="text-xl font-semibold"/>     
              </Button>
            </div>
            <div className="col2 w-full sm:w-[75%]">
              <ul className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <li><Link to="/" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Home</Link></li>
                <li><Link to="/" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">New Arrivals</Link></li>
                <li><Link to="/products" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Products</Link></li>
                <li><Link to="/furniture" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">Furniture</Link></li>
                <li><Link to="/" className="font-semibold block py-2 sm:py-0 hover:text-red-500 transition-colors">More</Link></li>
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
