import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { InputAdornment, TextField, Button } from "@mui/material";
import "./CreateGroup.css";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName) {
      setError("group name is required");
      return;
    }
    try {
      const groupRef = await addDoc(collection(db, "Groups"), {
        groupName,
        createdBy: auth.currentUser.uid,
        members: [auth.currentUser.uid],
      });
    } catch (error) {
      console.log("error creating group", error);
    }
  };

  return (
    <div id="create-group">
      <TextField
        value={groupName}
        id="standard-basic"
        variant="standard"
        label="Set Group Name"
        onChange={(e) => {
          setGroupName(e.target.value);
        }}
      ></TextField>

      <Button variant="contained" onClick={handleCreateGroup}>
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroup;
