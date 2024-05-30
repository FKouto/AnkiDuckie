import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ColorsUse from "./colors";
import ProfileModal from "./Profile"; // Importe o seu modal

const Deck = require("../assets/icons/deck.svg").ReactComponent;
const Gemini = require("../assets/icons/gemini.svg").ReactComponent;

const navLinks = [
  { icon: <Deck />, path: "/home" },
  { icon: <Gemini />, path: "/gemini" },
];

const Navbar = ({ isLoggedIn }) => {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para controlar o modal

  const handleProfileClick = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: "fit-content",
          background: primaryColorTransparent,
          backdropFilter: "blur(10px)",
          borderRadius: "5rem",
          border: "2px solid",
          borderColor: primaryColor,
          boxShadow: "none",
          padding: { xs: ".6rem", md: ".8rem" },
          margin: "auto",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            padding: "0px !important",
            minHeight: "0px !important",
          }}
        >
          {navLinks.map((link, index) => (
            <Button
              key={index}
              component={Link}
              to={link.path}
              sx={{ color: primaryColorHover, minWidth: 0 }}
            >
              {link.icon}
            </Button>
          ))}
          <ProfileModal
            open={openProfileModal}
            onClose={handleCloseProfileModal}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
