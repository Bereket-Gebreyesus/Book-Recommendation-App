import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import defaultCover from "../assets/default-cover.jpeg";
import handleShowMore from "../util/handleShowMore.js";
import { Spinner, Dropdown, DropdownButton } from "react-bootstrap";

import "./Search.css";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [dropdownTitle, setDropdownTitle] = useState("Sort By");

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const onReceived = (data) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, ...data.books];

      // Returns only unique books by filtering out duplicates
      const uniqueBooks = Array.from(
        new Set(updatedBooks.map((book) => book._id)),
      ).map((id) => updatedBooks.find((book) => book._id === id));

      return uniqueBooks;
    });

    setTotalPages(data.totalPages);

    // Fetching tags for books from the server
    const tagIds = data.books.flatMap((book) => book.tags);
    if (tagIds.length > 0) {
      performFetchTags(tagIds);
    }
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/books/search?query=${query}&page=${currentPage}&sort=${sortCriteria}`,
    onReceived,
  );

  // Saving tags from server in the component state
  const { performFetch: performFetchTags } = useFetch("/tags", (response) => {
    const tagMap = {};

    response.result.forEach((tag) => {
      tagMap[tag._id] = tag.name;
    });

    setTags(tagMap);
  });

  useEffect(() => {
    setBooks([]);
    setCurrentPage(1);
    performFetch();
    return () => {
      cancelFetch();
    };
  }, [query, sortCriteria]);

  useEffect(() => {
    if (currentPage > 1) {
      performFetch();
    }
  }, [currentPage]);

  const handleSelect = (eventKey) => {
    // If the selected sort criteria is the same as the current one, do nothing
    if (eventKey === sortCriteria) return;

    setSortCriteria(eventKey);
    setBooks([]);
    setCurrentPage(1);

    // Update the dropdown title
    setDropdownTitle(eventKey.charAt(0).toUpperCase() + eventKey.slice(1));
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="container">
        <Spinner className="spinner" animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h4 className="mb-4">{`Search Results: "${query}". Error: ${error}`}</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <h4 className="mb-4 mt-3">{`Search Results: ${query}`}</h4>

      <div className="d-flex justify-content-end mb-4">
        {/* Dropdow menu for selecting sorting method */}
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

      {books.length > 0 ? (
        <ul className="list-unstyled">
          {books.map((book) => (
            <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
              <Link to={`/books/${book._id}`} className="text-decoration-none">
                <h3 className="h5 text-dark fw-bold">{book.title}</h3>

                <img
                  className="d-block my-3 rounded book-cover-img"
                  src={book.image || defaultCover}
                  alt={`${book.title}`}
                />

                <p className="mb-1 text-muted ">
                  by {book.authors.join(", ") || "Author is unknown"}
                </p>

                <p className="text-muted mb-1">
                  ISBN: {book.isbn || "ISBN is unknown"}
                </p>

                <p className="text-muted mb-1">
                  Publisher: {book.publisher || "Publisher is unknown"}
                </p>

                <p className="text-muted mb-1">
                  Description:{" "}
                  {book.description
                    ? `${book.description.slice(0, 100)}...`
                    : "No description"}
                </p>

                <p className="text-muted mb-1">
                  Rating: {book.averageRating || "No rating"}
                </p>

                <p className="text-muted mb-1">
                  Tags:{" "}
                  {book.tags && book.tags.length > 0
                    ? book.tags.map((tagId) => tags[tagId]).join(", ")
                    : "No tags"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found</p>
      )}

      {isLoading && currentPage > 1 && (
        <Spinner className="spinner" animation="border" />
      )}

      {currentPage < totalPages && (
        <div
          className="text-center cursor-pointer show-more"
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

export default Search;
