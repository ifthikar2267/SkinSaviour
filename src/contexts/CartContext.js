import React, { createContext, useState } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // If product already exists, increment its quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add a new product with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Display alert
    setAlertMessage(`${product.title} successfully added to cart!`);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, alertMessage }}
    >
      {children}
    </CartContext.Provider>
  );
};
