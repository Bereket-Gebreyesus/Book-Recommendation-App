import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import CenteredSpinner from "../CenteredSpinner";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formMode, setFormMode] = useState("login"); // 'login' or 'register'
  const navigate = useNavigate();
  const { login, register, googleSignIn, githubSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/create`,
        {
          name,
          email,
          password,
        },
      );
      register(response.data.token, email);
      setMessage("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage("Registration failed: " + error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/login`,
        {
          email,
          password,
        },
      );

      login(response.data.token, email);
      setMessage("Login successful");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage(
        "Registration failed: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  const handleGithubSignIn = async () => {
    await githubSignIn();
  };

  return (
    <Container className="auth-form-container">
      <Row className="justify-content-md-center">
        <Col lg={8} md={3}>
          <Form className="auth-form" autoComplete="off">
            {formMode === "register" && (
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                  size="lg"
                  placeholder="Enter your name to register"
                  className="placeholder-style"
                />
              </Form.Group>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                size="lg"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                size="lg"
              />
            </Form.Group>
            {isLoading ? (
              <CenteredSpinner />
            ) : (
              <>
                <Row>
                  <Button
                    variant="primary"
                    onClick={handleRegister}
                    className="auth-button"
                    onMouseEnter={() => setFormMode("register")}
                  >
                    Register
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleLogin}
                    className="auth-button"
                    onMouseEnter={() => setFormMode("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleGoogleSignIn}
                    className="google-auth-button"
                  >
                    <FcGoogle style={{ marginRight: "8px" }} /> Sign in with
                    Google
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={handleGithubSignIn}
                    className="github-auth-button"
                  >
                    <FaGithub style={{ marginRight: "8px" }} /> Sign in with
                    GitHub
                  </Button>
                </Row>
              </>
            )}
            {message && <Alert variant="info">{message}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
