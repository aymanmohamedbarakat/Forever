import React, { useEffect } from "react";
import Title from "../../components/Global/Title/Title";
import { currency, useOrderStore, useProducts } from "../../store";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";

export default function Orders() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { orders, getStatusInfo, formatDate, getOrders } = useOrderStore();
  const getPaymentMethodDisplay = (method) => {
    const paymentMethodInfo = {
      stripe: { text: "Stripe", color: "text-blue-500" },
      razorpay: { text: "Razorpay", color: "text-green-500" },
      cod: { text: "Cash on Delivery", color: "text-gray-500" },
    };
    const payment =
      paymentMethodInfo[method?.toLowerCase()] || paymentMethodInfo["cod"];
    return (
      <div className={`flex items-center ${payment.color}`}>
        {/* {method?.toLowerCase() !== "cod" && (
          <img
            src={assets[`${method?.toLowerCase()}_logo`] || "/placeholder.svg"}
            className="h-4 mr-1"
            alt={payment.text}
          />
        )} */}
        <span>{payment.text}</span>
      </div>
    );
  };
  const getProductDetails = (productId) => {
    return products.find((product) => product._id === productId) || null;
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (orders.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div className="text-center py-20">
          <p className="text-lg mb-4">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-6 mt-4">
        {orders.map((order, index) => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <div
              className="py-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden"
              key={index}
            >
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-3 bg-red-50 border-b border-gray-300">
                <div>
                  <p className="font-medium">
                    Order #{order.id || `ORD-${index + 1}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.date
                      ? formatDate(order.date)
                      : formatDate(new Date())}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {order.PaymentMethod && (
                    <div className="text-sm text-gray-600 mr-4">
                      {getPaymentMethodDisplay(order.PaymentMethod)}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${statusInfo.color}`}
                    ></span>
                    <span className="text-sm">{statusInfo.text}</span>
                  </div>
                </div>
              </div>

              {/* Order items */}
              <div className="divide-y divide-gray-200">
                {order.items &&
                  order.items.map((item, index) => {
                    const productDetails = item.productId
                      ? getProductDetails(item.productId)
                      : null;
                    return (
                      <div
                        key={index}
                        className="py-4 px-6 flex items-start gap-4"
                      >
                        <img
                          className="w-16 sm:w-20 object-cover"
                          src={
                            item.image ||
                            (productDetails
                              ? productDetails.image[0]
                              : "/placeholder.svg")
                          }
                          alt=""
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 sm:text-base font-medium">
                            {item.name ||
                              (productDetails ? productDetails.name : "")}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                            <p className="text-lg">
                              {currency}
                              {item.price ||
                                (productDetails ? productDetails.price : 0)}
                            </p>
                            <p className="text-sm">
                              Quantity: {item.quantity || 1}
                            </p>
                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                              Size: {item.size || "M"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center border-t border-gray-200 bg-gray-50 py-4 px-6">
                <div>
                  <p className="text-sm text-gray-600 sm:text-base font-medium">
                    Total: {currency} {order.total}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items?.length || 0}{" "}
                    {(order.items?.length || 0) === 1 ? "item" : "items"}
                  </p>
                </div>
                <button className="border px-5 py-2 text-sm font-medium rounded-sm hover:bg-gray-100">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
