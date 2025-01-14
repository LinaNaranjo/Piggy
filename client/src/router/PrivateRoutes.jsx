import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ redirectPath = "/login" }) => {
  const token = localStorage.getItem("authToken"); // Verifica si existe un token

  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
