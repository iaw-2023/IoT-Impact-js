import React, { useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

const Checkout = () => {
  useEffect(() => {
    initMercadoPago('TEST-c9f8d6f1-b400-4e9e-908c-ab99994158fe', 
    {locale: 'es'});
  }, []);

  const initialization = {
    amount: 100,
    payer: {
      email: "test@gmail.com",
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
      fetch('/process_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          resolve();
        })
        .catch((error) => {
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
