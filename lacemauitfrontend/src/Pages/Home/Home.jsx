import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { Fab, Card, CardContent, Typography, Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Home.css";
import ModalMovies from "../../Components/ModalMovies/ModalMovies";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]); // Store all movies

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addFetchedMovies = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <div id="home-page">
      <NavBar />
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <ModalMovies
        open={open}
        onClose={handleClose}
        addFetchedMovies={addFetchedMovies}
      />

      <div id="new-recommandation">
        {movies.map((movie, index) => (
          <Card key={index} container={document.getElementById("modal-movies")}>
            <CardContent>
              <Typography variant="h5">{movie.Title}</Typography>
              <Typography variant="subtitle1">{movie.Year}</Typography>
              <img src={movie.Poster} alt={movie.Title} />
              <Rating readOnly value={movie.rating} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
