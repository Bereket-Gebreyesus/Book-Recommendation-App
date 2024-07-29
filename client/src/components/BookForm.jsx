import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Input from "./Input";
import TagSelection from "./TagSelection";
import PropTypes from "prop-types";

const BookForm = ({
  bookData,
  handleChange,
  handleFileChange,
  handleSubmit,
  tagsOptions,
  handleTagClick,
}) => {
  const modifiedHandleSubmit = async (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <Form onSubmit={(event) => modifiedHandleSubmit(event)}>
      <Container
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1>Upload a Book</h1>
        <Row className="mb-3">
          <Col>
            <Input
              id="title"
              name="title"
              value={bookData.title}
              onChange={(value) => handleChange("title", value)}
              placeholder="Title"
              required
            />
          </Col>
          <Col>
            <Input
              id="authors"
              name="authors"
              value={bookData.authors.join(", ")} // Join the array into a string
              onChange={(value) => handleChange("authors", value)}
              placeholder="Authors"
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Input
              id="isbn"
              name="isbn"
              value={bookData.isbn}
              onChange={(value) => handleChange("isbn", value)}
              placeholder="ISBN"
              required
            />
          </Col>
          <Col>
            <Input
              id="publishedDate"
              name="publishedDate"
              value={bookData.publishedDate}
              onChange={(value) => handleChange("publishedDate", value)}
              placeholder="Published Date"
              type="date"
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Input
              id="publisher"
              name="publisher"
              value={bookData.publisher}
              onChange={(value) => handleChange("publisher", value)}
              placeholder="Publisher"
              required
            />
          </Col>
          <Col>
            <Input
              id="description"
              name="description"
              value={bookData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Description"
              as="textarea"
              required
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="tags" className="mb-4">
              <Form.Label>Tags</Form.Label>
              <TagSelection
                options={tagsOptions}
                selectedTags={bookData.tags}
                onTagClick={handleTagClick}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Book Cover Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" variant="secondary">
              Upload Book
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

BookForm.propTypes = {
  bookData: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.array,
    description: PropTypes.string,
    isbn: PropTypes.string,
    publishedDate: PropTypes.string,
    publisher: PropTypes.string,
    tags: PropTypes.array,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  tagsOptions: PropTypes.array.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};

export default BookForm;
