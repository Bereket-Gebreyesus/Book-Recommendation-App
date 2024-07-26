import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import StarRating from "../../components/StarRating";
import RatingStats from "../../components/RatingStats";
import Pagination from "../../components/Pagination";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewers, setReviewers] = useState({});
  const [tags, setTags] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/books/${id}`,
    (response) => {
      setBook(response.result);
      setTotalReviews(response.result.reviews.length);
      const reviewerIds = response.result.reviews.map(
        (review) => review.ownerId,
      );
      if (reviewerIds.length > 0) {
        performFetchUsers(reviewerIds);
      }
      const tagIds = response.result.tags;
      if (tagIds.length > 0) {
        performFetchTags(tagIds);
      }
    },
  );

  const { performFetch: performFetchUsers } = useFetch("/user", (response) => {
    const userMap = response.result.reduce((acc, user) => {
      acc[user._id] = { name: user.name, profileImage: user.profileImage };
      return acc;
    }, {});
    setReviewers(userMap);
  });

  const { performFetch: performFetchTags } = useFetch("/tags", (response) => {
    const tagMap = response.result.reduce((acc, tag) => {
      acc[tag._id] = tag.name;
      return acc;
    }, {});
    setTags(tagMap);
  });

  useEffect(() => {
    performFetch();

    return () => {
      cancelFetch();
    };
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0)
      return { average: null, distribution: {} };
    const total = reviews.reduce(
      (acc, review) => acc + (review.rating || 0),
      0,
    );
    const average = (total / reviews.length).toFixed(1);

    const distribution = reviews.reduce((acc, review) => {
      const rating = review.rating || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    return { average, distribution };
  };

  const { average, distribution } = calculateAverageRating(book?.reviews || []);

  // Calculate pagination slice
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews =
    book?.reviews.slice(indexOfFirstReview, indexOfLastReview) || [];

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let content = null;

  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (error != null) {
    content = <Alert variant="danger">{error.toString()}</Alert>;
  } else if (!book) {
    content = <p>No book details available.</p>;
  } else {
    content = (
      <Container>
        <Row className="align-items-start mt-5">
          <Col md={4} className="mb-4" style={{ position: "relative" }}>
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                style={{
                  maxWidth: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  zIndex: 10,
                  transition: "transform 0.3s ease-in-out",
                }}
                className="book-image"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: "#ccc",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#666",
                }}
              >
                No Image Available
              </div>
            )}
          </Col>
          <Col md={8}>
            <h1>{book.title}</h1>
            <h4>By {book.authors.join(", ")}</h4>
            {average && (
              <p>
                <strong>Average Rating:</strong> {average}{" "}
                <StarRating rating={parseFloat(average)} />
              </p>
            )}
            <p>{book.description}</p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Published Date:</strong>{" "}
              {new Date(book.publishedDate).toDateString()}
            </p>
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <div>
              <strong>Tags:</strong>{" "}
              {book.tags.map((tagId) => tags[tagId] || "No tags").join(", ")}
            </div>
          </Col>
        </Row>
        {average && (
          <RatingStats
            averageRating={average}
            distribution={distribution}
            totalReviews={book.reviews.length}
          />
        )}
        <h3>Reviews</h3>
        <ListGroup>
          {currentReviews.map((review) => (
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
          onPageChange={handlePageChange}
        />
      </Container>
    );
  }

  return <div>{content}</div>;
};

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
      <div className="d-flex align-items-center mb-2">
        {reviewer?.profileImage && (
          <Image
            src={reviewer.profileImage}
            roundedCircle
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
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
          style={{
            color: "#00FF00",
          }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </ListGroup.Item>
  );
};

BookDetail.propTypes = {
  id: PropTypes.string,
  reviewsPerPage: PropTypes.number,
};

BookDetail.defaultProps = {
  reviewsPerPage: 5,
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

export default BookDetail;
