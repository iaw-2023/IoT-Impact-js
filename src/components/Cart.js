import React, { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

const Cart = ({
  cartItems,
  aceptarCompra,
  removeProductFromCart,
}) => {
  const [isPurchasing, setIsPurchasing] = useState(false); // State variable for purchase status

  const handlePurchase = () => {
    if (!isPurchasing) {
      setIsPurchasing(true);
      aceptarCompra().then(() => setIsPurchasing(false)); // Reset isPurchasing to false after the purchase is completed
    }
  };

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
        <Button
          variant="primary"
          onClick={handlePurchase}
          disabled={isPurchasing || cartItems.length === 0} // Disable button when purchasing or no items in the cart or empty email box
        >
          {isPurchasing ? "Comprando..." : "Comprar"} {/* Display different text based on the purchase status */}
        </Button>
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
