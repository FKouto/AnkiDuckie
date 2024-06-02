import React, { useState, useEffect } from "react";
// Router DOM
import { useNavigate } from "react-router-dom";
// Formatação do Texto
import { marked } from "marked";
import DOMPurify from "dompurify";
// Importações do MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
// Animação
import { motion } from "framer-motion";
// Icons
import HugeIcons from "../assets/icons/HugeIcons";
// Cores
import ColorsUse from "../components/Colors/Colors";
// Componente de botão estilizado
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

export default function ChabotPage() {
  // Icones
  const {
    BookmarkAdd02Icon,
    Navigation03Icon,
    AiIdeaIcon,
    AiSearchIcon,
    AtomicPowerIcon,
    ArrowLeft01Icon,
    SquareArrowUpRight02Icon,
  } = HugeIcons();
  // Cores
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  // Inicializações e estados
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState("");
  const [titleDeck, setTitleDeck] = useState("");
  const [numQuestions, setNumQuestions] = useState(1); // Novo estado para o número de perguntas
  const [numAnswers, setNumAnswers] = useState(1); // Novo estado para o número de respostas
  const [chatHistory, setChatHistory] = useState([]);

  // Opções para seleção
  const questionOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const answerOptions = Array.from({ length: 4 }, (_, i) => i + 1);

  // Display Mostrar/Ocultar Divs
  const [chatEstanciado, setChatEstanciado] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showMakeQuestion, setShowMakeQuestion] = useState(false);
  const [showSendQuestion, setShowSendQuestion] = useState(false);
  const [gerouPerguntas, setGerouPerguntas] = useState(false);

  // Efeito para limpar mensagens de erro/sucesso após 5 segundos
  useEffect(() => {
    if (err || success) {
      const timer = setTimeout(() => {
        setErr("");
        setSuccess("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [err, success]);

  // Funções de manipulação de estado e navegação
  const isTextFieldEmpty = () => titleDeck.trim() === "";

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

  // Funções assíncronas para interações com API
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
        { role: "user", parts: [{ text: value }] },
        { role: "model", parts: [{ text: data }] },
      ]);

      setValue("");
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
    setChatEstanciado(true);
  };

  const createQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "POST",
        body: JSON.stringify({
          chatHistory: chatHistory,
          titleDeck: titleDeck,
          numQuestions: numQuestions,
          numAnswers: numAnswers,
          token: token,
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
        { role: "model", parts: [{ text: data }] },
      ]);
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
    setGerouPerguntas(true);
  };

  const formatQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "POST",
        body: JSON.stringify({
          titleDeck: titleDeck,
          chatHistory: chatHistory,
          token: token,
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
        { role: "model", parts: [{ text: data }] },
      ]);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setErr("Something went wrong!");
    }
  };

  const handleEnviarClick = () => {
    if (!isTextFieldEmpty()) {
      formatQuestions();
    } else {
      setErr("Por favor, preencha o campo 'Nome Deck' antes de enviar.");
    }
  };

  // Componentes de exibição
  const Role = ({ role }) => (
    <span className={role === "user" ? "user-role" : "assistant-role"}>
      {role}
    </span>
  );

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
    <Box
      sx={{
        height: "100%",
        overflow: "hidden !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Chat History Display */}
      <Box
        className="search-result"
        sx={{
          height: "100%",
          margin: "auto",
          marginTop: "1rem",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: primaryColor,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: primaryColorHover,
          },
        }}
      >
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

      {/* Prompt Section */}
      <Box sx={{ height: "fit-content" }}>
        <motion.div
          initial={{ translateY: "100%", scale: 0 }}
          animate={{ translateY: "0%", scale: 1 }}
          transition={{
            ease: "linear",
            duration: 0.5,
          }}
        >
          <Box
            className="prompt"
            style={{ display: showPrompt ? "block" : "none" }}
            sx={{
              padding: "1rem",
              width: { xs: "-webkit-fill-available", md: "40vw" },
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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                  <AiIdeaIcon />
                  Surpresa
                </StyledButton>
                <Button
                  disabled={!chatEstanciado}
                  onClick={handleShowMakeQuestion}
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                    padding: ".3rem",
                    margin: ".3rem",
                    minWidth: "fit-content",
                    borderRadius: ".8rem",
                    background: primaryColorHover,
                    "&:hover": {
                      background: primaryColor,
                    },
                  }}
                >
                  <AtomicPowerIcon />
                  Criar
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: ".5rem",
                  alignItems: "center",
                  border: "1.2px solid #DEE2E6",
                  borderRadius: "5rem",
                  background: "white",
                }}
              >
                <Box sx={{ paddingRight: ".5rem" }}>
                  <AiSearchIcon style={{ color: primaryColorHover }} />
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
                          width: "3px",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "#f1f1f1",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: primaryColor,
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: primaryColorHover,
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
                    <Navigation03Icon />
                  </StyledButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Create Questions Section */}
        <Box
          className="makeQuestion"
          style={{ display: showMakeQuestion ? "block" : "none" }}
          sx={{
            padding: "1rem",
            width: { xs: "-webkit-fill-available", md: "40vw" },
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
              <ArrowLeft01Icon style={{ color: "#FFF" }} />
            </StyledButton>

            <Box
              sx={{
                width: "-webkit-fill-available",
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
                  Número de respostas
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
                Criar Perguntas &nbsp;
                <AtomicPowerIcon />
              </StyledButton>
              <Button
                disabled={!gerouPerguntas}
                onClick={handleSendQuestion}
                sx={{
                  width: "100%",
                  textTransform: "capitalize",
                  color: "white",
                  padding: ".3rem",
                  margin: ".3rem",
                  minWidth: "fit-content",
                  borderRadius: ".8rem",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                Próximo &nbsp;
                <SquareArrowUpRight02Icon />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Send Questions Section */}
        <Box
          className="sendQuestion"
          style={{ display: showSendQuestion ? "block" : "none" }}
          sx={{
            padding: "1rem",
            width: { xs: "-webkit-fill-available", md: "40vw" },
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
            {err && (
              <Alert
                severity="warning"
                sx={{
                  fontWeight: "600",
                  borderRadius: "1rem",
                  mt: 1,
                  mb: 1,
                }}
              >
                {err}
              </Alert>
            )}
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
              <ArrowLeft01Icon style={{ color: "#FFF" }} />
            </StyledButton>

            <Box
              sx={{
                width: "-webkit-fill-available",
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
                required
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
                      width: "3px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: primaryColor,
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: primaryColorHover,
                    },
                  },
                }}
              />
              <StyledButton
                onClick={handleEnviarClick}
                sx={{
                  width: "100%",
                  background: primaryColorHover,
                  "&:hover": {
                    background: primaryColor,
                  },
                }}
              >
                Salvar &nbsp;
                <BookmarkAdd02Icon />
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
