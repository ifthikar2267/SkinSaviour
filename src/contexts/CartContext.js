import React, { createContext, useState } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  // Add product to the cart
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product data passed to addToCart');
      return;
    }

    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Update quantity if the product already exists
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to cart
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }

    // Display alert message
    setAlertMessage(`${product.title} successfully added to cart!`);
    setTimeout(() => setAlertMessage(''), 3000); // Clear alert after 3 seconds
  };

  // Remove product from the cart
  const removeFromCart = (id) => {
    if (!id) {
      console.error('Invalid product ID passed to removeFromCart');
      return;
    }

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        alertMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};