import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import UploadBookPage from "./pages/Book/UploadBook";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Search";
import TagsPage from "./pages/TagsPage";
import { useAuth } from "../src/hooks/AuthContext";
import ProtectedRoute from "../src/components/Login/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import WelcomePage from "./pages/WelcomePage";
import Footer from "./components/Footer";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      {isAuthenticated && <Nav />}
      <div className="flex-grow-1">
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
              <Route
                path="/user/profile"
                element={<ProtectedRoute element={ProfilePage} />}
              />
              <Route
                path="/tags"
                element={<ProtectedRoute element={TagsPage} />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/welcome" />} />
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
