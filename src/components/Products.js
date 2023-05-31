import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const Products = ({ categories, activeTab, products, addToCart }) => {
  const renderCards = () => {
    const category = categories.find((cat) => cat.name === activeTab);

    if (category) {
      const categoryProducts = products.filter(
        (product) => product.product_category_id === category.id
      );

      return categoryProducts.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={4}>
          <Card className="custom-card">
            {product.image && <Card.Img variant="top" src={product.image} />}
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: {product.price}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <div
                className="add-to-cart-icon"
                onClick={() => addToCart(product)}
              >
                <FaPlus />
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ));
    }
    return null;
  };

  return (
    <Container fluid>
      <Row>{renderCards()}</Row>
    </Container>
  );
};

export default Products;
