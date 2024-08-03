import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const onReceived = (data) => {
    setBooks(data.books);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/books/search?query=${query}`,
    onReceived,
  );

  useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, [query]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Search Results</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h2>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Description:</strong> {book.description.slice(0, 100)}
                ...
              </p>
              <p>
                <strong>Tags:</strong> {book.tags.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default Search;
