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
      fetch("https://iot-impact-laravel.vercel.app/rest/orders/mp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Pago exitoso: ", data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Pago exitoso!",
            showConfirmButton: true,
          }).then(() => {
            window.location.href = "/";
            resolve();
          });

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
