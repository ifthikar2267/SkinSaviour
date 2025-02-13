import React, { useState } from 'react';
import Title from './Title';
import CartTotal from './CartTotal';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  return (
    <div className="container my-5 border-top pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1="DELIVERY" text2="DETAILS" />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input type="text" className="form-control" placeholder="First name" />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Last name" />
            </div>
          </div>

          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email address" />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Street" />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input type="text" className="form-control" placeholder="City" />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="State" />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col">
              <input type="number" className="form-control" placeholder="Zipcode" />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Country" />
            </div>
          </div>

          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Phone" />
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
              
              {/* Stripe Payment Option */}
              <div
                onClick={() => setMethod('stripe')}
                className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`border rounded-circle ${method === 'stripe' ? 'bg-success' : ''}`}
                  style={{ minWidth: "20px", height: "20px" }}
                ></p>
                <span className="fs-2 fw-bold text-primary">Stripe</span>
              </div>

              {/* Razorpay Payment Option */}
              <div
                onClick={() => setMethod('razorpay')}
                className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`border rounded-circle ${method === 'razorpay' ? 'bg-success' : ''}`}
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
                onClick={() => setMethod('cod')}
                className="d-flex align-items-center gap-3 border p-2 px-3 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`border rounded-circle ${method === 'cod' ? 'bg-success' : ''}`}
                  style={{ minWidth: "20px", height: "20px" }}
                ></p>
                <span className="fs-3 fw-bold text-dark">CASH ON DELIVERY</span>
              </div>

            </div>
            <div className="w-100 text-end">
              <button onClick={()=> navigate('/orders')} className="btn btn-dark btn-sm px-4 py-2 mt-3">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
