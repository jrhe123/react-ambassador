import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ProductsFrontend from "./pages/ProductsFrontend";
import Profile from "./pages/Profile";
import Rankings from "./pages/Rankings";
import Register from "./pages/Register";
import Stats from "./pages/Stats";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsFrontend />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
