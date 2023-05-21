import "./App.css";
import BarraLateral from "./components/componentBarraLateral/barraLateral";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<BarraLateral />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>

      <h1 className="titulo">BurgerPlanet</h1>

      <main>{/* Other components or content */}</main>
      <footer>{/* Footer component or content */}</footer>
    </div>
  );
}

export default App;