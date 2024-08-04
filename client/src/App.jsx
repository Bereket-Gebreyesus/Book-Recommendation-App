import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UploadBookPage from "./pages/Book/UploadBook";
import BookDetail from "./pages/Book/BookDetail";
import AuthForm from "../src/components/Login/AuthForm";
import { useAuth } from "../src/hooks/AuthContext";
import ProtectedRoute from "../src/components/Login/PrivateRoute"; // Import the ProtectedRoute component

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Nav />}
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route
              path="/books/:id"
              element={<ProtectedRoute element={BookDetail} />}
            />
            <Route
              path="/user/create"
              element={<ProtectedRoute element={CreateUser} />}
            />
            <Route
              path="/book/upload"
              element={<ProtectedRoute element={UploadBookPage} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
};

export default App;
