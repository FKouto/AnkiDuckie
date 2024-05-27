import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#caf0f8", // Cor de fundo
  boxShadow: 24,
  p: 4,
  borderRadius: "35px", // Bordas achei mais estético colcoar bordas arredondadas
  textAlign: "center", // Centralizar conteúdo, achei viável centralizar
};

export default function ProfileModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryColorHover, setPrimaryColorHover] = useState("");
  const [primaryColorTransparent, setPrimaryColorTransparent] = useState("");
  const [openProfileModal, setOpenProfileModal] = useState(false); // Estado para controlar o modal

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

    const transparentColor = setOpacity(randomColor, 0.5);
    setPrimaryColorTransparent(transparentColor);
  }, []);

  const darkenColor = (color, percent) => {
    const hsv = colorToHSV(color);
    hsv.v = Math.max(0, hsv.v - percent / 100);
    return HSVToColor(hsv);
  };

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

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000); // Mensagem desaparecerá após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleOpen = async () => {
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/user/read", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); // Verificar os dados recebidos do backend
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      setError("Erro ao carregar os dados do usuário");
      console.error("Erro ao carregar os dados do usuário:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!editedUser.nome || !editedUser.email || !editedUser.password) {
      setError("Todos os campos são obrigatórios");
      setSuccess(""); // Clear success message when there is an error
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/user/update",
        {
          nome: editedUser.nome,
          email: editedUser.email,
          password: editedUser.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Atualização realizada com sucesso:", response.data);
      setUser(editedUser); // Salvando as alterações no estado do usuário
      setEditMode(false);
      setSuccess("Atualizado com sucesso!");
      setError("");
    } catch (error) {
      console.log("Erro durante a atualização:", error);
      setSuccess(""); // Clear success message when there is an error
      if (error.response && error.response.status === 404) {
        setError("Usuário não encontrado");
      } else {
        setError(error.message || "Erro ao atualizar cadastro");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <Box>
      <Button
        sx={{
          minWidth: 0,
          background: "none",
        }}
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          style={{ color: primaryColorHover }}
          fill="none"
        >
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
          <path
            d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Perfil do Anckier
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <TextField
            label="Nome"
            name="nome"
            value={editMode ? editedUser.nome : user.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "rgba(255, 255, 255, 0.7)", // Fundo transparente
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="E-mail"
            name="email"
            value={editMode ? editedUser.email : user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "rgba(255, 255, 255, 0.7)", // Fundo transparente
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
            sx={{
              "& .MuiInputBase-root": {
                bgcolor: "rgba(255, 255, 255, 0.7)", // Fundo das box de texto transparente para não ficar feio.
                borderRadius: "10px",
              },
            }}
          />
          {!editMode ? (
            <Button
              onClick={handleEdit}
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2 }}
            >
              Editar
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2 }}
            >
              Salvar
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
