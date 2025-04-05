import React from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from "@mui/material/Badge"; // ✅ Correct import
import { styled } from "@mui/material/styles"; // ✅ Correct import
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 5,
    border: `2px solid white`,
    padding: "0 4px",
  },
}));

function MidNav({ setIsMobileMenuOpen, isMobileMenuOpen }) {
  return (
    <div className="container flex flex-wrap items-center justify-between mid-navbar py-4">
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
          <li>
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
          </li>
          <li>
            <Tooltip title="Cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <MdOutlineShoppingCart />
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
