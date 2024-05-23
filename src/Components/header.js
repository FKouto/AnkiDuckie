import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material"
import Box from "@mui/material/Box";
const Logo = require("../assets/images/logo.svg").ReactComponent;

function HeaderHome() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Logo />
        </Box>
        <Box>
          <Link to="/register">
            <Button
              variant="text"
              color="inherit"
              sx={{
                background: "none",
                textTransform: "capitalize",
                padding: ".5rem 1rem",
                color: "black",
              }}
            >
              Cadastrar
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="text"
              sx={{
                background: "linear-gradient(45deg, #20212B, #16171F)",
                padding: ".5rem 1rem",
                borderRadius: ".5rem",
                textTransform: "capitalize",
                color: "#FFF",
              }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default HeaderHome;