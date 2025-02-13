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
import ProductDetail from './components/ProductDetail';
import Login from "./components/Login.js";
import Orders from "./components/Orders.js";
import PlaceOrder from "./components/PlaceOrder.js";
import SearchBar from "./components/SearchBar.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <SearchBar/>
      <div className="main-content">

        {/* Routes for different pages */}
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/place-order" element={<PlaceOrder/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
