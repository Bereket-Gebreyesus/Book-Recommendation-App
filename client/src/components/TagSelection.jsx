import React from "react";
import PropTypes from "prop-types";

const TagSelection = ({ options, selectedTags, onTagClick }) => (
  <div>
    {options.map((tag) => (
      <button
        key={tag._id}
        type="button"
        className={`tag ${selectedTags.includes(tag._id) ? "selected" : ""}`}
        onClick={() => onTagClick(tag._id)}
        style={{
          margin: "2px",
          padding: "2px 6px",
          fontSize: "12px",
          border: selectedTags.includes(tag._id)
            ? "2px solid blue"
            : "1px solid grey",
          backgroundColor: selectedTags.includes(tag._id)
            ? "#D0EFFF"
            : "#f8f9fa",
          borderRadius: "5px",
        }}
      >
        {tag.name}
      </button>
    ))}
  </div>
);

TagSelection.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagClick: PropTypes.func.isRequired,
};

export default TagSelection;
