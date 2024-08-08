import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import UserActions from "../components/UserActions";
import { useAuth } from "../hooks/AuthContext";
import { BsBoxArrowRight } from "react-icons/bs";

import TEST_ID from "./Nav.testid";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const { isLoggedIn, logout, userEmail } = useAuth();

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
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Enter title, author or genre"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
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
        {isLoggedIn && <UserActions />}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
