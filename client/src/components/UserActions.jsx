import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import AccountImgContainer from "./AccountImgContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Button } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";

const UserActions = () => {
  const tabletWidth = 1024;

  const [isTablet, setIsTablet] = useState(window.innerWidth <= tabletWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= tabletWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="user-actions-container">
      <UploadButton />
      <div className="account-image-container">
        <LinkContainer to="/user/profile">
          <Nav.Link>
            {isTablet ? (
              <Button variant="outline-light" title="You account">
                <FaRegUser className="user-icon-mobile" />
              </Button>
            ) : (
              <AccountImgContainer />
            )}
          </Nav.Link>
        </LinkContainer>
      </div>
    </div>
  );
};

export default UserActions;
