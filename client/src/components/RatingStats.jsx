import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
import StarRating from "./StarRating";
import "./RatingStats.css";

const RatingStats = ({ averageRating, distribution, totalReviews }) => {
  const renderProgressBar = (star) => {
    const count = distribution[star] || 0;
    const percentage = ((count / totalReviews) * 100).toFixed(1);

    return (
      <div key={star} className="d-flex align-items-center mb-2">
        <div className="mr-5" style={{ width: "60px" }}>
          <StarRating rating={star} />
        </div>
        <div className="flex-grow-1 m-2">
          <ProgressBar now={percentage} variant="warning" />
        </div>
        <div className="ml-2">
          <span>{count}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="rating-stats-container mb-4 mt-4">
      <div className="header-container">
        <div className="header-content d-flex align-items-center justify-content-between">
          <h3>Rating Stats</h3>
          <div className="total-reviews">{totalReviews} Reviews</div>
        </div>
      </div>
      <div className="overall-rating-container mb-2">
        <div className="overall-rating">
          <h5>Overall Rating </h5>
        </div>
        <StarRating rating={parseFloat(averageRating)} />
      </div>
      {Array.from({ length: 5 }, (_, i) => 5 - i).map(renderProgressBar)}
    </div>
  );
};

RatingStats.propTypes = {
  averageRating: PropTypes.string.isRequired,
  distribution: PropTypes.object.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default RatingStats;
