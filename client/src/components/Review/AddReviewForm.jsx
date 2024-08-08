import React, { useState, useEffect } from "react";
import { Button, Alert, Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import Input from "../Input";
import axios from "axios";

const AddReviewForm = ({ id, onReviewAdded, userId }) => {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Review text cannot be empty. Write a review!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/books/${id}/reviews/add`,
        { rating, text, ownerId: userId },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.data.success) {
        onReviewAdded(response.data.result.book);
        setRating(1);
        setText("");
        setSuccess(response.data.message);
      } else {
        setError(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || `Error: ${error.response.status}`,
        );
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

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
  userId: PropTypes.string.isRequired,
};

export default AddReviewForm;
