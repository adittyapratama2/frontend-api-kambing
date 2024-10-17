import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, isAuth }) => {
  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};
