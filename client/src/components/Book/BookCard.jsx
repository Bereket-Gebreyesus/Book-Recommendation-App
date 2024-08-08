import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRatingDisplay from "../Book/StarRatingDisplay";
import PropTypes from "prop-types";

const BookCard = ({ book = {} }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (book._id) {
      navigate(`/books/${book._id}`);
    }
  };

  return (
    <Card className="mb-4 book-card" key={book._id} onClick={handleCardClick}>
      <Card.Img variant="top" src={book.image || "placeholder.jpg"} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong>{" "}
          {book.authors ? book.authors.join(", ") : "Unknown"}
        </Card.Text>
        <Card.Text>
          <strong>Published Date:</strong>{" "}
          {book.publishedDate
            ? new Date(book.publishedDate).toLocaleDateString()
            : "Unknown"}
        </Card.Text>
        <StarRatingDisplay rating={parseFloat(book.averageRating) || 0} />
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
