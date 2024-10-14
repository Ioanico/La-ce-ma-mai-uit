import React from "react";
import "./ModalMovies.css";
import {
  Modal,
  Card,
  Box,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ModalMovies = ({ open, onClose, onSave, addFetchedMovies }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastSeen: "",
    rating: null,
  });

  const fetchMoviesFromOMDB = async () => {
    const apiKey = "ea664072";
    const searchQuery = "Tarzan";

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&type=movie`
      );
      if (response.data.Search) {
        const fetchedMovies = response.data.Search.slice(0, 1);
        addFetchedMovies(fetchedMovies);
      } else {
        console.log("movies not found");
      }
    } catch (error) {
      console.log("error fetching movies", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSave = (e) => {
    onSave(formData);
    setFormData({ title: "", description: "", lastSeen: "", rating: "" });
    onClose();
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
            name="title"
            id="outlined-basic"
            variant="outlined"
            label="Titlu"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            id="outlined-basic"
            variant="outlined"
            label="Descriere"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="lastSeen"
            id="outlined-basic"
            variant="outlined"
            label="Ultima oara vazut"
            value={formData.lastSeen}
            onChange={handleChange}
            required
          />

          <Rating
            value={formData.rating}
            onChange={handleRatingChange}
          ></Rating>

          <Button
            variant="outlined"
            onClick={() => {
              handleSave(), onClose();
            }}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              onClose(), fetchMoviesFromOMDB();
            }}
          >
            Magie (soon)
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMovies;
