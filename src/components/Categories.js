// Categories.js
import React from "react";
import { Nav } from "react-bootstrap";

const Categories = ({ categories, activeTab, handleTabChange }) => {
  return (
    <Nav variant="pills" className="flex-column">
      {categories.map((category) => (
        <Nav.Item key={category.id}>
          <Nav.Link eventKey={category.name} onSelect={handleTabChange}>
            {category.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Categories;
