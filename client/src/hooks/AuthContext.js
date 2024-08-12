import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { googleSignIn, githubSignIn, logout } from "../util/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "",
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true",
  );
  const [photoURL, setPhotoURL] = useState(
    localStorage.getItem("photoURL") || "",
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("photoURL", photoURL);
    localStorage.setItem("token", token);
  }, [userEmail, isAuthenticated, photoURL, token]);

  const login = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const register = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { jwtToken, email, photoURL } = await googleSignIn();
      setToken(jwtToken);
      setUserEmail(email);
      setIsAuthenticated(true);
      setPhotoURL(photoURL);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { jwtToken, email, photoURL } = await githubSignIn();
      setToken(jwtToken);
      setUserEmail(email);
      setIsAuthenticated(true);
      setPhotoURL(photoURL);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserEmail("");
    setPhotoURL("");
    setToken("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userEmail,
        isAuthenticated,
        photoURL,
        token,
        login,
        register,
        logout: handleLogout,
        googleSignIn: handleGoogleSignIn,
        githubSignIn: handleGithubSignIn,
        message,
      }}
    >
      {children}
      {message && <div className="error">{message}</div>}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
