import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Grid, Box } from "@mui/material";
import AsideHome from "../Components/aside";
import CardComponent from "../Components/cardComponent";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [deckSummary, setDeckSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [usersResponse, deckSummaryResponse] = await Promise.all([
          axios.get("http://localhost:8080/user", config),
          axios.get("http://localhost:8080/deck/summary", config),
        ]);

        setUsers(usersResponse.data);
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
    <Box component="main" sx={{ height: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          position: { xs: "absolute", md: "relative" },
          bottom: { xs: 0 },
          flexDirection: { xs: "column-reverse", md: "row" },
          padding: "1rem"
        }}
      >
        <Grid item xs={12} md={1}>
          <AsideHome />
        </Grid>
        <Grid item xs={12} md={11}>
          <CardComponent deckSummary={deckSummary} />
        </Grid>
      </Grid>
    </Box>
  );
}
