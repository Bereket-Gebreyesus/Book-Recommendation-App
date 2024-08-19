import React from "react";
import PropTypes from "prop-types";
import StarRating from "../StarRating";

const BookInfo = ({ book, tags }) => {
  const averageRating = book.averageRating
    ? book.averageRating.toFixed(1)
    : "N/A";

  const authors = book.authors.length > 0 ? book.authors.join(", ") : "Unknown";
  const publisher = book.publisher || "Unknown";
  const publishedDate = book.publishedDate
    ? new Date(book.publishedDate).toDateString()
    : "N/A";
  const bookTags =
    book.tags.length > 0
      ? book.tags.map((tagId) => tags[tagId] || "N/A").join(", ")
      : "N/A";

  return (
    <div>
      <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.5rem" }}>
        {book.title}
      </h1>
      <h4 style={{ color: "#888" }}>{authors}</h4>
      {averageRating !== "N/A" && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Average Rating: </strong>
          <span>{averageRating}</span>
          <div style={{ marginTop: "0.5rem" }}>
            <StarRating rating={parseFloat(averageRating)} />
          </div>
        </div>
      )}
      <p>{book.description}</p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Published Date:</strong> {publishedDate}
      </p>
      <p>
        <strong>Publisher:</strong> {publisher}
      </p>
      <div>
        <strong>Tags:</strong> {bookTags}
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    averageRating: PropTypes.number,
    description: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    publishedDate: PropTypes.string,
    publisher: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tags: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default BookInfo;
