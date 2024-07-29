import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";
import StarRating from "./StarRating";

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
    <div className="mb-4 mt-4" style={{ width: "70%" }}>
      <h4>Rating Stats</h4>
      <div className="mb-2">
        <strong>Overall Rating:</strong> {averageRating}{" "}
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
