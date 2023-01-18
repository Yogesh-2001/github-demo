import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (!user.uid) {
      return navigate("/login");
    } else {
      const { uid, email, displayName } = user;
      dispatch(setUser({ uid, email, displayName }));
    }
  });
  return <>{children}</>;
};

export default ProtectedRoute;
