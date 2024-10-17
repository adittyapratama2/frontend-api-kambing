import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../state/authSlice";
import { useGetUserIdQuery } from "../../state/query/user";
import { AuthProvider } from "./AuthProvider";
import { useLogoutMutation } from "../../state/query/auth";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user);

  const {
    data: getId,
    error,
    isLoading,
  } = useGetUserIdQuery(isAuth ? { id: isAuth.id } : null);
  const [performLogout] = useLogoutMutation();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !getId) {
    dispatch(logout());
    performLogout();
    return <Navigate to="/login" replace />;
  }

  return <AuthProvider isAuth={isAuth}>{children}</AuthProvider>;
};

export default PrivateRoute;
