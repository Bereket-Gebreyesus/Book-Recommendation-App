import express from "express";
import {
  uploadBookAndImage,
  getBooks,
  getBookById,
  checkBookAndAuthorUniqueness,
  checkISBNUniqueness,
  getSortedBooks,
} from "../controllers/book.js";

// Now you can use these functions here

const bookRouter = express.Router();

bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/all", getSortedBooks);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.get("/find/isbn", checkISBNUniqueness);
bookRouter.get("/unique", checkBookAndAuthorUniqueness);

export default bookRouter;
