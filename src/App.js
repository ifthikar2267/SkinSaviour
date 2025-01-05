import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Product from "./components/Product";
import Category from "./components/Category";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductDetail from './components/ProductDetail';
import { Alert } from 'react-bootstrap';
import { CartContext } from './contexts/CartContext.js';

function App() {
  const { alertMessage } = useContext(CartContext); // Get the alert message from context
  
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-content">
        {/* Display alert message if it exists */}
        {alertMessage && (
          <Alert
          variant="success"
          dismissible
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050, width: "100%" }}
        >
          {alertMessage}
        </Alert>
        
        )}

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
