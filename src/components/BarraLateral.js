// BarraLateral.js
import React, { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import Categories from "./Categories";
import Products from "./Products";
import Cart from "./Cart";

const BarraLateral = () => {
  const [activeTab, setActiveTab] = useState(""); //active tab, se inicializa en '', y la funcion setActiveTab la updatea
  const [categories, setCategories] = useState([]); //categories, se inicializa como un arreglo vacio, y la funcion setCategories lo updatea
  const [products, setProducts] = useState([]); //products, se inicializa como un arreglo vacio, y la funcion setProducts lo updatea
  const [cartItems, setCartItems] = useState([]); //cartItems, se inicializa como un arreglo vacio, y la funcion setCartItems lo updatea
  const [customerEmail, setCustomerEmail] = useState(""); //el mail se inicializa en vacio, se guarda en customerEmail y se modifica con setCustomerEmail

  const handleEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };

  //Funcion que se ejecuta al clickear el "-" en el popover del carrito
  const removeProductFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((product) => product.id !== productId)
    );
  };

  useEffect(() => {
    fetch(
      "https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/categories"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setActiveTab(data[0]?.name || "");
      })
      .catch((error) => console.log(error));

    fetch(
      "https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/products"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  //Agregar al carrito
  const addToCart = (product) => {
    const confirmed = window.confirm(
      "¿Estas seguro que queres agregar este producto al carrito?"
    );
    if (confirmed) {
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    }
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
        window.confirm("Compra exitosa.");
        console.log("Order placed successfully:", data);
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
    <div>
      <Cart
        cartItems={cartItems}
        customerEmail={customerEmail}
        handleEmailChange={handleEmailChange}
        aceptarCompra={aceptarCompra}
        removeProductFromCart={removeProductFromCart}
      />

      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <div className="row">
          <div className="col-4">
            <Categories
              categories={categories}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="col-8">
            <Products
              categories={categories}
              activeTab={activeTab}
              products={products}
              addToCart={addToCart}
            />
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default BarraLateral;
