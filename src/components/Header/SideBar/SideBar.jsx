import React, { useEffect } from "react";
import { useLinks, useSideHeader, useAuthStore } from "../../../store";
import { assets } from "../../../assets/frontend_assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaUser, FaHeart, FaShoppingBag, FaSignOutAlt, FaChevronRight, FaCog } from "react-icons/fa";

export default function SideBar() {
  const { closeSideHeader } = useSideHeader();
  const { getLinks } = useLinks();
  const links = getLinks();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuthStore();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSideHeader();
      }
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'visible';
    };
  }, [closeSideHeader]);
  
  const handleLogout = () => {
    logout();
    closeSideHeader();
    navigate("/register");
  };
  
  const navigateTo = (path) => {
    navigate(path);
    closeSideHeader();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Full screen sidebar */}
      <div className="w-full bg-white shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button 
            onClick={closeSideHeader}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        
        {/* User section */}
        {isAuthenticated ? (
          <div className="p-4 bg-gray-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium">Hello, {currentUser?.name}</p>
                <p className="text-sm text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={() => navigateTo("/profile")}
                className="flex items-center justify-center space-x-1 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <FaUser className="text-gray-600 text-xs" />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => navigateTo("/wishlist")}
                className="flex items-center justify-center space-x-1 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <FaHeart className="text-gray-600 text-xs" />
                <span>Wishlist</span>
              </button>
              <button 
                onClick={() => navigateTo("/orders")}
                className="flex items-center justify-center space-x-1 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                <FaShoppingBag className="text-gray-600 text-xs" />
                <span>Orders</span>
              </button>
              {isAdmin()  && (  
                <button 
                  onClick={() => navigateTo("/admin")}
                  className="flex items-center justify-center space-x-1 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <FaCog className="text-gray-600 text-xs" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50">
            <button 
              onClick={() => navigateTo("/register")}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Sign In / Register
            </button>
          </div>
        )}
        
        <div className="flex-grow overflow-y-auto">
          <div className="py-2">
            <h3 className="px-4 py-2 text-sm font-medium text-gray-500">Navigation</h3>
            {links.map((link, index) => (
              <NavLink
                to={link.url}
                key={index}
                className={({ isActive }) => 
                  `flex items-center justify-between py-3 px-4 cursor-pointer border-b border-gray-100 
                  ${isActive ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'}`
                }
                onClick={closeSideHeader}
              >
                <span>{link.name}</span>
                <FaChevronRight className="text-xs text-gray-400" />
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        {isAuthenticated && (
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="w-full py-2 flex items-center justify-center space-x-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              <FaSignOutAlt className="text-gray-600" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}