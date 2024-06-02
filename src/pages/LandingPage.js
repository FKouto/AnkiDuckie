import React, { useEffect, useRef, useState } from "react";
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
  Card_1,
  Card_2,
  Card_3,
  Card_4,
  Card_5,
  Card_6,
  Card_7,
  Card_8,
  Card_9,
  Card_10,
  Card_11,
  Card_12,
  Card_13,
  Card_14,
  Card_15,
  Card_16,
} from "../assets/images/DecksExport";
import "../style/style.css";
// Array de objetos contendo os componentes dos cards e suas respectivas classes CSS
const cardsFirstRow = [
  { Component: Card_1, className: "Card-Column-1" },
  { Component: Card_2, className: "Card-Column-1" },
  { Component: Card_3, className: "Card-Column-1" },
  { Component: Card_4, className: "Card-Column-1" },
  { Component: Card_5, className: "Card-Column-1" },
  { Component: Card_6, className: "Card-Column-1" },
  { Component: Card_7, className: "Card-Column-1" },
  { Component: Card_8, className: "Card-Column-1" },
];
const cardsSecondRow = [
  { Component: Card_9, className: "Card-Column-2" },
  { Component: Card_10, className: "Card-Column-2" },
  { Component: Card_11, className: "Card-Column-2" },
  { Component: Card_12, className: "Card-Column-2" },
  { Component: Card_13, className: "Card-Column-2" },
  { Component: Card_14, className: "Card-Column-2" },
  { Component: Card_15, className: "Card-Column-2" },
  { Component: Card_16, className: "Card-Column-2" },
];

export default function LandingPage() {
  const scrollRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 para a direita, -1 para a esquerda

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      const scrollAmount = 1; // Número de pixels a rolar por intervalo
      const scrollInterval = 30; // Intervalo em milissegundos

      const intervalId = setInterval(() => {
        scrollElement.scrollLeft += scrollAmount * scrollDirection;

        // Verifica se chegou ao fim ou ao início e inverte a direção
        if (
          scrollElement.scrollLeft + scrollElement.clientWidth >=
            scrollElement.scrollWidth ||
          scrollElement.scrollLeft <= 0
        ) {
          setScrollDirection((prevDirection) => -prevDirection);
        }
      }, scrollInterval);

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }
  }, [scrollDirection]);
  const scrollRefRight = useRef(null);
  const [scrollDirectionRight, setScrollDirectionRight] = useState(-1); // 1 para a direita, -1 para a esquerda

  useEffect(() => {
    const scrollElement = scrollRefRight.current;

    if (scrollElement) {
      const scrollAmount = 1; // Número de pixels a rolar por intervalo
      const scrollInterval = 60; // Intervalo em milissegundos

      const intervalId = setInterval(() => {
        scrollElement.scrollLeft += scrollAmount * scrollDirectionRight;

        // Verifica se chegou ao fim ou ao início e inverte a direção
        if (
          scrollElement.scrollLeft + scrollElement.clientWidth >=
            scrollElement.scrollWidth ||
          scrollElement.scrollLeft <= 0
        ) {
          setScrollDirectionRight((prevDirection) => -prevDirection);
        }
      }, scrollInterval);

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }
  }, [scrollDirectionRight]);
  return (
    <Box sx={{ height: "100vh" }}>
      <Header />
      <Container
        maxWidth="100vh"
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
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
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
            <Grid container spacing={2} className="ContainerCards-1">
              <Grid
                item
                xs={12}
                sx={{
                  width: "fit-content",
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 300px)",
                  gap: "2rem",
                  paddingBottom: "0.5rem",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  /* Estilo geral para a barra de rolagem */
                  "::-webkit-scrollbar": {
                    width: "0px" /* Largura da barra de rolagem vertical */,
                    height: "0px" /* Altura da barra de rolagem horizontal */,
                  },

                  /* Fundo da barra de rolagem */
                  "::-webkit-scrollbar-track": {
                    background: "transparent",
                  },

                  /* Polegar da barra de rolagem */
                  "::-webkit-scrollbar-thumb": {
                    background: "transparent",
                  },

                  /* Polegar da barra de rolagem ao passar o mouse */
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "transparent",
                  },
                }}
                ref={scrollRefRight}
              >
                {cardsFirstRow.map(({ Component, className }, index) => (
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
                sx={{
                  width: "fit-content",
                  display: { xs: "none", sm: "grid" },
                  gridTemplateColumns: "repeat(8, 300px)",
                  gap: "2rem",
                  paddingBottom: "0.5rem",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  /* Estilo geral para a barra de rolagem */
                  "::-webkit-scrollbar": {
                    width: "0px" /* Largura da barra de rolagem vertical */,
                    height: "0px" /* Altura da barra de rolagem horizontal */,
                  },

                  /* Fundo da barra de rolagem */
                  "::-webkit-scrollbar-track": {
                    background: "transparent",
                  },

                  /* Polegar da barra de rolagem */
                  "::-webkit-scrollbar-thumb": {
                    background: "transparent",
                  },

                  /* Polegar da barra de rolagem ao passar o mouse */
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "transparent",
                  },
                }}
                ref={scrollRef}
              >
                {cardsSecondRow.map(({ Component, className }, index) => (
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
