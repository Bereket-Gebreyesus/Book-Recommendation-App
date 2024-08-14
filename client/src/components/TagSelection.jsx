import React from "react";
import PropTypes from "prop-types";

const TagSelection = ({
  options,
  selectedTags = [],
  onTagClick,
  searchQuery,
}) => {
  const filteredOptions = options.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {selectedTags.length === 0 && !searchQuery && (
        <div style={{ margin: "2px" }}>No tag selected.</div>
      )}

      {selectedTags.length > 0 && (
        <div style={{ margin: "2px" }}>
          Selected tags:{" "}
          {selectedTags
            .map((tagId) => options.find((tag) => tag._id === tagId)?.name)
            .filter(Boolean)
            .join(", ")}
        </div>
      )}

      {searchQuery &&
        filteredOptions.map((tag) => (
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
};

TagSelection.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  onTagClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default TagSelection;
