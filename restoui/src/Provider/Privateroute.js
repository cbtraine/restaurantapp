import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const PrivateRoute = ({ superadminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userdetails"));
  const isSignedIn = !!token;
  const role = user ? user.role : null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (superadminOnly && role !== "superadmin") {
    return <Navigate to="/itemoverview" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PrivateRoute;
