import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import UserActions from "../components/UserActions";
import { useAuth } from "../hooks/AuthContext";
import { BsBoxArrowRight, BsSearch } from "react-icons/bs";
import logo from "../assets/logo.png";

import TEST_ID from "./Nav.testid";
import "./Nav.css";

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

  const { logout, userEmail } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const userName = userEmail ? userEmail.split("@")[0] : "";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="navbar-brand m-3">
        <img src={logo} alt="BookRecs Logo" style={{ height: "60px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <div className="nav-links-container">
            <LinkContainer to="/" data-testid={TEST_ID.linkToHome}>
              <Nav.Link className="home-link">Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/tags">
              <Nav.Link className="categories-link me-3">Categories</Nav.Link>
            </LinkContainer>
          </div>

          <Form className="search-form d-flex" onSubmit={handleSearchSubmit}>
            <div className="search-input-container position-relative">
              <FormControl
                type="search"
                placeholder="Enter title, author or genre"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <BsSearch
                className="search-icon position-absolute"
                onClick={handleSearchSubmit}
              />
            </div>
          </Form>
        </Nav>
        <div className="user-panel-container">
          <UserActions />
          <div className="log-out-container">
            <Button
              variant="outline-light"
              data-testid={TEST_ID.logoutButton}
              onClick={handleLogout}
              className="log-out"
              title="Logout"
            >
              <BsBoxArrowRight />
            </Button>
          </div>

          {userName && (
            <Navbar.Text className="welcome-element me-3">
              <span data-testid={TEST_ID.userName}>{userName}</span>
            </Navbar.Text>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
