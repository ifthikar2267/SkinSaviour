import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../Data/ingredients.json';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const ProductDetail = () => {
  // const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const { title, image, price, highlights } = product;

  const handleAddToCart = () => {
    //addToCart({ id: product.id, title: product.title, price: product.price });
  };


  return (
    <Container className='ProductDetail-container my-4'>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          <img
            className='ProductDetail-img img-fluid' 
            src={image}
            alt={title}
          />
        </Col>
        <Col xs={12} md={6} lg={8}>
          <h1>{title}</h1>
          <h2>Rs. {price}</h2>
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
          </Card.Text>
          <Row className="mt-3">
            <Col xs={12} md={6} className="mb-2">
              <Button block variant="primary">
                BUY NOW
              </Button> 
            </Col>
            <Col xs={12} md={6}>
              <Button block variant="warning" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
