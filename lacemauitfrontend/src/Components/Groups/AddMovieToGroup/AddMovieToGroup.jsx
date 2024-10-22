import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { Button, TextField } from "@mui/material";

const AddMovieToGroup = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddMovie = async () => {
    try {
      await addDoc(collection(db, "groupMovies"), {
        groupId,
        movieTitle,
        rating,
        addedBy: auth.currentUser.uid,
      });
      console.log("movie added");
    } catch (error) {
      console.log("error adding movie", error);
    }
  };
  return (
    <div>
      <TextField
        value={movieTitle}
        label="add movie"
        onChange={(e) => {
          setMovieTitle(e.target.value);
        }}
      ></TextField>
      <Button variant="contained">Add Movie to the group</Button>
    </div>
  );
};

export default AddMovieToGroup;
