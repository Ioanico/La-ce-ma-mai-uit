import React from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";
import "./ModalUserProfile.css";

const ModalUserProfile = ({ open, onClose, userDetails }) => {
  return (
    <div id="user-profile">
      <Modal
        open={open}
        onClose={onClose}
        container={document.getElementById("user-profile")}
      >
        <Box>
          {userDetails ? (
            <>
              <h1>username : {userDetails.name}</h1>
              <h1>email : {userDetails.email}</h1>
            </>
          ) : (
            <h1>Loading User</h1>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalUserProfile;
