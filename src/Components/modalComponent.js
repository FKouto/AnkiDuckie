import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

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

const mockUser = {
  name: "Felipe Richard Carmino",
  email: "CarminoFelipinho@AnckieDuckie.com",
  password: "TesteJhon" // demo de senha byjhonzitos
};

function ModalComponent() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const handleOpen = () => {
    setOpen(true);
    setEditedUser({ ...user }); // Copiando os dados do usuário para serem editados
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setUser(editedUser); // Salvando as alterações
    setEditMode(false);
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
          <TextField
            label="Nome"
            name="name"
            value={editMode ? editedUser.name : user.name}
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
            disabled={!editMode} // Campo email + edit
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={editMode ? editedUser.password : user.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode} // Campo senha + edit, notem que otipo é password para ficar *****
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
