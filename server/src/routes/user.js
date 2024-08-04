import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  loginUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/id", getUser);

export default userRouter;
