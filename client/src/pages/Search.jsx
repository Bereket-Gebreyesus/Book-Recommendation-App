import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState({});
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const onReceived = (data) => {
    setBooks(data.books);
    const tagIds = data.books.flatMap((book) => book.tags);
    if (tagIds.length > 0) {
      performFetchTags(tagIds);
    }
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/books/search?query=${query}`,
    onReceived,
  );

  const { performFetch: performFetchTags } = useFetch("/tags", (response) => {
    const tagMap = response.result.reduce((acc, tag) => {
      acc[tag._id] = tag.name;
      return acc;
    }, {});
    setTags(tagMap);
  });

  useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, [query]);

  if (isLoading)
    return (
      <div className="container">
        <p className="m-4">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <h4 className="mb-4">{`Search Results: "${query}". Error: ${error}`}</h4>
      </div>
    );

  return (
    <div className="container">
      <h4 className="mb-4 mt-3">{`Search Results: ${query}`}</h4>
      {books.length > 0 ? (
        <ul className="list-unstyled">
          {books.map((book) => (
            <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
              <Link to={`/books/${book._id}`} className="text-decoration-none">
                <div>
                  <h3 className="h5 text-dark fw-bold">{book.title}</h3>
                  <p className="mb-1 text-muted ">
                    by {book.authors.join(", ") || "Author is unknown"}
                  </p>
                  <p className="text-muted mb-1">
                    Description:{" "}
                    {book.description
                      ? `${book.description.slice(0, 100)}...`
                      : "No description"}
                  </p>
                  <p className="text-muted mb-1">
                    Tags:{" "}
                    {book.tags && book.tags.length > 0
                      ? book.tags.map((tagId) => tags[tagId]).join(", ")
                      : "No tags"}
                  </p>
                </div>
              </Link>
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
