import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { Fab, Card, CardContent, Typography, Rating } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Home.css";
import ModalMovies from "../../Components/ModalMovies/ModalMovies";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const addFetchedMovies = (fetchedMovies) => {
    setMoviesFromApi(fetchedMovies);
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
        onSave={handleSave}
        addFetchedMovies={addFetchedMovies}
      ></ModalMovies>
      <div id="new-recommandation">
        {movies.map((movie, index) => (
          <Card key={index} container={document.getElementById("modal-movies")}>
            <CardContent>
              <Typography variant="h5">{movie.title}</Typography>
              <Typography variant="h5">{movie.description}</Typography>
              <Typography variant="h5">{movie.lastSeen}</Typography>
              <Rating readOnly value={movie.rating}></Rating>
            </CardContent>
          </Card>
        ))}

        {moviesFromApi.map((movie, index) => (
          <Card key={index} container={document.getElementById("modal-movies")}>
            <CardContent>
              <Typography variant="h5">{movie.Title}</Typography>
              <Typography variant="h5">{movie.Year}</Typography>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "100px" }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;

// http://www.omdbapi.com/?i=tt3896198&apikey=ea664072
