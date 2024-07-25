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
    const book = await Book.findById(id).lean({ virtuals: true });

    if (!book) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    res.status(200).json({ success: true, result: book });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get book, try again later" });
  }
};
