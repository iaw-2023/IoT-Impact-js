import './App.css';
import BarraLateral from './components/componentBarraLateral/barraLateral';
import React from 'react';

function App() {
  return (
    <div>
      <h1 className="titulo">BurgerPlanet</h1>
      <BarraLateral />
      <main>
        {/* Other components or content */}
      </main>
      <footer>
        {/* Footer component or content */}
      </footer>
    </div>
  );
}

export default App;

