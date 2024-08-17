import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ListGroup,
  Image,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { performFetch } = useFetch(
    `/books/${id}/reviews/${reviewId}/delete`,
    (response) => {
      if (response.success) {
        setSuccessMessage("Review deleted successfully");
        setDeleteError("");
        // Close the modal after a short delay to show confrimation message
        setTimeout(() => {
          onReviewDeleted(reviewId);
          setShowConfirm(false);
        }, 1000);
      } else {
        setDeleteError("Failed to delete the review");
      }
    },
  );

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    performFetch({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerId: userId }),
    });
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setSuccessMessage("");
    setDeleteError("");
  };

  const displayDate = new Date(
    review.updated_at || review.created_at,
  ).toLocaleDateString();

  const displayText = isExpanded
    ? review.text
    : review.text && review.text.length > 500
      ? `${review.text.substring(0, 500)}...`
      : review.text;

  return (
    <>
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
            <small>{displayDate}</small>
          </div>
          {isEditable && (
            <div className="button-container">
              <Button
                variant="primary"
                onClick={() => onEditReviewClick(review)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleShowConfirm}
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

      <Modal
        show={showConfirm}
        onHide={handleCloseConfirm}
        backdropClassName="custom-modal-backdrop"
        style={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage ? (
            <Alert variant="success">{successMessage}</Alert>
          ) : (
            <>
              Are you sure you want to delete this review? This action cannot be
              undone.
              {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Cancel
          </Button>
          {!successMessage && (
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
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

ReviewItem.propTypes = {
  reviewId: PropTypes.string.isRequired,
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string,
    rating: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string,
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
