import React, { useState, useEffect } from "react";
// Axios (Comunicação Backend)
import axios from "axios";
// MUI UI
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
// Custom Components MUI UI
import ButtonsCustom from "./MUICustom/Button";
import CustomTextField from "./MUICustom/TextField";
// Cores
import ColorsUse from "./Colors/Colors";
// Icons
import HugeIcons from "../assets/icons/HugeIcons";
const { ProfileIcon } = HugeIcons();

export default function ProfileModal() {
  // Cores
  const { primaryColor, primaryColorHover, primaryColorTransparent } =
    ColorsUse();
  // Buttons Custom
  const { CustomButtonContained } = ButtonsCustom();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (err || success) {
      const timer = setTimeout(() => {
        setErr("");
        setSuccess("");
      }, 3000); // Mensagem desaparecerá após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [err, success]);

  const handleOpen = async () => {
    setOpen(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setErr("Token não encontrado");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/user/read", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); // Verificar os dados recebidos do backend
      setUser(response.data);
      setEditedUser(response.data);
    } catch (err) {
      setErr("Erro ao carregar os dados do usuário");
      console.err("Erro ao carregar os dados do usuário:", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setErr("");
    setSuccess("");
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!editedUser.nome || !editedUser.email || !editedUser.password) {
      setErr("Todos os campos são obrigatórios");
      setSuccess("");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErr("Token não encontrado");
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
      setErr("");
    } catch (err) {
      console.log("Erro durante a atualização:", err);
      setSuccess(""); // Clear success message when there is an err
      if (err.response && err.response.status === 404) {
        setErr("Usuário não encontrado");
      } else {
        setErr(err.message || "Erro ao atualizar cadastro");
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
        <ProfileIcon style={{ color: primaryColorHover }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            maxHeight: "90vh",
            backgroundColor: primaryColor,
            border: "1px solid",
            borderColor: primaryColorHover,
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Perfil
          </Typography>
          {err && <Typography color="err">{err}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <CustomTextField
            variant="filled"
            label="Nome"
            name="nome"
            value={editMode ? editedUser.nome : user.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
            sx={{
              width: "100%",
              "& .MuiFilledInput-root": {
                backgroundColor: "#FFF",
                borderColor: primaryColorHover,
                "&.Mui-focused": {
                  backgroundColor: "#FF",
                  boxShadow: `${primaryColor} 2px 2px 15px`,
                  borderColor: primaryColorHover,
                },
              },
            }}
          />
          <CustomTextField
            variant="filled"
            label="E-mail"
            name="email"
            value={editMode ? editedUser.email : user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
            sx={{
              width: "100%",
              "& .MuiFilledInput-root": {
                backgroundColor: "#FFF",
                borderColor: primaryColorHover,
                "&.Mui-focused": {
                  backgroundColor: "#FF",
                  boxShadow: `${primaryColor} 2px 2px 15px`,
                  borderColor: primaryColorHover,
                },
              },
            }}
          />
          <CustomTextField
            variant="filled"
            label="Senha"
            name="password"
            type="password"
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
            sx={{
              width: "100%",
              "& .MuiFilledInput-root": {
                backgroundColor: "#FFF",
                borderColor: primaryColorHover,
                "&.Mui-focused": {
                  backgroundColor: "#FF",
                  boxShadow: `${primaryColor} 2px 2px 15px`,
                  borderColor: primaryColorHover,
                },
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
