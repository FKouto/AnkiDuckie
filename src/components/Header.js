// Router DOM
import { Link } from "react-router-dom";
// MUI UI
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
// Custom Components MUI UI
import ButtonsCustom from "./MUICustom/Button";
// Cores
import ColorsUse from "../components/Colors/Colors";
// React Components
const Logo = require("../logo.svg").ReactComponent;
export default function Header() {
  const { CustomButtonText, CustomButtonContained } = ButtonsCustom();
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Logo />
        </Box>
        <Box>
          <Link to="/register">
            <CustomButtonText
              variant="text"
              sx={{
                background: "none",
                textTransform: "capitalize",
                padding: ".5rem 1rem",
                color: primaryColorHover,
                "&:hover": {
                  borderColor: primaryColor,
                },
              }}
            >
              Cadastrar
            </CustomButtonText>
          </Link>
          <Link to="/login">
            <CustomButtonContained
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
              Login
            </CustomButtonContained>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
