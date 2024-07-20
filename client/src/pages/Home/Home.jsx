import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <Container data-testid={TEST_ID.container} className="p-3">
      <Row>
        <Col>
          <h1 className="bg-primary text-white p-3 rounded">
            This is the homepage
          </h1>
          <p className="mt-4">Good luck with the project!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
