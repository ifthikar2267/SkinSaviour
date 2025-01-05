import React , { useContext } from 'react';
import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import products from '../Data/products.json';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext.js';



export const Product = ({ id, image, title, oldPrice, newPrice }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Pass all necessary product details
    addToCart({ id, title, image, price: newPrice });
  };

  return (
    <Card className="shadow-sm p-3 mb-5 bg-body rounded">
      <Link to={`/product/${id}`} className="text-decoration-none">
        <div className="image-container">
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            className="product-image"
          />
        </div>
        <Card.Body className="text-center d-flex flex-column">
          <Card.Title className="fs-4 text-black">{title}</Card.Title>
          <span className="text-muted text-decoration-line-through fs-5 me-2">
            Rs.{oldPrice}
          </span>
          <span className="text-dark gray fw-bold fs-4">Rs.{newPrice}</span>
        </Card.Body>
      </Link>
      <Button variant="warning" onClick={handleAddToCart}>
        Add to cart
      </Button>
    </Card>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container>
      {/* Search Form */}
      <Form className="d-flex mb-4 mt-5">
        <Form.Control
          type="text"
          placeholder="Search..."
          className="me-2"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button variant="outline-success">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>

      {/* Product Filtering */}
      <Row className="g-5 mt-5">
        {products
          .filter((val) => {
            if (searchTerm === '') return val;
            if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val;
            }
            return null;
          })
          .map((product) => (
            <Col key={product.id} md={4}>
              <Product {...product} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Products;
