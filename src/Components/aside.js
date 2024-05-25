import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ModalComponent from "../Components/modalComponent";
const Logo = require("../assets/images/logo.svg").ReactComponent;

export default function AsideHome() {
  return (
    <AppBar
      position="static"
      sx={{
        width: "fit-content",
        margin: "auto",
        background: "#C6B4E4",
        boxShadow: "none",
        color: "black",
        borderRadius: "1rem"
      }}
    >
      <Toolbar sx={{padding: "0px !important"}}>
        <Grid
          container
          spacing={0}
          sx={{
            textAlign: "center",
            flexDirection: { xs: "row", md: "column" },
            alignItems: "center"
          }}
        >
          <Grid item xs="auto">
            <Button>
              <ModalComponent />
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button>
              <ModalComponent />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
