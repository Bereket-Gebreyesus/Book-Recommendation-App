import React from "react";
import PropTypes from "prop-types";
import "./BookImage.css";

const BookImage = ({ image, title }) => (
  <div className="book-image">
    {image ? (
      <img src={image} alt={title} className="book-img" />
    ) : (
      <div className="no-image">No Image Available</div>
    )}
  </div>
);

BookImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default BookImage;
