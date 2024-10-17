import React, { useEffect, useState } from "react";
import SidebarMobile from "./SidebarMobile";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle resizing window
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // 768px is typically the breakpoint for mobile
  };

  useEffect(() => {
    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>{isMobile ? <SidebarMobile /> : null}</div>;
};

export default Sidebar;
