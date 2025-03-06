import React from "react";
import Button from "@mui/material/Button";
import { CiMenuFries } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

function LowNav() {
  return (
    <div className="py-2 mt-3 mb-3 border-t border-gray-300 bg-red sticky-nav">
      <div className="container flex items-center justify-end ">
        <div className="col1 w-[25%] ">
          <Button className="!text-black gap-3 w-[85%]">
            <CiMenuFries className="text-xl" />
            <span className="font-bold text-[14px] pr-3">SHOP BY CATEGORIES</span>
            <FaAngleDown className="text-xl font-semibold"/>     
          </Button>
        </div>
        <div className="col2 w-[75%] ">
            <ul className="flex gap-5">
                <li>
                    <Link to="/" className="font-semibold">Home</Link>
                </li>
                <li><Link to="/" className="font-semibold">New Arrivals</Link></li>
                <li><Link to="/" className="font-semibold">More</Link></li>
            </ul>
        </div>
        <div className="col3"></div>
      </div>
    </div>
  );
}

export default LowNav;
