import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import PropTypes from "prop-types";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("photoURL", photoURL);
  }, [userEmail, isAuthenticated, photoURL]);

  const login = (token, email) => {
    localStorage.setItem("token", token);

    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const register = (token, email) => {
    localStorage.setItem("token", token);

    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    await signOut(auth);
    setUserEmail("");
    setPhotoURL("");
    setIsAuthenticated(false);
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/google-sign-in`,
        { token },
      );
      if (response.data.success) {
        const { token: jwtToken } = response.data;
        const email = result.user.email;
        const photoURL = result.user.photoURL;

        localStorage.setItem("token", jwtToken);
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
      const token = await result.user.getIdToken();

      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/github-sign-in`,
        { token },
      );

      if (response.data.success) {
        const { token: jwtToken } = response.data;
        const email = result.user.email;
        const photoURL = result.user.photoURL;

        localStorage.setItem("token", jwtToken);
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
        login,
        register,
        logout,
        googleSignIn,
        githubSignIn,
        message, // Add message to the context value
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
