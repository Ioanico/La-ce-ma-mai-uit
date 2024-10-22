import React from "react";
import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { Button, TextField } from "@mui/material";
import "./JoinGroup.css";

const JoinGroup = ({ groupId }) => {
  const [inviteeEmail, setInviteeEmail] = useState("");

  const handleInvite = async () => {
    try {
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(inviteeEmail),
      });
      console.log("user invited");
    } catch (error) {
      console.log("user not invited", error);
    }
  };

  return (
    <div id="join-group">
      <TextField
        type="email"
        value={inviteeEmail}
        onChange={(e) => {
          setInviteeEmail(e.target.value);
        }}
        label="enter user email"
      ></TextField>

      <Button onClick={handleInvite}>Invite User to group</Button>
    </div>
  );
};

export default JoinGroup;
