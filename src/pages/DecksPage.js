import React, { useEffect, useState } from "react";
// Axios (Comunicação Backend)
import axios from "axios";
// MUI UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// Components
import DeckLayout from "../components/DeckLayout";

export default function DecksPage() {
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
    return (
      <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return <DeckLayout deckSummary={deckSummary} />;
}
