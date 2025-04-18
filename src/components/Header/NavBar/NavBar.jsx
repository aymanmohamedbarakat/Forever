import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/frontend_assets/assets";
import {
  useCartStore,
  useLinks,
  useProducts,
  useSearchStore,
  useSideHeader,
  useAuthStore,
} from "../../../store";
import SideBar from "../SideBar/SideBar";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function NavBar() {
  const { getLinks } = useLinks();
  const [links, setLinks] = useState(getLinks());
  const { index, openSideHeader } = useSideHeader();
  const { openSearch } = useSearchStore();
  const { getCartAmount, getCartCount } = useCartStore();
  const { products } = useProducts();
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  // Update links when auth state changes
  useEffect(() => {
    setLinks(getLinks());
  }, [isAuthenticated, currentUser, getLinks]);

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  const navigateToOrders = () => {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/register");
    }
  };

  const navigateToWishlist = () => {
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

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {links.map((link, index) => (
          <NavLink
            to={link.url}
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <p>{link.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-5">
        <img
          src={assets.search_icon}
          className="w-4 cursor-pointer"
          onClick={openSearch}
          alt=""
        />
        <div className="group relative">
          {isAuthenticated ? (
            <div className="cursor-pointer relative">
              <img src={assets.profile_icon} alt="" className="w-4" />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20 transition-all duration-300 ease-in-out">
                <div className="flex flex-col gap-2 w-48 py-3 px-5 bg-slate-100 text-gray-400 rounded shadow-md">
                  <p className="font-medium text-black mb-1">
                    Hello, {currentUser?.name}
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/wishlist")}
                  >
                    My Wishlist
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={navigateToOrders}
                  >
                    My Orders
                  </p>
                  {isAdmin() && (
                    <p
                      className="cursor-pointer hover:text-black"
                      onClick={() => navigate("/admin")}
                    >
                      Admin Dashboard
                    </p>
                  )}
                  <hr className="my-1 border-gray-300" />
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/register">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-4 cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Wishlist icon - visible when authenticated */}
        {isAuthenticated ? (
          <div onClick={navigateToWishlist} className="relative cursor-pointer">
            <FaRegHeart />
            {currentUser?.wishlist?.length > 0 && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {currentUser.wishlist.length}
              </p>
            )}
          </div>
        ) : (
          <div onClick={navigateToWishlist} className="relative cursor-pointer">
            <FaRegHeart />
          </div>
        )}

        {/* Cart icon - visible when authenticated */}
        {isAuthenticated && (
          <Link to="cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5 cursor-pointer"
              alt="Cart"
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {Array.isArray(products) && products.length > 0
                ? getCartCount()
                : 0}
            </p>
          </Link>
        )}
        <img
          onClick={openSideHeader}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* SideBar */}
      {index && <SideBar />}
    </div>
  );
}
