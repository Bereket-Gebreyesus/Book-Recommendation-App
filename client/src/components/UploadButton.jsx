import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiArrowUpTray } from "react-icons/hi2";

const UploadButton = () => {
  const tabletWidth = 1024;
  const navigate = useNavigate();

  const [isTablet, setIsTablet] = useState(window.innerWidth < tabletWidth);

  const handleUpload = () => {
    navigate("/book/upload");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < tabletWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isTablet ? (
        <Button
          variant="outline-light"
          onClick={handleUpload}
          title="Upload a Book"
        >
          <HiArrowUpTray />
        </Button>
      ) : (
        <Button
          variant="outline-light"
          onClick={handleUpload}
          title="Upload a Book"
        >
          <span>
            <HiArrowUpTray /> Upload book
          </span>
        </Button>
      )}
    </div>
  );
};

export default UploadButton;
