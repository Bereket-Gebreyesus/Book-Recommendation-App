import express from "express";
import {
  uploadBookAndImage,
  checkBookAndAuthorUniqueness,
  checkISBNUniqueness,
} from "../controllers/book.js";

// Now you can use these functions here

const bookRouter = express.Router();

bookRouter.post("/upload", uploadBookAndImage);
bookRouter.get("/find/isbn", checkISBNUniqueness);
bookRouter.get("/unique", checkBookAndAuthorUniqueness);

export default bookRouter;
