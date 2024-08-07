import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookList from "../../components/Home/BookList";
import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <Container data-testid={TEST_ID.container} className="p-3">
      <Row>
        <Col>
          <BookList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
