import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartTotal from "./CartTotal";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaArrowCircleLeft } from "react-icons/fa";

const Cart = () => {
  const {
    token,
    products,
    cartItems,
    removeFromCart,
    updateQuantity,
    currency,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.entries(cartItems).map(([id, quantity]) => {
        const product = products.find((p) => p._id.toString() === id);
        return product ? { ...product, quantity } : null;
      });
      setCartData(tempData.filter((item) => item)); // Remove nulls
    }
  }, [cartItems, products]);

  return (
    <div>
      <div
        style={{ paddingTop: "30px" }}
        className="productDetail-arrow-left"
        onClick={() => navigate(-1)}
      >
        <FaArrowCircleLeft />
      </div>
      <div className="container my-5">
        <div className="cart-container border-t pt-14">
          <div className="container-title text-2xl mb-3 fs-3">
            <Title text1={"YOUR"} text2={"CART"} />
          </div>

          {cartData.length === 0 ? (
            <div className="cart-empty-container text-center text-gray-500 py-4">
              <img
                className="cart-empty"
                src="./assets/images/cart-empty.png"
                alt=""
              />
              <p className="cart-empty-p fs-3">
                <b>
                  Oops!
                  <br />
                  Your cart is currently empty
                </b>
              </p>

              <button
                className="cart-empty-button mt-5"
                onClick={() => navigate("/product")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="row">
              {cartData.map((item, index) => (
                <div key={index} className="col-12 mb-3">
                  <div className="d-flex align-items-center border-bottom pb-3">
                    {/* Image Section */}
                    <img
                      className="img-fluid rounded"
                      src={
                        Array.isArray(item.image) ? item.image[0] : item.image
                      }
                      alt={item.title}
                      style={{ width: "110px", height: "auto" }}
                    />
                    {/* Text Section */}
                    <div>
                      <p className="cart-title">{item.title}</p>

                      <div className="quantity-container">
                        <span>Quantity:</span>
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            -
                          </button>

                          <input
                            className="form-control text-center"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              e.target.value === "" || e.target.value === "0"
                                ? null
                                : updateQuantity(
                                    item._id,
                                    Number(e.target.value)
                                  )
                            }
                            style={{ maxWidth: "60px" }}
                          />

                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="price-container">
                        {currency} {item.price || "N/A"}
                      </div>

                      <div className="trash">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => removeFromCart(item._id, 0)}
                          className="varient-dark hover:"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartData.length > 0 && (
            <div className="d-flex justify-content-end my-5 ms-3">
              <div className="w-100" style={{ maxWidth: "450px" }}>
                <CartTotal />
                <div className="w-100 text-end">
                  <button
                    onClick={() => {
                      if (!token) {
                        alert(
                          "Please log in or sign up to proceed to checkout."
                        );
                        navigate("/login");
                      } else {
                        navigate("/place-order");
                      }
                    }}
                    className="btn btn-dark btn-sm px-4 py-2 mt-3"
                    style={{borderRadius:"30px"}}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
                <div>
                <button
                className="cart-shopping-button mt-5 btn-dark"
                onClick={() => navigate("/product")}
              >
                Continue Shopping
              </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
