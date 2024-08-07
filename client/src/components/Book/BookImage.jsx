import React from "react";
import PropTypes from "prop-types";
import defaultCover from "../../assets/default-cover.jpeg";
import "./BookImage.css";

const BookImage = ({ image, title }) => (
  <div className="book-image">
    <img src={image || defaultCover} alt={title} className="book-img" />
  </div>
);

BookImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default BookImage;
