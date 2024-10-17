import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../state/authSlice";
import { useLogoutMutation } from "../../state/query/auth";
import { useDispatch } from "react-redux";

const NavbarDesktop = () => {
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
    <div className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Admin Panel</div>
        <div className="space-x-4">
          <button className="text-white">Dashboard</button>
          <button className="text-white">Users</button>
          <button className="text-white">Settings</button>
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
