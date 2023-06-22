import { useState } from "react";

export function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || contraseña.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    setUser([nombre.trim()]);
  };

  return (
    <section>
      <h1 className="titulo">
            <img
              src={"https://i.ibb.co/pdbcDkX/logo-sin-bp.png"}
              alt="BurgerPlanet Logo"
              className="logo"
            />{" "}
            BurgerPlanet
          </h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese email"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button>Iniciar sesión</button>
      </form>
      {error && <p>Todos los campos son obligatorios</p>}
    </section>
  );
}
