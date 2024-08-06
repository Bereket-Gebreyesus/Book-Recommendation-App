import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const fractional = rating - fullStars;
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (index < fullStars) {
      return (
        <FaStar
          key={index}
          className="text-warning"
          style={{ fontSize: "1.0rem" }}
        />
      );
    }
    if (index === fullStars && fractional > 0) {
      return (
        <span
          key={index}
          className="position-relative"
          style={{
            width: "1.0em",
            height: "1em",
            display: "inline-block",
            fontSize: "1.0rem",
          }}
        >
          <FaStar
            className="text-muted"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${fractional * 100}%`,
              overflow: "hidden",
              color: "#FFD700",
              height: "100%",
            }}
          >
            <FaStar
              className="text-warning"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </span>
        </span>
      );
    }
    return (
      <FaStar
        key={index}
        className="text-muted"
        style={{ fontSize: "1.0rem" }}
      />
    );
  });

  return <span className="d-flex align-items-center">{stars}</span>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
