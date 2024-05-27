import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ fill: darkButtonColor }} // Define a cor de preenchimento com base na cor do botão
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.83332 1.66675C3.53214 1.66675 1.66666 3.53223 1.66666 5.83341L1.66666 14.1667C1.66666 16.4679 3.53214 18.3334 5.83332 18.3334H14.1667C16.4678 18.3334 18.3333 16.4679 18.3333 14.1667V5.83341C18.3333 3.53223 16.4678 1.66675 14.1667 1.66675L5.83332 1.66675ZM11.1208 6.22167C10.6622 5.29262 9.33744 5.29262 8.87892 6.22167L8.2219 7.55294L6.75276 7.76642C5.72748 7.9154 5.3181 9.17537 6.05999 9.89854L7.12307 10.9348L6.87212 12.398C6.69698 13.4191 7.76877 14.1978 8.6858 13.7157L9.99984 13.0249L11.3139 13.7157C12.2309 14.1978 13.3027 13.4191 13.1276 12.398L12.8766 10.9348L13.9397 9.89854C14.6816 9.17537 14.2722 7.9154 13.2469 7.76642L11.7778 7.55294L11.1208 6.22167Z"
                      />
                    </svg>
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ fill: cardColor }} // Define a cor de preenchimento com base na cor do botão
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2929 4.29289C13.6834 3.90237 14.3166 3.90237 14.7071 4.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L14.7071 19.7071C14.3166 20.0976 13.6834 20.0976 13.2929 19.7071C12.9024 19.3166 12.9024 18.6834 13.2929 18.2929L18.5858 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H18.5858L13.2929 5.70711C12.9024 5.31658 12.9024 4.68342 13.2929 4.29289Z"
                      />
                    </svg>
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
