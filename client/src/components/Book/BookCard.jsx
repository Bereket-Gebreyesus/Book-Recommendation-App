import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";

import PropTypes from "prop-types";
import defaultCover from "../../assets/default-cover.jpeg";

const BookCard = ({ book = {} }) => {
  return (
    <Card className="mb-3 shadow-md h-90 book-card">
      <Link to={`/books/${book._id}`}>
        <Card.Img
          variant="top"
          src={book.image || defaultCover}
          alt={book.title}
          className="book-cover-img"
        />
      </Link>
      <Card.Body className="d-flex flex-column h-100">
        <Card.Title className="book-title">{book.title}</Card.Title>
        <Card.Text className="text-muted book-authors">
          Author:{" "}
          {book.authors.length > 0 ? book.authors.join(", ") : "Unknown"}
        </Card.Text>
        <Card.Text className="text-muted book-publisher">
          Publisher: {book.publisher || "Unknown"}
        </Card.Text>
        <div className="d-flex align-items-center">
          <StarRating rating={book.averageRating || 0} />
          <span className="ms-2 rating-number">
            {book.averageRating ? book.averageRating.toFixed(1) : "N/A"}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
