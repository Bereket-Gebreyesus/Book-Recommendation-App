// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

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

  const logout = async () => {
    await signOut(auth);
    setUserEmail("");
    setPhotoURL("");
    setToken("");
    setIsAuthenticated(false);
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/google-sign-in`,
        { token: firebaseToken },
      );
      if (response.data.success) {
        const { token: jwtToken } = response.data;
        const email = result.user.email;
        const photoURL = result.user.photoURL;

        setToken(jwtToken);
        setUserEmail(email);
        setIsAuthenticated(true);
        setPhotoURL(photoURL);
      } else {
        setMessage("Failed to Sign In with Google: " + response.data.msg);
      }
    } catch (error) {
      setMessage("Failed to Sign In with Google: " + error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const firebaseToken = await result.user.getIdToken();

      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/github-sign-in`,
        { token: firebaseToken },
      );

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        const email = result.user.email;
        const photoURL = result.user.photoURL;

        setToken(jwtToken);
        setUserEmail(email);
        setIsAuthenticated(true);
        setPhotoURL(photoURL);
      } else {
        setMessage("GitHub Sign-In failed: " + response.data.msg);
      }
    } catch (error) {
      setMessage("GitHub Sign-In Error: " + error.message);
    }
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
        logout,
        googleSignIn,
        githubSignIn,
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
