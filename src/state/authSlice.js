import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

// Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login reducer
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Logout reducer
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

// Export the auth actions
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
