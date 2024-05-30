// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function GenerateModal({
//   open,
//   handleClose,
//   numQuestions,
//   setNumQuestions,
//   numAnswers,
//   setNumAnswers,
//   chatHistory, // Recebe o histórico da conversa como propriedade
//   setChatHistory, // Função para atualizar o histórico do chat
//   setErr,
// }) {
//   const questionOptions = Array.from({ length: 10 }, (_, i) => i + 1);
//   const answerOptions = Array.from({ length: 10 }, (_, i) => i + 1);
//   const [errorModal, setErrModal] = useState("");

//   const createQuestions = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Pegue o token do local storage
//       const options = {
//         method: "POST",
//         body: JSON.stringify({
//           chatHistory: chatHistory,
//           numQuestions: numQuestions,
//           numAnswers: numAnswers,
//           token: token, // Inclua o token no corpo da requisição
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const response = await fetch(
//         "http://localhost:8080/user/createDeck",
//         options
//       );
//       const data = await response.text();
//       console.log(data);

//       setChatHistory((oldChatHistory) => [
//         ...oldChatHistory,
//         {
//           role: "model",
//           parts: [{ text: data }],
//         },
//       ]);
//     } catch (errorModal) {
//       console.error(errorModal); // Correção feita aqui
//       setErrModal("Something went wrong!");
//     }
//   };

//   const handleSave = async () => {
//     await createQuestions();
//     handleClose();
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={modalStyle}>
//         <h2>Configure Your Questions</h2>
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <FormControl sx={{ maxWidth: "48%", marginTop: "1rem" }}>
//             <InputLabel id="num-questions-label">
//               Number of questions
//             </InputLabel>
//             <Select
//               labelId="num-questions-label"
//               value={numQuestions}
//               onChange={(e) => setNumQuestions(e.target.value)}
//               label="Number of questions"
//             >
//               {questionOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ maxWidth: "48%", marginTop: "1rem" }}>
//             <InputLabel id="num-answers-label">Number of answers</InputLabel>
//             <Select
//               labelId="num-answers-label"
//               value={numAnswers}
//               onChange={(e) => setNumAnswers(e.target.value)}
//               label="Number of answers"
//             >
//               {answerOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Button
//           onClick={handleSave}
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: "1rem" }}
//         >
//           Save
//         </Button>
//       </Box>
//     </Modal>
//   );
// }
