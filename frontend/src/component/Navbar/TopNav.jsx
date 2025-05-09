import React from 'react'
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <div className="py-2 mb-3 border-t border-b border-gray-300 top-navbar">
  <div className="container">
    <div className="flex flex-wrap items-center justify-center sm:justify-between">
      
    <div className="col1 w-full sm:w-[50%] text-center sm:text-left">
        <p className="text-[14px] font-[500]">
          Get up to 50% off new season styles, limited time only
        </p>
      </div>

      <div className="col2 w-full sm:w-[50%] flex justify-center sm:justify-end mt-2 sm:mt-0">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-0">
          <li className="list-none">
            <Link to="/help-center" className="text-[14px] font-[500] border-r border-gray-300 pr-3 transition">
              Help Center
            </Link>
          </li>
          <li className="list-none">
            <Link to="/order-tracking" className="text-[14px] font-[500] border-r border-gray-300 pr-3 pl-3 transition">
              Order Tracking
            </Link>
          </li>
          <li className="list-none">
            <Link to="english" className="text-[14px] font-[500] border-r border-gray-300 pr-3 pl-3 transition">
              English {">"}
            </Link>
          </li>
          <li className="list-none">
            <Link to="/currency" className="text-[14px] font-[500] border-gray-300 pl-3 transition">
              USD {">"}
            </Link>
          </li>
        </ul>
      </div>


    </div>
  </div>
</div>

  )
}

export default TopNav