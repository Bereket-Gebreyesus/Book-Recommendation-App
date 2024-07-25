import mongoose from "mongoose";
import dotenv from "dotenv";
import { logError } from "./logging.js";
import Book from "../models/Book.js";

dotenv.config();

// Fetches data about books
// (so far it takes data from 5 first books in database)
async function fetchBooks() {
  const uri = process.env.MONGODB_URL;

  try {
    await mongoose.connect(uri, {});

    const books = await Book.find().limit(5).skip(1); // the first book in our db has an indecent cover, so we skip it :)

    return books;
  } catch (error) {
    logError("Couldn't fetch books data:", error);

    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    throw error;
  }
}

export default fetchBooks;
