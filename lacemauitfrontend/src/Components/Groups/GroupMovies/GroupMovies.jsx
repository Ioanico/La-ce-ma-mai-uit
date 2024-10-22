import React from "react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "./GroupMovies.css";

const GroupMovies = ({ groupId }) => {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const q = query(
        collection(db, "groupMovies"),
        where("groupId", "==", groupId)
      );
      const querySnapshot = await getDocs(q);
      setMovies(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchMovies();
  }, [groupId]);

  return (
    <div id="group-movies">
      {movies.map((movie, index) => (
        <div key={index}>
          <h3>{movie.movieTitle} </h3>
          <h3>{movie.rating} </h3>
        </div>
      ))}
    </div>
  );
};

export default GroupMovies;
