import React, { useState } from "react";
import { useRegisterMutation } from "../../../state/query/auth";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // To handle confirm password field
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const [register] = useRegisterMutation(); // Assuming this is the mutation hook for registering the user
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Basic form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!username || !password || !role || !name) {
      setError("All fields are required");
      return;
    }

    try {
      // Call the register mutation
      await register({ username, name, password, role }).unwrap();
      // Reset form state on success
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setRole("");

      setError(""); // Clear any previous errors
      alert("Registration successful!");
      navigate("/dashboard/user-management");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/user-management")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Tambah User
          </h1>
        </div>

        <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="relative mb-4 md:mb-6">
            <UserIcon className="absolute w-5 h-5 md:w-6 md:h-6 text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Controlled input
              className="w-full pl-12 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg"
            />
          </div>
          <div className="relative mb-4 md:mb-6">
            <UserIcon className="absolute w-5 h-5 md:w-6 md:h-6 text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)} // Controlled input
              className="w-full pl-12 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg"
            />
          </div>
          {/* Password Input */}
          <div className="relative mb-4 md:mb-6">
            <LockClosedIcon className="absolute w-5 h-5 md:w-6 md:h-6 text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Controlled input
              className="w-full pl-12 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg"
            />
          </div>
          {/* Confirm Password Input */}
          <div className="relative mb-4 md:mb-6">
            <ShieldCheckIcon className="absolute w-5 h-5 md:w-6 md:h-6 text-blue-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Controlled input
              className="w-full pl-12 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg"
            />
          </div>
          {/* Role Selection */}
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)} // Controlled select input
            className="w-full p-3 md:p-4 mb-4 md:mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-lg bg-white appearance-none hover:shadow-lg transition ease-in-out duration-300"
          >
            <option value="" className="text-gray-500">
              Select Role
            </option>
            <option value="admin" className="text-gray-800">
              Admin
            </option>
            <option value="pegawai" className="text-gray-800">
              Pegawai
            </option>
          </select>
          {/* Register Button */}
          <button
            type="submit" // Form submission
            className="w-full bg-primary text-white py-3 md:py-4 rounded-lg hover:bg-blue-700 transition text-sm md:text-lg"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
