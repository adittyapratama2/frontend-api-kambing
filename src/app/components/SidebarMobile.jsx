import {
  HomeIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../state/query/auth";
import { logout } from "../../state/authSlice";

const SidebarMobile = ({ sidebar, closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [performLogout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await performLogout().unwrap();
      dispatch(logout());
      console.log("Sukses Logout..");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-primary text-white z-50 transform ${
        sidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-lg`}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 focus:outline-none"
        onClick={closeSidebar}
      >
        <XMarkIcon className="w-8 h-8 text-white hover:text-gray-300 transition-all duration-200 ease-in-out" />
      </button>

      <div className="p-6 text-2xl font-extrabold tracking-wide text-center border-b border-gray-200">
        Navigasi
      </div>
      <ul className="mt-6">
        <li className="p-4 hover:bg-blue-600 transition-colors duration-200 ease-in-out rounded-md mx-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <HomeIcon className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="p-4 hover:bg-blue-600 transition-colors duration-200 ease-in-out rounded-md mx-4">
          <Link to="/dashboard/user" className="flex items-center space-x-2">
            <UserIcon className="w-6 h-6" />
            <span>Users</span>
          </Link>
        </li>
        <li className="p-4 hover:bg-blue-600 transition-colors duration-200 ease-in-out rounded-md mx-4">
          <Link
            to="/dashboard/settings"
            className="flex items-center space-x-2"
          >
            <CogIcon className="w-6 h-6" />
            <span>Settings</span>
          </Link>
        </li>
        <li className="p-4 hover:bg-red-600 transition-colors duration-200 ease-in-out rounded-md mx-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMobile;
