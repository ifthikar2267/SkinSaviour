import React , { useContext } from 'react';
import axios from "axios";
import { useState , useEffect} from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import products from '../Data/products.json';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext.js';


export const Product = ({ id, image, title, oldPrice, newPrice, stock }) => {
  const { addToCart } = useContext(CartContext);

  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch the phone number from the backend
  useEffect(() => {
    axios.get("https://skin-saviour-server.vercel.app/api/whatsapp-phone")
  .then((response) => {
    setPhoneNumber(response.data.phone);
  })
  .catch((error) => {
    console.error("Error fetching phone number:", error);
  });

  }, []);

  // Function to handle adding to the cart
  const handleAddToCart = () => {
    addToCart({ id, title, image, price: newPrice });
  };

  // Function to handle "Buy Now" action
  const handleBuyNow = () => {
    if (!phoneNumber) {
      alert("Failed to load phone number. Please try again later.");
      return;
    }

    const productMessage = `Hello, I am interested in buying the following product

Name : ${title}
Price Rs : ${newPrice}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      productMessage
    )}`;

    // Redirect to WhatsApp
    window.location.href = url;
  };

  return (
    <Card className="shadow-sm p-3 mb-5 bg-body rounded position-relative">
      {stock === 0 && (
        <div>
          <span className="badge bg-danger text-uppercase">Out of Stock</span>
        </div>
      )}
      <Link to={`/product/${id}`} className="text-decoration-none">
        <div className="image-container">
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            className={`product-image ${stock === 0 ? "opacity-50" : ""}`}
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
      <div className="d-flex justify-content-between">
        <Button
          variant="warning"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          Add to Cart
        </Button>
        <Button
          variant="primary"
          onClick={handleBuyNow}
          disabled={stock === 0}
        >
          Buy Now
        </Button>
      </div>
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
