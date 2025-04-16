import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useLinks = create(() => {
  const Links = [
    { name: "HOME", url: "/" },
    { name: "COLLECTION", url: "/collection" },
    { name: "ABOUT", url: "/about" },
    { name: "CONTACT", url: "/contact" },
  ];

  return {
    getLinks: () => {
      const { isAuthenticated, isAdmin } = useAuthStore.getState();

      if (isAuthenticated && isAdmin()) {
        return [...Links, { name: "ADMIN", url: "/admin" }];
      }

      return Links;
    },
    Links,
  };
});

export const useSideHeader = create((set) => ({
  index: false,
  openSideHeader: () => set(() => ({ index: true })),
  closeSideHeader: () => set(() => ({ index: false })),
}));

export const useSearchStore = create((set) => ({
  search: "",
  showSearch: false,

  setSearch: (value) => set({ search: value }),
  openSearch: () => set({ showSearch: true }),
  closeSearch: () => set({ showSearch: false , search: ""  }),
}));