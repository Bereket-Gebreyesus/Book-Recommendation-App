import React from "react";
import PropTypes from "prop-types";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css"; //to overwrite some BS styles

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 3;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

  if (currentPage <= halfMaxPagesToShow) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }

  if (currentPage + halfMaxPagesToShow >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  // Generate an array of page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="custom-pagination">
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <BootstrapPagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
            className="page-item"
          >
            {number}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
