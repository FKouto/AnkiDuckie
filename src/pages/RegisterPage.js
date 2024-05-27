import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
// Images
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

export default function RegisterPage() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000); // Mensagem desaparecerá após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubscribe = async () => {
    if (!nome || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios");
      setSuccess(""); // Clear success message when there is an error
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setSuccess(""); // Clear success message when there is an error
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        nome,
        email,
        password,
      });
      console.log("Cadastro realizado com sucesso:", response.data);
      const token = response.data?.token; // Certifique-se de que está acessando o campo correto
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token armazenado:", localStorage.getItem("token"));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("Cadastrado com sucesso!");
      } else {
        throw new Error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.log("Erro durante a inscrição:", error);
      setSuccess(""); // Clear success message when there is an error
      if (error.response && error.response.status === 404) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Erro ao fazer cadastro");
      }
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
              <Box>
                <Link to="/login">
                  <Button
                    variant="text"
                    sx={{
                      background: "linear-gradient(45deg, #20212B, #16171F)",
                      padding: ".5rem 1rem",
                      borderRadius: ".5rem",
                      textTransform: "capitalize",
                      color: "#FFF",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Sucess / Error Box */}
          <Box>
            {error && (
              <Alert
                severity="error"
                sx={{
                  fontWeight: "600",
                  borderRadius: "1rem",
                  mt: 1,
                  mb: 1,
                }}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                severity="success"
                sx={{
                  fontWeight: "600",
                  borderRadius: "1rem",
                  mt: 1,
                  mb: 1,
                }}
              >
                {success}
              </Alert>
            )}
          </Box>
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
                Criar uma conta
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              <DuckieTextField
                id="outlined-required-nome"
                label="Name"
                variant="filled"
                value={nome}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "100%" }}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: "100%" }}
              />
              <DuckieTextField
                label="Confirmar Senha"
                type="password"
                variant="filled"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ width: "100%" }}
              />
              <Button
                variant="text"
                onClick={handleSubscribe}
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
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}