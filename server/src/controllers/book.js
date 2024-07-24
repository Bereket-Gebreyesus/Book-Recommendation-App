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

async function checkISBNUniqueness(req, res) {
  const { isbn } = req.query;
  const isbnString = String(isbn);

  try {
    const bookExists = await Book.exists({ isbn: isbnString });
    if (bookExists) {
      return res.status(409).send({ message: "ISBN already exists" });
    } else {
      return res.status(200).send({ message: "ISBN is unique" });
    }
  } catch (error) {
    logError("Error checking ISBN uniqueness:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function findBookByTitleAndAuthor(bookTitle, authorName) {
  try {
    const book = await Book.findOne({
      title: bookTitle,
      authors: { $in: [authorName] },
    });
    return book;
  } catch (error) {
    logError("Error finding book by title and author:", error);
    throw error;
  }
}

async function checkBookAndAuthorUniqueness(req, res) {
  const { bookTitle, authorName } = req.query;

  const existingBookByTitleAndAuthor = await findBookByTitleAndAuthor(
    bookTitle,
    authorName,
  );

  if (existingBookByTitleAndAuthor) {
    res.status(409).send({
      message: "Book with the same title and author or ISBN already exists",
    });
    return;
  }
  res.status(200).send({ message: "Book is unique" });
}

export { checkBookAndAuthorUniqueness, checkISBNUniqueness };
