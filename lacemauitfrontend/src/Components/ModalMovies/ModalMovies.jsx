import React, { useState } from "react";
import "./ModalMovies.css";
import { Modal, Box, Button, TextField, Rating } from "@mui/material";
import axios from "axios";

const ModalMovies = ({ open, onClose, addFetchedMovies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rating, setRating] = useState(null);

  const fetchMovieDetails = async () => {
    const apiKey = "ea664072";
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}&type=movie`
      );
      if (response.data && response.data.Response === "True") {
        const movieData = {
          Title: response.data.Title,
          Year: response.data.Year,
          Poster: response.data.Poster,
          rating: rating,
        };
        addFetchedMovies(movieData);
        setSearchQuery("");
        setRating(null);
        onClose(); //
      } else {
        console.log("Movie not found");
      }
    } catch (error) {
      console.log("Error fetching movie details", error);
    }
  };

  return (
    <div id="modal-movies">
      <Modal
        open={open}
        onClose={onClose}
        container={document.getElementById("modal-movies")}
      >
        <Box>
          <TextField
            variant="outlined"
            label="Movie Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <Button variant="outlined" onClick={fetchMovieDetails}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMovies;
