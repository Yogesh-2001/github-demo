import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/userSlice";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import PublicRoute from "./components/PublicRoute";
import AddStudent from "./pages/admin/AddStudent";
import CreateProfile from "./pages/student/CreateProfile";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alert);
  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      console.log("onAuthChanged called");
      dispatch(setUser(currentuser));
    });
  }, []);

  if (!loading) {
    return (
      <>
        <Layout></Layout>

        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/add-student/"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Layout></Layout>
        <h1>Loading...</h1>;
      </>
    );
  }
}

export default App;
