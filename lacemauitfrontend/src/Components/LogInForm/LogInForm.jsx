import React, { useState } from "react";
import "./LogInForm.css";
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { LockIcon } from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClassNames } from "@emotion/react";

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <div className="line"></div>
        <TextField
          id="standard-basic"
          variant="standard"
          onChange={onEmailChange}
          label="Enter your email"
        ></TextField>

        <TextField
          id="standard-basic"
          variant="standard"
          onChange={onPasswordChange}
          label="Enter your Password"
        ></TextField>
        <a href="" id="forgot-pass">
          Forgot password?
        </a>

        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>

        <p id="dont-have-acc">
          Don't have an account? <a href="/register">Signup now</a>
        </p>
      </div>
      <div className="photo">
        <h1>Get Watching</h1>
        <div className="line_photo"></div>
        <h1>We've Got the Picks</h1>
      </div>
    </div>
  );
};

export default LogInForm;
