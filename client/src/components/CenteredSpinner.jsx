import React from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CenteredSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ marginRight: "20px" }}
      ></Spinner>
    </div>
  );
};

export default CenteredSpinner;
