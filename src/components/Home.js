import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BarraLateral from "./BarraLateral";
import Cart from "./Cart";
import Swal from "sweetalert2";
import Checkout from "./Checkout";
import { SERVIDOR } from "../App";

function Home({ user, setUser }) {
  const [cartItems, setCartItems] = useState([]);
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);


  const handleLogout = () => {
    setUser([]) //vacia el arreglo, lo que envia a la pagina de login
    localStorage.removeItem("user"); // Remove user from local storage
  }

  const mostrarHistorialPedidos = () => {
    const mail = user[0]; // Variable con el email del usuario

    // Mostrar mensaje de carga inicial
    Swal.fire({
      html: '<h5>Cargando...</h5>',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    // Obtener los datos del historial de pedidos
    fetch(SERVIDOR + "/rest/orders")
      .then(response => response.json())
      .then(ordersData => {
        // Filtrar los pedidos por customer_email igual a user
        const pedidosUsuario = ordersData.filter(pedido => pedido.customer_email === mail);

        if (pedidosUsuario.length <= 0) {
          Swal.fire('No tiene pedidos', 'No se encontraron pedidos para el usuario actual.', 'info');
        } else {
          // Obtener los datos de los productos
          fetch(SERVIDOR + "/rest/items")
            .then(response => response.json())
            .then(itemsData => {
              const pedidosPromesas = pedidosUsuario.map((pedido, index) => {
                // Filtrar los productos comprados en el pedido actual
                const productosPedido = itemsData.filter(item => item.order_id === pedido.id);

                // Obtener el precio total del pedido
                const precioTotalPedido = parseFloat(pedido.total_amount);

                // Crear un array de promesas para obtener los nombres de los productos
                const productosPromesas = productosPedido.map(producto => {
                  return obtenerNombreProducto(producto.product_id).then(nombreProducto => {
                    return `<li>${nombreProducto} (Cantidad: ${producto.quantity})</li>`;
                  });
                });

                // Esperar a que todas las promesas se resuelvan y obtener los nombres de los productos
                return Promise.all(productosPromesas).then(productosTexto => {
                  const numeroPedido = index + 1;
                  const pedidoTexto = `<strong>Pedido ${numeroPedido}:</strong><ul>${productosTexto.join('')}</ul>`;
                  const pedidoConPrecioTotalTexto = `${pedidoTexto}<p>Precio total del pedido: ${precioTotalPedido.toFixed(2)}</p>`;
                  return pedidoConPrecioTotalTexto;
                });
              });

              // Esperar a que todas las promesas de pedidos se resuelvan
              Promise.all(pedidosPromesas)
                .then(pedidosTexto => {
                  // Mostrar el resultado final como una lista
                  Swal.fire({
                    title: 'Sus pedidos:',
                    html: pedidosTexto.join(''),
                    icon: 'info'
                  });
                })
                .catch(error => {
                  console.log(error);
                  Swal.fire('Error', 'No se pudo obtener la información de los productos.', 'error');
                });
            })
            .catch(error => {
              console.log(error);
              Swal.fire('Error', 'No se pudo obtener la información de los productos.', 'error');
            });
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error', 'No se pudo obtener el historial de pedidos.', 'error');
      });
  };

  // Función auxiliar para obtener el nombre de un producto por su ID
  const obtenerNombreProducto = (productId) => {
    return fetch(SERVIDOR + "/rest/products")
      .then(response => response.json())
      .then(itemsData => {
        const producto = itemsData.find(item => item.id === productId);
        return producto ? producto.name : 'Desconocido';
      })
      .catch(error => {
        console.error('Error al obtener los datos del producto:', error);
        return 'Desconocido';
      });
  };


  const removeProductFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((product) => product.id !== productId)
    );
  };

  const aceptarCompra = () => {
    Swal.fire({
      title: '¿Desea pagar en efectivo o con Mercado Pago?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Efectivo',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mercado Pago'
    }).then((result) => {
      if (result.isConfirmed) {
        //eligio mercadopago
        setRedirectToCheckout(true);
        setCartItems([]);
      } else {
        //eligio efectivo
        efectuarCompraEfectivo();
        setCartItems([]);              
      }
    })
  }


  const efectuarCompraEfectivo = () => {
    const orderData = {
      customer_email: user[0],
      total_amount: cartItems.reduce(
        (total, product) => total + parseFloat(product.price),
        0
      ),
      efectivo: true,
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


  return (
    <Router>
      <div className="container">
        {redirectToCheckout && <Navigate to="/checkout" />}

        <div className="header">
          <div className="header">
            <h1 className="titulo">
              <img
                src={"https://i.ibb.co/pdbcDkX/logo-sin-bp.png"}
                alt="BurgerPlanet Logo"
                className="logo"
              />{" "}
              BurgerPlanet
            </h1>
            {!redirectToCheckout && (
              <>
                <h5> Bienvenido {user[0]}!</h5>
                <button onClick={mostrarHistorialPedidos}>Historial de pedidos</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
                <Cart
                  cartItems={cartItems}
                  aceptarCompra={aceptarCompra}
                  removeProductFromCart={removeProductFromCart}
                />
              </>
            )}
          </div>
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={<BarraLateral setCartItems={setCartItems} />}
          />
          <Route path="/checkout" element={<Checkout user={user}/>} />
        </Routes>

        <main>{/* Other components or content */}</main>
        <footer>{/* Footer component or content */}</footer>
      </div>
    </Router>
  );
}

export default Home;
