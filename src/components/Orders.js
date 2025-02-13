import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  // Get current date dynamically
  const orderDate = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="border-top pt-4">
      <div className="text-2xl mb-3">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {products.length > 0 ? (
          products.slice(0, 10).map((item) => (
            <div key={item._id} className="py-4 border-top border-bottom text-gray-700 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
              <div className="d-flex align-items-start gap-3 text-sm">
              <img
                className="img-fluid rounded"
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.title}
                style={{ width: "80px", height: "auto" }}
              />

                <div>
                  <p className="fw-bold">{item.title}</p>

                  <div className="d-flex align-items-center gap-3 mt-2 text-base text-gray">
                    <p className="fw-bold text-dark">{currency}{item.price}</p>
                    <p className="text-muted">Quantity: 1</p>
                  </div>

                  <p className="mt-2 text-muted">
                    Date: <span className="text-gray-400">{orderDate}</span>
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
                  <p className="small text-md text-gray-700 m-0">Ready to ship</p>
                </div>
                <button className="btn btn-outline-dark px-4 py-2 text-sm">Track Order</button>
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
