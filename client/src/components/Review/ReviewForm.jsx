import React, { useState, useEffect } from "react";
import { Button, Alert, Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "../Input";
import useFetch from "../../hooks/useFetch";
import StarRatingInput from "../StarRatingInput";

const ReviewForm = ({
  id,
  review,
  onReviewSaved,
  userId,
  onClose,
  isEditing = false,
}) => {
  const [rating, setRating] = useState(isEditing ? review?.rating || 0 : 1);
  const [text, setText] = useState(review?.text || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const url = isEditing
    ? `/books/${id}/reviews/${review._id}/edit`
    : `/books/${id}/reviews/add`;

  const { performFetch, isLoading } = useFetch(url, (response) => {
    if (response.success) {
      onReviewSaved(response.result.book);
      setError("");
      setSuccess(response.message);

      if (typeof onClose === "function") {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } else {
      setError(response.message);
    }
  });

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Review text cannot be empty. Please write a review!");
      return;
    }

    performFetch({
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, text, ownerId: userId }),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <div className="mb-3">
        <StarRatingInput rating={rating} onRatingChange={setRating} />
      </div>
      <Input
        id="text"
        name="text"
        as="textarea"
        rows={3}
        value={text}
        onChange={setText}
        placeholder="Review"
        style={{ height: "150px" }}
      />
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : isEditing ? (
          "Update Review"
        ) : (
          "Submit Review"
        )}
      </Button>
    </Form>
  );
};

ReviewForm.propTypes = {
  id: PropTypes.string.isRequired,
  review: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  }),
  onReviewSaved: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  isEditing: PropTypes.bool,
};

export default ReviewForm;
