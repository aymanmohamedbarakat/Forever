import { useNavigate } from "react-router-dom";
import { useAuthStore, useCartStore, useProducts } from "../../../store";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const { currentUser, isAuthenticated, removeFromWishlist } = useAuthStore();
  const { products } = useProducts();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }

    // Get wishlist items
    if (currentUser && products) {
      const items = currentUser.wishlist
        .map((id) => {
          const product = products.find((p) => p._id === id);
          return product || null;
        })
        .filter(Boolean);

      setWishlistItems(items);

      // Initialize selected sizes
      const sizes = {};
      items.forEach((item) => {
        sizes[item._id] =
          item.sizes && item.sizes.length > 0 ? item.sizes[0] : "";
      });
      setSelectedSizes(sizes);
    }
  }, [currentUser, products, isAuthenticated, navigate]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes({
      ...selectedSizes,
      [productId]: size,
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
  };

  const handleAddToCart = (productId) => {
    const size = selectedSizes[productId];
    addToCart(productId, size);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-6">
          Add items to your wishlist to keep track of products you love!
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="bg-black text-white py-2 px-6"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 p-4 flex flex-col"
          >
            <div className="relative group">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-full aspect-square object-cover object-center"
                onClick={() => navigate(`/product/${item._id}`)}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <FaHeart  />
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h3
                className="text-lg font-medium cursor-pointer hover:underline"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                {item.name}
              </h3>
              <p className="text-gray-700 mt-1">${item.price.toFixed(2)}</p>

              {item.sizes && item.sizes.length > 0 && (
                <div className="mt-3">
                  <label className="block text-sm text-gray-600 mb-1">
                    Size:
                  </label>
                  <select
                    value={selectedSizes[item._id] || ""}
                    onChange={(e) => handleSizeChange(item._id, e.target.value)}
                    className="border border-gray-300 px-3 py-1 w-full"
                  >
                    {item.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-4 w-full bg-black text-white py-2 hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
