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

export default function RegisterPage() {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleSubscribe = async () => {
    if (!nome || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Suas senhas não são iguais.Tente novamente com mais calma.");
      setSuccess("");
      return;
    }

    const allowedDomains = ["gmail.com", "icloud.com", "outlook.com"];
    const emailRegex = /@([^\s@]+)$/; // Regex para pegar o domínio do email
    const match = email.match(emailRegex);
    if (!match || !allowedDomains.includes(match[1])) {
      setError("Por favor, insira um e-mail com dóminio válido.");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        nome,
        email,
        password,
      });
      console.log("Conta criada com sucesso:", response.data);
      const token = response.data?.token; // Certifique-se de que está acessando o campo correto
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token armazenado:", localStorage.getItem("token"));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");

        // Contador regressivo para redirecionamento
        var countdown = 5;
        const countdownInterval = setInterval(() => {
          setSuccess(
            `Cadastrado com sucesso! Redirecionando em ${countdown} segundos...`
          );
          countdown--;
          if (countdown === 0) {
            clearInterval(countdownInterval);
            setSuccess(""); // Limpa a mensagem de sucesso após o redirecionamento
            navigate("/home");
          }
        }, 1000);
      } else {
        throw new Error("Token não encontrado na resposta.");
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

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubscribe();
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
      {success && (
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
                severity="success"
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "1rem",
                  border: "2px solid",
                }}
              >
                {success}
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
              Criar Conta
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
            {/* Input Nome */}
            <motion.div variants={item}>
              <CustomTextField
                id="nome"
                label="Nome"
                variant="filled"
                value={nome}
                onChange={(e) => setName(e.target.value)}
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
            {/*  Input E-mail */}
            <motion.div variants={item}>
              <CustomTextField
                id="email"
                label="E-mail"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {/* Input Password */}
            <motion.div variants={item}>
              <CustomTextField
                label="Senha"
                type="password"
                variant="filled"
                value={password}
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
              <CustomTextField
                label="Senha"
                type="password"
                variant="filled"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={handleSubscribe}
                onKeyDown={handleKeyDown}
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
                  Já tem uma conta?
                  <Link to="/login">
                    <Button
                      variant="text"
                      sx={{ textTransform: "none", color: primaryColorHover }}
                    >
                      Fazer Login
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
