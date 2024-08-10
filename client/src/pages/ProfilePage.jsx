import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Form, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import BookCard from "../components/Book/BookCard";
import { useAuth } from "../hooks/AuthContext";
import CustomCarousel from "../components/CustomCarousel";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { token, userEmail, photoURL } = useAuth();
  const userPhoto =
    photoURL || "https://img.icons8.com/puffy-filled/32/user.png";
  const [profile, setProfile] = useState(null);
  const [weeklyEmail, setWeeklyEmail] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const { isLoading, error, performFetch } = useFetch(
    "/user/profile",
    (data) => {
      setProfile(data);
      setWeeklyEmail(data.user.weeklyEmail);
    },
  );

  const { performFetch: performWeeklyEmailFetch } = useFetch(
    "/user/weekly-email",
    () => {
      const action = weeklyEmail ? "unsubscribed from" : "subscribed to";
      setAlertMessage({
        text: `Successfully ${action} weekly emails!`,
        variant: "success",
      });
      setTimeout(() => setAlertMessage(null), 2000);
    },
  );

  useEffect(() => {
    if (token) {
      performFetch({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, [token]);

  const handleToggleWeeklyEmail = () => {
    performWeeklyEmailFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: profile.user._id,
        weeklyEmail: !weeklyEmail,
      }),
    });
    setWeeklyEmail(!weeklyEmail);
    const action = weeklyEmail ? "Unsubscribing from" : "Subscribing to";
    setAlertMessage({
      text: `${action} weekly emails...`,
      variant: "info",
    });
    setTimeout(() => setAlertMessage(null), 2000);
  };

  if (isLoading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error.toString()}</Alert>;

  if (!profile) return <Spinner animation="border" />;

  const { user, uploadedBooks, reviews, favorites } = profile;

  return (
    <div className="profile-page container">
      {alertMessage && (
        <Alert
          variant={alertMessage.variant}
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage.text}
        </Alert>
      )}
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
                    src={userPhoto}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col md="8">
                  <h4>{user?.name}</h4>
                  <p>Email: {userEmail}</p>
                  <p>Favorited Books: {favorites?.length}</p>
                  <p>Uploaded Books: {uploadedBooks?.length}</p>
                  <p>Reviewed Books: {reviews?.length}</p>
                  <Form.Check
                    type="checkbox"
                    label="Receive Weekly Emails"
                    checked={weeklyEmail}
                    onChange={handleToggleWeeklyEmail}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Uploaded Books</h4>
      <Row className="mb-5">
        {uploadedBooks && uploadedBooks.length > 0 ? (
          <CustomCarousel
            items={uploadedBooks}
            renderCard={(book) => <BookCard book={book} />}
          />
        ) : (
          <p>You haven&apos;t uploaded any book yet.</p>
        )}
      </Row>

      <h4>Reviewed Books</h4>
      <Row className="mb-5">
        {reviews && reviews.length > 0 ? (
          <CustomCarousel
            items={reviews}
            renderCard={(review) => <BookCard book={review} />}
          />
        ) : (
          <p>You haven&apos;t posted a review on any book yet.</p>
        )}
      </Row>

      <h4>Favorite Books</h4>
      <Row className="mb-5">
        {favorites && favorites.length > 0 ? (
          <CustomCarousel
            items={favorites}
            renderCard={(book) => <BookCard book={book} />}
          />
        ) : (
          <p>You haven&apos;t saved any book to your favorites yet.</p>
        )}
      </Row>
    </div>
  );
};

export default ProfilePage;
