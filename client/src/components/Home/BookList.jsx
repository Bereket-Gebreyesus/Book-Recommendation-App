import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import defaultCover from "../../assets/default-cover.jpeg";
import handleShowMore from "../../util/handleShowMore.js";
import { Spinner, Dropdown, DropdownButton } from "react-bootstrap";

import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [dropdownTitle, setDropdownTitle] = useState("Sort By");

  // Fetching books from the server
  const { isLoading, error, performFetch } = useFetch(
    `/books/all?page=${currentPage}&sort=${sortCriteria}`,
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
  }, [currentPage, sortCriteria]);

  const handleSelect = (eventKey) => {
    // If the selected sort criteria is the same as the current one, do nothing
    if (eventKey === sortCriteria) return;

    setSortCriteria(eventKey);
    setBooks([]);
    setCurrentPage(1);

    // Update the dropdown title
    setDropdownTitle(eventKey.charAt(0).toUpperCase() + eventKey.slice(1));
  };

  return (
    <div className="container">
      <h4 className="mb-4">Recommendations list</h4>

      <div className="d-flex justify-content-end mb-4">
        <DropdownButton
          id="dropdown-basic-button"
          title={dropdownTitle}
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="rating">Rating (default)</Dropdown.Item>
          <Dropdown.Item eventKey="date">Uploaded</Dropdown.Item>
          <Dropdown.Item eventKey="author">Author</Dropdown.Item>
        </DropdownButton>
      </div>

      <ul className="list-unstyled">
        {books.map((book) => (
          <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
            <Link to={`/books/${book._id}`} className="text-decoration-none">
              <h3 className="h5 text-dark fw-bold">{book.title}</h3>
            </Link>

            <img
              className="d-block my-3 rounded book-cover-img"
              src={book.image || defaultCover}
              alt={book.title}
            />

            <p className="text-muted mb-1">
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

      {isLoading && (
        <div className="text-center">
          <Spinner className="spinner" animation="border" />
        </div>
      )}

      {error && (
        <div className="text-danger text-center">
          Error: {error.message || "An unexpected error occurred"}
        </div>
      )}

      {currentPage < totalPages && (
        <div
          className="text-center cursor-pointer"
          onClick={() =>
            handleShowMore(currentPage, totalPages, setCurrentPage)
          }
        >
          Show more...
        </div>
      )}
    </div>
  );
};

export default BookList;
