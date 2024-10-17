import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./state/app";
import { apiSlice } from "./state/api";
import authReducer from "./state/authSlice";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["app", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: false,
});

export const persistor = persistStore(store);
