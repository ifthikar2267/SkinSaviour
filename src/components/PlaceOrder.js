import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import CartTotal from "./CartTotal";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowCircleLeft } from "react-icons/fa";

const PlaceOrder = () => {

   //send notification to admin when order confirmed
   const confirmOrder = async (totalAmount, userId, items, shippingAddress) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(backendUrl + "/api/order/place", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
          },
            body: JSON.stringify({
                userId,
                items,
                totals: { total: totalAmount },
                shippingAddress: (shippingAddress),
                paymentMethod: "Cash on Delivery",
            }),
        });

        const data = await response.json();
        if (data.success) {
            toast.success("Order placed successfully!");
        } else {
            console.log(`Failed to place order: ${data.message}`);
        }
    } catch (error) {
        console.error("Error confirming order:", error);
        toast.error("An error occurred while placing the order.");
    }
};
/*------------------------------------------------------- */
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
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(backendUrl + "/api/user/userlist", {
            headers: { Authorization: `Bearer ${token}` },
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
    district: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = async (event) => {
    const { name, value } = event.target;
  
    if (name === "phoneNumber" && value.length === 10) {
      const phoneRegex = /^[6-9]\d{9}$/; // Must start with 6-9 and have 10 digits
  
      if (!phoneRegex.test(value)) {
        toast.error("Invalid phone number. It must be a 10-digit number starting with 6-9.");
        return;
      }
    }
    // Validate ZIP Code (PIN Code)
    if (name === "zipCode" && value.length === 6) { 
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        
        if (response.data[0].Status === "Success") {
          const placeData = response.data[0].PostOffice[0];
          
          setFormData((data) => ({
            ...data,
            district: placeData.District,
            state: placeData.State,
            zipCode: value,
          }));
        } else {
          toast.error("Invalid PIN Code. Please enter a correct one.");
        }
      } catch (error) {
        toast.error("PIN Code not found. Enter a valid one.");
      }
    }
  
    // Update form data
    setFormData((data) => ({ ...data, [name]: value }));
  };
  
  

  const initPay = (order, orderData) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id, // Ensure correct ID
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            {
              razorpay_order_id: response.razorpay_order_id, // Ensure correct ID
              razorpay_payment_id: response.razorpay_payment_id,
              ...orderData, // Send full order details
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (data.success) {
            setOrderSuccess(true); // Show success GIF
           // toast.success("Payment successful! Your order is confirmed");
            setCartItems({});
            setTimeout(() => {
              setOrderSuccess(false);
              navigate("/orders");
            }, 2000);
            // Call confirmOrder function to send notification
            confirmOrder(orderData.totals.total, userId, orderData.items, orderData.shippingAddress);

          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("Payment verification error.");
        }
      },
      // prefill: {
      //   name: formData.firstName + " " + formData.lastName,
      //   email: formData.email,
      //   contact: formData.phoneNumber,
      // },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

     // Check if the cart is empty
  if (Object.keys(cartItems).length === 0 || getCartAmount() === 0) {
    toast.error("Your cart is empty! Please add products before placing an order.");
    return;
  }

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
          district: formData.district,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
        },
        items: orderItems.map((item) => ({
          productId: item._id,
          title: item.title,
          image: item.image || [],
          price: {
            baseRate: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          },
        })),
        totals: {
          quantity: orderItems.reduce((sum, item) => sum + item.quantity, 0),
          total: getCartAmount() + delivery_fee,
        },
        paymentMethod: method, // Add selected payment method
        paymentStatus: method === "cod" ? "Pending" : "Paid",
      };

      if (method === "razorpay") {
        try {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.razorpayOrder, orderData);
          } else {
            toast.error("Error initializing Razorpay payment.");
          }
        } catch (error) {
          console.error("Razorpay payment error:", error);
          toast.error("Payment initialization failed.");
        }
      } else if (method === "cod") {
        // Handle Cash on Delivery (COD)
        try {
          const responseCOD = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseCOD.data.success) {
            setOrderSuccess(true); // Show success GIF
            // toast.success(
            //   "Order placed successfully! Please pay upon delivery."
            // );
            setCartItems({}); 
            setTimeout(() => {
              setOrderSuccess(false);
              navigate("/orders");
            }, 2000);
            
            // Call confirmOrder function to send notification
            confirmOrder(orderData.totals.total, userId, orderData.items, orderData.shippingAddress);
           
          } else {
            toast.error("Error placing COD order.");
          }
        } catch (error) {
          console.error("COD order error:", error);
          toast.error("Error processing your order.");
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Error processing your order.");
    }
  };
  

  return (
    <div>
      <div className="placeorder-arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft />
      </div>
      {orderSuccess ? (
        <div className="text-center">
          <img src={"./assets/images/success.gif"} alt="Order Success" width="250px" style={{marginTop:"150px"}} />
          <h4 className="text-success fw-bold">Order Placed Successfully!</h4>
        </div>
      ) : (
      <form onSubmit={onSubmitHandler} className="container ">
        <div className=" row justify-content-center">
          <div className="col-md-6">
            <div className=" text-xl sm:text-2xl my-3">
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
                  style={{borderRadius:"30px"}}
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
                  style={{borderRadius:"30px"}}
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
                style={{borderRadius:"30px"}}
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
                placeholder="Door No & Street"
                style={{borderRadius:"30px"}}
              />
            </div>

            <div className="mb-3">
              <input
                 required
                 onChange={onChangeHandler}
                 name="city"
                 value={formData.city}
                 type="text"
                 className="form-control"
                 placeholder="City"
                 style={{borderRadius:"30px"}}
              />
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
                  style={{borderRadius:"30px"}}
                />
              </div>
              <div className="col">
                <input
                 required
                 onChange={onChangeHandler}
                 name="district"
                 value={formData.district}
                 type="text"
                 className="form-control"
                 placeholder="District"
                 style={{borderRadius:"30px"}}
                />
              </div>
            </div>

            <div className="mb-3 row">
            <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  type="text"
                  className="form-control"
                  placeholder="State"
                  style={{borderRadius:"30px"}}
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
                  style={{borderRadius:"30px"}}
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
                style={{borderRadius:"30px"}}
              />
            </div>

            {/* Cart Total Section */}
            <div className="d-flex justify-content-end my-5">
              <div className="w-100" style={{ maxWidth: "450px",marginTop:"-20px" }}>
                <CartTotal />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="mb-3 row" style={{marginTop:"-15px"}}>
              <Title text1="PAYMENT" text2="METHOD" />
              <div className="d-flex flex-column flex-lg-row gap-3">
                {/* Razorpay Payment Option */}
                <div
                  onClick={() => setMethod("razorpay")}
                  className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                  style={{ cursor: "pointer", borderRadius:"30px"}}
                >
                  <p
                    className={`border rounded-circle ${
                      method === "razorpay" ? "bg-success" : ""
                    }`}
                    style={{ minWidth: "20px", height: "20px",marginTop:"9px"}}
                  ></p>
                  <img
                    src="./assets/images/razorpay-img.png"
                    className="razorpay-img-fluid"
                    style={{ width: "100px", height: "50px", marginLeft:"85px" }}
                    alt="Razorpay Logo"
                  />
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => setMethod("cod")}
                  className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                  style={{ cursor: "pointer", borderRadius:"30px" }}
                >
                  <p
                    className={`border rounded-circle ${
                      method === "cod" ? "bg-success" : ""
                    }`}
                    style={{ minWidth: "20px", height: "20px", marginTop:"9px" }}
                  ></p>
                  <span className="fs-3 fw-bold text-dark" style={{marginLeft:"24px"}}>
                    CASH ON DELIVERY
                  </span>
                </div>
              </div>
              <div className="w-100 text-end">
                <button
                  type="submit"
                  className="btn btn-dark btn-sm px-4 py-2 mt-3"
                  style={{borderRadius:"30px"}}
                  disabled={Object.keys(cartItems).length === 0 || getCartAmount() === 0}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      )}
    </div>
  );
};

export default PlaceOrder;
