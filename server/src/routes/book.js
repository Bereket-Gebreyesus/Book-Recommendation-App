import express from "express";
import {
  uploadBookAndImage,
  getBooks,
  getBookById,
} from "../controllers/book.js";

const bookRouter = express.Router();

bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);

export default bookRouter;
