import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.js';
import { ListGroup, Button } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '50px', marginRight: '10px' }}
                />
                {item.title} (x{item.quantity})
              </div>
              <div>
                Rs.{item.price * item.quantity}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-3"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Cart;
