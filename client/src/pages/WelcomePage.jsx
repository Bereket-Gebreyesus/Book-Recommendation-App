import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AuthForm from "../components/Login/AuthForm";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/backroundImage.png";

const WelcomePage = () => {
  return (
    <div
      className="welcome-container"
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
                      src={logo}
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
                      interests.
                    </Card.Text>
                  </Col>
                </Row>
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
                  Sign up or log in to start managing your book collection and
                  receive personalized book recommendations.
                </Card.Text>
                <AuthForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomePage;
