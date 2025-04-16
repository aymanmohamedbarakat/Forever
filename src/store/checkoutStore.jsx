import { create } from "zustand";
import { toast } from "react-toastify";
import { useProducts } from "./productStore";
import { useCartStore } from "./cartStore";
import { useAuthStore } from "./authStore";

export const useCheckOutStore = create((set, get) => ({
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  },
  method: "cod",

  setFormData: (data) => set({ formData: data }),
  setMethod: (method) => set({ method }),

  // Generate Id
  generateOrderId: () => {
    const timeOrder = new Date().toISOString();
    const orderId = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ORD-${timeOrder}${orderId}`;
  },

  getCartItemsList: () => {
    const cartItems = useCartStore.getState().cartItems;
    const items = [];
    const { products } = useProducts.getState();

    cartItems.forEach(({ _id, size, quantity }) => {
      const product = products.find((productItem) => productItem._id === _id);
      if (product && quantity > 0) {
        items.push({
          productId: _id,
          name: product.name,
          price: product.price,
          image: product.image[0],
          size,
          quantity,
        });
      }
    });
    return items;
  },

  handlePlaceOrder: async () => {
    const { formData, method } = get();
    const { currentUser } = useAuthStore.getState();
    const { products } = useProducts.getState();
    // Check if cart is empty
    const cartItemsArray = get().getCartItemsArray();
    if (cartItemsArray.length === 0) {
      toast.error("Your cart is empty", {
        position: "top-right",
        autoClose: 1200,
      });
      return;
    }

    // Create order
    const orderCustomer = {
      id: get().generateOrderId(),
      date: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      },
      items: cartItemsArray,
      total: get().getCartAmount(),
      PaymentMethod: method,
      status: "processing",
    };

    // If user is logged in, associate order with user
    let userId = null;

    if (currentUser) {
      userId = currentUser.id;

      // Pre-fill form data with user info if not already provided
      if (!orderCustomer.firstName) {
        orderCustomer.firstName = currentUser.name.split(" ")[0] || "";
        orderCustomer.lastName = currentUser.name.split(" ")[1] || "";
      }
      if (!orderCustomer.email) orderCustomer.email = currentUser.email;
      if (!orderCustomer.phone) orderCustomer.phone = currentUser.phone;
    }

    const order = {
      id: get().generateOrderId(),
      date: new Date().toISOString(),
      customer: orderCustomer,
      userId: currentUser?.id || null, // هذا السطر مهم
      items: cartItemsArray,
      total: get().getCartAmount(),
      PaymentMethod: method,
      status: "processing",
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // If user is logged in, add order to their orders list
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((user) => {
          if (user.id === currentUser.id) {
            return {
              ...user,
              orders: [order.id, ...(user.orders || [])],
            };
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Update current user in auth store
        const updatedUser = {
          ...currentUser,
          orders: [order.id, ...(currentUser.orders || [])],
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        useAuthStore.setState({ currentUser: updatedUser });
      }

      // Clear cart
      useCartStore.getState().clearCart();

      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 1200,
      });
      return true;
    } catch (error) {
      // console.error("Error saving order:", error);
      toast.error("There was an error placing your order. Please try again.", {
        position: "top-right",
        autoClose: 1200,
      });
      return false;
    }
  },

  getCartItemsArray: () => {
    return get().getCartItemsList();
  },

  getCartAmount: () => {
    const cartItems = get().getCartItemsArray();
    // const { products } = useProducts.getState();
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
