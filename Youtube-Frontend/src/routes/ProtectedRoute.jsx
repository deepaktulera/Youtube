import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Component to protect private routes from unauthorized access
const ProtectedRoute = () => {
  // Check whether the user is logged in by checking stored token
  const token = localStorage.getItem("token");

  // Render protected content if token exists, otherwise redirect to login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;