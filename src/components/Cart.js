import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const Cart = ({
  cartItems,
  customerEmail,
  handleEmailChange,
  aceptarCompra,
  removeProductFromCart,
}) => {
  const popoverCarrito = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Productos agregados:</Popover.Header>
      <Popover.Body>
        {cartItems.map((productoAgregado) => (
          <div key={productoAgregado.id}>
            <span>
              {productoAgregado.name} ${productoAgregado.price}
            </span>
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
          Precio total: $
          {cartItems.reduce(
            (total, product) => total + parseFloat(product.price),
            0
          )}
        </div>
        <Button variant="primary" onClick={aceptarCompra} disabled={cartItems.length === 0}>
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

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popoverCarrito}>
      <Button variant="success" className="carrito-button">
        Carrito: {cartItems.length}
      </Button>
    </OverlayTrigger>
  );
};

export default Cart;
