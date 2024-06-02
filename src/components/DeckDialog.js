import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Custom Components MUI UI
import ButtonsCustom from "./MUICustom/Button";
// Icons
import HugeIcons from "../assets/icons/HugeIcons";

export default function DeckDialog({
  open,
  handleClose,
  selectedDeck,
  deckInfo,
  answers,
  handleAnswerChange,
  feedback,
  currentQuestionIndex,
  handleNextQuestion,
  handlePreviousQuestion,
  handleResetDeck,
  handleFinish,
  showResults,
  fullScreen,
  setFullScreen,
}) {
  const { CustomButtonContained } = ButtonsCustom();
  const { ArrowLeft01Icon, CloseDeck, FullScreen, NormalScreen, ToRedoDeck } =
    HugeIcons();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const question = deckInfo?.questions[currentQuestionIndex];
  const totalQuestions = deckInfo?.questions.length || 0;

  const correctAnswers = Object.values(feedback).filter(
    (isCorrect) => isCorrect
  ).length;
  const incorrectAnswers = Object.values(feedback).filter(
    (isCorrect) => !isCorrect
  ).length;

  const isAnswered = answers[question?.questionId];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen || isMobile}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#FFF",
          borderRadius: fullScreen || isMobile ? 0 : "10px",
          padding: "20px",
          display: "flex", // Added for centering
          flexDirection: "column", // Added for centering
          justifyContent: "center", // Added for centering
          alignItems: "center", // Added for centering
          overflowX: "hidden", // Added to hide overflow-x
        },
      }}
    >
      <DialogTitle>{selectedDeck?.deckTitle.replace(/-/g, " ")}</DialogTitle>
      <DialogContent
        sx={{
          padding: "16px",
          display: "flex", // Added for centering
          flexDirection: "column", // Added for centering
          justifyContent: "center", // Added for centering
          alignItems: "center", // Added for centering
        }}
      >
        {deckInfo ? (
          !showResults ? (
            question && (
              <Box key={question.questionId} sx={{ marginBottom: "1rem" }}>
                <Typography variant="h6">
                  Pergunta: {question.question}
                </Typography>
                <RadioGroup
                  name={`question-${question.questionId}`}
                  value={answers[question.questionId] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.questionId, e.target.value)
                  }
                >
                  {question.responses.map((response) => (
                    <FormControlLabel
                      key={response.responseId}
                      value={response.responseId.toString()}
                      control={<Radio />}
                      label={response.response}
                      disabled={answers[question.questionId] !== undefined}
                    />
                  ))}
                </RadioGroup>
                {feedback[question.questionId] !== undefined && (
                  <FormHelperText error={!feedback[question.questionId]}>
                    {feedback[question.questionId]
                      ? "Correto!"
                      : `Errado. A resposta correta era: ${
                          question.responses[question.correctAnswer].response
                        }`}
                  </FormHelperText>
                )}
              </Box>
            )
          ) : (
            <Box
              sx={{ marginBottom: "1rem", width: "100%", textAlign: "center" }}
            >
              <Typography variant="h6">Resultados:</Typography>
              <Typography>Corretas: {correctAnswers}</Typography>
              <Typography>Erradas: {incorrectAnswers}</Typography>
            </Box>
          )
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Carregando...
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!showResults && (
          <>
            <CustomButtonContained
              onClick={handlePreviousQuestion}
              color="primary"
              disabled={currentQuestionIndex === 0}
              sx={{
                textTransform: "capitalize",
                color: "white",
                padding: ".3rem",
                margin: ".3rem",
                minWidth: "fit-content",
                borderRadius: ".8rem",
                border: "1px solid",
                borderColor: "#A93276",
                background: "#D46FA9",
                "&:hover": {
                  background: "#EBBCD7",
                },
              }}
            >
              <ArrowLeft01Icon />
              Voltar
            </CustomButtonContained>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <CustomButtonContained
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  padding: ".3rem",
                  margin: ".3rem",
                  minWidth: "fit-content",
                  borderRadius: ".8rem",
                  border: "1px solid",
                  borderColor: "#1A4238",
                  background: "#378C77",
                  "&:hover": {
                    background: "#8AD1BF",
                  },
                }}
              >
                Próximo
                <ArrowLeft01Icon style={{ rotate: "180deg" }} />
              </CustomButtonContained>
            ) : (
              <CustomButtonContained
                onClick={handleFinish}
                disabled={!isAnswered}
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  padding: ".3rem",
                  margin: ".3rem",
                  minWidth: "fit-content",
                  borderRadius: ".8rem",
                  border: "1px solid",
                  borderColor: "#1A4238",
                  background: "#378C77",
                  "&:hover": {
                    background: "#8AD1BF",
                  },
                }}
              >
                Finalizar
                <ArrowLeft01Icon style={{ rotate: "180deg" }} />
              </CustomButtonContained>
            )}
          </>
        )}
        <CustomButtonContained
          onClick={handleClose}
          sx={{
            textTransform: "capitalize",
            color: "white",
            padding: ".3rem",
            margin: ".3rem",
            minWidth: "fit-content",
            borderRadius: ".8rem",
            border: "1px solid",
            borderColor: "#1A4238",
            background: "#378C77",
            "&:hover": {
              background: "#8AD1BF",
            },
          }}
        >
          <CloseDeck />
        </CustomButtonContained>
        {showResults && (
          <CustomButtonContained
            onClick={handleResetDeck}
            sx={{
              textTransform: "capitalize",
              color: "white",
              padding: ".3rem",
              margin: ".3rem",
              minWidth: "fit-content",
              borderRadius: ".8rem",
              border: "1px solid",
              borderColor: "#1A4238",
              background: "#378C77",
              "&:hover": {
                background: "#8AD1BF",
              },
            }}
          >
            De novo
            <ToRedoDeck />
          </CustomButtonContained>
        )}
        {!isMobile && (
          <CustomButtonContained
            onClick={() => setFullScreen((prev) => !prev)}
            sx={{
              textTransform: "capitalize",
              color: "white",
              padding: ".3rem",
              margin: ".3rem",
              minWidth: "fit-content",
              borderRadius: ".8rem",
              border: "1px solid",
              borderColor: "#1A4238",
              background: "#378C77",
              "&:hover": {
                background: "#8AD1BF",
              },
            }}
          >
            {fullScreen ? <NormalScreen /> : <FullScreen />}
          </CustomButtonContained>
        )}
      </DialogActions>
    </Dialog>
  );
}
