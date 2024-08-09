import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../Pagination";
import ReviewItem from "./ReviewItem";
import { Button } from "react-bootstrap";

const Reviews = ({
  reviews,
  reviewers,
  totalPages,
  currentPage,
  onPageChange,
  onAddReviewClick,
  userId,
}) => {
  const hasUserReviewed = reviews.some((review) => review.ownerId === userId);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Reviews</h3>
      <ListGroup>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              reviewer={reviewers[review.ownerId] || {}}
            />
          ))
        ) : (
          <ListGroup.Item>No reviews available</ListGroup.Item>
        )}
      </ListGroup>
      <div className="d-flex justify-content-between align-items-center my-3">
        <Button
          variant={hasUserReviewed ? "secondary" : "primary"}
          onClick={!hasUserReviewed ? onAddReviewClick : null}
          disabled={hasUserReviewed}
        >
          {hasUserReviewed ? "Review Added" : "Add Review"}
        </Button>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  reviewers: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      profileImage: PropTypes.string,
    }),
  ).isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Reviews;
