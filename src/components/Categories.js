// Categories.js
import React from "react";
import { Nav } from "react-bootstrap";

const Categories = ({ categories, activeTab, handleTabChange }) => {
  return (
    <div className="sidebar-container">
    <Nav variant="pills" className="flex-column sidebar-categories">
      {categories.map((category) => (
        <Nav.Item key={category.id} className="sidebar-category">
          <Nav.Link
            eventKey={category.name}
            onSelect={handleTabChange}
            className="sidebar-link"
          >
            {category.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
    </div>
  );
};

export default Categories;
