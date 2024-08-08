import React from "react";
import UploadButton from "./UploadButton";
import AccountImgContainer from "./AccountImgContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";

const UserActions = () => {
  return (
    <div className="user-actions-container">
      <UploadButton />
      <div className="account-image-container">
        <LinkContainer to="/user/profile">
          <Nav.Link>
            <AccountImgContainer />
          </Nav.Link>
        </LinkContainer>
      </div>
    </div>
  );
};

export default UserActions;
