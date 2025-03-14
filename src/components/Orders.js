import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["orderStatus"] = order.orderStatus;
            item["paymentResult"] = order.paymentResult;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["price"] = order.price ?? { baseRate: item.price.baseRate, total: item.price.total, quantity: item.price.quantity};
            allOrdersItem.push(item);
          });
        });


        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);


  // Get current date dynamically
 // const orderDate = new Date().toISOString().split("T")[0];

  return (
    <div className=" pt-4" style={{  marginTop: "100px"}}>
      <div className="order-arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft />
      </div>
      <div className="text-2xl mb-4 m-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.slice(0, 10).map((item) => (
            <div key={item._id} className="py-4 border-top border-bottom text-gray-700 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3 m-4">
              <div className="d-flex align-items-start gap-3 text-sm">
              <img
                className="img-fluid rounded"
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.title}
                style={{ width: "100px", height: "auto" }}
              />

                <div>
                  <p className="fw-bold">{item.title}</p>

                  <div className="d-flex align-items-center gap-3 mt-2 text-base text-gray">
                  <p className="fw-bold text-dark ">BaseRate: {currency}{item.price ? item.price.baseRate : "N/A"}</p>
                  </div>
                  <p className="text-muted">Quantity: {item.price?.quantity ?? "N/A"}</p>
                  <div className="d-flex align-items-center gap-3 mt-2 text-base text-gray">
                  <p className="fw-bold text-dark">Total: {currency}{item.price ? item.price.total : "N/A"}</p>
                  </div>
                 
                  <p className="mt-2 text-muted">
                    Date: <span className="text-gray-400">{new Date(item.date).toISOString().split("T")[0]}</span>
                  </p>
                  <p className="mt-2 text-muted">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="col-md-6 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span 
                    className="d-inline-block rounded-circle bg-success" 
                    style={{ width: "8px", height: "8px" }} 
                    aria-label="Ready to ship">
                  </span>
                  <p className="small text-md text-gray-700 m-0">{item.orderStatus}</p>
                </div>
                <button onClick={loadOrderData} className="btn btn-outline-dark px-4 py-2 text-sm">Track Order</button>
              </div>




            </div>
          ))
        ) : (
          <p className="text-center text-muted py-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
