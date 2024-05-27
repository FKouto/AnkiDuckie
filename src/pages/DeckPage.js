import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Box } from "@mui/material";
import DeckComponent from "../components/Deck";

export default function DeckPage() {
  const [users, setUsers] = useState([]);
  const [deckSummary, setDeckSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cores
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorHover, setPrimaryColorHover] = useState("");
  const [primaryColorTransparent, setPrimaryColorTransparent] = useState("");
  // Base Cores
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
  // Cor mais escura
  const darkenColor = (color, percent) => {
    const hsv = colorToHSV(color);
    hsv.v = Math.max(0, hsv.v - percent / 100);
    return HSVToColor(hsv);
  };
  // Cor com menos opacidade
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [deckSummaryResponse] = await Promise.all([
          axios.get("http://localhost:8080/deck/summary", config),
        ]);

        setDeckSummary(deckSummaryResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Recurso não encontrado (404).");
        } else {
          setError("Erro ao carregar os dados.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        padding: "1rem",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0px", // Largura do scrollbar
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1", // Cor do fundo do track
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: primaryColor, // Cor do thumb
          borderRadius: "4px", // Borda arredondada do thumb
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: primaryColorHover, // Cor do thumb quando hover
        },
      }}
    >
      <DeckComponent deckSummary={deckSummary} />
    </Box>
  );
}
