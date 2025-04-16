import React from "react";
import Title from "../../components/Global/Title/Title";
import { currency, useCartStore, useProducts } from "../../store";
import CartTotal from "../../components/Cart/CartTotal/CartTotal";
import { useNavigate } from "react-router-dom";
// Import icons
import { 
  Trash2, 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  RefreshCcw,
  ChevronLeft
} from "lucide-react";

export default function Cart() {
  const { products } = useProducts();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-t border-gray-300 pt-8">
        <div className="flex justify-between items-center mb-6">
          <Title text1={"YOUR"} text2={"CART"} />
          {!isCartEmpty && (
            <button 
              onClick={clearCart}
              className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-sm"
            >
              <RefreshCcw size={16} className="mr-1" />
              Clear Cart
            </button>
          )}
        </div>
        
        {isCartEmpty ? (
          <div className="py-16 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <p className="text-xl text-gray-600 mb-6">Your shopping cart is empty</p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors flex items-center mx-auto"
            >
              CONTINUE SHOPPING
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        ) : (
          <>
            {/* Cart items header - desktop only */}
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 pb-2 border-b border-gray-200 font-medium text-gray-500">
              <div>Product</div>
              <div className="text-center">Size</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
            
            {/* Cart items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );

                if (!productData) return null;

                return (
                  <div
                    key={`${item._id}-${item.size}-${index}`}
                    className="py-6 md:grid md:grid-cols-[3fr_1fr_1fr_1fr] gap-4 items-center"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <div className="relative">
                        <img
                          className="w-20 h-20 object-cover"
                          src={productData.image[0]}
                          alt={productData.name}
                        />
                        <button
                          onClick={() => removeFromCart(item._id, item.size)}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:hidden"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div>
                        <p className="font-medium">{productData.name}</p>
                        <p className="text-gray-600 mt-1">
                          {currency}{productData.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Size */}
                    <div className="flex items-center md:justify-center mb-4 md:mb-0">
                      <div className="md:hidden text-gray-500 mr-3">Size:</div>
                      <div className="px-3 py-1 border bg-slate-50 inline-block rounded">
                        {item.size}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="flex items-center md:justify-center mb-4 md:mb-0">
                      <div className="md:hidden text-gray-500 mr-3">Quantity:</div>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between items-center md:justify-end">
                      <div className="md:hidden text-gray-500">Total:</div>
                      <div className="font-medium">{currency}{(productData.price * item.quantity).toFixed(2)}</div>
                      <button
                        onClick={() => removeFromCart(item._id, item.size)}
                        className="text-red-500 hidden md:flex md:items-center hover:text-red-600 ml-4"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Cart totals and checkout */}
            <div className="mt-10 md:flex md:justify-end">

              
              <div className="w-full md:w-96">
                <CartTotal />
                <div className="w-full">
                  <button
                    onClick={() => navigate("/place-order")}
                    className="w-full bg-black text-white text-sm mt-6 px-8 py-3 cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}