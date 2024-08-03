import express from "express";
import {
  uploadBookAndImage,
  getBooks,
  getBookById,
  checkBookAndAuthorUniqueness,
  checkISBNUniqueness,
  searchBooks,
} from "../controllers/book.js";

// Now you can use these functions here

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/search", searchBooks);
bookRouter.get("/check", checkBookAndAuthorUniqueness);
bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/:id", getBookById);
bookRouter.get("/find/isbn", checkISBNUniqueness);

export default bookRouter;
