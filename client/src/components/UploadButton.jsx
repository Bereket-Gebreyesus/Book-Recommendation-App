import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiArrowUpTray } from "react-icons/hi2";

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
          <HiArrowUpTray />
        </Button>
      ) : (
        <Button
          variant="outline-light"
          onClick={handleUpload}
          title="Upload a Book"
        >
          <span>
            <HiArrowUpTray /> Upload
          </span>
        </Button>
      )}
    </div>
  );
};

export default UploadButton;
