import Book from "../models/Book.js";
import upload from "../middleware/multerConfig.js";
import cloudinary from "../util/cloudinaryConfig.js";
import mongoose from "mongoose";

export const uploadBookAndImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Upload Error:", err);
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
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hyfImages",
      });
      console.log("result", result);
      const bookData = {
        title: req.body.title,
        authors: req.body.authors.split(","),
        description: req.body.description,
        isbn: req.body.isbn,
        publishedDate: req.body.publishedDate,
        image: result.secure_url,
        publisher: req.body.publisher,

        tags: req.body.tags
          ? req.body.tags
              .split(",")
              .map((tag) => new mongoose.Types.ObjectId(tag.trim()))
          : [],
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
      console.error("Error: ", error);
      res
        .status(500)
        .json({ success: false, msg: "Error processing your request." });
    }
  });
};
