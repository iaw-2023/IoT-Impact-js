// Products.js
import React from "react";
import { Card } from "react-bootstrap";

const Products = ({ categories, activeTab, products, addToCart }) => {
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

  return <div>{renderCards()}</div>;
};

export default Products;
