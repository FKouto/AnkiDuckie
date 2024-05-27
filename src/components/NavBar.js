import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileModal from "./Profile"; // Importe o seu modal

const Perfil = require("../assets/icons/perfil.svg").ReactComponent;
const Deck = require("../assets/icons/deck.svg").ReactComponent;
const Gemini = require("../assets/icons/gemini.svg").ReactComponent;

const navLinks = [
  { icon: <Deck />, path: "/home" },
  { icon: <Gemini />, path: "/gemini" },
];

const Navbar = ({ isLoggedIn }) => {
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorHover, setPrimaryColorHover] = useState("");
  const [primaryColorTransparent, setPrimaryColorTransparent] = useState("");
  const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para controlar o modal

  const colors = [
    "hsl(213, 48%, 75%)",
    "hsl(265, 37%, 77%)",
    "hsl(33, 67%, 83%)",
    "hsl(14, 78%, 83%)",
    "hsl(168, 49%, 78%)",
    "hsl(326, 45%, 81%)",
  ];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setPrimaryColor(randomColor);

    const hoverColor = darkenColor(randomColor, 25);
    setPrimaryColorHover(hoverColor);

    const transparentColor = setOpacity(randomColor, 0.5);
    setPrimaryColorTransparent(transparentColor);
  }, []);

  const darkenColor = (color, percent) => {
    const hsv = colorToHSV(color);
    hsv.v = Math.max(0, hsv.v - percent / 100);
    return HSVToColor(hsv);
  };

  const setOpacity = (color, opacity) => {
    const hslaColor = color
      .replace("hsl", "hsla")
      .replace(")", `, ${opacity})`);
    return hslaColor;
  };

  const colorToHSV = (color) => {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return null;
    const [, h, s, v] = match.map(parseFloat);
    return { h, s: s / 100, v: v / 100 };
  };

  const HSVToColor = (hsv) => {
    const { h, s, v } = hsv;
    const hsl = `hsl(${h}, ${s * 100}%, ${v * 100}%)`;
    return hsl;
  };

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
