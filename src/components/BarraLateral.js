// BarraLateral.js
import React, { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import Categories from "./Categories";
import Products from "./Products";

const BarraLateral = ({ cartItems, setCartItems }) => {
  const [activeTab, setActiveTab] = useState(""); //active tab, se inicializa en '', y la funcion setActiveTab la updatea
  const [categories, setCategories] = useState([]); //categories, se inicializa como un arreglo vacio, y la funcion setCategories lo updatea
  const [products, setProducts] = useState([]); //products, se inicializa como un arreglo vacio, y la funcion setProducts lo updatea



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
