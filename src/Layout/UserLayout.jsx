import React from "react";
import NavBar from "../components/Header/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Global/Footer/Footer";
import SearchBar from "../components/Global/SearchBar/SearchBar";

export default function UserLayout() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Outlet />
      <Footer />
    </div>
  );
}
