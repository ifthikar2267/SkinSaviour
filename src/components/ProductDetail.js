import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../Data/ingredients.json';
import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const { title, image, price, highlights } = product;

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.price });
  };

  return (
    <div>
      <h1>{title}</h1>
      <img
         src={image}
        alt={title}
        style={{ maxWidth: '300px' }}
      />
      <h2>Rs.{price}</h2>
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
      <div className="buy-button">
        <Button onClick={handleAddToCart}>BUY NOW</Button>
      </div>
      <div className="add-to-cart">
        <Button variant="warning" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
