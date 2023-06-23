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
  
    fetch("https://iot-impact-laravel.vercel.app/rest/loginReact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: nombre.trim(),
        password: contraseña.trim(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setUser([nombre.trim()]);
          // Handle successful login
          
          // Hide the loading message
          Swal.close();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error en el login",
            text: "Usuario inexistente o contraseña incorrecta.",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        // Handle fetch or server error
        console.log(error);
      });
  
    // Mostrar mensaje de carga inicial
    Swal.fire({
      html: '<h5>Cargando...</h5>',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
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
  
        if (email.trim() === "" || password.trim() === "") {
          Swal.showValidationMessage("Por favor, complete todos los campos");
          return false;
        }
  
        return { email, password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { email, password } = result.value;
  
        // Mostrar mensaje de carga inicial
        Swal.fire({
          html: '<h5>Cargando...</h5>',
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        // Perform the registration logic here
        fetch("https://iot-impact-laravel.vercel.app/rest/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Registration successful");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registro exitoso",
              showConfirmButton: true,
            });
          })
          .catch((error) => {
            console.error("Registration error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error en el registro",
              text:
                "Ha ocurrido un error al procesar el registro. Asegúrese de que el nombre de usuario no exista.",
              showConfirmButton: true,
            });
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
