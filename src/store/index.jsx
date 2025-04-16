import { useAuthStore } from "./authStore";
export * from "./authStore";
export * from "./uiStore";
export * from "./cartStore";
export * from "./checkoutStore";
export * from "./orderStore";
export * from "./productStore";

import { toast } from "react-toastify";

export const currency = "$";
export const delivery_fee = 10;

export const navigateToOrders = (navigate) => {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) {
    navigate("/orders");
  } else {
    navigate("/register");
    toast.info("Please login to view your orders", {
      position: "top-right",
      autoClose: 1200,
    });
  }
};

export const navigateToWishlist = (navigate) => {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) {
    navigate("/wishlist");
  } else {
    navigate("/register");
    toast.info("Please login to view your wishlist", {
      position: "top-right",
      autoClose: 1200,
    });
  }
};
