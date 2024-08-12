import React from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./CustomCarousel.css";

const CustomCarousel = ({ items, renderCard }) => {
  // Split items (cards) into chunks of 3
  const chunkedItems = [];

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    items.forEach((item) => {
      chunkedItems.push([item]);
    });
  } else {
    for (let i = 0; i < items.length; i += 3) {
      chunkedItems.push(items.slice(i, i + 3));
    }
  }

  return (
    <Carousel indicators={false} controls={true} interval={null}>
      {chunkedItems.map((chunk, index) => (
        <Carousel.Item key={index}>
          <Row>
            {chunk.map((item) => (
              <Col key={item._id} style={{ padding: "0 10px" }}>
                {renderCard(item)}
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

CustomCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
};

export default CustomCarousel;
