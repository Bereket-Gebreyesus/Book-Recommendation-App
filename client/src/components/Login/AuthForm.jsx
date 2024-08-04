import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon
import CenteredSpinner from "../CenteredSpinner";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
      setMessage(
        "Registration failed: " +
          (error.response?.data?.message || error.message),
      );
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

  const fetchUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_SERVER_URL}/api/user/id`,
        { params: { email } },
      );
      return response.data.userId;
    } catch (error) {
      setMessage("Failed to fetch user ID: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await googleSignIn();
      const { displayName, email, idToken } = user;

      let userId = await fetchUserIdByEmail(email);

      if (!userId) {
        const response = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/user/create`,
          {
            name: displayName,
            email,
            password: idToken,
          },
        );
        register(response.data.token, email);
        setMessage("Registration successful");
        navigate("/");
      } else {
        const response = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/user/login`,
          {
            email,
            password: idToken,
          },
        );

        login(response.data.token, email);
        setMessage("Google Sign-In successful");
        navigate("/");
      }
    } catch (error) {
      setMessage("An error occurred during Google Sign-In");
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await githubSignIn();
      const { displayName, email, idToken } = user;

      let userId = await fetchUserIdByEmail(email);
      if (!userId) {
        const response = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/user/create`,
          {
            name: displayName,
            email,
            password: idToken, // You might want to handle this differently
          },
        );
        register(response.data.token, email);
        setMessage("Registration successful");
        navigate("/");
      } else {
        const response = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/user/login`,
          {
            email,
            password: idToken, // You might want to handle this differently
          },
        );

        login(response.data.token, email);
        setMessage("GitHub Sign-In successful");
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setMessage(
          "An account already exists with the same email address but different sign-in credentials. Please use the existing sign-in method.",
        );
      } else {
        setMessage("GitHub Sign-In failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="authform-container">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <Form className="auth-form" autoComplete="off">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                size="lg"
              />
            </Form.Group>
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
                  >
                    Register
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleLogin}
                    className="auth-button"
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
                    onClick={handleGitHubSignIn}
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
