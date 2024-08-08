import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Container, Spinner, Alert, Row, Col, Modal } from "react-bootstrap";
import BookImage from "../../components/Book/BookImage";
import BookInfo from "../../components/Book/BookInfo";
import Reviews from "../../components/Review/Reviews";
import AddReviewForm from "../../components/Review/AddReviewForm";
import RatingStats from "../../components/RatingStats";
import FavoriteButton from "../../components/favorite_button/FavoriteButton";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";
import { logError } from "../../../../server/src/util/logging";

const BookDetail = () => {
  const { userEmail } = useAuth();
  const email = userEmail;
  const [userId, setUserId] = useState("");
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewers, setReviewers] = useState({});
  const [tags, setTags] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_SERVER_URL}/api/user/id`,
        { params: { email } },
      );
      setUserId(response.data.userId);
    } catch (error) {
      logError(error);
    }
  };

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
  }, [id, email]);

  useEffect(() => {
    fetchUserIdByEmail(email);
  }, []);

  // Calculate pagination slice
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews =
    book?.reviews.slice(indexOfFirstReview, indexOfLastReview) || [];
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReviewAdded = () => {
    // Fetch the updated reviews list from the server
    performFetch();
  };

  let content = null;

  if (isLoading) {
    content = <Spinner animation="border" />;
  } else if (error) {
    content = <Alert variant="danger">{error.toString()}</Alert>;
  } else if (!book) {
    content = <p>No book details available.</p>;
  } else {
    const averageRating = book.averageRating
      ? book.averageRating.toFixed(1)
      : "N/A";
    const distribution = book.reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    content = (
      <Container>
        <Row className="align-items-start mt-5">
          <Col md={4} className="mb-4">
            <BookImage image={book.image} title={book.title} />
          </Col>
          <Col md={8}>
            <BookInfo book={book} tags={tags} />
            <FavoriteButton userId={userId} bookId={book._id} />
          </Col>
        </Row>
        {averageRating !== "N/A" && (
          <RatingStats
            averageRating={averageRating}
            distribution={distribution}
            totalReviews={book.reviews.length}
          />
        )}
        <Reviews
          reviews={currentReviews}
          reviewers={reviewers}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onAddReviewClick={() => setShowModal(true)}
        />
      </Container>
    );
  }

  return (
    <div>
      {content}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        backdropClassName="custom-modal-backdrop"
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReviewForm
            id={id}
            userId={userId}
            onReviewAdded={handleReviewAdded}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookDetail;
