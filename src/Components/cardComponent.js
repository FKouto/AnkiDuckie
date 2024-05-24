import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ArrowOpen = require("../assets/icon/arrow.svg").ReactComponent;
const Star = require("../assets/icon/star.svg").ReactComponent;

const card = (
  <Box
    sx={{
      minHeight: 176,
      maxHeight: 176,
      backgroundColor: "#ADBDEB",
      borderRadius: "2rem",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "1.813rem",
    }}
  >
    <CardContent sx={{ padding: 0 }}>
      <Typography variant="h4" sx={{ fontWeight: "700" }}>
        Pronunciation
      </Typography>
    </CardContent>
    <CardActions
      sx={{ width: "100%", justifyContent: "space-between", padding: "0" }}
    >
      <Typography variant="caption" display="flex" gutterBottom sx={{}}>
        <Star />
        caption text
      </Typography>
      <Button
        size="small"
        sx={{
          background: "black",
          borderRadius: "15px",
          padding: "10px",
          minWidth: "0",
        }}
      >
        <ArrowOpen />
      </Button>
    </CardActions>
  </Box>
);

function CardComponent() {
  return (
    <Box sx={{ minWidth: 368, maxWidth: 368 }}>
      <Card variant="outlined" sx={{ border: "none" }}>
        {card}
      </Card>
    </Box>
  );
}
export default CardComponent;
