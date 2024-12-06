import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ redirectPath = "/" }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) return <Navigate to={redirectPath} />;
  return <Outlet />;
};

export default PublicRoutes;