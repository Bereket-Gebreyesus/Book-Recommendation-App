import express from "express";
import { uploadBookAndImage } from "../controllers/book.js";

const bookRouter = express.Router();

bookRouter.post("/upload", uploadBookAndImage);

export default bookRouter;
