import React, { useState, useEffect } from 'react';
import { Tab, Nav, Card } from 'react-bootstrap';

const BarraLateral = () => {
  const [activeTab, setActiveTab] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setActiveTab(data[0]?.name || '');
      })
      .catch((error) => console.log(error));

    fetch('https://iot-impact-laravel-dl17wkn66-iot-impact.vercel.app/rest/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const renderCards = () => {
    const category = categories.find((cat) => cat.name === activeTab);

    if (category) {
      const categoryProducts = products.filter(
        (product) => product.product_category_id === category.id
      );

      return categoryProducts.map((product) => (
        <Card key={product.id}>
          <Card.Body>
            <h5>{product.name}</h5>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.description}</p>
          </Card.Body>
        </Card>
      ));
    }
    return null;
  };

  return (
    <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
      <div className="row">
        <div className="col-4">
          <Nav variant="pills" className="flex-column">
            {categories.map((category) => (
              <Nav.Item key={category.id}>
                <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div className="col-8">
          <Tab.Content>
            {categories.map((category) => (
              <Tab.Pane key={category.id} eventKey={category.name}>
                {renderCards()}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};

export default BarraLateral;
