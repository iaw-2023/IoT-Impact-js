import React, { useState, useEffect } from 'react';
import {Card } from 'react-bootstrap';


const BarraLateral = () => {
  const [activeTab, setActiveTab] = useState(''); //active tab, se inicializa en '', y la funcion setActiveTab la updatea
  const [categories, setCategories] = useState([]); //categories, se inicializa como un arreglo vacio, y la funcion setCategories lo updatea
  const [products, setProducts] = useState([]); //products, se inicializa como un arreglo vacio, y la funcion setProducts lo updatea


  useEffect(() => {
    fetch('https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  //Funcion que renderiza las cards de los productos
  const renderCards = () => {
    const category = categories.find((cat) => cat.name === activeTab);

    if (category) {
      const categoryProducts = products.filter(
        (product) => product.product_category_id === category.id
      );

      return categoryProducts.map((product) => (
        <Card key={product.id} onClick={() => addToCart(product)}>
          <Card.Body>
            <h5>{product.name}</h5>
            <p>Price: {product.price}</p>

            <p>{product.description}</p>
          </Card.Body>
        </Card>
      ));
    }
    return null;
  };

  return (
    <div></div>
  );
};

export default BarraLateral;
