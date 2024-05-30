import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const StarIcon = require("../assets/icons/star.svg").ReactComponent;
const ArrowOpen = require("../assets/icons/arrowOpen.svg").ReactComponent;

// Função para escurecer a cor
function darkenColor(color, amount) {
  const [h, s, l] = color.match(/\d+/g).map(Number); // Extrai os valores HSL da cor
  return `hsl(${h}, ${s}%, ${l - amount}%)`; // Retorna a cor com luminosidade ajustada
}

function getCardColor(index) {
  const colors = [
    "hsl(213, 48%, 75%)",
    "hsl(265, 37%, 77%)",
    "hsl(33, 67%, 83%)",
    "hsl(14, 78%, 83%)",
    "hsl(168, 49%, 78%)",
    "hsl(326, 45%, 81%)",
  ];
  return colors[index % colors.length];
}

export default function DeckComponent({ deckSummary }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {deckSummary.map((deck, index) => {
        const cardColor = getCardColor(index);
        const darkTitleColor = darkenColor(cardColor, 52); // Escurece o título em 23%
        const darkButtonColor = darkenColor(cardColor, 35); // Escurece o botão em 40%
        const darkButtonColorHover = darkenColor(cardColor, 30); // Escurece o botão em 40%
        return (
          <Grid item xs={4} sm={4} md={3} key={deck.deckId}>
            <Card
              variant="outlined"
              sx={{
                border: "none",
                backgroundColor: cardColor,
                borderRadius: "2rem",
              }}
            >
              <Box
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "1.813rem",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "500",
                      color: darkTitleColor, // Aplica a cor escurecida ao título
                    }}
                  >
                    {deck.deckTitle}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    padding: "0",
                  }}
                >
                  <Typography
                    variant="caption"
                    display="flex"
                    gutterBottom
                    sx={{ fontWeight: "500", gap: "4px" }}
                  >
                    <StarIcon style={{ fill: darkButtonColor }} />
                    {deck.questionCount}{" "}
                    {deck.questionCount === 1 ? "card" : "cards"}
                  </Typography>
                  <Button
                    className="animationViewDeckButton"
                    size="small"
                    sx={{
                      backgroundColor: darkButtonColor, // Escurece a cor do fundo do card em 20
                      borderRadius: "15px",
                      padding: "10px",
                      minWidth: "0",
                      "&:hover": {
                        backgroundColor: darkButtonColorHover,
                      },
                    }}
                  >
                    <ArrowOpen style={{ color: cardColor, rotate: "180deg"}} />
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
