import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount, delivery_fee , currency} = useContext(ShopContext);

  return (
    <div className="w-100">
      {/* Title */}
      <div className="mb-3">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Subtotal, Shipping Fee, and Total */}
      <div className="d-flex flex-column gap-2 mt-2">
        {/* Subtotal */}
        <div className="d-flex justify-content-between">
          <p className="mb-0">Subtotal</p>
          <p className="mb-0"> {currency} {getCartAmount()}.00</p>
        </div>
        <hr className="my-1" />

        {/* Shipping Fee */}
        <div className="d-flex justify-content-between">
          <p className="mb-0">Shipping Fee</p>
          <p className="mb-0"> {currency} {delivery_fee}.00</p>
        </div>
        <hr className="my-1" />

        {/* Total */}
        <div className="d-flex justify-content-between">
          <strong>Total</strong>
          <strong>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
