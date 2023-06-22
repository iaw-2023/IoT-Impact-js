import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import Cart from "./Cart";
import Swal from "sweetalert2";

function Home({user}) {
    const [cartItems, setCartItems] = useState([]);
  
    const removeProductFromCart = (productId) => {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((product) => product.id !== productId)
      );
    };
  
    const aceptarCompra = () => {
      const orderData = {
        customer_email: user[0],
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
  
      return new Promise((resolve, reject) => {
        fetch("https://iot-impact-laravel.vercel.app/rest/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Compra exitosa",
              showConfirmButton: true,
            });
            console.log("Order placed successfully: ", data);
            setCartItems([]);
            resolve();
          })
          .catch((error) => {
            window.confirm("Hubo un error al procesar su orden.");
            console.error("Error placing order:", error);
            reject(error);
          });
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
          <t> Bienvenido {user}!</t>
          <Cart
            cartItems={cartItems}
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
                  setCartItems={setCartItems}
                />
              }
            />

          </Routes>
        </Router>
        <main>{/* Other components or content */}</main>
        <footer>{/* Footer component or content */}</footer>
      </div>
    );
  }
  
  export default Home;
  