import React from "react";
import { Button } from "@mui/material";
import "./landing.css";
import BgImage from "../../../images/landing-bg.png";
import { useNavigate } from "react-router-dom";

const landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="landing-bg">
      <div className="landing-box">
        <h1 className="welcome">Welcome to</h1>
        <h1 className="lcmmu">La ce ma mai uit?</h1>
        <Button variant="contained" onClick={handleClick}>
          Find out{" "}
        </Button>
      </div>
    </div>
  );
};

export default landing;
