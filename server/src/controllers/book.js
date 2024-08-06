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

const findBookByTitleAndAuthor = async (bookTitle, authorName) => {
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

// Search books by title, author or tag
export async function searchBooks(req, res) {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Query is required" });
  }

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { authors: { $regex: query, $options: "i" } },
        { "tags.name": { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({ success: true, books });
  } catch (error) {
    const errMessage = "Error loading books";
    logError(errMessage, error);
    return res.status(500).json({ success: false, message: errMessage });
  }
}

// Gets books by tags
export const getBooksByTag = async (req, res) => {
  const { tagName } = req.params;

  try {
    const books = await Book.find({ "tags.name": tagName }).populate("tags");
    res.status(200).json({ success: true, books });
  } catch (error) {
    const errMessage = "Error loading books";
    logError(errMessage, error);
    res.status(500).json({ success: false, message: errMessage });
  }
};
