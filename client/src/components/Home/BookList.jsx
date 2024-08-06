import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import defaultCover from "../../assets/default-cover.jpeg";

import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetching books from the server
  const { isLoading, error, performFetch } = useFetch(
    `/books/all?page=${currentPage}`,
    (data) => {
      setBooks((prevBooks) => {
        const updatedBooks = [...prevBooks, ...data.books];

        // Returns only unique books by filtering out duplicates
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

  // Function to handle the "Show more..." button click
  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <h4 className="mb-4">Recommendations list</h4>

      <ul className="list-unstyled">
        {books.map((book) => (
          <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
            <Link to={`/books/${book._id}`} className="text-decoration-none">
              <h3 className="h5 text-dark fw-bold">{book.title}</h3>
            </Link>

            <img
              className="d-block my-3 rounded"
              src={book.image || defaultCover}
              alt={book.title}
              style={{ width: "150px" }}
            />
            <p className="mb-1">
              by {book.authors.join(", ") || "Author is unknown"}
            </p>
            <p className="text-muted mb-1">
              ISBN: {book.isbn || "ISBN is unknown"}
            </p>
            <p className="text-muted mb-1">
              Publisher: {book.publisher || "Publisher is unknown"}
            </p>
            <p className="text-muted mb-1">
              Description: {book.description || "No description"}
            </p>
            <p className="text-muted mb-1">
              Rating: {book.averageRating || "No rating"}
            </p>
          </li>
        ))}
      </ul>

      {isLoading && <p className="text-center">Loading...</p>}

      {error && (
        <p className="text-danger text-center">
          Error: {error.message || "An unexpected error occurred"}
        </p>
      )}

      {currentPage < totalPages && (
        <div className="text-center cursor-pointer" onClick={handleShowMore}>
          Show more...
        </div>
      )}
    </div>
  );
};

export default BookList;
