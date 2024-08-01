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
    <div>
      <h4 className="book-list-title">Recommendations list</h4>

      <ul className="book-list-container">
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>
              <h3 className="book-title">{book.title}</h3>
            </Link>

            <img
              className="book-cover"
              src={book.image || defaultCover}
              alt={book.title}
            />
            <p className="book-authors">
              Authors: {book.authors.join(", ") || "No authors"}
            </p>
            <p className="book-isbn">ISBN: {book.isbn || "No ISBN"}</p>
            <p className="book-publisher">
              Publisher: {book.publisher || "No publisher"}
            </p>
            <p className="book-description">
              Description: {book.description || "No description"}
            </p>
            <p className="book-rating">
              Rating: {book.averageRating || "No rating"}
            </p>
          </li>
        ))}
      </ul>

      {isLoading && <p className="loading-bar">Loading...</p>}

      {error && (
        <p className="error-message">
          Error: {error.message || "An unexpected error occurred"}
        </p>
      )}

      {currentPage < totalPages && (
        <div className="show-more" onClick={handleShowMore}>
          Show more...
        </div>
      )}
    </div>
  );
};

export default BookList;
