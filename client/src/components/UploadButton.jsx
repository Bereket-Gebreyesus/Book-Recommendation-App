import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowUp } from "react-icons/bs";

const UploadButton = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  const handleUpload = () => {
    navigate("/book/upload");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <Button
          variant="outline-light"
          onClick={handleUpload}
          title="Upload a Book"
        >
          <BsBoxArrowUp />
        </Button>
      ) : (
        <Button
          className="upload-button"
          variant="secondary-upload"
          onClick={handleUpload}
        >
          Upload a Book
        </Button>
      )}
    </div>
  );
};

export default UploadButton;
