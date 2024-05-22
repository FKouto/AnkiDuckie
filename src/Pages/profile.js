import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import ModalComponent from "../Components/modalComponent"; // Ajuste o caminho conforme necessário

function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get("http://localhost:8080/user", config);

        setUsers(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Recurso não encontrado (404).");
        } else {
          setError("Erro ao carregar os dados.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <ModalComponent />
      <Typography variant="h1">Login realizado com sucesso</Typography>
    </div>
  );
}

export default Profile;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Typography,
//   CircularProgress
// } from "@mui/material";

// function Profile() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Recupera o token do localStorage
//         const token = localStorage.getItem("token");
        
//         // Configura o cabeçalho da requisição com o token
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}` // Token deve ser enviado como Bearer token
//           }
//         };

//         const response = await axios.get("http://localhost:8080/user", config);
        
//         setUsers(response.data);
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           setError("Recurso não encontrado (404).");
//         } else {
//           setError("Erro ao carregar os dados.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <h1>Login realizado com sucesso</h1>
//   );
// }

// export default Profile;
