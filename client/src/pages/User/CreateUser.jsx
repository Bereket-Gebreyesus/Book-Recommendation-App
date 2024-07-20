import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSuccess = () => {
    setName("");
    setEmail("");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { name, email } }),
    });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4">What should the user be?</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          id="nameInput"
          name="name"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Name"
          data-testid={TEST_ID.nameInput}
        />
        <Input
          id="emailInput"
          name="email"
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Email"
          data-testid={TEST_ID.emailInput}
        />
        <Button type="submit" className="btn btn-primary" data-testid={TEST_ID.submitButton}>
          Submit
        </Button>
      </Form>
      {isLoading && <div className="mt-3">Creating user....</div>}
      {error && (
        <Alert variant="danger" className="mt-3" role="alert" data-testid={TEST_ID.errorContainer}>
          Error while trying to create user: {error.toString()}
        </Alert>
      )}
    </Container>
  );
};

export default CreateUser;
