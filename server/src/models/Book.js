import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  rating: Number,
  created_at: Date,
  text: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  description: String,
  isbn: String,
  publishedDate: Date,
  image: String,
  publisher: String,
  reviews: [reviewSchema],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

// Dynamic calculation of scores
bookSchema.virtual("averageRating").get(() => {
  if (!this.reviews || this.reviews.length === 0) {
    return null;
  }
  const total = this.reviews.reduce(
    (acc, review) => acc + (review.rating || 0),
    0,
  );
  return total / this.reviews.length;
});

const Book = mongoose.model("books", bookSchema);

export default Book;
