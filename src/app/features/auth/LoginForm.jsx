// src/LoginForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../../state/authSlice";
import { useLoginMutation } from "../../../state/query/auth";
import "./auth.css"; // Import custom CSS for additional styles

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before each login attempt
    dispatch(loginRequest());

    try {
      const response = await login({ username, password }).unwrap();
      dispatch(loginSuccess(response));
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFailure(error.message));
      setError("Login failed. Please check your credentials."); // Set error message
      console.log("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Curved Header Background */}
        <div className="relative bg-cover bg-center bg-no-repeat h-44 curved-bg">
          <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <img
                src="/assets/mygoat-logo 1.png" // Update with your logo path
                alt="GoatTrack"
                className="mx-auto mb-4 h-16 w-auto"
              />
              <h1 className="text-white text-2xl font-bold">
                Goat<span className="text-success">Track</span>
              </h1>
            </div>
          </div>
        </div>
        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-textPrimary ">Halo,</h2>
          <p className="text-sm text-textPrimary mt-2">
            Silakan masuk untuk mulai mengelola kambing kesayangan Anda!
          </p>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field pl-4 sm:pl-10 w-full"
                placeholder="Username"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-4 sm:pl-10 w-full"
                placeholder="Kata Sandi"
                required
              />
            </div>
            <div className="flex justify-end mb-4">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 sm:py-3 bg-primary text-white rounded-full text-sm font-medium tracking-wide transition ${
                isLoading ? "bg-primary cursor-not-allowed" : "hover:bg-error"
              }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
