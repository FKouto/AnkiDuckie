import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ArrowOpen = require("../assets/icon/arrow.svg").ReactComponent;

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

function CardComponent({ deckSummary }) {
  return (
    <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
      {deckSummary.map((deck, index) => (
        <Box
          key={deck.deckId}
          sx={{
            minWidth: 304,
            maxWidth: 368,
          }}
        >
          <Card
            variant="outlined"
            sx={{ border: "none", backgroundColor: getCardColor(index), borderRadius: "2rem" }}
          >
            <Box
              sx={{
                minHeight: 176,
                maxHeight: 176,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1.813rem",
              }}
            >
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>
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
                  sx={{}}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: darkenColor(getCardColor(index), 20) }} // Define a cor de preenchimento com base na cor do botão
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
                  size="small"
                  sx={{
                    backgroundColor: darkenColor(getCardColor(index), 20), // Escurece a cor do fundo do card em 20
                    borderRadius: "15px",
                    padding: "10px",
                    minWidth: "0",
                  }}
                >
                  <ArrowOpen />
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default CardComponent;
