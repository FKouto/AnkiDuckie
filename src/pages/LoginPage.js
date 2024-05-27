import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Body
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
// Typography
import Typography from "@mui/material/Typography";
// Header
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { alpha, styled } from "@mui/material/styles";
const Logo = require("../logo.svg").ReactComponent;

// TextField Personalizado
const DuckieTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: "1.2rem",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#C6B4E4" : "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "#e5e5e5",
      border: "1px solid #8C68C8",
    },
    "&.Mui-focused": {
      backgroundColor: "#e5e5e5",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      console.log("Login realizado com sucesso:", response.data);
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token armazenado:", localStorage.getItem("token"));
        navigate("/home");
      } else {
        throw new Error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.log("Erro durante o login:", error);
      if (error.response && error.response.status === 401) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Erro ao fazer login");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Verifica se a tecla pressionada é "Enter"
      handleLogin(); // Chama a função handleLogin quando "Enter" é pressionado
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          overflow: "hidden",
          bgcolor: "#ADBDEB",
          minWidth: "100vw !important",
          margin: "0px !important",
          padding: "0px !important",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            height: "100vh",
            margin: "auto",
            padding: ".5rem",
            alignContent: "center",
          }}
        >
          {/* Header */}
          <AppBar
            position="absolute"
            sx={{
              position: "fixed",
              top: "0",
              background: "transparent",
              boxShadow: "none",
              color: "black",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box>
                <Logo />
              </Box>
            </Toolbar>
          </AppBar>
          {/* Login Form */}
          <Box
            sx={{
              background: "#FFF",
              padding: ".5rem",
              borderRadius: "1.5rem",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#000", padding: "1rem 0rem" }}
              >
                Login
              </Typography>
            </Box>
            {error && (
              <Alert severity="error" sx={{ marginBottom: "1rem" }}>
                {error}
              </Alert>
            )}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <DuckieTextField
                id="outlined-required-email"
                label="E-mail"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "100%" }}
              />
              <DuckieTextField
                label="Senha"
                type="password"
                variant="filled"
                sx={{ width: "100%" }}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown} // Adiciona o evento de teclado
              />
              <Button
                variant="text"
                onClick={handleLogin}
                sx={{
                  width: "100%",
                  background: "#5A79D6",
                  padding: ".8rem",
                  borderRadius: "1.2rem",
                  textTransform: "capitalize",
                  color: "#FFF",
                  "&:hover": {
                    background: "#2947A3",
                  },
                }}
              >
                Login
              </Button>
              <Box sx={{ padding: ".5rem 0rem" }}>
                <Typography variant="body1">
                  Não tem uma conta?
                  <Link to="/register">
                    <Button variant="text" sx={{ textTransform: "none" }}>
                      Registre-se
                    </Button>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}