import { useState } from "react";
import Swal from "sweetalert2";

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

  const handleRegistrarse = () => {
    Swal.fire({
      title: "Registrarse",
      html: `
        <input id="swal-input-email" class="swal2-input" placeholder="Email" type="email">
        <input id="swal-input-password" class="swal2-input" placeholder="Contraseña" type="password">
      `,
      confirmButtonText: "Registrarse",
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#swal-input-email").value;
        const password = Swal.getPopup().querySelector("#swal-input-password").value;
        return { email, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { email, password } = result.value;
  
        // Perform the registration logic here
        fetch('https://iot-impact-laravel.vercel.app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
          .then(response => response.json())
          .then(data => {
            console.log("Registration successful");
            console.log("User:", data);
            // Additional actions after successful registration
          })
          .catch(error => {
            console.error("Registration error:", error);
            // Handle error scenarios
          });
      }
    });
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
      <button onClick={handleRegistrarse}>Registrarse</button>
    </section>
  );
}
