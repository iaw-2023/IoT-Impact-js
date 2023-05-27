import "./App.css";
import BarraLateral from "./components/BarraLateral";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";

function App() {
  return (
    <div>
      <h1 className="titulo">
        <img src={"https://i.ibb.co/pdbcDkX/logo-sin-bp.png"} alt="BurgerPlanet Logo" className="logo" /> BurgerPlanet
      </h1>
      <Router>
        <Routes>
          <Route exact path="/" element={<BarraLateral />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>

      <main>{/* Other components or content */}</main>
      <footer>{/* Footer component or content */}</footer>
    </div>
  );
}

export default App;
