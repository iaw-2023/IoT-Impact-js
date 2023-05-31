// App.js
import "./App.css";
import BarraLateral from "./components/BarraLateral";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Cart from "./components/Cart";
import Swal from "sweetalert2";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");

  const handleEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };

  const removeProductFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((product) => product.id !== productId)
    );
  };

  //Funcion que se ejecuta luego de clickear aceptar compra en el popover del carrito
  const aceptarCompra = () => {
    const orderData = {
      customer_email: customerEmail,
      total_amount: cartItems.reduce(
        (total, product) => total + parseFloat(product.price),
        0
      ),
      items: cartItems.map((product) => ({
        product_id: product.id,
        quantity: 1, // Adjust quantity as needed
        individual_price: parseFloat(product.price),
      })),
    };

    fetch(
      "https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Muestro mensaje de exito
        //window.confirm("Compra exitosa.");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Compra exitosa",
          showConfirmButton: true,
          //timer: 1500
        });
        console.log("Order placed successfully: ", data);
        // Resetear el carrito y el mail
        setCartItems([]);
        setCustomerEmail([""]);
      })
      .catch((error) => {
        // Muestro mensaje de error
        window.confirm("Hubo un error al procesar su orden.");
        console.error("Error placing order:", error);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="titulo">
          <img
            src={"https://i.ibb.co/pdbcDkX/logo-sin-bp.png"}
            alt="BurgerPlanet Logo"
            className="logo"
          />{" "}
          BurgerPlanet
        </h1>
        <Cart
          cartItems={cartItems}
          customerEmail={customerEmail}
          handleEmailChange={handleEmailChange}
          aceptarCompra={aceptarCompra}
          removeProductFromCart={removeProductFromCart}
        />
      </div>

      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <BarraLateral
                cartItems={cartItems}
                setCartItems={setCartItems}
                customerEmail={customerEmail}
                handleEmailChange={handleEmailChange}
                aceptarCompra={aceptarCompra}
                removeProductFromCart={removeProductFromCart}
              />
            }
          />

          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>

      <main>{/* Other components or content */}</main>
      <footer>{/* Footer component or content */}</footer>
    </div>
  );
}

export default App;