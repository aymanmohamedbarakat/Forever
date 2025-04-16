import { create } from "zustand";
import { toast } from "react-toastify";
const initialUsers = [
  {
    id: "user1",
    name: "Regular User",
    email: "user@example.com",
    phone: "123456789",
    password: "password123",
    role: "user",
    orders: [],
    wishlist: [],
  },
  {
    id: "admin1",
    name: "Logentery Admin",
    email: "admin@example.com",
    phone: "987654321",
    password: "admin123",
    role: "admin",
    orders: [],
    wishlist: [],
  },
];

// User authentication store
export const useAuthStore = create((set, get) => ({
  users: JSON.parse(localStorage.getItem("users")) || initialUsers,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("currentUser")),
  isAdmin: () => {
    const user = get().currentUser;
    return user && user.role === "admin";
  },

  // Login function
  login: (phone, password) => {
    const user = get().users.find(
      (u) => u.phone === phone && u.password === password
    );

    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`, {
        position: "top-right",
        autoClose: 1200,
      });
      return true;
    } else {
      toast.error("Invalid phone number or password", {
        position: "top-right",
        autoClose: 1200,
      });
      return false;
    }
  },

  // Register function
  register: (name, phone, password) => {
    const users = get().users;

    // Check if user already exists
    if (users.some((u) => u.phone === phone)) {
      toast.error("Phone number already registered", {
        position: "top-right",
        autoClose: 2000,
      });
      return false;
    }

    // Create new user
    const newUser = {
      id: `user${Date.now()}`,
      name,
      phone,
      password,
      role: "user", 
      orders: [],
      wishlist: [],
    };

    const updatedUsers = [...users, newUser];
    set({ users: updatedUsers });
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Auto login after registration
    set({ currentUser: newUser, isAuthenticated: true });
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    toast.success("Registration successful!", {
      position: "top-right",
      autoClose: 1200,
    });
    return true;
  },

  // Logout function
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
    localStorage.removeItem("currentUser");
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 1200,
    });
  },

  // Update user profile
  updateProfile: (updatedData) => {
    const { users, currentUser } = get();
    if (!currentUser) return false;

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? { ...user, ...updatedData } : user
    );

    const updatedUser = { ...currentUser, ...updatedData };

    set({ users: updatedUsers, currentUser: updatedUser });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 1200,
    });

    return true;
  },

  // Wishlist functions
  addToWishlist: (productId) => {
    const { currentUser, users } = get();
    if (!currentUser) {
      toast.error("Please login to add items to your wishlist", {
        position: "top-right",
        autoClose: 1200,
      });
      return false;
    }

    // Check if product is already in wishlist
    if (currentUser.wishlist.includes(productId)) {
      toast.info("Item is already in your wishlist", {
        position: "top-right",
        autoClose: 1200,
      });
      return false;
    }

    // Add to wishlist
    const updatedWishlist = [...currentUser.wishlist, productId];
    const updatedUser = { ...currentUser, wishlist: updatedWishlist };

    // Update users array
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    );

    // Update state and localStorage
    set({ currentUser: updatedUser, users: updatedUsers });
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Item added to wishlist", {
      position: "top-right",
      autoClose: 1200,
    });
    return true;
  },

  removeFromWishlist: (productId) => {
    const { currentUser, users } = get();
    if (!currentUser) return false;

    // Remove from wishlist
    const updatedWishlist = currentUser.wishlist.filter(
      (id) => id !== productId
    );
    const updatedUser = { ...currentUser, wishlist: updatedWishlist };

    // Update users array
    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    );

    // Update state and localStorage
    set({ currentUser: updatedUser, users: updatedUsers });
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Item removed from wishlist", {
      position: "top-right",
      autoClose: 1200,
    });
    return true;
  },

  isInWishlist: (productId) => {
    const { currentUser } = get();
    return currentUser && currentUser.wishlist.includes(productId);
  },

  getWishlist: () => {
    const { currentUser } = get();
    return currentUser ? currentUser.wishlist : [];
  },
}));
