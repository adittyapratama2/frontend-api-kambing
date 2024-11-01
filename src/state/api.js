import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query for API requests
const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.goat.web.id/v1",
  // baseUrl: "http://localhost:3030/v1",
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
    api.dispatch({ type: "auth/logout" });

    // Optionally, redirect to login
    window.location.href = "/login"; // Force navigation to login page
  }

  return result;
};

// Use the enhanced baseQueryWithReauth in your apiSlice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth, // Use baseQueryWithReauth here
  reducerPath: "api",
  tagTypes: [
    "Kambing",
    "IndukBetina",
    "IndukPejantan",
    "Kandang",
    "Perkawinan",
    "PertumbuhanKambing",
    "PemerahanKambing",
    "KesehatanKambing",
    "PakanKandang",
    "ProduksiSusu",
  ],
  endpoints: (builder) => ({}), // Define your endpoints here
});
