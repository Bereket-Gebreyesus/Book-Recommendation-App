import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  text: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const bookSchema = new mongoose.Schema(
  {
    title: String,
    authors: [String],
    description: String,
    isbn: String,
    publishedDate: Date,
    image: String,
    publisher: String,
    reviews: [reviewSchema],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
); // Added timestamps option to automatically add both 'createdAt' and 'updatedAt' fields to the document and manages their values.

// Dynamic calculation of scores
bookSchema.virtual("averageRating").get(function () {
  // Changed the arrow function to regular function to correctly use 'this' keyword (correctly accessing the document's properties).
  if (!this.reviews || this.reviews.length === 0) {
    return null;
  }
  const total = this.reviews.reduce(
    (acc, review) => acc + (review.rating || 0),
    0,
  );
  return total / this.reviews.length;
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
