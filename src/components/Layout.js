import React, { useEffect, useState } from "react";
// Router DOM
import { useNavigate } from "react-router-dom";
// Axios (Comunicação Backend)
import axios from "axios";
// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
// Components
import Navbar from "./NavBar";
// Colors
import ColorsUse from "./Colors/Colors";

export default function Layout({ children }) {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usersResponse] = await Promise.all([
          axios.get("http://localhost:8080/user", config),
        ]);

        setUsers(usersResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Recurso não encontrado (404).");
        } else {
          setError("Erro ao carregar os dados.");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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

  return (
    <Container
      maxWidth="100vh"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100vh",
        padding: "1rem",
        gap: ".5rem",
        boxSizing: "border-box", // Garantir que padding seja incluído no cálculo da altura total
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "-webkit-fill-available", sm: "fit-content" },
          height: { xs: "fit-content", sm: "-webkit-fill-available" },
          alignContent: "center",
        }}
      >
        <Navbar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
          overflowY: "scroll",
          overflowX: "hidden !important",
          "&::-webkit-scrollbar": {
            width: "5px", // Largura do scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: primaryColorTransparent, // Cor do fundo do track
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: primaryColor, // Cor do thumb
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: primaryColorHover, // Cor do thumb quando hover
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
