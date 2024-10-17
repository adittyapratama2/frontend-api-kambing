import React, { useState } from "react";
import { Bars3Icon, BellIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SidebarMobile from "./SidebarMobile";

const NavbarMobile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <header className="sticky top-0 bg-secondary text-textPrimary flex justify-between items-center p-4 shadow-md z-10">
        {/* Menu Hamburger */}
        <button className="text-textPrimary p-2">
          <button onClick={toggleSidebar}>
            <Bars3Icon className="h-7 w-7" />
          </button>
        </button>
      </header>

      <SidebarMobile sidebar={sidebarOpen} closeSidebar={closeSidebar} />
    </>
  );
};

export default NavbarMobile;
