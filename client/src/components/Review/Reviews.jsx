import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../Pagination";
import ReviewItem from "./ReviewItem";

const Reviews = ({
  reviews,
  reviewers,
  totalPages,
  currentPage,
  onPageChange,
}) => (
  <div style={{ marginTop: "20px" }}>
    <h3>Reviews</h3>
    <ListGroup>
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          reviewer={reviewers[review.ownerId]}
        />
      ))}
    </ListGroup>
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  </div>
);

Reviews.propTypes = {
  reviews: PropTypes.array.isRequired,
  reviewers: PropTypes.object.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Reviews;
