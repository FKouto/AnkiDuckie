import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ColorsUse from "./Colors/Colors";
import HugeIcons from "../assets/icons/HugeIcons";
import ProfileModal from "./Profile"; // Importe o seu modal
const { DashboardSquare02Icon, AiChat02Icon, LicenseDraftIcon } = HugeIcons();

const navLinks = [
  { icon: <DashboardSquare02Icon />, path: "/home" },
  { icon: <AiChat02Icon />, path: "/chat" },
  { icon: <LicenseDraftIcon />, path: "/new" },
];

const Navbar = () => {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para controlar o modal

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  return (
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
  );
};

export default Navbar;
