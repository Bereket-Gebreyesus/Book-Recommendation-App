import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import defaultCover from "../assets/default-cover.jpeg";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [tagsMap, setTagsMap] = useState({});
  const [selectedTag, setSelectedTag] = useState("");
  const [books, setBooks] = useState([]);

  // Fetching tags from the server
  const { performFetch: fetchTags } = useFetch("/tags", (response) => {
    // Sorting tags in alphabetical order
    const sortedTags = response.result.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    // Updating the tags state by saving a sorted array of tags
    setTags(sortedTags);

    // Creating object of sorted tags (where tag id as key and tag name as value)
    const tagsById = {};
    for (const tag of sortedTags) {
      tagsById[tag._id] = tag.name;
    }
    setTagsMap(tagsById);
  });

  useEffect(() => {
    fetchTags();
  }, []);

  // Fetching books by selected tag
  const {
    isLoading,
    error,
    performFetch: fetchBooksByTag,
    // encodeURIComponent is for encode such symbols like "/" in the URL
  } = useFetch(`/books/tag/${encodeURIComponent(selectedTag)}`, (response) => {
    setBooks(response.books);
  });

  useEffect(() => {
    if (selectedTag) {
      fetchBooksByTag();
    }
  }, [selectedTag]);

  // Update the selected tag when a user selects a tag
  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <div className="container">
      <h4 className="mb-4 mt-3">Select a Tag</h4>

      <select onChange={handleTagChange} value={selectedTag}>
        <option value="">Select a tag</option>

        {tags.map((tag) => (
          <option key={tag._id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>

      {selectedTag ? (
        // Error message
        error ? (
          <div className="container">
            <h4 className="mb-4">Error: {error}</h4>
          </div>
        ) : // Loading bar
        isLoading ? (
          <div className="container">
            <p className="m-4">Loading...</p>
          </div>
        ) : books.length > 0 ? (
          <ul className="list-unstyled mt-4">
            {books.map((book) => (
              <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
                <Link
                  to={`/books/${book._id}`}
                  className="text-decoration-none"
                >
                  <div>
                    <h3 className="h5 text-dark fw-bold">{book.title}</h3>

                    <img
                      src={book.image || defaultCover}
                      alt={`${book.title}`}
                      className="mb-2 book-cover-img"
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
                        ? book.tags.map((tag) => tagsMap[tag._id]).join(", ")
                        : "No tags"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No books found</p>
        )
      ) : (
        <p className="mt-4">Choose tag</p>
      )}
    </div>
  );
};

export default TagsPage;