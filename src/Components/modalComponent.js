import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
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
      const response = await axios.put("http://localhost:8080/user/update", {
        nome: editedUser.nome,
        email: editedUser.email,
        password: editedUser.password,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      [name]: value
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Perfil
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description" // Criando o botão 
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
            disabled={!editMode} // Campo nome + edit
          /> 
        
          <TextField
            label="E-mail"
            name="email"
            value={editMode ? editedUser.email : user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled// Campo email + edit
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            //value={editMode ? editedUser.password : user.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode} // Campo senha + edit, notem que o tipo é password para ficar *****
          />
          {!editMode ? (
            <Button 
              onClick={handleEdit} 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mr: 2 }}
            >
              Editar
            </Button> // botao editar by jhon
          ) : (
            <Button 
              onClick={handleSave} 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2, mr: 2 }}
            >
              Salvar
            </Button> // botao salvar 
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
    </div>
  );
}

export default ModalComponent;
