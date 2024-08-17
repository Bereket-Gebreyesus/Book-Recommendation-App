import React from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../hooks/AuthContext";

const AccountImgContainer = () => {
  const { photoURL } = useAuth();
  const userPhoto =
    photoURL || "https://img.icons8.com/puffy-filled/32/user.png";

  return (
    <div className="account-img-container">
      <Image
        src={userPhoto}
        alt="Account Image"
        roundedCircle
        className="account-img"
      />
    </div>
  );
};

export default AccountImgContainer;
