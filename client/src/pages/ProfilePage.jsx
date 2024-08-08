import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import BookCard from "../components/Book/BookCard";
import "./ProfilePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "64px",
        left: "auto",
        top: "-24px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "24px",
        top: "-24px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  const { isLoading, error, performFetch } = useFetch(
    "/user/profile",
    (data) => {
      setProfile(data);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
  }, []);

  if (isLoading) return <Spinner animation="border" />;

  // Ensure that error is a string before rendering it
  if (error) return <Alert variant="danger">{error.toString()}</Alert>;

  // Ensure that profile is not null and contains the necessary properties
  if (!profile) return <Spinner animation="border" />;
  const { user, uploadedBooks, reviews, favorites } = profile;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="profile-page container">
      <Row className="mb-5">
        <Col md="8">
          <Card>
            <Card.Header>
              <h3>User Profile</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="4">
                  <img
                    src={
                      user?.profileImage || "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                  />
                </Col>
                <Col md="8">
                  <h4>{user?.name}</h4>
                  <p>Email: {user?.email}</p>
                  <p>Favorited Books: {favorites?.length}</p>
                  <p>Uploaded Books: {uploadedBooks?.length}</p>
                  <p>Reviewed Books: {reviews?.length}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Uploaded Books</h4>
      <Row className="mb-5">
        {profile?.uploadedBooks && profile.uploadedBooks.length > 0 ? (
          <Slider {...sliderSettings}>
            {profile.uploadedBooks.map((book) => (
              <Col key={`uploaded-${book._id}`} style={{ padding: "0 10px" }}>
                <BookCard book={book} />
              </Col>
            ))}
          </Slider>
        ) : (
          <p>You haven&apos;t uploaded any book yet.</p>
        )}
      </Row>

      <h4>Reviewed Books</h4>
      <Row className="mb-5">
        {profile?.reviews && profile.reviews.length > 0 ? (
          <Slider {...sliderSettings}>
            {profile.reviews.map((review) => (
              <Col key={`reviewed-${review._id}`} style={{ padding: "0 10px" }}>
                {review ? <BookCard book={review} /> : <p>Book not found</p>}
              </Col>
            ))}
          </Slider>
        ) : (
          <p>You haven&apos;t posted a review on any book yet.</p>
        )}
      </Row>

      <h4>Favorite Books</h4>
      <Row className="mb-5">
        {profile?.favorites && profile.favorites.length > 0 ? (
          <Slider {...sliderSettings}>
            {profile.favorites.map((book) => (
              <Col key={`favorite-${book._id}`} style={{ padding: "0 10px" }}>
                <BookCard book={book} />
              </Col>
            ))}
          </Slider>
        ) : (
          <p>You haven&apos;t saved any book to your favorites yet.</p>
        )}
      </Row>
    </div>
  );
};

CustomNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
CustomPrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
export default ProfilePage;
