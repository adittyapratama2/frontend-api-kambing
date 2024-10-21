// src/RegisterForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useRegisterMutation } from "../../../state/query/auth"; // Assuming this is correct import for registration mutation

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // To handle confirm password field
  const [role, setRole] = useState("");

  const [register] = useRegisterMutation(); // Assuming this is the mutation hook for registering the user
  const [error, setError] = useState(""); // To handle validation and submission errors

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
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl mx-4 md:mx-0">
        {/* Form Section */}
        <div className="flex flex-col p-8 md:p-16 w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-blue-700">
            Register
          </h2>
          <p className="mb-4 md:mb-8 text-gray-600 text-sm md:text-lg">
            Create your account
          </p>

          {/* Display error message if any */}
          {error && (
            <div className="mb-4 text-red-600 text-sm md:text-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
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
              className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg hover:bg-blue-700 transition text-sm md:text-lg"
            >
              REGISTER
            </button>
          </form>

          <p className="mt-4 md:mt-8 text-center text-gray-600 text-sm md:text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6 md:p-10">
          {/* You can add an illustration or image here */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-8 md:p-16 rounded-lg shadow-lg">
              {/* Replace with actual illustration */}
              <img
                src="/your-illustration-path.jpg"
                alt="Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
