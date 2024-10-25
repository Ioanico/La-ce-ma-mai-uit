import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./NavBar.css";
import { Button, Icon } from "@mui/material";
import ModalUserProfile from "../UserProfile/ModalUserProfile";
import ModalCreatGroup from "../ModalCreateGroup/ModalCreatGroup";
import ModalOpenGroup from "../ModalOpenGroup/ModalOpenGroup";

export default function NavBar() {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [isInGroup, setIsInGroup] = useState(false);
  const [auth, setAuth] = useState(getAuth());
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(auth);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(auth);
        // console.log("User:", user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User not logged in");
      }
    });
  }, []);

  useEffect(() => {
    const checkUserGroup = async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        setIsInGroup(userSnap.exists() && userSnap.data().groupId);
      }
      onAuthStateChanged(auth, checkUserGroup);
    };
  }, []);

  return (
    <div className="nav-bar">
      <ModalUserProfile
        open={open}
        onClose={handleClose}
        userDetails={userDetails}
      />

      <ModalCreatGroup
        open={openCreateGroup}
        onClose={() => setOpenCreateGroup(false)}
      ></ModalCreatGroup>

      <ModalOpenGroup
        open={openGroupModal}
        onClose={() => setOpenGroupModal(false)}
      ></ModalOpenGroup>

      <Box sx={{ flexGrow: 1 }} container={document.getElementById("nav-bar")}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photos
            </Typography>
            {isInGroup && (
              <Button
                variant="contained"
                onClick={() => setOpenGroupModal(true)}
              >
                Open Group
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => setOpenCreateGroup(true)}
            >
              Create Group
            </Button>

            {userDetails ? (
              <>
                <h1>Welcome {userDetails.name}</h1>
                <IconButton onClick={handleOpen}>
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
