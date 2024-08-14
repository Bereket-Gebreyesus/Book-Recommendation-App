import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import StarRating from "../StarRating";
import defaultCover from "../../assets/default-cover.jpeg";
import handleShowMore from "../../util/handleShowMore.js";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoading, error, performFetch } = useFetch(
    `/books/all?page=${currentPage}`,
    (data) => {
      setBooks((prevBooks) => {
        const updatedBooks = [...prevBooks, ...data.books];
        const uniqueBooks = Array.from(
          new Set(updatedBooks.map((book) => book._id)),
        ).map((id) => updatedBooks.find((book) => book._id === id));
        return uniqueBooks;
      });
      setTotalPages(data.totalPages);
    },
  );

  useEffect(() => {
    performFetch();
  }, [currentPage]);

  return (
    <div className="container">
      <h4 className="mb-4">Recommendations List</h4>
      <Row>
        {books.map((book) => (
          <Col key={book._id} xs={12} sm={6} md={4} lg={3}>
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
                  {book.authors.length > 0
                    ? book.authors.join(", ")
                    : "Unknown"}
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
          </Col>
        ))}
      </Row>

      {isLoading && (
        <p className="text-center">
          <Spinner className="spinner" animation="border" />
        </p>
      )}

      {error && (
        <p className="text-danger text-center">
          Error: {error.message || "An unexpected error occurred"}
        </p>
      )}

      {currentPage < totalPages && (
        <div className="text-center mt-4">
          <Button
            variant="primary"
            onClick={() =>
              handleShowMore(currentPage, totalPages, setCurrentPage)
            }
          >
            Show more...
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookList;
