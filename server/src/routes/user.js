import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  loginUser,
  googleSignIn,
  githubSignIn,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-sign-in", googleSignIn);
userRouter.post("/github-sign-in", githubSignIn);
userRouter.get("/id", getUser);

export default userRouter;
