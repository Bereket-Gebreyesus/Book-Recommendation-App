import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  loginUser,
  googleSignIn,
  githubSignIn,
  addFavorite,
  removeFavorite,
  getUserById,
  setWeeklyEmail,
  getUserProfile,
  authMiddleware,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-sign-in", googleSignIn);
userRouter.post("/github-sign-in", githubSignIn);
userRouter.get("/id", getUser);
userRouter.get("/id/:id", getUserById);
userRouter.post("/favorites", addFavorite);
userRouter.delete("/favorites", removeFavorite);
userRouter.post("/weekly-email", setWeeklyEmail);

userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;
