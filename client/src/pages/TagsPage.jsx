import React, { useEffect, useState } from "react";
//import { useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import defaultCover from "../assets/default-cover.jpeg";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [books, setBooks] = useState([]);
  const [tagsMap, setTagsMap] = useState({});

  const { performFetch: fetchTags } = useFetch("/tags", (response) => {
    setTags(response.result);
    const tagMap = response.result.reduce((acc, tag) => {
      acc[tag._id] = tag.name;
      return acc;
    }, {});
    setTagsMap(tagMap);
  });

  const { performFetch: fetchBooksByTag } = useFetch(
    `/books/tag/${selectedTag}`,
    (response) => {
      setBooks(response.books);
    },
  );

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchBooksByTag();
    }
  }, [selectedTag]);

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "No rating";
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
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
      {books.length > 0 ? (
        <ul className="list-unstyled mt-4">
          {books.map((book) => (
            <li key={book._id} className="border rounded p-3 mb-4 shadow-sm">
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
                  Rating: {calculateAverageRating(book.reviews)}
                </p>

                <p className="text-muted mb-1">
                  Tags:{" "}
                  {book.tags && book.tags.length > 0
                    ? book.tags.map((tag) => tagsMap[tag._id]).join(", ")
                    : "No tags"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default TagsPage;
