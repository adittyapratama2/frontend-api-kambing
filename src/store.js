import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./state/api"; // Ensure correct import here
import appReducer from "./state/app";
import authReducer from "./state/authSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // apiSlice declared after import
});

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["app", "auth"],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Create persistor
export const persistor = persistStore(store);
