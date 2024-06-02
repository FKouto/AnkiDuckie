import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import DeckCard from "./DeckCard";
import DeckDialog from "./DeckDialog";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export default function DeckLayout({ deckSummary }) {
  const [open, setOpen] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [deckInfo, setDeckInfo] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const handleClickOpen = async (deck) => {
    setSelectedDeck(deck);
    setOpen(true);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setFullScreen(false); // Reset fullScreen state when opening a new dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDeck(null);
    setDeckInfo(null);
    setAnswers({});
    setFeedback({});
    setShowResults(false);
  };

  const handleAnswerChange = (questionId, responseId) => {
    if (answers[questionId] !== undefined) return; // Não permite alterar resposta

    setAnswers({
      ...answers,
      [questionId]: responseId,
    });

    const question = deckInfo.questions.find(
      (q) => q.questionId === questionId
    );
    const isCorrect =
      question.responses[question.correctAnswer].responseId.toString() ===
      responseId;

    setFeedback({
      ...feedback,
      [questionId]: isCorrect,
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleResetDeck = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFeedback({});
    setShowResults(false);
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (selectedDeck) {
      const fetchDeckInfo = async () => {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get(
            `http://localhost:8080/deck/id/${selectedDeck.deckId}`,
            config
          );
          setDeckInfo(response.data);
        } catch (error) {
          console.error("Erro ao buscar as informações do deck:", error);
        }
      };
      fetchDeckInfo();
    }
  }, [selectedDeck]);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
        component={motion.div}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {deckSummary.map((deck, index) => (
          <DeckCard
            key={deck.deckId}
            deck={deck}
            index={index}
            handleClickOpen={handleClickOpen}
          />
        ))}
      </Grid>

      <DeckDialog
        open={open}
        handleClose={handleClose}
        selectedDeck={selectedDeck}
        deckInfo={deckInfo}
        answers={answers}
        handleAnswerChange={handleAnswerChange}
        feedback={feedback}
        currentQuestionIndex={currentQuestionIndex}
        handleNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        handleResetDeck={handleResetDeck}
        handleFinish={handleFinish}
        showResults={showResults}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
      />
    </>
  );
}
