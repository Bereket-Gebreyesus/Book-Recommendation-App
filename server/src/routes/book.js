import express from "express";
import {
  uploadBookAndImage,
  getBooks,
  getBookById,
  checkBookAndAuthorUniqueness,
  checkISBNUniqueness,
  getSortedBooks,
  getBookReviews,
  addReview,
} from "../controllers/book.js";

// Now you can use these functions here

const bookRouter = express.Router();

bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/all", getSortedBooks);
bookRouter.get("/", getBooks);
bookRouter.get("/check", checkBookAndAuthorUniqueness);
bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/:id", getBookById);
bookRouter.get("/:id/reviews", getBookReviews);
bookRouter.post("/:id/reviews/add", addReview);
bookRouter.get("/find/isbn", checkISBNUniqueness);

export default bookRouter;
