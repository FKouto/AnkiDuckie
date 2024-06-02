import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

function ButtonsCustom() {
  const CustomButtonText = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: ".5rem 1rem",
    border: "1px solid",
    borderColor: "transparent",
    borderRadius: ".5rem",
    lineHeight: 1.5,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#f8f9fa",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  const CustomButtonContained = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: ".5rem 1rem",
    border: "1px solid",
    borderRadius: ".5rem",
    lineHeight: 1.5,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });
  return { CustomButtonText, CustomButtonContained };
}

export default ButtonsCustom;
