import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Image, Button, Alert, Spinner } from "react-bootstrap";
import StarRating from "../StarRating";
import "./ReviewItem.css";
import defaultProfileImage from "../../assets/default-profile.jpg";
import useFetch from "../../hooks/useFetch";

const ReviewItem = ({
  review,
  reviewer,
  userId,
  id,
  isEditable,
  onEditReviewClick,
  onReviewDeleted,
  reviewId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { performFetch, isLoading: isDeleting } = useFetch(
    `/books/${id}/reviews/${reviewId}/delete`,
    (response) => {
      if (response.success) {
        onReviewDeleted(reviewId);
      } else {
        setDeleteError("Failed to delete the review");
      }
    },
  );

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    performFetch({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerId: userId }),
    });
  };

  const displayText = isExpanded
    ? review.text
    : review.text && review.text.length > 500
      ? `${review.text.substring(0, 500)}...`
      : review.text;

  return (
    <ListGroup.Item>
      <div className="review-header">
        <Image
          src={reviewer?.profileImage || defaultProfileImage}
          roundedCircle
          className="reviewer-img"
        />
        <div>
          <strong>{reviewer?.name || "Unknown"}</strong>
          <div>
            <StarRating rating={review.rating} />
          </div>
          <small>{new Date(review.created_at).toLocaleDateString()}</small>
        </div>
        {isEditable && (
          <div className="ml-auto">
            <Button
              variant="secondary"
              onClick={() => onEditReviewClick(review)}
              className="mr-2"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        )}
      </div>
      {deleteError && <Alert variant="danger">{deleteError}</Alert>}
      <p>{displayText}</p>
      {review.text && review.text.length > 500 && (
        <Button
          variant="link"
          onClick={toggleReadMore}
          className="read-more-btn"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </ListGroup.Item>
  );
};

ReviewItem.propTypes = {
  reviewId: PropTypes.string.isRequired,
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string,
    rating: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
  }).isRequired,
  reviewer: PropTypes.shape({
    name: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  userId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReviewDeleted: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onEditReviewClick: PropTypes.func.isRequired,
};

export default ReviewItem;
