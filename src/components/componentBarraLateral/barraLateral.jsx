import React, { useState, useEffect } from 'react';
import { Tab, Nav, Card } from 'react-bootstrap';

const BarraLateral = () => {
  const [activeTab, setActiveTab] = useState('hamburguesas'); //por default la pestaña hamburguesas esta seleccionada, setActiveTab updatea a activeTab
  const [products, setProducts] = useState([]); //products es un array inicializado por default vacio [], setProducts actualiza este array

  useEffect(() => {
    fetch('https://iot-impact-laravel.vercel.app/rest/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const renderCards = () => {
    if (activeTab === 'hamburguesas') {
      const hamburguesaProducts = products.filter(
        (product) => product.product_category_id === 1
      );

      return hamburguesaProducts.map((product) => (
        <Card key={product.id}>
          <Card.Body>
            <h5>{product.name}</h5>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.description}</p>
          </Card.Body>
        </Card>
      ));
    } else if (activeTab === 'papas') {
      // Render cards for "Papas" category
    } else if (activeTab === 'bebidas') {
      // Render cards for "Bebidas" category
    }
  };

  return (
    <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
      <div className="row">
        <div className="col-4">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="hamburguesas">Hamburguesas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="papas">Papas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bebidas">Bebidas</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-8">
          <Tab.Content>
            <Tab.Pane eventKey="hamburguesas">
              {renderCards()}
            </Tab.Pane>
            <Tab.Pane eventKey="papas">
              {renderCards()}
            </Tab.Pane>
            <Tab.Pane eventKey="bebidas">
              {renderCards()}
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};

export default BarraLateral;
