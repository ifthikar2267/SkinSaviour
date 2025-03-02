import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import CartTotal from "./CartTotal";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    products,
    delivery_fee,
    getCartAmount,
    setCartItems,
    cartItems,
    backendUrl,
    token,
  } = useContext(ShopContext);
  const navigate = useNavigate()
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(backendUrl + "/api/user/userlist", {
            headers: { token },
          });
          if (response.data.success) {
            setUserId(response.data.user._id);
            localStorage.setItem("userId", response.data.user._id);
          } else {
            toast.error("Failed to fetch user details");
          }
        } catch (error) {
          toast.error("User fetch error:", error);
        }
      };
      fetchUser();
    }
  }, [token, backendUrl]);



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.totalPrice,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers: {token}})
          if (data.success) {
            toast.success("Payment successful! Your order is confirmed");
            setCartItems({}); // Clear the cart
            navigate("/orders"); // Redirect to orders page
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Payment verification error.");
        }
        
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      let orderItems = [];
  
      // Loop through cartItems object
      for (const [itemId, quantity] of Object.entries(cartItems)) {
        if (quantity > 0) {
          const itemInfo = products.find(
            (product) => product._id.toString() === itemId
          );
          if (itemInfo) {
            orderItems.push({ ...itemInfo, quantity });
          }
        }
      }
  
      let orderData = {
        email: formData.email,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
        },
        items: orderItems.map((item) => ({
          productId: item._id,
          title: item.title,
          quantity: item.quantity,
          image: item.image || [],
          amount: {
            price: item.price,
            totalPrice: item.price * item.quantity,
          },
        })),
        totalPrice: getCartAmount() + delivery_fee,
        paymentMethod: method, // Store selected payment method
      };
  
      if (method === "cod") {
        // If Cash on Delivery, directly create the order
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } }
        );
  
        if (response.data.success) {
          toast.success("Order placed successfully with Cash on Delivery!");
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error("Order placement failed. Please try again.");
        }
      } else if (method === "razorpay") {
        // If Razorpay is selected, initiate payment
        try {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
  
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error("Error initializing Razorpay payment.");
          }
        } catch (error) {
          console.error("Razorpay payment error:", error);
          toast.error("Payment initialization failed.");
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Error processing your order.");
    }
  };
  
  return (
    <form onSubmit={onSubmitHandler} className="container my-5 border-top pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1="DELIVERY" text2="DETAILS" />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="firstName"
                value={formData.firstName}
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              className="form-control"
              placeholder="Email address"
            />
          </div>

          <div className="mb-3">
            <input
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              type="text"
              className="form-control"
              placeholder="Street"
            />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                type="text"
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                type="text"
                className="form-control"
                placeholder="State"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="zipCode"
                value={formData.zipCode}
                type="number"
                className="form-control"
                placeholder="Zipcode"
              />
            </div>
            <div className="col">
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                type="text"
                className="form-control"
                placeholder="Country"
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              required
              onChange={onChangeHandler}
              name="phoneNumber"
              value={formData.phoneNumber}
              type="number"
              className="form-control"
              placeholder="Phone"
            />
          </div>

          {/* Cart Total Section */}
          <div className="d-flex justify-content-end my-5">
            <div className="w-100" style={{ maxWidth: "450px" }}>
              <CartTotal />
            </div>
            </div>

          {/* Payment Method Section */}
          <div className="mb-3 row">
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="d-flex flex-column flex-lg-row gap-3">


              {/* Razorpay Payment Option */}
              <div
                onClick={() => setMethod("razorpay")}
                className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`border rounded-circle ${
                    method === "razorpay" ? "bg-success" : ""
                  }`}
                  style={{ minWidth: "20px", height: "20px" }}
                ></p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Razorpay_logo.webp"
                  className="img-fluid"
                  style={{ width: "100px", height: "50px" }}
                  alt="Razorpay Logo"
                />
              </div>

              {/* Cash on Delivery Option */}
              <div
                onClick={() => setMethod("cod")}
                className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`border rounded-circle ${
                    method === "cod" ? "bg-success" : ""
                  }`}
                  style={{ minWidth: "20px", height: "20px" }}
                ></p>
                <span className="fs-3 fw-bold text-dark">CASH ON DELIVERY</span>
              </div>
            </div>
            <div className="w-100 text-end">
              <button
                type="submit"
                className="btn btn-dark btn-sm px-4 py-2 mt-3"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
