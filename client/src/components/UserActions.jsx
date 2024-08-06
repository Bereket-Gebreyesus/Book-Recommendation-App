import React from "react";
import UploadButton from "./UploadButton";
import AccountImgContainer from "./AccountImgContainer";

const UserActions = () => {
  return (
    <div className="user-actions-container">
      <UploadButton />
      <div className="account-image-container">
        <AccountImgContainer />
      </div>
    </div>
  );
};

export default UserActions;
