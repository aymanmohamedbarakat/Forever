import { create } from "zustand";
import { toast } from "react-toastify";
export const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],

  addToCart: (itemId, size) => {
    if (!size) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 1200,
      });
      return;
    }

    const cart = [...get().cartItems];
    const existingItemIndex = cart.findIndex(
      (item) => item._id === itemId && item.size === size
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
      toast.info("Item quantity increased", {
        position: "top-right",
        autoClose: 1200,
      });
    } else {
      // العنصر غير موجود - نضيفه جديد
      cart.push({ _id: itemId, size, quantity: 1 });
      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 1200,
      });
    }

    set({ cartItems: cart });
    localStorage.setItem("cartItems", JSON.stringify(cart));
  },

  removeFromCart: (itemId, size) => {
    const cart = get().cartItems.filter(
      (item) => !(item._id === itemId && item.size === size)
    );
    set({ cartItems: cart });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 1200,
    });
  },

  updateQuantity: (itemId, size, quantity) => {
    const cart = [...get().cartItems];
    const itemIndex = cart.findIndex(
      (item) => item._id === itemId && item.size === size
    );

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      set({ cartItems: cart });
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  },

  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getCartAmount: (products) => {
    const cart = get().cartItems;
    let total = 0;

    cart.forEach(({ _id, quantity }) => {
      const product = products.find((productItem) => productItem._id === _id);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cartItems");
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 1200,
    });
  },
}));