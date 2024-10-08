import React, { useState } from "react";
import "./RegisterForm.css";
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { LockIcon } from "@mui/icons-material/Lock";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
    console.log("Email:", event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", {
        name,
        email,
        password,
      })
      .then((res) => console.log(res).catch((err) => console.log(err)));
  };

  return (
    <div className="container-register">
      <div className="register">
        <h1>Register</h1>

        <div className="line"></div>

        <TextField
          id="standard-basic"
          variant="standard"
          onChange={onNameChange}
          label="Enter your name"
        ></TextField>

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

        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>

        <p id="dont-have-acc">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <div className="photo">
        <h1>Get Watching</h1>
        <div className="line-photo"></div>
        <h1>We've Got the Picks</h1>
      </div>
    </div>
  );
};

export default RegisterForm;
