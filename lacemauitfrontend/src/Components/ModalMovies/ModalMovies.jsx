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

//TODO : Save rating stars upon creating recommandation
//       Make styles prettiier / not so urgent
//       AUTH - AUTHENTICATION --- urgent

const ModalMovies = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastSeen: "",
    rating: "",
  });

  const [value, setValue] = useState(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSave = (e) => {
    onSave(formData);
    setFormData({ title: "", description: "", lastSeen: "" });
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
            label="ceva1"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            id="outlined-basic"
            variant="outlined"
            label="ceva2"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="lastSeen"
            id="outlined-basic"
            variant="outlined"
            label="ceva3"
            value={formData.lastSeen}
            onChange={handleChange}
            required
          />

          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue), handleRatingChange(newValue);
            }}
          ></Rating>

          <Button
            onClick={() => {
              handleSave(), onClose();
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMovies;
