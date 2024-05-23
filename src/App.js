import React from "react";

// Importa o componente de rotas
import AppRoutes from "./routes";

// Importa componentes do Material-UI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

// Importa funções para criar e customizar temas no Material-UI
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

// Cria um tema customizado com tipografia específica
let theme = createTheme({
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

// Função principal do componente App
function App() {
  return (
    <React.Fragment>
      {/* CssBaseline garante uma base de CSS consistente entre diferentes navegadores */}
      <CssBaseline />
      {/* Container define a largura máxima e outras propriedades de estilo */}
      <Container
        maxWidth="100vw" // Define a largura máxima como 100% da largura da viewport
        sx={{
          height: "100vh", // Define a altura como 100% da altura da viewport
          margin: "0px !important", // Remove a margem
          padding: "0px !important", // Remove o padding
          overflow: "hidden", // Remove a barra de rolagem
        }}
      >
        {/* ThemeProvider aplica o tema customizado a todos os componentes filhos */}
        <ThemeProvider theme={theme}>
          {/* Renderiza as rotas da aplicação */}
          <AppRoutes />
        </ThemeProvider>
      </Container>
    </React.Fragment>
  );
}

// Exporta o componente App como o padrão
export default App;
