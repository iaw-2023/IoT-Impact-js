// BarraLateral.js
import React, { useState, useEffect } from "react";
import { Tab, ProgressBar } from "react-bootstrap";
import Categories from "./Categories";
import Products from "./Products";
import Swal from "sweetalert2";

const BarraLateral = ({ cartItems, setCartItems }) => {
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://iot-impact-nodejs.vercel.app/rest/categories"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setActiveTab(data[0]?.name || "");
      })
      .catch((error) => console.log(error));

    fetch(
      "https://iot-impact-nodejs.vercel.app/rest/products"
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const addToCart = (product) => {
    Swal.fire({
      title: '¿Desea agregar el producto al carrito?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Agregado!',
          'Tu producto se ha añadido al carrito',
          'success'
        )
        setCartItems((prevCartItems) => [...prevCartItems, product]);
      }
    })
  };

  return (
    <div>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <div className="row">
          <div className="col-2 sidebar">
            <Categories
              categories={categories}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          </div>
          <div className="col-8">
            {loading ? (
              <ProgressBar animated now={100} className="progress-bar">
                <span className="progress-bar-text">Cargando productos...</span>
              </ProgressBar>
            ) : (
              <Products
                categories={categories}
                activeTab={activeTab}
                products={products}
                addToCart={addToCart}
              />
            )}
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default BarraLateral;
