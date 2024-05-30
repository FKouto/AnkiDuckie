import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Layout({ children }) {
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
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <Grid
        container
        spacing={0}
        sx={{ alignItems: "center", height: "-webkit-fill-available" }}
      >
        <Grid item xs={12} md={1} sx={{ padding: { xs: 1 } }}>
          <Navbar />
        </Grid>
        <Grid item xs={12} md={11} sx={{ height: "-webkit-fill-available" }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}
