import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import TEST_ID from "./Nav.testid";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#" className="m-3">
        BookRecs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/" data-testid={TEST_ID.linkToHome}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user" data-testid={TEST_ID.linkToUsers}>
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
