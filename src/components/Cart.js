import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { ListGroup, Button } from 'react-bootstrap';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.title}</h5>
                <p>Rs.{item.price} x {item.quantity}</p>
              </div>
              <div>
                <strong>Subtotal: Rs.{item.price * item.quantity}</strong>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Cart;
