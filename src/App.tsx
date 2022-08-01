import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductsFrontend from "./pages/ProductsFrontend";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsFrontend />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
