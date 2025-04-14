import React from "react";
import Title from "../../Global/Title/Title";
import {
  currency,
  delivery_fee,
  useCartStore,
  useProducts,
} from "../../../store";

export default function CartTotal() {
  const { getCartAmount } = useCartStore();
  const { products } = useProducts();

  const subtotal = getCartAmount(products);
  const total = subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between font-medium text-lg">
          <b>Total</b>
          <b>
            {currency} {total.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
}
