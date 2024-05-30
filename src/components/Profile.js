import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import ColorsUse from "./colors";

const Perfil = require("../assets/icons/perfil.svg").ReactComponent;

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "#caf0f8", // Cor de fundo
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "35px", // Bordas achei mais estético colcoar bordas arredondadas
//   textAlign: "center", // Centralizar conteúdo, achei viável centralizar
// };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '90%', sm: 400 },
  maxHeight: '90vh',
  background: "linear-gradient(145deg, #0077b6, #00b4d8)", // Gradiente azul
 
  p: { xs: 2, sm: 4 },
  borderRadius: "35px",
  textAlign: "center",
  border: "1px solid #00b4d8", // Borda azul
};


export default function ProfileModal() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { primaryColorHover } = ColorsUse();

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
        <Perfil style={{ color: primaryColorHover }} />
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
