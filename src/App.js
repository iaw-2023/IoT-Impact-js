import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import { Formulario } from "./components/Formulario"


function App() {
  const [user, setUser] = useState([]); //arreglo que contiene el user si se logeo

  return (
    <div className="App">
      {
        !user.length > 0 //si el arreglo user tiene el mail del usuario, entonces ir a home, sino ir al formulario
        ? <Formulario setUser={setUser}/>
        : <Home user={user}/>
      }
    </div>
  
  );
}

export default App;
