import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Input = ({ id, name, value, onChange, placeholder, ...rest }) => {
  return (
    <Form.Group controlId={id} className="form-floating mb-3">
      <Form.Control
        {...rest}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Form.Label>{placeholder}</Form.Label>
    </Form.Group>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
