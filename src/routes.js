import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/landingPage";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Profile from "./Pages/profile";
import { Gemini } from "./Pages/Gemini";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/chat" element={<Gemini />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
