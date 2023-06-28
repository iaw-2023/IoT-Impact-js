import React, { useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import Swal from "sweetalert2";

const Checkout = ({ user }) => {
  console.log(user);
  useEffect(() => {
    initMercadoPago('TEST-c9f8d6f1-b400-4e9e-908c-ab99994158fe',
      { locale: 'es' });
  }, []);

  const initialization = {
    amount: 100,
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
  const data = {
    email: user[0],
  };
  return new Promise((resolve, reject) => {
    fetch("https://iot-impact-nodejs.vercel.app/rest/mp", {
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Pago exitoso!",
            showConfirmButton: true,
          }).then(() => {
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



  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {
    // Código para cuando Brick está listo
  };

  return (
    <CardPayment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default Checkout;
