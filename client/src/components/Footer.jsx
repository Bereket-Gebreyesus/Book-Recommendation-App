import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Card className="footer-card">
        <Card.Body>
          <Row>
            <Col md={6} className="text-left py-3">
              <p>Contact Us: info@c47groupa.com</p>
              <p>Phone: +123 456 7890</p>
              <p>Address: 123 Hack Your Future Street, Coding City, 12345</p>
            </Col>
            <Col md={6} className="text-right py-3">
              &copy; {new Date().getFullYear()} Hack Your Future Cohort47
              GroupA. All Rights Reserved.
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </footer>
  );
};

export default Footer;
