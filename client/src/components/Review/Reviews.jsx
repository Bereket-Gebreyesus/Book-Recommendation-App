import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../Pagination";
import ReviewItem from "./ReviewItem";
import { Button } from "react-bootstrap";

const Reviews = ({
  reviews,
  paginatedReviews,
  reviewers,
  totalPages,
  currentPage,
  onPageChange,
  onAddReviewClick,
  onEditReviewClick,
  onReviewDeleted,
  userId,
  id,
}) => {
  const hasUserReviewed = reviews.some((review) => review.ownerId === userId);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Reviews</h3>
      <ListGroup>
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <ReviewItem
              key={review._id}
              reviewId={review._id}
              review={review}
              reviewer={reviewers[review.ownerId] || {}}
              isEditable={review.ownerId === userId}
              onEditReviewClick={onEditReviewClick}
              userId={userId}
              id={id}
              onReviewDeleted={onReviewDeleted}
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
  paginatedReviews: PropTypes.arrayOf(
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
  onEditReviewClick: PropTypes.func.isRequired,
  onReviewDeleted: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  setReviews: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Reviews;
