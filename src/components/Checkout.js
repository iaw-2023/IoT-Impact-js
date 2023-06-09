import React, { useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import Swal from "sweetalert2";
import { SERVIDOR } from "../App";

const Checkout = ({ user, cartItems }) => {
  console.log(user);
  const precioTotalCarrito =  cartItems.reduce((total, product) => total + parseFloat(product.price),0);

  useEffect(() => {
    initMercadoPago('TEST-c9f8d6f1-b400-4e9e-908c-ab99994158fe',
      { locale: 'es' });
  }, []);

  const initialization = {
    amount: precioTotalCarrito,
    payer: {
      email: user[0],
    },
  };

  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 1,
    },
    visual: {
      style: {
        theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
      },
    },

  };

const onSubmit = async (formData) => {
  return new Promise((resolve, reject) => {
    fetch(SERVIDOR + "/rest/mp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor: ", data);
        if (data.status === "approved") {
          //se hace el post del pago
          efectuarCompraMercadoPago().then(() => {
            window.location.href = "/";
            resolve();
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Pago rechazado",
            text: "El pago no pudo ser procesado",
            showConfirmButton: true,
          }).then(() => {
            reject();
           // window.location.href = "/checkout";
            resolve();
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud: ", error);
        reject();
      });
  });
};

const efectuarCompraMercadoPago = () => {
  const orderData = {
    customer_email: user[0],
    total_amount: cartItems.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    ),
    efectivo: false,
    items: cartItems.map((product) => ({
      product_id: product.id,
      quantity: 1, // Adjust quantity as needed
      individual_price: parseFloat(product.price),
    })),
  };

  return new Promise((resolve, reject) => {
    fetch(SERVIDOR + "/rest/orders", {
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
        }).then(() => {
          console.log("Order placed successfully: ", data);
          resolve();
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en la compra",
          text: "Ha ocurrido un error al procesar la compra. Por favor, intenta nuevamente.",
          showConfirmButton: true,
        });
        console.error("Error placing order:", error);
        reject(error);
      });
  });
};



  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {
    // Código para cuando Brick está listo
  };

  const redirectToHomePage = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <CardPayment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
      <button onClick={redirectToHomePage}>Volver</button>
    </div>
  );
};

export default Checkout;

