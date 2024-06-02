// Router DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Páginas
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import DecksPage from "./pages/DecksPage";
import ChabotPage from "./pages/ChatbotPage";
import MakeDeckPage from "./pages/MakeDeck";
// MUI UI
import Box from "@mui/material/Box";
// MUI Theme
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

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

theme = responsiveFontSizes(theme);

function App() {
  return (
    <Box
      className="main"
      component="main"
      sx={{ height: "100vh", overflowY: "hidden" }}
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
                  <DecksPage />
                </Layout>
              }
            />
            <Route
              path="/chat"
              element={
                <Layout>
                  <ChabotPage />
                </Layout>
              }
            />
            <Route
              path="/new"
              element={
                <Layout>
                  <MakeDeckPage />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Box>
  );
}

export default App;
