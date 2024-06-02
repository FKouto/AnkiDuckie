import React from "react";
// Components
import Header from "../components/Header";
// MUI UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Animação
import { motion } from "framer-motion";
// Deck
import {
  CardAzul,
  CardLaranja,
  CardRosa,
  CardRoxo,
  CardVerde,
  CardVermelho,
} from "../assets/images/DecksExport";
import "../style/style.css";
// Array de objetos contendo os componentes dos cards e suas respectivas classes CSS
const cards = [
  { Component: CardAzul, className: "Card-Column-1" },
  { Component: CardLaranja, className: "Card-Column-1" },
  { Component: CardRosa, className: "Card-Column-1" },
  { Component: CardRoxo, className: "Card-Column-1" },
  { Component: CardVerde, className: "Card-Column-1" },
  { Component: CardVermelho, className: "Card-Column-1" },
];

export default function LandingPage() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          height: "fit-content",
          overflow: "hidden",
          position: "absolute",
          top: "50%",
          left: "0%",
          width: "100%",
          textAlign: "center",
          transform: "translateY( -50% )",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ padding: ".5rem" }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
                fontWeight: 600,
                lineHeight: "normal",
                textAlign: "center",
              }}
            >
              Aprenda com flashcards,
              <br /> estude menos!
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: 500,
                lineHeight: "normal",
                textAlign: "center",
              }}
              gutterBottom
            >
              Esqueça o medo das provas e aprenda idiomas com facilidade! <br />
              A repetição espaçada, com comprovação científica, é a sua aliada.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                className="ContainerCards-1"
                sx={{
                  width: "fit-content",
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 300px)",
                  gap: "2rem",
                }}
              >
                {cards.map(({ Component, className }, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={(e) => {}}
                    onHoverEnd={(e) => {}}
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Component
                      className={className}
                      style={{ height: "fit-content", width: "100%" }}
                    />
                  </motion.a>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                className="ContainerCards-2"
                sx={{
                  width: "fit-content",
                  display: { xs: "none", md: "grid" },
                  gridTemplateColumns: "repeat(6, 300px)",
                  gap: "2rem",
                  paddingBottom: ".2rem",
                }}
              >
                {cards.map(({ Component, className }, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={(e) => {}}
                    onHoverEnd={(e) => {}}
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Component
                      className={className}
                      style={{ height: "fit-content", width: "100%" }}
                    />
                  </motion.a>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
