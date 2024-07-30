import React, { useState } from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import StarRating from "../StarRating";
import "./ReviewItem.css";

const ReviewItem = ({ review, reviewer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? review.text
    : `${review.text.substring(0, 200)}...`;

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
      {review.text.length > 100 && (
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
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  reviewer: PropTypes.shape({
    name: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

export default ReviewItem;
