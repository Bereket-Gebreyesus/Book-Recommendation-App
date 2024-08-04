import React, { useState, useEffect } from "react";
import { Button, Alert, Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "../Input";
import useFetch from "../../hooks/useFetch";

const MOCK_USER_ID = "6697ee04a1a0487218400da7";

const AddReviewForm = ({ id, onReviewAdded }) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { performFetch, isLoading } = useFetch(
    `/books/${id}/reviews/add`,
    (response) => {
      if (response.success) {
        onReviewAdded(response.result.book);
        setRating(1);
        setText("");
        setError("");
        setSuccess(response.message);
      } else {
        setError(response.message);
      }
    },
  );

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ownerId = MOCK_USER_ID;

    if (!text.trim()) {
      setError("Review text cannot be empty. Write a review!");
      return;
    }

    performFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, text, ownerId }),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Input
        id="rating"
        name="rating"
        type="number"
        value={rating.toString()}
        onChange={(value) =>
          setRating(Math.min(5, Math.max(1, parseInt(value, 10))))
        }
        placeholder="Rating"
        min={1}
        max={5}
      />
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
        ) : (
          "Submit Review"
        )}
      </Button>
    </Form>
  );
};

AddReviewForm.propTypes = {
  id: PropTypes.string.isRequired,
  onReviewAdded: PropTypes.func.isRequired,
};

export default AddReviewForm;
