import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";
import { persistor } from "../store";

// Define the base query for API requests
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3030/v1", // Set your base API URL
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Get the token from the auth state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
    }
    return headers;
  },
});

// Enhanced baseQuery to handle token expiration (401 errors)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Dispatch logout action if token is invalid
    api.dispatch(logout());
    persistor.purge(); // Purge redux-persist state

    // Optionally, redirect to login
    window.location.href = "/login"; // Force navigation to login page
  }

  return result;
};

// Use the enhanced baseQueryWithReauth in your apiSlice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth, // Use baseQueryWithReauth here
  reducerPath: "api",
  tagTypes: ["Kambing", "Indukan", "Pejantan", "Kandang"],
  endpoints: (builder) => ({}), // Define your endpoints here
});
