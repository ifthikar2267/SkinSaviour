import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Product from "./components/Product";
import Category from "./components/Category";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductDetail from './components/ProductDetail'; // Product Detail Component
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    
      <BrowserRouter>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Dynamic product details route */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
