import React, { useState } from "react";
import TopNav from "../Navbar/TopNav.jsx";
import MidNav from "../Navbar/MidNav.jsx";
import LowNav from "../Navbar/LowNav.jsx";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="hidden sm:block">
        <TopNav />
      </div>
      <MidNav setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block`}>
        <LowNav />
      </div>
    </header>
  );
}

export default Header;
