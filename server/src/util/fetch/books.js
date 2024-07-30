import { logError } from "../logging.js";
import Book from "../../models/Book.js";

// get books by id
export const getBooksById = async (ids) => {
  try {
    return await Book.find({ _id: { $in: ids } });
  } catch (error) {
    logError("Couldn't fetch books data:", error);
    throw error;
  }
};

export const getBooksByTagSortedByRating = async (tagId, limit = 2) => {
  try {
    const books = await Book.find({ tags: tagId });

    // Calculate the average rating for each book
    const booksWithAverageRating = books.map((book) => {
      const totalRatings = book.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      const averageRating = totalRatings / book.reviews.length;
      return {
        ...book.toObject(),
        averageRating,
      };
    });
    // Sort books by average rating in descending order
    booksWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

    // Return the top 'limit' books
    return booksWithAverageRating.slice(0, limit);
  } catch (error) {
    logError("Error fetching books:", error);
    throw error;
  }
};
