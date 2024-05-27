import React, { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function GeminiPage() {
  const [error, setErr] = useState("");
  const [value, setValue] = useState("");
  const [numQuestions, setNumQuestions] = useState(1); // Novo estado para o número de perguntas
  const [numAnswers, setNumAnswers] = useState(1); // Novo estado para o número de respostas
  const [chatHistory, setChatHistory] = useState([]);
  const [askMeClicks, setAskMeClicks] = useState(0);
  // Cores
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorHover, setPrimaryColorHover] = useState("");
  const [primaryColorTransparent, setPrimaryColorTransparent] = useState("");
  // Base Cores
  const colors = [
    "hsl(213, 48%, 75%)",
    "hsl(265, 37%, 77%)",
    "hsl(33, 67%, 83%)",
    "hsl(14, 78%, 83%)",
    "hsl(168, 49%, 78%)",
    "hsl(326, 45%, 81%)",
  ];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setPrimaryColor(randomColor);

    const hoverColor = darkenColor(randomColor, 25);
    setPrimaryColorHover(hoverColor);

    const transparentColor = setOpacity(randomColor, 0.3);
    setPrimaryColorTransparent(transparentColor);
  }, []);
  // Cor mais escura
  const darkenColor = (color, percent) => {
    const hsv = colorToHSV(color);
    hsv.v = Math.max(0, hsv.v - percent / 100);
    return HSVToColor(hsv);
  };
  // Cor com menos opacidade
  const setOpacity = (color, opacity) => {
    const hslaColor = color
      .replace("hsl", "hsla")
      .replace(")", `, ${opacity})`);
    return hslaColor;
  };

  const colorToHSV = (color) => {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return null;
    const [, h, s, v] = match.map(parseFloat);
    return { h, s: s / 100, v: v / 100 };
  };

  const HSVToColor = (hsv) => {
    const { h, s, v } = hsv;
    const hsl = `hsl(${h}, ${s * 100}%, ${v * 100}%)`;
    return hsl;
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
    <Box>
      <Box
        sx={{
          height: "calc(100vh - 18%)",
          width: { xs: "-webkit-fill-available", md: "60vw" },
          padding: "1rem",
          margin: "auto",
          overflowY: "scroll",
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
        }}
      >
        <div className="search-result">
          {chatHistory &&
            chatHistory.map((chatItem, _index) => (
              <div key={_index}>
                <p className="answer">
                  <Role role={chatItem.role} /> :{" "}
                  <Text text={chatItem.parts[0].text} />
                </p>
              </div>
            ))}
        </div>
      </Box>
      <Box
        sx={{
          padding: "1rem",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
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
          <Button
            className="surprise"
            onClick={surprise}
            size="small"
            sx={{
              textTransform: "capitalize",
              color: "white",
              background: primaryColor,
              padding: ".3rem",
              margin: ".3rem",
              minWidth: "fit-content",
              borderRadius: ".8rem",
              "&:hover": {
                background: primaryColorHover,
              },
            }}
          >
            Surprise
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              color="white"
              fill="none"
            >
              <path
                d="M3 12C7.5 12 12 7.5 12 3C12 7.5 16.5 12 21 12C16.5 12 12 16.5 12 21C12 16.5 7.5 12 3 12Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M2 19.5C2.83333 19.5 4.5 17.8333 4.5 17C4.5 17.8333 6.16667 19.5 7 19.5C6.16667 19.5 4.5 21.1667 4.5 22C4.5 21.1667 2.83333 19.5 2 19.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M16 5C17 5 19 3 19 2C19 3 21 5 22 5C21 5 19 7 19 8C19 7 17 5 16 5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                style={{ color: primaryColor }}
              >
                <path
                  d="M17.5 17.5L22 22"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </Box>
            <Box sx={{ width: "-webkit-fill-available" }}>
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
              <Button
                sx={{
                  background: primaryColor,
                  padding: "10px",
                  minWidth: "fit-content",
                  borderRadius: ".8rem",
                  "&:hover": {
                    background: primaryColorHover,
                  },
                }}
                onClick={getResponse}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#FFF"
                  fill="none"
                >
                  <path
                    d="M13.9258 12.7775L11.7775 10.6292C11.4847 10.3364 11.3383 10.19 11.1803 10.1117C10.8798 9.96277 10.527 9.96277 10.2264 10.1117C10.0685 10.19 9.92207 10.3364 9.62923 10.6292C9.33638 10.9221 9.18996 11.0685 9.11169 11.2264C8.96277 11.527 8.96277 11.8798 9.11169 12.1803C9.18996 12.3383 9.33638 12.4847 9.62923 12.7775L11.7775 14.9258M13.9258 12.7775L20.3708 19.2225C20.6636 19.5153 20.81 19.6617 20.8883 19.8197C21.0372 20.1202 21.0372 20.473 20.8883 20.7736C20.81 20.9315 20.6636 21.0779 20.3708 21.3708C20.0779 21.6636 19.9315 21.81 19.7736 21.8883C19.473 22.0372 19.1202 22.0372 18.8197 21.8883C18.6617 21.81 18.5153 21.6636 18.2225 21.3708L11.7775 14.9258M13.9258 12.7775L11.7775 14.9258"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 2L17.2948 2.7966C17.6813 3.84117 17.8746 4.36345 18.2556 4.74445C18.6366 5.12545 19.1588 5.31871 20.2034 5.70523L21 6L20.2034 6.29477C19.1588 6.68129 18.6366 6.87456 18.2556 7.25555C17.8746 7.63655 17.6813 8.15883 17.2948 9.2034L17 10L16.7052 9.2034C16.3187 8.15884 16.1254 7.63655 15.7444 7.25555C15.3634 6.87455 14.8412 6.68129 13.7966 6.29477L13 6L13.7966 5.70523C14.8412 5.31871 15.3634 5.12545 15.7444 4.74445C16.1254 4.36345 16.3187 3.84117 16.7052 2.7966L17 2Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 4L6.22108 4.59745C6.51097 5.38087 6.65592 5.77259 6.94167 6.05834C7.22741 6.34408 7.61913 6.48903 8.40255 6.77892L9 7L8.40255 7.22108C7.61913 7.51097 7.22741 7.65592 6.94166 7.94167C6.65592 8.22741 6.51097 8.61913 6.22108 9.40255L6 10L5.77892 9.40255C5.48903 8.61913 5.34408 8.22741 5.05833 7.94167C4.77259 7.65592 4.38087 7.51097 3.59745 7.22108L3 7L3.59745 6.77892C4.38087 6.48903 4.77259 6.34408 5.05833 6.05833C5.34408 5.77259 5.48903 5.38087 5.77892 4.59745L6 4Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
