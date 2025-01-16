import React, { useContext , useEffect , useState} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext.js';
import products from '../Data/ingredients.json';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext); // Access addToCart
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));



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



  if (!product) {
    return <h2>Product not found</h2>;
  }

  const { title, image, oldPrice, newPrice, highlights, benefits, stock} = product;

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: newPrice, image });
  };

  return (
    <Container className="ProductDetail-container my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center ">
        {stock === 0 && (
        <div>
        <span class="badge bg-danger text-uppercase">Out of Stock</span>
        </div>
      )}
          <img
            className="ProductDetail-img img-fluid "
            src={image}
            alt={title}
          />
        </Col>
        <Col xs={12} md={6} lg={8}>
          <h1>{title}</h1>
          <span className="text-muted text-decoration-line-through fs-5 me-2">
            Rs.{oldPrice}
          </span>
          <span className="text-black fw-bold fs-4">Rs.{newPrice}</span>
          <Card.Text>
            <strong>Highlights:</strong>
            {highlights ? (
              <ul>
                {highlights.split(';').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No highlights available for this product.</p>
            )}
            <strong>Benefits:</strong>
            {benefits ? (
              <ul>
                {benefits.split(';').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No benefits available for this product.</p>
            )}
          </Card.Text>
          <Row className="mt-3">
            <Col xs={12} md={6} className="mb-2">
              {/* Replace 'block' with 'w-100' */}
              <Button
                       variant="primary"
                       onClick={handleBuyNow}
                       disabled={stock === 0}
                     >
                       Buy Now
                     </Button>
            </Col>
            <Col xs={12} md={6}>
              {/* Replace 'block' with 'w-100' */}
             <Button
                       variant="warning"
                       onClick={handleAddToCart}
                       disabled={stock === 0}
                     >
                       Add to Cart
                     </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
