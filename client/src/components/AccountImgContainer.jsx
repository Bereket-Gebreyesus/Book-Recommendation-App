import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../hooks/AuthContext";
import { IoPersonCircleOutline } from "react-icons/io5";

const AccountImgContainer = () => {
  const { photoURL } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userPhoto =
    photoURL || "https://img.icons8.com/puffy-filled/32/user.png";

  return (
    <div className="account-img-container">
      {isMobile ? (
        <IoPersonCircleOutline className="account-img-icon" />
      ) : (
        <Image
          src={userPhoto}
          alt="Account Image"
          roundedCircle
          className="account-img"
        />
      )}
    </div>
  );
};

export default AccountImgContainer;
