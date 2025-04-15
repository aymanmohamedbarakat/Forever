import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import Home from "./pages/Home/Home";
import Collection from "./pages/Collection/Collection";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart/Cart";
import PlaceOrders from "./pages/PlaceOrders/PlaceOrders";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Wishlist from "./components/Header/Wishlist/Wishlist";

export default function App() {
  return (
    <div className=" px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
      <ToastContainer />
      <Routes>
        {/* PublicRoute */}

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* UserRoute */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="collection" element={<Collection />} />
          <Route path="product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl my-20">Page Not Found</h1>
            }
          />
          {/* AdminRoute */}
          {/* <Route path="/admin" element={<h1>Admin</h1>}></Route> */}
        </Route>

        {/* RegisterRoute */}
        <Route path="/register" element={<Login />} />
        {/* AdminRoute */}
        <Route path="/admin" element={<h1>Admin</h1>}></Route>
      </Routes>
    </div>
  );
}
