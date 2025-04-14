import { toast } from "react-toastify";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useOrderStore = create((set, get) => ({
  orders: JSON.parse(localStorage.getItem("orders") || "[]"),
  loading: false,

  getOrders: () => {
    try {
      set({ loading: true });
      const savedOrders = localStorage.getItem("orders");
      const { currentUser } = useAuthStore.getState();

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);

        // Only admins see all orders
        // Regular users see their own orders
        // Guest users see orders with matching sessionId or no associated user
        let filteredOrders;

        if (currentUser && currentUser.role === "admin") {
          // Admins see all orders
          filteredOrders = parsedOrders;
        } else if (currentUser) {
          // Logged in users see their orders only
          filteredOrders = parsedOrders.filter(
            (order) => order.userId === currentUser.id
          );
        } else {
          // Guest users see guest orders
          filteredOrders = parsedOrders.filter(
            (order) => !order.userId // Show orders with no userId
          );
        }

        // Process the filtered orders...
        const updatedOrders = filteredOrders.map((order) => {
          if (!order.id) {
            return { ...order, id: get().generateOrderId() };
          }
          return order;
        });

        set({ orders: updatedOrders });
      } else {
        set({ orders: [] });
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("There was an error loading your orders.", {
        position: "top-right",
        autoClose: 1200,
      });
      set({ orders: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Rest of your order store methods...
  getStatusInfo: (status) => {
    switch (status) {
      case "processing":
        return { text: "Processing", color: "bg-yellow-500" };
      case "shipped":
        return { text: "Shipped", color: "bg-blue-500" };
      case "delivered":
        return { text: "Delivered", color: "bg-green-500" };
      case "cancelled":
        return { text: "Cancelled", color: "bg-red-500" };
      case "ready":
      default:
        return { text: "Ready", color: "bg-orange-500" };
    }
  },

  formatDate: (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  },

  generateOrderId: () => {
    const timeOrder = new Date().toISOString();
    const orderId = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ORD-${timeOrder}${orderId}`;
  },
}));