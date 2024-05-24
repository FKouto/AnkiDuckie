import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import ModalComponent from "../Components/modalComponent";
import CardComponent from "../Components/cardComponent";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [deckSummary, setDeckSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Recupera o token do localStorage
        const token = localStorage.getItem("token");

        // Configura o cabeçalho da requisição com o token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Token deve ser enviado como Bearer token
          },
        };

        const response = await axios.get("http://localhost:8080/user", config);

        setUsers(response.data);
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

    const fetchDeckSummary = async () => {
      try {
        // Recupera o token do localStorage
        const token = localStorage.getItem("token");

        // Configura o cabeçalho da requisição com o token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Token deve ser enviado como Bearer token
          },
        };

        const response = await axios.get(
          "http://localhost:8080/deck/summary",
          config
        );
        setDeckSummary(response.data);

        console.log(response.data); // Imprimir dados no console
      } catch (err) {
        console.error("Erro ao carregar resumo do deck:", err);
      }
    };

    fetchUsers();
    fetchDeckSummary();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: ".5rem" }}>
      <ModalComponent />
      <h1>usuario autorizado</h1>
      <CardComponent deckSummary={deckSummary} />
    </Box>
  );
}
