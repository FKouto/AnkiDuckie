// DeckCard.js
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import HugeIcons from "../assets/icons/HugeIcons";

function darkenColor(color, amount) {
  const [h, s, l] = color.match(/\d+/g).map(Number);
  return `hsl(${h}, ${s}%, ${l - amount}%)`;
}

function getCardColor(index) {
  const colors = [
    "hsl(213, 48%, 75%)",
    "hsl(265, 37%, 77%)",
    "hsl(33, 67%, 83%)",
    "hsl(14, 78%, 83%)",
    "hsl(168, 49%, 78%)",
    "hsl(326, 45%, 81%)",
  ];
  return colors[index % colors.length];
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function DeckCard({ deck, index, handleClickOpen }) {
  const { FileStarIcon, BookOpen02Icon } = HugeIcons();
  const cardColor = getCardColor(index);
  const darkTitleColor = darkenColor(cardColor, 52);
  const darkButtonColor = darkenColor(cardColor, 35);
  const darkButtonColorHover = darkenColor(cardColor, 30);
  const formattedDeckTitle = deck.deckTitle.replace(/-/g, " ");

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={deck.deckId}
      component={motion.div}
      variants={item}
    >
      <Card
        variant="outlined"
        sx={{
          margin: 0.5,
          border: "none",
          backgroundColor: cardColor,
          borderRadius: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1.813rem",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "500",
                color: darkTitleColor,
              }}
            >
              {formattedDeckTitle}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              width: "100%",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <Typography
              variant="caption"
              display="flex"
              gutterBottom
              sx={{
                fontWeight: "500",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <FileStarIcon style={{ color: darkButtonColor }} />
              {deck.questionCount} {deck.questionCount === 1 ? "card" : "cards"}
            </Typography>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%",
              }}
            >
              <Button
                className="animationViewDeckButton"
                size="small"
                sx={{
                  backgroundColor: darkButtonColor,
                  borderRadius: "15px",
                  padding: "10px",
                  minWidth: 0,
                  "&:hover": {
                    backgroundColor: darkButtonColorHover,
                  },
                }}
                onClick={() => handleClickOpen(deck)}
              >
                <BookOpen02Icon style={{ color: cardColor }} />
              </Button>
            </motion.div>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}
