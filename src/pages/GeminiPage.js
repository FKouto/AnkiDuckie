import React, { useState, useEffect } from "react";
// Edição do texto devolvido pelo Gemini
import { marked } from "marked";
import DOMPurify from "dompurify";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// Cores Randomicas
import ColorsUse from "../components/colors";
// Icons
const Random = require("../assets/icons/random.svg").ReactComponent;
const MakeQuestion = require("../assets/icons/makeQuestion.svg").ReactComponent;
const ArrowBack = require("../assets/icons/arrowBack.svg").ReactComponent;
const PenMagic = require("../assets/icons/penMagic.svg").ReactComponent;
const Search = require("../assets/icons/search.svg").ReactComponent;

// Styles
const StyledButton = ({ children, onClick, sx }) => (
  <Button
    onClick={onClick}
    sx={{
      textTransform: "capitalize",
      color: "white",
      padding: ".3rem",
      margin: ".3rem",
      minWidth: "fit-content",
      borderRadius: ".8rem",
      ...sx,
    }}
  >
    {children}
  </Button>
);

export default function GeminiPage() {
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  const [error, setErr] = useState("");
  const [value, setValue] = useState("");
  const [titleDeck, setTitleDeck] = useState(1);
  const [numQuestions, setNumQuestions] = useState(1); // Novo estado para o número de perguntas
  const [numAnswers, setNumAnswers] = useState(1); // Novo estado para o número de respostas
  const [chatHistory, setChatHistory] = useState([]);
  const questionOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const answerOptions = Array.from({ length: 4 }, (_, i) => i + 1);
  // Display Mostrar/Ocultar Divs
  const [showPrompt, setShowPrompt] = useState(true);
  const [showMakeQuestion, setShowMakeQuestion] = useState(false);
  const [showSendQuestion, setShowSendQuestion] = useState(false);

  const handleShowPrompt = () => {
    setShowPrompt(true);
    setShowMakeQuestion(false);
  };

  const handleShowMakeQuestion = () => {
    setShowPrompt(false);
    setShowSendQuestion(false);
    setShowMakeQuestion(true);
  };

  const handleSendQuestion = () => {
    setShowMakeQuestion(false);
    setShowSendQuestion(true);
  };

  const SurpriseOptions = ["O que é Node", "O que é Javascript"];

  const surprise = () => {
    const randomPrompt =
      SurpriseOptions[Math.floor(Math.random() * SurpriseOptions.length)];
    setValue(randomPrompt);
  };

  const getResponse = async () => {
    if (!value) {
      setErr("Error! Please ask a question first!");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:8080/user/chatbot",
        options
      );
      const data = await response.text();
      console.log(data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);

      setValue("");
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
  };

  const createQuestions = async () => {
    try {
      const token = localStorage.getItem("token"); // Pegue o token do local storage
      const options = {
        method: "POST",
        body: JSON.stringify({
          chatHistory: chatHistory,
          titleDeck: titleDeck,
          numQuestions: numQuestions,
          numAnswers: numAnswers,
          token: token, // Inclua o token no corpo da requisição
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:8080/user/createDeck",
        options
      );
      const data = await response.text();
      console.log(data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
  };

  const formatQuestions = async () => {
    try {
      const token = localStorage.getItem("token"); // Pegue o token do local storage
      const options = {
        method: "POST",
        body: JSON.stringify({
          titleDeck: titleDeck,
          chatHistory: chatHistory,
          token: token, // Inclua o token no corpo da requisição
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:8080/user/sendDeck",
        options
      );
      const data = await response.text();
      console.log(data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
  };

  const Role = ({ role }) => {
    return (
      <span className={role === "user" ? "user-role" : "assistant-role"}>
        {role}
      </span>
    );
  };

  const Text = ({ text }) => {
    const htmlContent = marked(text);
    const cleanHtmlContent = DOMPurify.sanitize(htmlContent);
    return (
      <span
        className="message-text"
        dangerouslySetInnerHTML={{ __html: cleanHtmlContent }}
      />
    );
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Box className="search-result" sx={{ height: "100%" }}>
          {chatHistory &&
            chatHistory.map((chatItem, _index) => (
              <Box key={_index} mb={2}>
                <Typography className="answer">
                  <Role role={chatItem.role} /> :{" "}
                  <Text text={chatItem.parts[0].text} />
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
        }}
      >
        {/* Inserir Prompt */}
        <Box
          className="prompt"
          style={{ display: showPrompt ? "block" : "none" }}
          sx={{
            padding: "1rem",
            width: { xs: "100%", md: "40vw" },
            margin: "auto",
          }}
        >
          <Box
            sx={{
              background: primaryColorTransparent,
              padding: ".5rem",
              borderRadius: "2rem",
              border: "1px solid",
              borderColor: primaryColorHover,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
                borderRadius: "1rem",
                "&::-webkit-scrollbar": {
                  height: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: primaryColorTransparent, // Cor do fundo do track
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: primaryColor, // Cor do thumb
                  borderRadius: "10px", // Borda arredondada do thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: primaryColorHover, // Cor do thumb quando hover
                },
              }}
            >
              <StyledButton
                className="surprise"
                onClick={surprise}
                size="small"
                sx={{
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                <Random />
                Surpresa
              </StyledButton>
              <StyledButton
                className="surprise"
                onClick={handleShowMakeQuestion}
                size="small"
                sx={{
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                <MakeQuestion />
                Criar Perguntas & Respostas
              </StyledButton>
              <StyledButton
                className="surprise"
                onClick={handleShowMakeQuestion}
                size="small"
                sx={{
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                <MakeQuestion />
                Criar Perguntas & Respostas
              </StyledButton>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: ".8rem",
                alignItems: "center",
                border: "1.2px solid #DEE2E6",
                borderRadius: "5rem",
                background: "white",
              }}
            >
              <Box sx={{ paddingRight: ".5rem" }}>
                <Search style={{ color: primaryColorHover }} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  placeholder="Pesquisar..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  fullWidth
                  multiline
                  maxRows={2}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    "& .MuiInputBase-inputMultiline": {
                      "&::-webkit-scrollbar": {
                        width: "3px", // Largura do scrollbar
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1", // Cor do fundo do track
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: primaryColor, // Cor do thumb
                        borderRadius: "4px", // Borda arredondada do thumb
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: primaryColorHover, // Cor do thumb quando hover
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ paddingLeft: ".5rem" }}>
                <StyledButton
                  className="surprise"
                  onClick={getResponse}
                  size="small"
                  sx={{
                    padding: "10px",
                    background: primaryColorHover,
                    "&:hover": {
                      background: primaryColor,
                    },
                  }}
                >
                  <PenMagic />
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Criar Questões */}
        <Box
          className="makeQuestion"
          style={{ display: showMakeQuestion ? "block" : "none" }}
          sx={{
            padding: "1rem",
            width: { xs: "100%", md: "40vw" },
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: primaryColorTransparent,
              padding: ".5rem",
              borderRadius: "2rem",
              border: "1px solid",
              borderColor: primaryColorHover,
            }}
          >
            <StyledButton
              onClick={handleShowPrompt}
              size="small"
              sx={{
                width: "fit-content",
                background: primaryColorHover,
                "&:hover": {
                  background: primaryColor,
                },
              }}
            >
              <ArrowBack
                style={{
                  color: "#FFF",
                }}
              />
            </StyledButton>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: ".8rem",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="num-questions-label">
                  Número de Questões
                </InputLabel>
                <Select
                  sx={{ borderRadius: "1rem" }}
                  labelId="num-questions-label"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  label="Number of questions"
                >
                  {questionOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="num-answers-label">
                  Número de perguntas
                </InputLabel>
                <Select
                  sx={{ borderRadius: "1rem" }}
                  labelId="num-answers-label"
                  value={numAnswers}
                  onChange={(e) => setNumAnswers(e.target.value)}
                  label="Number of answers"
                >
                  {answerOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <StyledButton
                onClick={createQuestions}
                sx={{
                  width: "100%",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                Criar
                <PenMagic />
              </StyledButton>
              <StyledButton
                onClick={handleSendQuestion}
                sx={{
                  width: "100%",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                Próximo
                <PenMagic />
              </StyledButton>
            </Box>
          </Box>
        </Box>
        {/* Enviar Questões */}
        <Box
          className="sendQuestion"
          style={{ display: showSendQuestion ? "block" : "none" }}
          sx={{
            padding: "1rem",
            width: { xs: "100%", md: "40vw" },
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: primaryColorTransparent,
              padding: ".5rem",
              borderRadius: "2rem",
              border: "1px solid",
              borderColor: primaryColorHover,
            }}
          >
            <StyledButton
              onClick={handleShowMakeQuestion}
              size="small"
              sx={{
                width: "fit-content",
                background: primaryColorHover,
                "&:hover": {
                  background: primaryColor,
                },
              }}
            >
              <ArrowBack
                style={{
                  color: "#FFF",
                }}
              />
            </StyledButton>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: ".8rem",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <TextField
                type="text"
                placeholder="Nome Deck"
                value={titleDeck}
                onChange={(e) => setTitleDeck(e.target.value)}
                fullWidth
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  padding: "0.5rem",
                  border: "1px solid",
                  borderColor: primaryColor,
                  borderRadius: "1rem !important",
                  "& .MuiInputBase-inputMultiline": {
                    "&::-webkit-scrollbar": {
                      width: "3px", // Largura do scrollbar
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1", // Cor do fundo do track
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: primaryColor, // Cor do thumb
                      borderRadius: "4px", // Borda arredondada do thumb
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: primaryColorHover, // Cor do thumb quando hover
                    },
                  },
                }}
              />
              <StyledButton
                onClick={formatQuestions}
                sx={{
                  width: "100%",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                Enviar
                <PenMagic />
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
