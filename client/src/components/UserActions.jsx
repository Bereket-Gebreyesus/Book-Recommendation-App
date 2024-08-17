import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";
import AccountImgContainer from "./AccountImgContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { TbUserSquare } from "react-icons/tb";

const UserActions = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
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
            {isMobile ? (
              <TbUserSquare className="user-icon-mobile" />
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
