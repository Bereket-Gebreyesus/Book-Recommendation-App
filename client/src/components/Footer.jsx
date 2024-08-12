import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Card className="footer-card h-100">
          <Card.Body>
            <Row>
              <Col md={6} className="text-left py-1">
                <p>
                  <FaEnvelope className="footer-icon" /> info@c47groupa.com
                </p>
                <p>
                  <FaPhoneAlt className="footer-icon" /> +123 456 7890
                </p>
                <p>
                  <FaMapMarkerAlt className="footer-icon" /> 123 Hack Your
                  Future Street, Coding City, 12345
                </p>
              </Col>
              <Col
                md={6}
                className="text-md-right text-center py-1 footer-right"
              >
                <p>
                  &copy; {new Date().getFullYear()} Hack Your Future Cohort 47
                  Group A. All Rights Reserved.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </footer>
  );
};

export default Footer;
