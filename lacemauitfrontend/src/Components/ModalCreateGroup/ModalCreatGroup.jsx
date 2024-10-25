import React from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { useState } from "react";

const ModalCreatGroup = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [inviteeEmail, setInviteeEmail] = useState("");

  const handleCreateGroup = async () => {
    const user = auth.currentUser;
    if (!user || !groupName) return;

    const groupId = `${user.uid}_${Date.now()}`;
    const groupRef = doc(db, "groups", groupId);
    try {
      await setDoc(groupRef, {
        groupName,
        members: [user.email],
        createdBy: user.uid,
      });

      if (inviteeEmail) {
        await updateDoc(groupRef, {
          members: arrayUnion(inviteeEmail),
        });

        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, { groupId });
        onClose();
        setGroupName("");
        setInviteeEmail("");
      }
    } catch (error) {
      console.log("error creating group:", error);
    }
  };
  return (
    <div id="modal-create-group">
      <Modal open={open} onClose={onClose}>
        <Box sx={{ padding: 4, bgcolor: "background-paper", borderRadius: 2 }}>
          <h2>Create Group</h2>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            label="Invite user by email"
            value={inviteeEmail}
            onChange={(e) => setInviteeEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCreatGroup;
