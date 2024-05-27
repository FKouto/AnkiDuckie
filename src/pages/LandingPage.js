import Header from "../components/Header.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../style.css";
import {
  CardAzul,
  CardLaranja,
  CardRosa,
  CardRoxo,
  CardVerde,
  CardVermelho,
} from "../components/DeckIllustration.js";

// Array de objetos contendo os componentes dos cards e suas respectivas classes CSS
const cards = [
  { Component: CardAzul, className: "Card-Column-1" },
  { Component: CardLaranja, className: "Card-Column-1" },
  { Component: CardRosa, className: "Card-Column-1" },
  { Component: CardRoxo, className: "Card-Column-1" },
  { Component: CardVerde, className: "Card-Column-1" },
  { Component: CardVermelho, className: "Card-Column-1" },
];

export default function Landing() {
  return (
    <Box component="main" sx={{ height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <Header />
      {/* Conteúdo */}
      <Box
        component="section"
        sx={{
          height: "-webkit-fill-available",
          alignContent: "space-around",
        }}
      >
        <Box>
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
            Esqueça o medo das provas e aprenda idiomas com facilidade! <br />A
            repetição espaçada, com comprovação científica, é a sua aliada.
          </Typography>
        </Box>
        <Box>
          {/* Coluna 1 */}
          <Box
            className="ContainerCards-1"
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              gap: ".5rem",
            }}
          >
            {cards.map(({ Component, className }, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  padding: ".5rem",
                  width: "20rem",
                  transform: "scale(1)",
                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                <Component className={className} />
              </Box>
            ))}
          </Box>
          {/* Coluna 2 */}
          <Box
            className="ContainerCards-2"
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "row",
              gap: ".5rem",
            }}
          >
            {cards.map(({ Component, className }, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  padding: ".5rem",
                  width: "20rem",
                  transform: "scale(1)",
                  "&:hover": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                <Component className={className} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}