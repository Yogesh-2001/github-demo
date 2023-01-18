import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user.uid) {
      return navigate("/");
    } else {
      return <>{children}</>;
    }
  });
};

export default PublicRoute;
