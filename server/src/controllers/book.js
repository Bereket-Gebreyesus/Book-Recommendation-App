import Book from "../models/Book.js";
import upload from "../middleware/multerConfig.js";
import { logError } from "../util/logging.js";

export const uploadBookAndImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logError(err);
      return res.status(500).json({
        success: false,
        msg: "Error uploading file.",
        error: err.message,
      });
    }
    if (req.file === undefined) {
      return res.status(400).json({ success: false, msg: "No file selected." });
    }

    try {
      const bookData = {
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        isbn: req.body.isbn,
        publishedDate: req.body.publishedDate,
        image: req.file.path,
        publisher: req.body.publisher,
        tags: req.body.tags,
        uploadedBy: req.body.uploadedBy,
      };

      const book = new Book(bookData);
      const savedBook = await book.save();

      res.status(201).json({
        success: true,
        msg: "Book and image uploaded successfully.",
        book: savedBook,
      });
    } catch (error) {
      logError(error);
      res
        .status(500)
        .json({ success: false, msg: "Error processing your request." });
    }
  });
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, result: books });
  } catch (error) {
    logError("Error fetching books:", error);
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get books, try again later" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).lean();

    if (!book) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    // virtual added here
    book.averageRating = (await Book.findById(id)).averageRating;

    res.status(200).json({ success: true, result: book });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get book, try again later" });
  }
};

// Get reviews for a specific book
export const getBookReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).lean();

    if (!book) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    const reviews = book.reviews || [];
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    logError("Error fetching reviews:", error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews, try again later" });
  }
};

// Add Review
export const addReview = async (req, res) => {
  const { id } = req.params;
  const { ownerId, rating, text } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    const hasReviewed = book.reviews.some((review) => {
      if (review.ownerId) {
        review.ownerId.toString() === ownerId;
      }
    });

    if (hasReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a review for this book.",
      });
    }

    if (!text.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Review text cannot be empty." });
    }

    const newReview = { ownerId, rating, text, created_at: new Date() };
    book.reviews.push(newReview);
    await book.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      result: { book },
    });
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const checkISBNUniqueness = async (req, res) => {
  const { isbn } = req.query;
  const isbnString = String(isbn);

  try {
    const bookExists = await Book.exists({ isbn: isbnString });
    if (bookExists) {
      return res
        .status(200)
        .send({ exists: true, message: "ISBN already exists" });
    }

    return res.status(200).send({ exists: false, message: "ISBN is unique" });
  } catch (error) {
    logError("Error checking ISBN uniqueness:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export const findBookByTitleAndAuthor = async (bookTitle, authorName) => {
  try {
    const book = await Book.findOne({
      title: bookTitle,
      authors: { $in: [authorName] },
    });
    return book;
  } catch (error) {
    logError("Error finding book by title and author:", error);
    return null;
  }
};

export const checkBookAndAuthorUniqueness = async (req, res) => {
  const { bookTitle, authorName } = req.query;

  try {
    const existingBookByTitleAndAuthor = await findBookByTitleAndAuthor(
      bookTitle,
      authorName,
    );
    if (existingBookByTitleAndAuthor) {
      return res.status(200).send({
        exists: true,
        message: "Book with the same title and author already exists",
      });
    }
    return res.status(200).send({
      exists: false,
      message: "Book with the same title and author does not exist",
    });
  } catch (error) {
    logError("Error checking book and author uniqueness:", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// Fetching sorted and paginated books for the main page
export async function getSortedBooks(req, res) {
  // Query parameters: page number and limit (for pagination)
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await Book.aggregate([
      {
        $addFields: {
          // Calculate the average rating of each book
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
      },
      {
        $sort: {
          // Sort by (top reviewed + date added)
          averageRating: -1,
          createdAt: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit, 10),
      },
    ]);

    const count = await Book.countDocuments();

    res.status(200).json({
      success: true,
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    const errMessage = "Error loading books";
    logError(errMessage, error);
    res.status(500).json({ success: false, message: errMessage });
  }
}

// Search books by title, author or tag with pagination and sorting
export async function searchBooks(req, res) {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Query is required" });
  }

  const searchCondition = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { authors: { $regex: query, $options: "i" } },
      { "tags.name": { $regex: query, $options: "i" } },
    ],
  };

  try {
    const books = await Book.aggregate([
      { $match: searchCondition },
      {
        $addFields: {
          // Calculate the average rating of each book
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
      },
      {
        $sort: {
          // Sort by average rating
          averageRating: -1,
        },
      },
      {
        $skip: (page - 1) * parseInt(limit, 10),
      },
      {
        $limit: parseInt(limit, 10),
      },
    ]);

    const count = await Book.countDocuments(searchCondition);

    res.status(200).json({
      success: true,
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    const errMessage = "Error loading books";
    logError(errMessage, error);
    res.status(500).json({ success: false, message: errMessage });
  }
}
