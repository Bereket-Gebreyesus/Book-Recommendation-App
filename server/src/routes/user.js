import express from "express";
import { createUser, getUsers, getUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.get("/id", getUser);

export default userRouter;
