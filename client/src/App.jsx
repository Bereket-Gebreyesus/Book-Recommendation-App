import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import UploadBookPage from "./pages/Book/UploadBook";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Search";
import { useAuth } from "../src/hooks/AuthContext";
import ProtectedRoute from "../src/components/Login/PrivateRoute";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./components/Footer";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Nav />}
      <Routes>
        <Route
          path="/welcome"
          element={isAuthenticated ? <Navigate to="/" /> : <WelcomePage />}
        />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route
              path="/books/:id"
              element={<ProtectedRoute element={BookDetail} />}
            />
            <Route
              path="/search"
              element={<ProtectedRoute element={Search} />}
            />
            <Route
              path="/book/upload"
              element={<ProtectedRoute element={UploadBookPage} />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/welcome" />} />
        )}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
