// BarraLateral.js
import React, { useState, useEffect } from "react";
import { Tab, ProgressBar, Dropdown } from "react-bootstrap";
import Categories from "./Categories";
import Products from "./Products";
import Swal from "sweetalert2";
import { SERVIDOR } from "../App";

const BarraLateral = ({ setCartItems }) => {
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(SERVIDOR + "/rest/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setActiveTab(data[0]?.name || "");
      })
      .catch((error) => console.log(error));

    fetch(SERVIDOR + "/rest/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
    setMenuOpen(false); // Close the dropdown menu when a category is selected
  };

  const addToCart = (product) => {
    Swal.fire({
      title: "¿Desea agregar el producto al carrito?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Agregado!", "Tu producto se ha añadido al carrito", "success");
        setCartItems((prevCartItems) => [...prevCartItems, product]);
      }
    });
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className="container-barralateral">
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <Dropdown className="mb-3 boton-dropdown" show={menuOpen} onToggle={toggleMenu}>
          <Dropdown.Toggle variant="secondary" id="dropdown-categories">
            Lista de productos
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Categories
              categories={categories}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          </Dropdown.Menu>
        </Dropdown>

          <div className="row">
            <div className="col-12">
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

