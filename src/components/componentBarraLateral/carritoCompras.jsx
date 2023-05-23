import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const BarraLateral = () => {
  const [cartItems, setCartItems] = useState([]); //cartItems, se inicializa como un arreglo vacio, y la funcion setCartItems lo updatea
  const [customerEmail, setCustomerEmail] = useState(''); //el mail se inicializa en vacio, se guarda en customerEmail y se modifica con setCustomerEmail

  const handleEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };


  //Agregar al carrito
  const addToCart = (product) => {
    const confirmed = window.confirm('¿Estas seguro que queres agregar este producto al carrito?');
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
  
    fetch('https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Muestro mensaje de exito
        window.confirm('Compra exitosa.');
        console.log('Order placed successfully:', data);
        // Resetear el carrito y el mail
        setCartItems([]);
        setCustomerEmail(['']);
      })
      .catch((error) => {
        // Muestro mensaje de error
        window.confirm('Hubo un error al procesar su orden.');
        console.error('Error placing order:', error);
      });
  };

  const popoverCarrito = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Productos agregados:</Popover.Header>
      <Popover.Body>
        {cartItems.map((productoAgregado) => (
          <div key={productoAgregado.id}>
            <span>{productoAgregado.name} ${productoAgregado.price}</span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeProductFromCart(productoAgregado.id)}
            >
              -
            </Button>
          </div>
        ))}
        <div>
          Precio total: ${cartItems.reduce((total, product) => total + parseFloat(product.price), 0)}
        </div>
        <Button variant="primary" onClick={aceptarCompra}>
          Comprar
        </Button>
        <input
          type="text"
          value={customerEmail}
          onChange={handleEmailChange}
          placeholder="Ingrese su email"
        />
      </Popover.Body>
    </Popover>
  );
  
  //Funcion que se ejecuta al clickear el "-" en el popover del carrito
  const removeProductFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((product) => product.id !== productId)
    );
  };

  return (
    <div>
      <OverlayTrigger trigger="click" placement="left" overlay={popoverCarrito}>
        <Button variant="success" className="carrito-button">
          Carrito: {cartItems.length}
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default BarraLateral;
