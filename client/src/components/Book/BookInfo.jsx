import React from "react";
import PropTypes from "prop-types";
import StarRating from "../StarRating";

const BookInfo = ({ book, tags }) => {
  const averageRating = book.averageRating
    ? book.averageRating.toFixed(1)
    : "N/A";

  const authors = book.authors.length > 0 ? book.authors.join(", ") : "Unknown";

  return (
    <div>
      <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.5rem" }}>
        {book.title}
      </h1>
      <h4 style={{ color: "#888" }}>{authors}</h4>
      {averageRating !== "N/A" && (
        <div style={{ marginBottom: "1.0rem" }}>
          <strong>Average Rating:</strong> {averageRating}{" "}
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
        <strong>Published Date:</strong>{" "}
        {new Date(book.publishedDate).toDateString()}
      </p>
      <p>
        <strong>Publisher:</strong> {book.publisher}
      </p>
      <div>
        <strong>Tags:</strong>{" "}
        {book.tags.map((tagId) => tags[tagId] || "No tags").join(", ")}
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
    publishedDate: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tags: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default BookInfo;
