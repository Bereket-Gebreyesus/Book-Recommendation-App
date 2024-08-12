import React from "react";
import PropTypes from "prop-types";
import "./StarRatingDisplay.css";

const StarRatingDisplay = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="star-rating">
      {[...Array(maxStars)].map((_, index) => (
        <span key={index}>{index < filledStars ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

StarRatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRatingDisplay;
