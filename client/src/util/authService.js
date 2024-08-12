import { signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import { auth, googleProvider, githubProvider } from "./firebase";

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseToken = await result.user.getIdToken();

    const response = await axios.post(
      `${process.env.BASE_SERVER_URL}/api/user/google-sign-in`,
      { token: firebaseToken },
    );

    if (response.data.success) {
      const { token: jwtToken } = response.data;
      const email = result.user.email;
      const photoURL = result.user.photoURL;

      return { jwtToken, email, photoURL };
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error("Failed to Sign In with Google: " + error.message);
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

      return { jwtToken, email, photoURL };
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error("GitHub Sign-In Error: " + error.message);
  }
};

const logout = async () => {
  await signOut(auth);
};

export { googleSignIn, githubSignIn, logout };
