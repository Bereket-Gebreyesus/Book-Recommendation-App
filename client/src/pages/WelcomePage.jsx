import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import AuthForm from "../components/Login/AuthForm";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBlack from "../assets/logoBlack.png";
import backgroundImage from "../assets/backroundImage.png";

const WelcomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGetStartedClick = () => {
    setIsSignUp(false);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="welcome-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container fluid className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={9}>
            <Card className="welcome-container">
              <Card.Body>
                <Row>
                  <Col
                    xs={5}
                    sm={3}
                    md={2}
                    className="d-flex align-items-center justify-content-center justify-content-md-start"
                  >
                    <img
                      src={logoBlack}
                      alt="Logo"
                      className="logo responsive-logo"
                    />
                  </Col>
                  <Col md={10}>
                    <Card.Title className="text-center custom-title">
                      Welcome to Our Book Recommendations Application
                    </Card.Title>
                    <Card.Text className="custom-text">
                      This application allows you to explore a wide range of
                      books, add them to your collection, and mark your
                      favorites. You can also add reviews, give ratings, and see
                      the most popular and latest books. Based on your favorite
                      books, we will send you personalized recommendations via
                      email to help you discover new books that match your
                      interests. To create your account, please click on sign up
                      button for free.
                    </Card.Text>
                  </Col>
                </Row>
                <div className="d-flex align-items-end justify-content-end">
                  <Button
                    variant="primary"
                    className="w-30 mt-2"
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="p-3">
            <Card className="auth-form-container">
              <Card.Body>
                <Card.Title className="text-center custom-title">
                  Get Started
                </Card.Title>
                <Card.Text>
                  Log in to start managing your book collection and receive
                  personalized book recommendations.
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-30"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? "Sign Up" : "Log In"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm showName={isSignUp} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WelcomePage;
