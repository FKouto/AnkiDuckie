import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/home";
import HomeUser from "./Pages/homeUser";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
import { Gemini } from "./Pages/Gemini";


function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/homeuser" element={<HomeUser />}></Route>
          <Route path="/chat" element={<Gemini />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default AppRoutes;
  