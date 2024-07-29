import React from "react";
import PropTypes from "prop-types";
import StarRating from "../StarRating";

const BookInfo = ({ book, tags }) => {
  const averageRating = book.averageRating
    ? book.averageRating.toFixed(1)
    : "N/A";

  return (
    <div>
      <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.5rem" }}>
        {book.title}
      </h1>
      <h4 style={{ color: "#888" }}>By {book.authors.join(", ")}</h4>
      {averageRating !== "N/A" && (
        <p>
          <strong>Average Rating:</strong> {averageRating}{" "}
          <StarRating rating={parseFloat(averageRating)} />
        </p>
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
  book: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
};

export default BookInfo;
