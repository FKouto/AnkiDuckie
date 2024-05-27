import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
// Import Páginas
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import DeckPage from "./pages/DeckPage";
import GeminiPage from "./pages/GeminiPage";

var theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    h2: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    h3: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    h4: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    h5: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    h6: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    body1: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    button: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    caption: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
    overline: {
      fontFamily: '"Poppins", "Inter", sans-serif',
    },
  },
});

// Ajusta o tema para que as fontes sejam responsivas
theme = responsiveFontSizes(theme);

// Font

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="100vw"
        sx={{
          height: "100vh",
          margin: "0px !important",
          padding: "0px !important",
          overflow: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/home"
                element={
                  <Layout>
                    <DeckPage />
                  </Layout>
                }
              />
              <Route
                path="/Gemini"
                element={
                  <Layout>
                    <GeminiPage />
                  </Layout>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </Container>
    </React.Fragment>
  );
}

export default App;
