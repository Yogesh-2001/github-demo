import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return <Navigate to={"/dashboard"} replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
