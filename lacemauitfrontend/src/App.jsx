import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./Pages/Landing/landing";
import { Route, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LogIn from "./Pages/LogIn/LogIn";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import CreateGroup from "./Components/Groups/CreateGroup/CreateGroup";
import JoinGroup from "./Components/Groups/JoinGroup/JoinGroup";
import AddMovieToGroup from "./Components/Groups/AddMovieToGroup/AddMovieToGroup";
import { ToastContainer, toast } from "react-toastify";
import GroupMovies from "./Components/Groups/GroupMovies/GroupMovies";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group/:groupId" element={<JoinGroup />} />
          <Route
            path="/join-group/:groupId/add-movie"
            element={<AddMovieToGroup />}
          />
          <Route path="/group/:groupId/movies" element={<GroupMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
