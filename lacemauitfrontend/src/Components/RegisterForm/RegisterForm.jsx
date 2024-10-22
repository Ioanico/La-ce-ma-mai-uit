import React, { useState } from "react";
import "./RegisterForm.css";
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }
      toast.success("User registered", { position: "top-center" });
      console.log("user registered successfully");
    } catch (error) {
      toast.success(error.message, { position: "bottom-center" });
      console.log("error");
    }
    navigate("/login");
  };

  return (
    <div id="container-register">
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

        <Button variant="contained" onClick={handleRegister}>
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
