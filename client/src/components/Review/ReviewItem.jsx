import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Image, Button } from "react-bootstrap";
import StarRating from "../StarRating";
import "./ReviewItem.css";

const ReviewItem = ({ review, reviewer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? review.text
    : review.text && review.text.length > 500
      ? `${review.text.substring(0, 500)}...`
      : review.text;

  return (
    <ListGroup.Item>
      <div className="review-header">
        {reviewer?.profileImage && (
          <Image
            src={reviewer.profileImage}
            roundedCircle
            className="reviewer-img"
          />
        )}
        <div>
          <strong>{reviewer?.name || "Unknown"}</strong>
          <div>
            <StarRating rating={review.rating} />
          </div>
          <small>{new Date(review.created_at).toLocaleDateString()}</small>
        </div>
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
  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string,
    rating: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  reviewer: PropTypes.shape({
    name: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

export default ReviewItem;
