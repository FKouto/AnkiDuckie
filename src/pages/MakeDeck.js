import React, { useState, useEffect } from "react";
// Router DOM
import { useNavigate } from "react-router-dom";
// MUI Material
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Typography, Box, Checkbox } from "@mui/material";
// Axios (Comunicação Backend)
import axios from "axios";
// Custom Components MUI UI
import ButtonsCustom from "../components/MUICustom/Button";
import CustomTextField from "../components/MUICustom/TextField";
// Animação
import { motion } from "framer-motion";
// Cores
import ColorsUse from "../components/Colors/Colors";
// Icons
import HugeIcons from "../assets/icons/HugeIcons";

export default function MakeDeckPage() {
  // Cores
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  // Custom Components
  const { CustomButtonContained } = ButtonsCustom();
  // Icons
  const { SelectionIcon, SelectedIcon, LixeiraIcon, AddIcon } = HugeIcons();
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  // Sucesso
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  // Error
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr("");
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [err]);
  const [deckData, setDeckData] = useState({
    deckTitle: "",
    questions: [{ question: "", responses: ["", ""], correctAnswer: 0 }],
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name.startsWith("response")) {
      const [responseIndex, questionIndex] = name
        .split("_")
        .slice(1)
        .map(Number);
      const newResponses = [...deckData.questions[questionIndex].responses];
      newResponses[responseIndex] = value;
      setDeckData({
        ...deckData,
        questions: deckData.questions.map((question, i) =>
          i === questionIndex
            ? { ...question, responses: newResponses }
            : question
        ),
      });
    } else if (name.startsWith("question")) {
      const questionIndex = Number(name.split("_")[1]);
      setDeckData({
        ...deckData,
        questions: deckData.questions.map((question, i) =>
          i === questionIndex ? { ...question, question: value } : question
        ),
      });
    } else if (checked) {
      const [correctAnswer, questionIndex] = name.split("_").map(Number);
      setDeckData({
        ...deckData,
        questions: deckData.questions.map((question, i) =>
          i === questionIndex ? { ...question, correctAnswer } : question
        ),
      });
    } else {
      setDeckData({
        ...deckData,
        [name]: value,
      });
    }
  };

  const addQuestion = () => {
    setDeckData({
      ...deckData,
      questions: [
        ...deckData.questions,
        { question: "", responses: ["", ""], correctAnswer: 0 },
      ],
    });
  };

  const addResponse = (questionIndex) => {
    if (deckData.questions[questionIndex].responses.length < 4) {
      setDeckData({
        ...deckData,
        questions: deckData.questions.map((question, i) =>
          i === questionIndex
            ? { ...question, responses: [...question.responses, ""] }
            : question
        ),
      });
    }
  };

  const removeLastQuestion = () => {
    setDeckData({
      ...deckData,
      questions: deckData.questions.slice(0, -1),
    });
  };

  const removeResponse = (questionIndex, responseIndex) => {
    if (deckData.questions[questionIndex].responses.length > 2) {
      setDeckData({
        ...deckData,
        questions: deckData.questions.map((question, i) =>
          i === questionIndex
            ? {
                ...question,
                responses: question.responses.filter(
                  (_, idx) => idx !== responseIndex
                ),
              }
            : question
        ),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    // Verifica se o título do deck está preenchido
    if (!deckData.deckTitle.trim()) {
      setErr("Por favor, preencha o título do deck.");
      // console.error("Por favor, preencha o título do deck.");
      return;
    }

    // Verifica se pelo menos uma pergunta tem todos os inputs preenchidos
    const questionIncomplete = deckData.questions.find(
      (question) =>
        !question.question.trim() ||
        question.responses.some((response) => !response.trim()) ||
        question.correctAnswer === null
    );

    if (questionIncomplete) {
      setErr("Por favor, preencha todas as perguntas e respostas.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/deck/create",
        { UserDecks: { Decks: [deckData] } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Contador regressivo para redirecionamento
      var countdown = 5;
      const countdownInterval = setInterval(() => {
        setSuccess(
          `Deck criado com sucesso. Redirecionando em ${countdown} segundos...`
        );
        countdown--;
        if (countdown === 0) {
          clearInterval(countdownInterval);
          setSuccess("");
          navigate("/home");
        }
      }, 1000);
      console.log(response.data);
    } catch (error) {
      setErr("Erro ao criar o deck.");
      console.error("Erro ao criar o deck:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        padding: "1rem",
        overflowX: "hidden",
      }}
    >
      {err && (
        <Box
          sx={{
            position: "fixed",
            top: "8.2%",
            left: "0%",
            width: "100%",
            textAlign: "center",
            transform: "translateY( -50% )",
          }}
        >
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
                severity="warning"
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "1rem",
                  border: "2px solid",
                }}
              >
                {err}
              </Alert>
            </Container>
          </motion.div>
        </Box>
      )}
      {success && (
        <Box
          sx={{
            position: "fixed",
            top: "8.2%",
            left: "0%",
            width: "100%",
            textAlign: "center",
            transform: "translateY( -50% )",
          }}
        >
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
      <Box>
        <Typography variant="h4" gutterBottom>
          Criar Deck
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            fullWidth
            variant="filled"
            label="Título do Deck"
            value={deckData.deckTitle}
            name="deckTitle"
            onChange={handleChange}
            margin="normal"
            sx={{
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
        </form>
      </Box>
      <Box
        sx={{
          overflowY: "scroll",
          height: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          {deckData.questions.map((question, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: primaryColorTransparent,
                border: "1px solid",
                borderColor: primaryColorHover,
                padding: 2,
                marginBottom: 2,
                borderRadius: "2rem",
              }}
            >
              <Box>
                <CustomTextField
                  fullWidth
                  variant="filled"
                  label={`Pergunta ${index + 1}`}
                  value={question.question}
                  name={`question_${index}`}
                  onChange={handleChange}
                  margin="normal"
                  sx={{
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
              </Box>
              <Box>
                {question.responses.map((response, i) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Box flex={10}>
                      <CustomTextField
                        fullWidth
                        variant="filled"
                        label={`Resposta ${String.fromCharCode(65 + i)}`}
                        value={response}
                        name={`response_${i}_${index}`}
                        onChange={handleChange}
                        sx={{
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
                    </Box>
                    <Box flex={1} marginLeft={1}>
                      <Checkbox
                        icon={<SelectionIcon style={{ color: "#2a2e34" }} />}
                        checkedIcon={
                          <SelectedIcon style={{ color: "#3a5a40" }} />
                        }
                        name={`${i}_${index}`}
                        checked={question.correctAnswer === i}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box flex={1} marginLeft={1}>
                      <CustomButtonContained
                        sx={{
                          minWidth: 0,
                          width: "fit-content",
                          padding: ".5rem",
                          borderRadius: ".8rem",
                          border: "1px solid",
                          borderColor: "#660708",
                          background: "#ba181b",
                        }}
                        onClick={() => removeResponse(index, i)}
                        disabled={question.responses.length <= 2}
                      >
                        <LixeiraIcon style={{ color: "#250902" }} />
                      </CustomButtonContained>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box>
                <CustomButtonContained
                  variant="text"
                  onClick={() => addResponse(index)}
                  disabled={question.responses.length >= 4}
                  sx={{
                    background: primaryColorHover,
                    textTransform: "capitalize",
                    color: "#FFF",
                    "&:hover": {
                      background: primaryColor,
                      borderColor: primaryColorHover,
                    },
                  }}
                >
                  Resposta &nbsp; <AddIcon />
                </CustomButtonContained>
              </Box>
            </Box>
          ))}
        </form>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <CustomButtonContained
            onClick={addQuestion}
            variant="text"
            sx={{
              background: primaryColorHover,
              textTransform: "capitalize",
              color: "#FFF",
              "&:hover": {
                background: primaryColor,
                borderColor: primaryColorHover,
              },
            }}
          >
            Pergunta &nbsp; <AddIcon />
          </CustomButtonContained>
          {deckData.questions.length > 1 && (
            <CustomButtonContained
              onClick={removeLastQuestion}
              variant="text"
              sx={{
                background: primaryColorHover,
                textTransform: "capitalize",
                color: "#FFF",
                "&:hover": {
                  background: primaryColor,
                  borderColor: primaryColorHover,
                },
              }}
            >
              Remover &nbsp; <LixeiraIcon />
            </CustomButtonContained>
          )}
          <CustomButtonContained
            type="submit"
            variant="text"
            sx={{
              background: "#74c69d",
              textTransform: "capitalize",
              color: "#FFF",
              "&:hover": {
                background: "#2d6a4f",
                borderColor: "#1b4332",
              },
            }}
          >
            Criar Deck
          </CustomButtonContained>
        </form>
      </Box>
    </Box>
  );
}
