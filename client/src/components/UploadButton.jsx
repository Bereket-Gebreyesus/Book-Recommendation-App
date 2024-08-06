import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UploadButton = () => {
  const navigate = useNavigate();
  const handleUpload = () => {
    navigate("/book/upload");
  };

  return (
    <div>
      <Button variant="secondary-upload" onClick={handleUpload}>
        Upload a Book
      </Button>
    </div>
  );
};

export default UploadButton;
