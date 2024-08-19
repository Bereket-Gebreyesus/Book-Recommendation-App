import React from "react";
import PropTypes from "prop-types";
import "./CustomCarousel.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = ({ items, renderCard }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      indicators={false}
      controls={true}
      interval={null}
      responsive={responsive}
    >
      {items.map((item, index) => (
        <div key={index}>
          <div className="carousel-card">{renderCard(item)}</div>
        </div>
      ))}
    </Carousel>
  );
};

CustomCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
};

export default CustomCarousel;
