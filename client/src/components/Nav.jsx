import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserActions from "../components/UserActions";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";

import TEST_ID from "./Nav.testid";

const NavBar = () => {
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = userEmail ? userEmail.split("@")[0] : "";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {userName && (
        <Navbar.Text className="me-3">
          Welcome: <span data-testid={TEST_ID.userName}>{userName}</span>
        </Navbar.Text>
      )}
      <Navbar.Brand href="#" className="m-3">
        BookRecs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/" data-testid={TEST_ID.linkToHome}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
        <UserActions />
        <Button
          variant="outline-light"
          data-testid={TEST_ID.logoutButton}
          onClick={handleLogout}
          className="log-out"
        >
          <BsBoxArrowRight />
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
