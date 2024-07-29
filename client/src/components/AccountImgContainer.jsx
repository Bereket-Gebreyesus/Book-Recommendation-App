import React from "react";
import { Image } from "react-bootstrap";

const AccountImgContainer = ({ imageUrl }) => {
  return (
    <div className="account-img-container">
      <Image
        src={"https://img.icons8.com/puffy-filled/32/user.png"}
        alt="Account Image"
        roundedCircle
        className="account-img"
      />
      .
    </div>
  );
};

export default AccountImgContainer;
