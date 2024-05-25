import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '90%', sm: 400 },
  maxHeight: '90vh',
  overflowY: 'auto',
  background: "linear-gradient(145deg, #0077b6, #00b4d8)", // Gradiente azul
  boxShadow: "0 10px 20px rgba(0,119,182,0.2), 0 6px 6px rgba(0,119,182,0.2)", // Sombras em tons de azul para efeito 3D
  p: { xs: 2, sm: 4 },
  borderRadius: "35px",
  textAlign: "center",
  border: "1px solid #00b4d8", // Borda azul
};

const buttonStyle = {
  mt: 2,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  mx: 1, // Adiciona margem horizontal entre os botões
};

function ModalComponent() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          minWidth: 0,
          background: "linear-gradient(45deg, #20212B, #16171F)",
          padding: ".5rem",
          borderRadius: ".8rem",
          color: "#FFF",
          border: "2px solid #666666",
        }}
        onClick={handleOpen}
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
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
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
                bgcolor: "rgba(255, 255, 255, 0.7)",
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
                bgcolor: "rgba(255, 255, 255, 0.7)",
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
                bgcolor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "10px",
              },
            }}
          />
          {!editMode ? (
            <Button
              onClick={handleEdit}
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              Editar
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              Salvar
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            sx={buttonStyle}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComponent;
