import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [actionType, setActionType] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customReason, setCustomReason] = useState("");

  const navigate = useNavigate();

  const cancelReasons = [
    "Changed my mind",
    "Ordered by mistake",
    "Found a better price",
  ];
  const returnReasons = [
    "Received wrong item",
    "Item was damaged",
    "Quality not as expected",
  ];

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
            item["orderId"] = order._id;
            item["orderStatus"] = order.orderStatus;
            item["paymentResult"] = order.paymentResult;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["price"] = order.price ?? {
              baseRate: item.price.baseRate,
              total: item.price.total,
              quantity: item.price.quantity,
            };
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

  //cancel and request return the order
  const cancelOrder = async (orderId, reason ) => {
    // Removed 'reason' from parameters
    if (!orderId) {
      alert("Invalid Order ID");
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/cancel",
        { orderId, reason  },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Order cancelled successfully!");
        setSelectedOrder(null);
        setActionType("");
        loadOrderData();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const requestReturn = async (orderId, reason) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/request-return",
        { orderId, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Return request submitted!");
        setSelectedOrder(null);
        setActionType("");
        loadOrderData();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error requesting return:", error);
    }
  };

  // Get current date dynamically
  // const orderDate = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-4" style={{ marginTop: "100px" }}>
      <div className="order-arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft />
      </div>
      <div className="text-2xl mb-4 m-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((item) => (
            <div
              key={item._id}
              className="py-4 border-top text-gray-700 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3 m-4"
            >
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
                    <p className="fw-bold text-dark">
                      BaseRate: {currency}
                      {item.price ? item.price.baseRate : "N/A"}
                    </p>
                  </div>
                  <p className="text-muted">
                    Quantity: {item.price?.quantity ?? "N/A"}
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-2 text-base text-gray">
                    <p className="fw-bold text-dark">
                      Total: {currency}
                      {item.price ? item.price.total : "N/A"}
                    </p>
                  </div>

                  <p className="mt-2 text-muted">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toISOString().split("T")[0]}
                    </span>
                  </p>
                  <p className="mt-2 text-muted">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="col-md-6 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="d-inline-block rounded-circle bg-success"
                    style={{ width: "8px", height: "8px" }}
                    aria-label="Ready to ship"
                  ></span>
                  <p className="small text-md text-gray-700 m-0">
                    {item.orderStatus}
                  </p>
                </div>
              </div>

              <div className="track-order-btn">
                <button
                  onClick={loadOrderData}
                  className="btn btn-outline-dark px-4 py-2 text-sm"
                  style={{ borderRadius: "30px" }}
                >
                  Track Order
                </button>
              </div>

              <div>
                {item.orderStatus === "Confirmed" && (
                  <button
                    className="btn btn-outline-danger px-4 py-2 text-sm"
                    onClick={() => {
                      setSelectedOrder(item.orderId);
                      setActionType("cancel");
                    }}
                    style={{ borderRadius: "30px" }}
                  >
                    Cancel Order
                  </button>
                )}

                {item.orderStatus === "Delivered" &&
                  !item.returnRequest?.isRequested && (
                    <button
                      className="btn btn-outline-warning px-4 py-2 text-sm"
                      onClick={() => {
                        setSelectedOrder(item.orderId);
                        setActionType("return");
                      }}
                      style={{ borderRadius: "30px" }}
                    >
                      Request Return
                    </button>
                  )}

                {selectedOrder === item.orderId && (
                  <div className="mt-2">
                    {(actionType === "cancel"
                      ? [...cancelReasons, "Other"]
                      : [...returnReasons, "Other"]
                    ).map((reason, index) => (
                      <div key={index} className="form-check">
                        <input
                          type="radio"
                          id={`reason-${index}`}
                          name={`reason-${selectedOrder}`}
                          value={reason}
                          className="form-check-input"
                          onChange={(e) => {
                            if (e.target.value === "Other") {
                              setCustomReason(""); // Reset the custom reason input
                            } else {
                              if (actionType === "cancel") {
                                cancelOrder(selectedOrder, e.target.value);
                              } else {
                                requestReturn(selectedOrder, e.target.value);
                              }
                              setSelectedOrder(null); // Hide options after selection
                            }
                          }}
                        />
                        <label
                          htmlFor={`reason-${index}`}
                          className="form-check-label"
                        >
                          {reason}
                        </label>
                      </div>
                    ))}

                    {/* Textbox appears only when "Other" is selected */}
                    {selectedOrder === item.orderId && (
                      <div className="mt-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your reason"
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                        />
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => {
                            if (customReason.trim() === "") {
                              alert("Please enter a reason!");
                              return;
                            }
                            if (actionType === "cancel") {
                              cancelOrder(selectedOrder, customReason);
                            } else {
                              requestReturn(selectedOrder, customReason);
                            }
                            setSelectedOrder(null);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
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
