import { create } from "zustand";
import { products } from "../assets/frontend_assets/assets";
export const useProducts = create((set) => ({
  products: products,
  setProducts: (newProducts) => set({ products: newProducts }),
}));