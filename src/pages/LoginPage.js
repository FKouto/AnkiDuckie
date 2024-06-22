import React, { useState, useEffect } from "react";
// Router DOM
import { Link, useNavigate } from "react-router-dom";
// Axios (Comunicação Backend)
import axios from "axios";
// MUI UI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// Cores
import ColorsUse from "../components/Colors/Colors";
// Animação
import { motion } from "framer-motion";
// Components
import CustomTextField from "../components/MUICustom/TextField";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function LoginPage() {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error && (
        <Box sx={{ position: "absolute", top: "10%" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Container sx={{ width: "fit-content" }}>
              <Alert
                severity="error"
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "1rem",
                  border: "2px solid",
                }}
              >
                {error}
              </Alert>
            </Container>
          </motion.div>
        </Box>
      )}
      <Container component="section" maxWidth="xs">
        <CssBaseline />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div variants={item}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 600, padding: "1rem 0" }}
            >
              Login
            </Typography>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              width: "100%",
            }}
          >
            <motion.div variants={item}>
              <CustomTextField
                id="email"
                label="E-mail"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    backgroundColor: primaryColorTransparent,
                    borderColor: primaryColor,
                    "&:hover": {
                      backgroundColor: primaryColorTransparent,
                      border: "1px solid",
                      borderColor: primaryColorHover,
                    },
                    "&.Mui-focused": {
                      backgroundColor: primaryColorTransparent,
                      boxShadow: `${primaryColor} 2px 2px 15px`,
                      borderColor: primaryColorHover,
                    },
                  },
                }}
              />
            </motion.div>
            <motion.div variants={item}>
              <CustomTextField
                label="password"
                type="password"
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{
                  width: "100%",
                  "& .MuiFilledInput-root": {
                    backgroundColor: primaryColorTransparent,
                    borderColor: primaryColor,
                    "&:hover": {
                      backgroundColor: primaryColorTransparent,
                      border: "1px solid",
                      borderColor: primaryColorHover,
                    },
                    "&.Mui-focused": {
                      backgroundColor: primaryColorTransparent,
                      boxShadow: `${primaryColor} 2px 2px 15px`,
                      borderColor: primaryColorHover,
                    },
                  },
                }}
              />
            </motion.div>
            <motion.div variants={item}>
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  width: "100%",
                  padding: ".8rem",
                  borderRadius: "1.2rem",
                  border: "1px solid",
                  borderColor: primaryColorHover,
                  textTransform: "capitalize",
                  color: "#FFF",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                    border: "1px solid",
                    borderColor: primaryColorHover,
                    boxShadow: "none",
                  },
                }}
              >
                Entrar
              </Button>
            </motion.div>
            <motion.div variants={item}>
              <Box sx={{ padding: ".5rem 0", textAlign: "center" }}>
                <Typography variant="body1">
                  Não tem uma conta?
                  <Link to="/register">
                    <Button
                      variant="text"
                      sx={{ textTransform: "none", color: primaryColorHover }}
                    >
                      Registre-se
                    </Button>
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
