import React, { useEffect, useState } from "react";
import { useSearchStore } from "../../../store";
import { useLocation } from "react-router-dom";
import { assets } from "../../../assets/frontend_assets/assets";

export default function SearchBar() {
  const { search, setSearch, showSearch, closeSearch } = useSearchStore();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return (
    <>
      {showSearch && visible ? (
        <div className="  bg-gray-50 py-3 px-4">
          <div className="flex items-center max-w-2xl mx-auto">
            <div className="relative flex-grow flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent pr-2"
                type="text"
                placeholder="Search products..."
              />
              <img
                src={assets.search_icon}
                className="w-4 h-4 opacity-70"
                alt="Search"
              />
            </div>
            <button
              onClick={closeSearch}
              className="ml-3 p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close search"
            >
              <img
                src={assets.cross_icon}
                className="w-4 h-4 opacity-70"
                alt=""
              />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
