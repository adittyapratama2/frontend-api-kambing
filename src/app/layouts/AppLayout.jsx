// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import FooterNavbar from "../components/FooterNavbar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-secondary">
      <div className="flex-1 flex flex-col">
        {/* Add pb-[footer-height] to account for footer height */}
        <div className="bg-secondary pb-[60px]">{children || <Outlet />}</div>
      </div>
      {/* FooterNavbar - show only on mobile */}
      <FooterNavbar className="block md:hidden fixed bottom-0 w-full" />
    </div>
  );
};

export default AppLayout;
