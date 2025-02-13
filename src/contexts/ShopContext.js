import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const delivery_fee = 50;
  const currency = "₹";

  const addToCart = async (productId) => {
    const product = products.find((p) => p._id === productId);
  
    if (!product) {
      toast.error("Product not found!");
      return;
    }
  
    // Update the cart count instantly in the UI
    setCartItems((prev) => {
      const updatedCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      return updatedCart;
    });
  
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
           // userId: token,
            productId: productId,
            title: product.title, 
            //price: product.price,
            //image: product.image,
            quantity: 1,
          },
          { headers: { token } }
        );
       
      } catch (error) {
        console.error("Error while adding to cart:", error.response?.data || error);
        toast.error("Failed to add to cart");
      }
    }
  };
  
  

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const updateQuantity = async (productId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { productId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Calculate the total number of items in the cart
  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };
  
  
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id.toString() === productId);

      if (product) {
        totalAmount += product.price * cartItems[productId];
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {}, 
        { headers: { token } }
      );
  
      if (response.data.success) {
        setCartItems(response.data.cartData ); // Ensure cartItems is always an array
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  
  
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  

  const value = {
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    currency,
    delivery_fee,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalCartCount,
    getCartAmount,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
