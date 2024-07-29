import axios from "axios";

export async function checkBookUniqueness(bookData, setError) {
  try {
    // Check ISBN uniqueness
    const isbnCheckResponse = await axios.get(
      `${process.env.BASE_SERVER_URL}/api/books/find/isbn`,
      { params: { isbn: bookData.isbn } },
    );

    if (isbnCheckResponse.data.exists) {
      return {
        unique: false,
        message: "This ISBN already exists. Please insert a new ISBN.",
      };
    }
  } catch (err) {
    setError(err.message || "Error checking ISBN uniqueness");
    return { unique: false };
  }

  try {
    const bookAuthorCheckResponse = await axios.get(
      `${process.env.BASE_SERVER_URL}/api/books/check`,
      { params: { bookTitle: bookData.title, authorName: bookData.authors } },
    );

    if (bookAuthorCheckResponse.data.exists) {
      return {
        unique: false,
        message: "Book with the same title and author already exists",
      };
    }
  } catch (err) {
    setError(err.message || "Error checking book and author uniqueness");
    return { unique: false };
  }

  return { unique: true };
}
