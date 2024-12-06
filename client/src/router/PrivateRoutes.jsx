import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ redirectPath = "/login" }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Asumiendo que usas Redux para manejar el estado de autenticación

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
